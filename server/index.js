// server/index.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

// Setup for ES modules (__dirname replacement)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const DEFAULT_PORT = 4000;
const PORT = process.env.PORT || DEFAULT_PORT;

const API_KEY = "b60b0896-eb94-4247-b5d7-d2385869257f";
const API_URL = "https://api.cricapi.com/v1";

// 🏏 Live Matches API
app.get("/live-matches", async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/currentMatches?apikey=${API_KEY}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching live matches:", err);
    res.status(500).json({ error: "Failed to fetch live matches" });
  }
});

// 🕒 Past Matches API
app.get("/past-matches", async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/matches?apikey=${API_KEY}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching past matches:", err);
    res.status(500).json({ error: "Failed to fetch past matches" });
  }
});

// 🧠 Serve React Build (for Render or production)
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// ✅ Start server
const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`⚠️ Port ${port} in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error("❌ Server error:", err);
    }
  });
};

startServer(PORT);
