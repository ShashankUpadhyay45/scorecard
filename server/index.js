// server/index.js
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

// 🟢 Default port (auto-retry if occupied)
const DEFAULT_PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

// 🏏 CRICKET API (EntitySport free token)
const CRICKET_TOKEN = "ec471071441bb2ac538a0ff901abd249";
const CRICKET_BASE = "https://api.entitysport.com/v2";

// 🎮 MULTI-GAME API (your working key)
const GAMES_API_KEY = "8decd43e2cdfa5220bb80ee23b434382";
const GAMES_BASE = "https://v1.api-sports.io";

// ⚽ FOOTBALL API (optional)
const FOOTBALL_API_KEY = process.env.FOOTBALL_API_KEY || null;
const FOOTBALL_BASE = "https://v3.football.api-sports.io";

/* ---------------------- 🏏 Cricket Routes ---------------------- */

app.get("/cricket/past-matches", async (req, res) => {
  try {
    const response = await fetch(`${CRICKET_BASE}/cricket/matches?token=${CRICKET_TOKEN}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("❌ Cricket past matches error:", err);
    res.status(500).json({ error: "Failed to fetch cricket past matches" });
  }
});

app.get("/cricket/live-matches", async (req, res) => {
  try {
    const response = await fetch(`${CRICKET_BASE}/cricket/live?token=${CRICKET_TOKEN}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("❌ Cricket live matches error:", err);
    res.status(500).json({ error: "Failed to fetch cricket live matches" });
  }
});

/* ---------------------- 🎮 Multi-Game Routes ---------------------- */

app.get("/games/all", async (req, res) => {
  try {
    const response = await fetch(`${GAMES_BASE}/sports`, {
      headers: { "x-apisports-key": GAMES_API_KEY },
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("❌ Games API error:", err);
    res.status(500).json({ error: "Failed to fetch general game data" });
  }
});

/* ---------------------- ⚽ Football Routes (optional) ---------------------- */

if (FOOTBALL_API_KEY) {
  app.get("/football/leagues", async (req, res) => {
    try {
      const response = await fetch(`${FOOTBALL_BASE}/leagues`, {
        headers: { "x-apisports-key": FOOTBALL_API_KEY },
      });
      const data = await response.json();
      res.json(data);
    } catch (err) {
      console.error("❌ Football leagues error:", err);
      res.status(500).json({ error: "Failed to fetch football data" });
    }
  });
} else {
  console.log("⚽ Football API disabled — no API key set.");
}

/* ---------------------- ✅ Root ---------------------- */
app.get("/", (req, res) => {
  res.send("🏏🎮 Multi-Sport Score API is running successfully!");
});

/* ---------------------- 🚀 Auto Port Handler ---------------------- */
function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`✅ Server is running at: http://localhost:${port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`⚠️ Port ${port} in use — trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error("❌ Server startup error:", err);
    }
  });
}

startServer(DEFAULT_PORT);
