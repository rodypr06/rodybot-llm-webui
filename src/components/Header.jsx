import { memo } from 'react';
import PropTypes from 'prop-types';
import { Trash2, RefreshCw, AlertCircle } from 'lucide-react';
import useChatStore from '../hooks/useChatStore';
import ModelSelector from './ModelSelector';

function Header({ models, currentModel, onModelChange, onRefreshModels }) {
  const { clearMessages, messages, isLoading, error, clearError } = useChatStore();

  const handleClearChat = () => {
    if (messages.length > 0) {
      if (window.confirm('Are you sure you want to clear the chat history?')) {
        clearMessages();
      }
    }
  };

  return (
    <header className="glass-effect border-b border-white/10 px-3 py-3 sm:px-6 sm:py-4 flex-shrink-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Logo and Title */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-electric-blue/20 border border-electric-blue/30 flex items-center justify-center flex-shrink-0">
              <span className="text-electric-blue font-poppins font-bold text-lg sm:text-xl">R</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-poppins font-bold text-xl text-white-smoke">
                RodyBot
              </h1>
              <p className="text-xs text-white-smoke/60 font-inter">
                Powered by Ollama
              </p>
            </div>
            <div className="sm:hidden">
              <h1 className="font-poppins font-bold text-base text-white-smoke">
                RodyBot
              </h1>
            </div>
          </div>
        </div>

        {/* Error indicator - Hidden on mobile */}
        {error && (
          <div className="hidden md:flex items-center gap-2 text-red-400 bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/20">
            <AlertCircle size={16} />
            <span className="text-xs font-inter flex-1">{error}</span>
            <button
              onClick={clearError}
              className="text-red-400/70 hover:text-red-400 transition-smooth ml-2"
              aria-label="Dismiss error"
            >
              ✕
            </button>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <ModelSelector
            models={models}
            currentModel={currentModel}
            onModelChange={onModelChange}
          />

          <button
            onClick={onRefreshModels}
            disabled={isLoading}
            className="
              glass-effect rounded-xl p-2 sm:p-2.5 transition-smooth
              hover:electric-glow-subtle border border-white/10
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            aria-label="Refresh models"
            title="Refresh models"
          >
            <RefreshCw
              size={16}
              className={`sm:w-[18px] sm:h-[18px] text-white-smoke/70 ${isLoading ? 'animate-spin' : ''}`}
            />
          </button>

          <button
            onClick={handleClearChat}
            disabled={messages.length === 0}
            className="
              glass-effect rounded-xl p-2 sm:p-2.5 transition-smooth
              hover:electric-glow-subtle hover:bg-red-500/10 border border-white/10
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            aria-label="Clear chat"
            title="Clear chat"
          >
            <Trash2 size={16} className="sm:w-[18px] sm:h-[18px] text-white-smoke/70" />
          </button>
        </div>
      </div>

      {/* Mobile Error Toast */}
      {error && (
        <div className="md:hidden mt-2 flex items-center gap-2 text-red-400 bg-red-500/10 px-3 py-2 rounded-lg text-xs border border-red-500/20">
          <AlertCircle size={14} />
          <span className="font-inter flex-1 truncate">{error}</span>
          <button
            onClick={clearError}
            className="text-red-400/70 hover:text-red-400 transition-smooth"
            aria-label="Dismiss error"
          >
            ✕
          </button>
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  models: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      size: PropTypes.number,
    })
  ).isRequired,
  currentModel: PropTypes.string,
  onModelChange: PropTypes.func.isRequired,
  onRefreshModels: PropTypes.func.isRequired,
};

export default memo(Header);
