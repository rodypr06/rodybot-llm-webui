# Ollama WebUI Chatbot

## Project Overview

A beautiful, modern chatbot web interface for local Ollama LLM instance. Features glassmorphic design with RodyTech branding - sleek, minimal, and futuristic.

**Ollama Endpoint:** `http://192.168.50.53:11434`  
**Auth:** None required

---

## Core Features

### Chat Interface
- Clean conversation view with message bubbles
- Real-time streaming responses
- Code syntax highlighting
- Markdown rendering
- Copy message content
- Clear conversation history

### Model Management
- List available models from Ollama
- Switch between models on the fly
- Display current model info
- Model loading indicators

### User Experience
- Smooth animations and transitions
- Responsive design (mobile/tablet/desktop)
- Auto-scroll to latest message
- Typing indicators
- Empty state designs

---

## Design System

### Color Palette
```css
--charcoal: #1C1C1E
--deep-gray: #2B2B2E
--electric-blue: #007BFF
--white-smoke: #F5F5F7
--accent-glow: rgba(0, 123, 255, 0.4)
```

**No cyan colors** - stick to electric blue for accents and glows.

### Typography
- Primary: Poppins (headings, UI elements)
- Secondary: Inter (body, messages)
- Monospace: Fira Code (code blocks)

### Glassmorphism Style
```css
background: rgba(43, 43, 46, 0.7);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 16px;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
```

Apply to:
- Chat container
- Message bubbles
- Model selector
- Input box
- Settings panels

### Effects
- Electric blue glow on focus: `0 0 20px rgba(0, 123, 255, 0.5)`
- Smooth transitions: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- Hover states with slight scale: `transform: scale(1.02)`
- Subtle pulse animation for loading states

---

## Tech Stack

### Frontend
- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS + custom CSS for glassmorphism
- **Icons:** Lucide React (line icons)
- **Markdown:** react-markdown with syntax highlighting
- **Code Highlighting:** Prism.js or highlight.js

### State Management
- React Context or Zustand for global state
- Local storage for:
  - Chat history
  - Selected model
  - User preferences

### API Integration
- Ollama REST API (`/api/generate`, `/api/chat`, `/api/tags`)
- Fetch API with streaming support
- Error handling and retry logic

---

## File Structure

```
ollama-webui/
├── src/
│   ├── components/
│   │   ├── ChatContainer.jsx
│   │   ├── MessageBubble.jsx
│   │   ├── ChatInput.jsx
│   │   ├── ModelSelector.jsx
│   │   ├── Header.jsx
│   │   └── EmptyState.jsx
│   ├── hooks/
│   │   ├── useOllama.js
│   │   ├── useChat.js
│   │   └── useLocalStorage.js
│   ├── utils/
│   │   ├── ollamaApi.js
│   │   └── formatters.js
│   ├── styles/
│   │   ├── globals.css
│   │   └── glassmorphism.css
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── rodytech-logo.svg
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## Component Specs

### ChatContainer
- Full-height scrollable area
- Glassmorphic background with charcoal base
- Messages displayed in chronological order
- Auto-scroll behavior
- Empty state when no messages

### MessageBubble
- User messages: Right-aligned, electric blue accent
- AI messages: Left-aligned, deep gray glass effect
- Rounded corners (16px)
- Markdown rendering
- Code blocks with syntax highlighting
- Copy button on hover
- Subtle entry animation

### ChatInput
- Fixed bottom position
- Glassmorphic text area
- Auto-resize as user types (max 5 rows)
- Send button with electric blue glow
- Disabled state during generation
- Stop generation button when streaming

### ModelSelector
- Dropdown or modal overlay
- List available Ollama models
- Show currently selected model
- Glassmorphic styling
- Search/filter if many models
- Loading state while fetching models

### Header
- RodyTech logo (optional)
- Current model badge
- Clear chat button
- Settings icon (future expansion)
- Glass effect with blur

---

## API Integration

### Ollama Endpoints

**List Models:**
```javascript
GET http://192.168.50.53:11434/api/tags
```

**Generate Response (Streaming):**
```javascript
POST http://192.168.50.53:11434/api/generate
{
  "model": "llama2",
  "prompt": "Hello",
  "stream": true
}
```

**Chat API (Conversation):**
```javascript
POST http://192.168.50.53:11434/api/chat
{
  "model": "llama2",
  "messages": [
    {"role": "user", "content": "Hello"}
  ],
  "stream": true
}
```

### Response Handling
- Parse NDJSON streaming responses
- Update UI incrementally
- Handle connection errors gracefully
- Show error messages in chat

---

## UX Flow

1. **Landing:** Empty state with welcoming message and model selector
2. **Model Selection:** User picks model from dropdown (default to first available)
3. **Chat:** User types message, hits send or Enter
4. **Streaming:** AI response appears word by word with typing indicator
5. **Interaction:** User can copy messages, clear history, switch models
6. **Error Handling:** Connection issues show inline error with retry option

---

## Future Enhancements

- System prompts/instructions
- Temperature and parameter controls
- Export chat history
- Dark/light mode toggle (currently dark only)
- Multi-chat sessions
- File upload support (if Ollama supports it)
- Voice input
- Keyboard shortcuts
- Custom themes

---

## Development Notes

### Setup
```bash
npm create vite@latest ollama-webui -- --template react
cd ollama-webui
npm install
npm install react-markdown lucide-react zustand
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Environment
No `.env` needed since Ollama URL is hardcoded. Consider making it configurable later.

### Testing
- Test with multiple Ollama models
- Verify streaming works correctly
- Test on different screen sizes
- Check error states (Ollama offline, network issues)
- Validate markdown and code rendering

### Performance
- Virtualize message list if conversations get very long
- Debounce input events
- Lazy load markdown parser
- Optimize glassmorphism effects (can be GPU-intensive)

---

## Branding

**RodyTech Identity:**
- Logo placement: Top left or center of header
- Tagline: "Automation. Ownership. Simplicity." (footer or about)
- Focus on clean, professional aesthetic
- Emphasize ownership (local LLM = full control)

**Design Principles:**
- Futuristic minimalism
- Generous white space
- Smooth interactions
- Clear visual hierarchy
- No clutter

---

## Success Metrics

- Fast response time (< 500ms to first token)
- Smooth 60fps animations
- Zero layout shifts during streaming
- Works on 3+ screen sizes
- Intuitive first-time use (no tutorial needed)

---

**RodyTech® | Automation. Ownership. Simplicity.**
