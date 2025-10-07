// server/index.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 4000;

// Static old matches data
const oldMatches = [
  { id: 1, teams: 'Team A vs Team B', score: '250/8 vs 245/10', date: '2024-09-01' },
  { id: 2, teams: 'Team C vs Team D', score: '180/6 vs 182/5', date: '2024-08-28' },
];

// Endpoint for old matches
app.get('/old-matches', (req, res) => {
  res.json(oldMatches);
});

// Live match data (simulated)
let liveScore = {
  teams: 'Team X vs Team Y',
  score: '0/0 vs 0/0',
  overs: 0,
};

let intervalId = null;

// SSE endpoint for live scores
app.get('/live-score', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  // Send initial data
  res.write(`data: ${JSON.stringify(liveScore)}\n\n`);

  // Every 3 seconds, update score and send event
  intervalId = setInterval(() => {
    // Simulate score update
    let teamAScore = Math.min(250, Math.floor(Math.random() * 251));
    let teamBScore = Math.min(250, Math.floor(Math.random() * 251));
    let overs = Math.min(50, liveScore.overs + 1);

    liveScore = {
      teams: 'Team X vs Team Y',
      score: `${teamAScore}/8 vs ${teamBScore}/9`,
      overs,
    };

    res.write(`data: ${JSON.stringify(liveScore)}\n\n`);

    if (overs >= 50) {
      clearInterval(intervalId);
      res.end();
    }
  }, 3000);

  req.on('close', () => {
    clearInterval(intervalId);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
