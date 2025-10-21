import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { Check, Copy } from 'lucide-react';

function CodeBlock({ children, className, ...props }) {
  const [copied, setCopied] = useState(false);

  // Extract language from className (e.g., "language-javascript")
  const language = className?.replace(/language-/, '') || 'text';

  const handleCopy = async () => {
    // Extract text content from children
    let textContent = '';

    if (typeof children === 'string') {
      textContent = children;
    } else if (children?.props?.children) {
      textContent = String(children.props.children);
    } else if (Array.isArray(children)) {
      textContent = children.join('');
    } else {
      textContent = String(children);
    }

    await navigator.clipboard.writeText(textContent.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4">
      {/* Language label and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-charcoal/80 rounded-t-lg border-b border-white/10">
        <span className="text-xs font-inter text-white-smoke/60 uppercase">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="
            flex items-center gap-1.5 px-2 py-1 rounded-md
            transition-smooth text-xs font-inter
            hover:bg-white/10 active:bg-white/20
            touch-manipulation
          "
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check size={14} className="text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} className="text-white-smoke/70" />
              <span className="text-white-smoke/70">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <pre className="!mt-0 !rounded-t-none" {...props}>
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
}

CodeBlock.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default memo(CodeBlock);
