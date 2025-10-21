# RodyBot - Ollama WebUI

A beautiful, modern chatbot web interface for your local Ollama LLM instance. Features a sleek glassmorphic design with RodyTech branding.

## Features

- **Beautiful Glassmorphic UI** - Modern, futuristic design with blur effects
- **Real-time Streaming** - Watch AI responses appear in real-time
- **Model Switching** - Easily switch between different Ollama models
- **Markdown Support** - Full markdown rendering with syntax highlighting
- **Code Highlighting** - Syntax highlighting for code blocks
- **Persistent Chat** - Chat history saved to local storage
- **Responsive Design** - Works on desktop, tablet, and mobile

## Tech Stack

- **React 19** - UI framework
- **Vite 6** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS
- **Zustand** - State management
- **react-markdown** - Markdown rendering
- **rehype-highlight** - Code syntax highlighting
- **Lucide React** - Beautiful icons

## Prerequisites

- Node.js 18+ (currently using v18.20.8)
- Ollama running at `http://192.168.50.53:11434`

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

1. Start the dev server with `npm run dev`
2. Open http://localhost:3000 in your browser
3. Select a model from the dropdown (loads automatically on startup)
4. Start chatting!

## Configuration

The Ollama endpoint is configured in `src/utils/ollamaApi.js`:

```javascript
const OLLAMA_BASE_URL = 'http://192.168.50.53:11434';
```

Change this if your Ollama instance is running on a different host/port.

## Design System

### Colors
- **Charcoal**: #1C1C1E (background)
- **Deep Gray**: #2B2B2E (secondary background)
- **Electric Blue**: #007BFF (primary accent)
- **White Smoke**: #F5F5F7 (text)

### Typography
- **Poppins** - Headings and UI elements
- **Inter** - Body text and messages
- **Fira Code** - Code blocks

### Effects
- Glassmorphism with backdrop blur
- Electric blue glow on focus
- Smooth transitions and animations
- Custom scrollbar styling

## Keyboard Shortcuts

- **Enter** - Send message
- **Shift+Enter** - New line in message

## Project Structure

```
src/
├── components/
│   ├── ChatContainer.jsx    # Main chat display area
│   ├── MessageBubble.jsx     # Individual message component
│   ├── ChatInput.jsx         # Message input with send button
│   ├── ModelSelector.jsx     # Model selection dropdown
│   ├── Header.jsx            # App header with controls
│   └── EmptyState.jsx        # Welcome screen
├── hooks/
│   ├── useChatStore.js       # Zustand store for chat state
│   └── useOllama.js          # Ollama API integration hook
├── utils/
│   └── ollamaApi.js          # Ollama API utilities
├── styles/
│   └── globals.css           # Global styles and design system
├── App.jsx                   # Main app component
└── main.jsx                  # App entry point
```

## Features Roadmap

- [ ] System prompts/instructions
- [ ] Temperature and parameter controls
- [ ] Export chat history
- [ ] Dark/light mode toggle
- [ ] Multi-chat sessions
- [ ] File upload support
- [ ] Voice input
- [ ] Keyboard shortcuts panel
- [ ] Custom themes

## Troubleshooting

**Models not loading?**
- Check that Ollama is running: `curl http://192.168.50.53:11434/api/tags`
- Verify the endpoint URL in `src/utils/ollamaApi.js`

**Streaming not working?**
- Ensure your browser supports the Fetch API streams
- Check browser console for errors

**Styles not loading?**
- Clear browser cache
- Rebuild with `npm run build`

## License

ISC

---

**RodyTech® | Automation. Ownership. Simplicity.**
