import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const OLLAMA_URL = 'http://192.168.50.53:11434';

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Proxy all /api requests to Ollama
app.all('/api/*', async (req, res) => {
  const path = req.url;
  const url = `${OLLAMA_URL}${path}`;

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    // For streaming responses
    if (req.body?.stream) {
      res.setHeader('Content-Type', 'application/x-ndjson');
      response.body.pipe(res);
    } else {
      const data = await response.json();
      res.json(data);
    }
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
