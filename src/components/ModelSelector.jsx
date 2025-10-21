import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import useChatStore from '../hooks/useChatStore';

export default function ModelSelector({ models, currentModel, onModelChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (modelName) => {
    onModelChange(modelName);
    setIsOpen(false);
  };

  const currentModelData = models.find(m => m.name === currentModel);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          glass-effect rounded-xl px-2.5 py-1.5 sm:px-4 sm:py-2 flex items-center gap-1.5 sm:gap-2
          transition-smooth hover:electric-glow-subtle
          border border-white/10
        "
      >
        <div className="flex flex-col items-start min-w-0">
          <span className="text-[10px] sm:text-xs text-white-smoke/60 font-inter">Model</span>
          <span className="text-xs sm:text-sm font-poppins font-semibold text-white-smoke truncate max-w-[80px] sm:max-w-none">
            {currentModel || 'Select'}
          </span>
        </div>
        <ChevronDown
          size={14}
          className={`sm:w-4 sm:h-4 text-white-smoke/70 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="
            absolute top-full mt-2 right-0 w-[280px] sm:min-w-[250px]
            glass-effect rounded-xl border border-white/10
            max-h-[60vh] sm:max-h-[400px] overflow-y-auto scrollbar-thin
            z-20 shadow-2xl
          ">
            {models.length === 0 ? (
              <div className="p-4 text-white-smoke/60 text-sm text-center">
                No models available
              </div>
            ) : (
              models.map((model) => (
                <button
                  key={model.name}
                  onClick={() => handleSelect(model.name)}
                  className="
                    w-full px-3 py-2.5 sm:px-4 sm:py-3 text-left transition-smooth
                    hover:bg-electric-blue/10 active:bg-electric-blue/20 border-b border-white/5
                    last:border-b-0 flex items-center justify-between
                  "
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="font-poppins font-medium text-white-smoke text-sm truncate">
                      {model.name}
                    </div>
                    <div className="text-xs text-white-smoke/50 mt-1">
                      {formatBytes(model.size)}
                    </div>
                  </div>
                  {model.name === currentModel && (
                    <Check size={16} className="text-electric-blue flex-shrink-0" />
                  )}
                </button>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

function formatBytes(bytes) {
  if (!bytes) return 'Unknown';
  const gb = bytes / (1024 ** 3);
  return `${gb.toFixed(1)} GB`;
}
