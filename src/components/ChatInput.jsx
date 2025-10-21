import { useState, useRef, useEffect } from 'react';
import { Send, Square } from 'lucide-react';
import useChatStore from '../hooks/useChatStore';

export default function ChatInput({ onSend, disabled }) {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);
  const { isGenerating, stopGeneration } = useChatStore();

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleStop = () => {
    stopGeneration();
  };

  return (
    <div className="glass-effect rounded-2xl p-2.5 m-2 sm:p-4 sm:m-4 flex-shrink-0">
      <form onSubmit={handleSubmit} className="flex items-end gap-2 sm:gap-3">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={disabled}
          className="
            flex-1 bg-transparent text-white-smoke placeholder-white-smoke/50
            resize-none outline-none font-inter text-sm
            disabled:opacity-50 disabled:cursor-not-allowed
            max-h-[120px] overflow-y-auto scrollbar-thin
            min-h-[40px]
          "
          rows={1}
        />

        {isGenerating ? (
          <button
            type="button"
            onClick={handleStop}
            className="
              p-2.5 sm:p-3 rounded-xl bg-red-500/20 border border-red-500/30
              hover:bg-red-500/30 active:bg-red-500/40 transition-smooth
              flex items-center justify-center flex-shrink-0
            "
            aria-label="Stop generation"
          >
            <Square size={18} className="sm:w-5 sm:h-5 text-red-400" fill="currentColor" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={disabled || !input.trim()}
            className="
              p-2.5 sm:p-3 rounded-xl bg-electric-blue/20 border border-electric-blue/30
              hover:bg-electric-blue/30 active:bg-electric-blue/40 hover:electric-glow transition-smooth
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center flex-shrink-0
            "
            aria-label="Send message"
          >
            <Send size={18} className="sm:w-5 sm:h-5 text-electric-blue" />
          </button>
        )}
      </form>

      <div className="text-xs text-white-smoke/40 mt-2 text-center font-inter hidden sm:block">
        Press Enter to send • Shift+Enter for new line
      </div>
    </div>
  );
}
