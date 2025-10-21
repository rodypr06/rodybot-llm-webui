import { useEffect, useRef } from 'react';
import useChatStore from '../hooks/useChatStore';
import MessageBubble from './MessageBubble';
import EmptyState from './EmptyState';

export default function ChatContainer({ currentModel, onRegenerate }) {
  const { messages } = useChatStore();
  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  // Find the index of the last AI message
  const lastAiMessageIndex = messages.length > 0
    ? messages.map((m, i) => ({ ...m, index: i }))
        .reverse()
        .find(m => m.role === 'assistant')?.index
    : -1;

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const hasMessages = messages.length > 0;

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto scrollbar-thin px-2 py-3 sm:px-4 sm:py-6"
    >
      {!hasMessages ? (
        <EmptyState modelName={currentModel} />
      ) : (
        <div className="max-w-4xl mx-auto">
          {messages.map((message, index) => (
            <MessageBubble
              key={message.id}
              message={message}
              isLastAiMessage={index === lastAiMessageIndex}
              onRegenerate={onRegenerate}
            />
          ))}
          <div ref={bottomRef} className="h-2" />
        </div>
      )}
    </div>
  );
}
