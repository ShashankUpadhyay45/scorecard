import React, { useEffect, useState } from "react";

function App() {
  const [liveMatches, setLiveMatches] = useState([]);
  const [pastMatches, setPastMatches] = useState([]);
  const [games, setGames] = useState([]);

  const BACKEND_URL = "https://scorecard-i0cq.onrender.com"; // your Render backend

  useEffect(() => {
    // 🏏 Cricket Live Matches
    fetch(`${BACKEND_URL}/cricket/live-matches`)
      .then(res => res.json())
      .then(data => setLiveMatches(data.response?.items || []))
      .catch(err => console.error("Cricket live fetch error:", err));

    // 🏏 Cricket Past Matches
    fetch(`${BACKEND_URL}/cricket/past-matches`)
      .then(res => res.json())
      .then(data => setPastMatches(data.response?.items || []))
      .catch(err => console.error("Cricket past fetch error:", err));

    // 🎮 All Games
    fetch(`${BACKEND_URL}/games/all`)
      .then(res => res.json())
      .then(data => setGames(data.response || []))
      .catch(err => console.error("Games API error:", err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🏏🎮 Multi-Sport Live Scoreboard</h1>

      <section>
        <h2>🏏 Live Cricket Matches</h2>
        {liveMatches.length ? (
          liveMatches.map((m, i) => (
            <p key={i}>{m.competition?.title || m.title}</p>
          ))
        ) : (
          <p>No live matches right now.</p>
        )}
      </section>

      <section>
        <h2>🏏 Recently Played Matches</h2>
        {pastMatches.length ? (
          pastMatches.map((m, i) => (
            <p key={i}>{m.competition?.title || m.title}</p>
          ))
        ) : (
          <p>No past matches found.</p>
        )}
      </section>

      <section>
        <h2>🎮 Other Games</h2>
        {games.length ? (
          games.map((g, i) => <p key={i}>{g.name}</p>)
        ) : (
          <p>No game data loaded yet.</p>
        )}
      </section>
    </div>
  );
}

export default App;
