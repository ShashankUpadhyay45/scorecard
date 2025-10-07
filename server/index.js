const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const API_KEY = 'b60b0896-eb94-4247-b5d7-d2385869257f';
const API_URL = 'https://api.cricapi.com/v1';

app.get('/live-matches', async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/currentMatches?apikey=${API_KEY}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error fetching live matches:', err);
    res.status(500).json({ error: 'Failed to fetch live matches' });
  }
});

app.get('/past-matches', async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/matches?apikey=${API_KEY}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error fetching past matches:', err);
    res.status(500).json({ error: 'Failed to fetch past matches' });
  }
});

app.get('/', (req, res) => {
  res.send('🏏 Cricket Score API is running...');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
