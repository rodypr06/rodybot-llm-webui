import { useEffect } from 'react';
import { fetchModels, generateChatResponse, checkOllamaStatus } from '../utils/ollamaApi';
import useChatStore from './useChatStore';

export function useOllama() {
  const {
    currentModel,
    availableModels,
    messages,
    isGenerating,
    setAvailableModels,
    setCurrentModel,
    setIsLoading,
    setIsGenerating,
    setError,
    addMessage,
    updateLastMessage,
    setAbortController,
    removeLastMessage,
    getLastUserMessage,
  } = useChatStore();

  // Load models on mount
  useEffect(() => {
    loadModels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadModels = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const isOnline = await checkOllamaStatus();
      if (!isOnline) {
        throw new Error('Ollama server is offline');
      }

      const models = await fetchModels();
      setAvailableModels(models);

      if (models.length > 0 && !currentModel) {
        setCurrentModel(models[0].name);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (userMessage) => {
    if (!currentModel) {
      setError('No model selected');
      return;
    }

    if (!userMessage.trim()) {
      return;
    }

    // Add user message
    addMessage({
      role: 'user',
      content: userMessage,
    });

    // Add placeholder for assistant message
    addMessage({
      role: 'assistant',
      content: '',
    });

    setIsGenerating(true);
    setError(null);

    const abortController = new AbortController();
    setAbortController(abortController);

    try {
      // Build messages array for API
      const chatHistory = [
        ...messages,
        { role: 'user', content: userMessage }
      ];

      await generateChatResponse(
        currentModel,
        chatHistory,
        (chunk) => {
          updateLastMessage(chunk);
        },
        abortController.signal
      );
    } catch (error) {
      if (error.name !== 'AbortError') {
        setError(error.message);
      }
    } finally {
      setIsGenerating(false);
      setAbortController(null);
    }
  };

  const regenerateResponse = async () => {
    const lastUserMessage = getLastUserMessage();

    if (!lastUserMessage || !currentModel) {
      setError('Cannot regenerate: no previous message found');
      return;
    }

    // Remove the last AI response
    removeLastMessage();

    // Add a new placeholder for assistant message
    addMessage({
      role: 'assistant',
      content: '',
    });

    setIsGenerating(true);
    setError(null);

    const abortController = new AbortController();
    setAbortController(abortController);

    try {
      // Build messages array for API (excluding the response we just removed)
      const chatHistory = messages.slice(0, -1);

      await generateChatResponse(
        currentModel,
        chatHistory,
        (chunk) => {
          updateLastMessage(chunk);
        },
        abortController.signal
      );
    } catch (error) {
      if (error.name !== 'AbortError') {
        setError(error.message);
      }
    } finally {
      setIsGenerating(false);
      setAbortController(null);
    }
  };

  return {
    currentModel,
    availableModels,
    isGenerating,
    sendMessage,
    loadModels,
    regenerateResponse,
  };
}
