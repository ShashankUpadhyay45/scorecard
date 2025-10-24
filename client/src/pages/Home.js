// client/src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";

const topGames = [
  { id: "cricket", name: "Cricket" },
  { id: "football", name: "Football" },
  { id: "basketball", name: "Basketball" },
  { id: "tennis", name: "Tennis" },
  { id: "volleyball", name: "Volleyball" },
  { id: "baseball", name: "Baseball" },
  { id: "hockey", name: "Hockey" },
  { id: "rugby", name: "Rugby" },
  { id: "badminton", name: "Badminton" },
  { id: "table-tennis", name: "Table Tennis" },
];

export default function Home() {
  return (
    <section className="home">
      <h1>Welcome to Sports Scorecard</h1>
      <p className="subtitle">Select a game below to view live or recent matches</p>

      <div className="game-grid">
        {topGames.map((g) => (
          <Link to={`/game/${g.id}`} className="game-card" key={g.id}>
            {g.name}
          </Link>
        ))}
      </div>

      <h2 style={{ marginTop: 48 }}>Other games</h2>
      <p className="muted">Mini-games and smaller sports are available in the Games tab.</p>
    </section>
  );
}
