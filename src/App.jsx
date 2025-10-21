import { useCallback } from 'react';
import Header from './components/Header';
import ChatContainer from './components/ChatContainer';
import ChatInput from './components/ChatInput';
import { useOllama } from './hooks/useOllama';
import useChatStore from './hooks/useChatStore';

function App() {
  const {
    currentModel,
    availableModels,
    isGenerating,
    sendMessage,
    loadModels,
    regenerateResponse,
  } = useOllama();

  const { setCurrentModel, isLoading } = useChatStore();

  const handleSendMessage = useCallback((message) => {
    sendMessage(message);
  }, [sendMessage]);

  const handleModelChange = useCallback((modelName) => {
    setCurrentModel(modelName);
  }, [setCurrentModel]);

  const handleRefreshModels = useCallback(() => {
    loadModels();
  }, [loadModels]);

  const handleRegenerate = useCallback(() => {
    regenerateResponse();
  }, [regenerateResponse]);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden safe-area-inset">
      <Header
        models={availableModels}
        currentModel={currentModel}
        onModelChange={handleModelChange}
        onRefreshModels={handleRefreshModels}
      />

      <ChatContainer
        currentModel={currentModel}
        onRegenerate={handleRegenerate}
      />

      <ChatInput
        onSend={handleSendMessage}
        disabled={!currentModel || isLoading}
      />
    </div>
  );
}

export default App;
