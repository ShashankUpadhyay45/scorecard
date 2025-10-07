// server/index.js

const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); // ✅ node-fetch fix for Node v18+

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Port Configuration
const DEFAULT_PORT = 4000;
const PORT = process.env.PORT || DEFAULT_PORT;

// ✅ CricketData API credentials
const API_KEY = 'b60b0896-eb94-4247-b5d7-d2385869257f';
const API_URL = 'https://api.cricapi.com/v1';

// 🏏 Fetch Live Matches
app.get('/live-matches', async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/currentMatches?apikey=${API_KEY}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('❌ Error fetching live matches:', err);
    res.status(500).json({ error: 'Failed to fetch live matches' });
  }
});

// 🕒 Fetch Recently Played Matches
app.get('/past-matches', async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/matches?apikey=${API_KEY}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('❌ Error fetching past matches:', err);
    res.status(500).json({ error: 'Failed to fetch past matches' });
  }
});

// 🧠 Root route for testing
app.get('/', (req, res) => {
  res.send('🏏 Cricket Score API is running successfully!');
});

// ✅ Smart Server Start (auto-handles "address already in use" errors)
const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️ Port ${port} is busy. Retrying on ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('❌ Server Error:', err);
    }
  });
};

// 🚀 Start server
startServer(PORT);
