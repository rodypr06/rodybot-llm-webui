import { memo } from 'react';
import PropTypes from 'prop-types';
import { MessageSquare, Sparkles } from 'lucide-react';

function EmptyState({ modelName }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      <div className="glass-effect rounded-full p-8 mb-6 electric-glow-subtle">
        <MessageSquare size={64} className="text-electric-blue" />
      </div>

      <h2 className="font-poppins text-3xl font-bold mb-3 text-white-smoke">
        Welcome to RodyBot
      </h2>

      <p className="text-white-smoke/70 text-lg mb-6 max-w-md">
        Your personal AI assistant powered by {modelName || 'Ollama'}
      </p>

      <div className="flex items-center gap-2 text-electric-blue">
        <Sparkles size={20} />
        <span className="font-inter text-sm">
          Start a conversation below
        </span>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
        <SuggestionCard
          title="Ask a question"
          description="Get instant answers to your questions"
        />
        <SuggestionCard
          title="Write code"
          description="Generate code snippets and solutions"
        />
        <SuggestionCard
          title="Get creative"
          description="Brainstorm ideas and create content"
        />
      </div>
    </div>
  );
}

function SuggestionCard({ title, description }) {
  return (
    <div className="glass-effect rounded-xl p-4 transition-smooth hover:scale-102 hover:electric-glow-subtle cursor-pointer">
      <h3 className="font-poppins font-semibold text-white-smoke mb-2">
        {title}
      </h3>
      <p className="text-white-smoke/60 text-sm">
        {description}
      </p>
    </div>
  );
}

SuggestionCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

EmptyState.propTypes = {
  modelName: PropTypes.string,
};

export default memo(EmptyState);
