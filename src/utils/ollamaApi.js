// Use relative URL to go through Vite proxy
const OLLAMA_BASE_URL = '';

/**
 * Fetch available models from Ollama
 * @returns {Promise<Array>} List of models
 */
export async function fetchModels() {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`);
    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.statusText}`);
    }
    const data = await response.json();
    return data.models || [];
  } catch (error) {
    console.error('Error fetching models:', error);
    throw error;
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
      throw new Error(`Chat request failed: ${response.statusText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim());

      for (const line of lines) {
        try {
          const json = JSON.parse(line);

          if (json.message?.content) {
            onChunk(json.message.content);
          }

          if (json.done) {
            return;
          }
        } catch (e) {
          console.warn('Failed to parse chunk:', e);
        }
      }
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Request cancelled');
    } else {
      console.error('Error generating response:', error);
      throw error;
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
