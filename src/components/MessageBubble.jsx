import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Copy, Check, RefreshCw } from 'lucide-react';
import CodeBlock from './CodeBlock';

export default function MessageBubble({ message, isLastAiMessage, onRegenerate }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 sm:mb-4 animate-slide-up group`}
    >
      <div
        className={`
          max-w-[92%] sm:max-w-[85%] md:max-w-[80%] rounded-2xl p-3 sm:p-4 glass-effect transition-smooth
          ${isUser
            ? 'bg-electric-blue/20 border-electric-blue/30'
            : 'bg-deep-gray/50 border-white/10'
          }
        `}
      >
        {/* Copy button */}
        <div className="flex justify-between items-start mb-2">
          <span className={`text-xs font-poppins font-semibold ${
            isUser ? 'text-electric-blue' : 'text-white-smoke/70'
          }`}>
            {isUser ? 'You' : 'AI'}
          </span>

          <button
            onClick={handleCopy}
            className="sm:opacity-0 sm:group-hover:opacity-100 transition-smooth p-1.5 sm:p-1 hover:bg-white/10 active:bg-white/20 rounded touch-manipulation"
            aria-label="Copy message"
          >
            {copied ? (
              <Check size={14} className="sm:w-4 sm:h-4 text-green-400" />
            ) : (
              <Copy size={14} className="sm:w-4 sm:h-4 text-white-smoke/70" />
            )}
          </button>
        </div>

        {/* Message content */}
        <div className="markdown-content text-sm leading-relaxed break-words">
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  // Inline code (backticks)
                  if (inline) {
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                  // Code blocks (triple backticks)
                  return (
                    <CodeBlock className={className} {...props}>
                      {children}
                    </CodeBlock>
                  );
                }
              }}
            >
              {message.content || '_Thinking..._'}
            </ReactMarkdown>
          )}
        </div>

        {/* Timestamp and Regenerate */}
        <div className="flex items-center justify-between mt-2">
          {message.timestamp && (
            <div className="text-[10px] sm:text-xs text-white-smoke/40">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          )}

          {/* Regenerate button - only show on last AI message */}
          {isLastAiMessage && !isUser && onRegenerate && (
            <button
              onClick={onRegenerate}
              className="
                flex items-center gap-1.5 px-2 py-1 rounded-lg
                text-[10px] sm:text-xs font-inter
                bg-white/5 hover:bg-white/10 active:bg-white/15
                border border-white/10 transition-smooth
                text-white-smoke/70 hover:text-white-smoke
                touch-manipulation
              "
              aria-label="Regenerate response"
            >
              <RefreshCw size={12} className="sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">Regenerate</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
