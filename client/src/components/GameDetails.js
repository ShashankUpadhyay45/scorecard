import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function GameDetails() {
  const { sport } = useParams();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMatches() {
      try {
        let res;
        if (sport === "cricket") {
          res = await fetch("http://localhost:4000/cricket/live-matches");
        } else {
          res = await fetch("http://localhost:4000/games/all");
        }
        const data = await res.json();
        setMatches(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMatches();
  }, [sport]);

  return (
    <div className="game-details">
      <h2>{sport.toUpperCase()} Matches</h2>
      {loading ? (
        <p>Loading {sport} matches...</p>
      ) : matches.length > 0 ? (
        <div className="match-grid">
          {matches.map((match, i) => (
            <div key={i} className="match-card">
              <h3>{match.title || match.name || "Unknown Match"}</h3>
              <p>📅 {match.date || "N/A"}</p>
              <p>🏟️ {match.venue || "No Venue Info"}</p>
              <p>🕒 {match.status || "Unknown"}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No {sport} matches found.</p>
      )}
    </div>
  );
}

export default GameDetails;
