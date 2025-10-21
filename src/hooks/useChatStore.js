import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useChatStore = create(
  persist(
    (set, get) => ({
      // State
      messages: [],
      currentModel: null,
      availableModels: [],
      isLoading: false,
      isGenerating: false,
      error: null,
      abortController: null,

      // Actions
      setMessages: (messages) => set({ messages }),

      addMessage: (message) => set((state) => ({
        messages: [...state.messages, {
          ...message,
          id: Date.now(),
          timestamp: new Date().toISOString(),
        }]
      })),

      updateLastMessage: (content) => set((state) => {
        const messages = [...state.messages];
        if (messages.length > 0) {
          messages[messages.length - 1].content += content;
        }
        return { messages };
      }),

      clearMessages: () => set({ messages: [] }),

      setCurrentModel: (model) => set({ currentModel: model }),

      setAvailableModels: (models) => set({ availableModels: models }),

      setIsLoading: (isLoading) => set({ isLoading }),

      setIsGenerating: (isGenerating) => set({ isGenerating }),

      setError: (error) => set({ error }),

      setAbortController: (controller) => set({ abortController: controller }),

      stopGeneration: () => {
        const { abortController } = get();
        if (abortController) {
          abortController.abort();
          set({ abortController: null, isGenerating: false });
        }
      },

      removeLastMessage: () => set((state) => ({
        messages: state.messages.slice(0, -1)
      })),

      getLastUserMessage: () => {
        const { messages } = get();
        // Find the last user message
        for (let i = messages.length - 1; i >= 0; i--) {
          if (messages[i].role === 'user') {
            return messages[i].content;
          }
        }
        return null;
      },

      // Computed
      hasMessages: () => get().messages.length > 0,
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({
        messages: state.messages,
        currentModel: state.currentModel,
      }),
    }
  )
);

export default useChatStore;
