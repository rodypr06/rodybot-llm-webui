// Use relative URL to go through Vite proxy
const OLLAMA_BASE_URL = '';

/**
 * Retry helper with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum retry attempts
 * @param {number} delay - Initial delay in ms
 * @returns {Promise<any>}
 */
async function retryWithBackoff(fn, maxRetries = 3, delay = 1000) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      // Exponential backoff
      const waitTime = delay * Math.pow(2, attempt);
      console.log(`Retry attempt ${attempt + 1}/${maxRetries} after ${waitTime}ms`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
}

/**
 * Fetch available models from Ollama
 * @returns {Promise<Array>} List of models
 */
export async function fetchModels() {
  try {
    return await retryWithBackoff(async () => {
      const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`);
      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.statusText}`);
      }
      const data = await response.json();
      return data.models || [];
    });
  } catch (error) {
    console.error('Error fetching models:', error);
    throw new Error('Unable to connect to Ollama server. Please check if it is running.');
  }
}

/**
 * Generate streaming chat response from Ollama
 * @param {string} model - Model name
 * @param {Array} messages - Chat history
 * @param {Function} onChunk - Callback for each chunk
 * @param {AbortSignal} signal - Abort signal for cancellation
 * @returns {Promise<void>}
 */
export async function generateChatResponse(model, messages, onChunk, signal) {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        stream: true,
      }),
      signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Chat request failed: ${response.statusText}. ${errorText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let receivedData = false;

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        if (!receivedData) {
          throw new Error('No response received from model');
        }
        break;
      }

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim());

      for (const line of lines) {
        try {
          const json = JSON.parse(line);

          if (json.error) {
            throw new Error(`Model error: ${json.error}`);
          }

          if (json.message?.content) {
            onChunk(json.message.content);
            receivedData = true;
          }

          if (json.done) {
            return;
          }
        } catch (e) {
          if (e.message.startsWith('Model error:')) {
            throw e;
          }
          console.warn('Failed to parse chunk:', e);
        }
      }
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Request cancelled');
      throw error;
    } else {
      console.error('Error generating response:', error);
      throw new Error(error.message || 'Failed to generate response. Please try again.');
    }
  }
}

/**
 * Check if Ollama server is reachable
 * @returns {Promise<boolean>}
 */
export async function checkOllamaStatus() {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch (error) {
    console.error('Ollama server unreachable:', error);
    return false;
  }
}
