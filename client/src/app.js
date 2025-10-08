import React, { useEffect, useState } from "react";

function App() {
  const [liveMatches, setLiveMatches] = useState([]);
  const [pastMatches, setPastMatches] = useState([]);
  const [games, setGames] = useState([]);
  const [footballLeagues, setFootballLeagues] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🌐 Your deployed backend URL on Render
  const BACKEND_URL = "https://scorecard-i0cq.onrender.com";

  useEffect(() => {
    async function fetchAll() {
      try {
        // 🏏 Cricket: Live Matches
        const liveRes = await fetch(`${BACKEND_URL}/cricket/live-matches`);
        const liveData = await liveRes.json();
        setLiveMatches(liveData.response?.items || []);

        // 🏏 Cricket: Past Matches
        const pastRes = await fetch(`${BACKEND_URL}/cricket/past-matches`);
        const pastData = await pastRes.json();
        setPastMatches(pastData.response?.items || []);

        // 🎮 All Games
        const gamesRes = await fetch(`${BACKEND_URL}/games/all`);
        const gamesData = await gamesRes.json();
        setGames(gamesData.response || gamesData.sports || []);

        // ⚽ Football Leagues (only if backend has key)
        const footballRes = await fetch(`${BACKEND_URL}/football/leagues`);
        if (footballRes.ok) {
          const footballData = await footballRes.json();
          setFootballLeagues(footballData.response || footballData.league || []);
        }
      } catch (error) {
        console.error("❌ Error fetching sports data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading live sports data...</h2>;

  return (
    <div style={{ padding: "40px", fontFamily: "Segoe UI, Arial" }}>
      <h1 style={{ textAlign: "center", color: "#222" }}>🏏🎮 Multi-Sport Live Scoreboard</h1>
      <p style={{ textAlign: "center", color: "#666" }}>
        Real-time Cricket, Football & other sports updates
      </p>

      {/* 🏏 Live Cricket */}
      <section>
        <h2>🏏 Live Cricket Matches</h2>
        {liveMatches.length ? (
          <ul>
            {liveMatches.map((m, i) => (
              <li key={i}>
                <strong>{m.competition?.title || m.title}</strong> —{" "}
                {m.status_str || "Live"}
              </li>
            ))}
          </ul>
        ) : (
          <p>No live cricket matches currently available.</p>
        )}
      </section>

      {/* 🏏 Past Cricket */}
      <section>
        <h2>📅 Recently Played Matches</h2>
        {pastMatches.length ? (
          <ul>
            {pastMatches.map((m, i) => (
              <li key={i}>
                <strong>{m.competition?.title || m.title}</strong> —{" "}
                {m.status_str || "Completed"}
              </li>
            ))}
          </ul>
        ) : (
          <p>No past cricket matches found.</p>
        )}
      </section>

      {/* ⚽ Football Leagues */}
      <section>
        <h2>⚽ Football Leagues</h2>
        {footballLeagues.length ? (
          <ul>
            {footballLeagues.map((l, i) => (
              <li key={i}>{l.name || l.league?.name}</li>
            ))}
          </ul>
        ) : (
          <p>No football data available or API key disabled.</p>
        )}
      </section>

      {/* 🎮 Other Games */}
      <section>
        <h2>🎮 Available Games</h2>
        {games.length ? (
          <ul>
            {games.map((g, i) => (
              <li key={i}>{g.name || g.sport_name}</li>
            ))}
          </ul>
        ) : (
          <p>No games data loaded yet.</p>
        )}
      </section>

      <footer style={{ textAlign: "center", marginTop: "40px", color: "#888" }}>
        Data fetched from your Node.js API on Render 🚀
      </footer>
    </div>
  );
}

export default App;
