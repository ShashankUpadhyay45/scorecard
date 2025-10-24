// server/index.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

// Fix __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ============================================================
   🔐 CONFIGURATION
============================================================ */
const CRICKET_TOKEN = process.env.CRICKET_TOKEN || "";
const CRICKET_BASE = "https://api.entitysport.com/v2";

const GAMES_API_KEY = process.env.GAMES_API_KEY || "";
const GAMES_BASE = "https://v1.api-sports.io";

const FOOTBALL_API_KEY = process.env.FOOTBALL_API_KEY || "";
const FOOTBALL_BASE = "https://v3.football.api-sports.io";

const FRONTEND_URL = process.env.FRONTEND_URL || "https://playpulse.onrender.com";

/* ============================================================
   🌐 MIDDLEWARES
============================================================ */
const allowedOrigins = [
  "http://localhost:3001",
  FRONTEND_URL,
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

/* ============================================================
   🏠 BASIC ROUTE
============================================================ */
app.get("/api", (req, res) => {
  res.json({ status: "OK", message: "PlayPulse full-stack server 🎯" });
});

/* ============================================================
   🏏 CRICKET ROUTES
============================================================ */
app.get("/api/cricket/live-matches", async (req, res) => {
  if (!CRICKET_TOKEN)
    return res.status(400).json({ error: "Cricket API key not set" });
  try {
    const r = await fetch(`${CRICKET_BASE}/cricket/live?token=${CRICKET_TOKEN}`);
    const data = await r.json();
    res.json(data);
  } catch (e) {
    console.error("Cricket live error:", e.message || e);
    res.status(500).json({ error: "Failed to fetch cricket live matches" });
  }
});

app.get("/api/cricket/past-matches", async (req, res) => {
  if (!CRICKET_TOKEN)
    return res.status(400).json({ error: "Cricket API key not set" });
  try {
    const r = await fetch(`${CRICKET_BASE}/cricket/matches?token=${CRICKET_TOKEN}`);
    const data = await r.json();
    res.json(data);
  } catch (e) {
    console.error("Cricket past error:", e.message || e);
    res.status(500).json({ error: "Failed to fetch cricket past matches" });
  }
});

/* ============================================================
   🎮 GAMES ROUTE
============================================================ */
app.get("/api/games/all", async (req, res) => {
  if (!GAMES_API_KEY)
    return res.status(400).json({ error: "Games API key not set" });
  try {
    const r = await fetch(`${GAMES_BASE}/sports`, {
      headers: { "x-apisports-key": GAMES_API_KEY },
    });
    const data = await r.json();
    res.json(data);
  } catch (e) {
    console.error("Games API error:", e.message || e);
    res.status(500).json({ error: "Failed to fetch general game data" });
  }
});

/* ============================================================
   ⚽ FOOTBALL ROUTE (optional)
============================================================ */
if (FOOTBALL_API_KEY) {
  app.get("/api/football/leagues", async (req, res) => {
    try {
      const r = await fetch(`${FOOTBALL_BASE}/leagues`, {
        headers: { "x-apisports-key": FOOTBALL_API_KEY },
      });
      const data = await r.json();
      res.json(data);
    } catch (e) {
      console.error("Football error:", e.message || e);
      res.status(500).json({ error: "Failed to fetch football data" });
    }
  });
} else {
  console.log("⚽ Football API disabled — FOOTBALL_API_KEY not set");
}

/* ============================================================
   🧱 SERVE REACT FRONTEND (client/build)
============================================================ */
const clientBuildPath = path.join(__dirname, "../client/build");
app.use(express.static(clientBuildPath));

// 🎯 Catch-all route for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

/* ============================================================
   🚀 START SERVER (local or Render)
============================================================ */
const startServer = (port = parseInt(process.env.PORT || "4000", 10)) => {
  const server = app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
  });
  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`⚠️ Port ${port} in use, trying ${port + 1}`);
      startServer(port + 1);
    } else {
      console.error(err);
    }
  });
};

startServer();
