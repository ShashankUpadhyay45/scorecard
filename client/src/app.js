import React, { useEffect, useState } from "react";

// ✅ Backend URL (Render or local)
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

function App() {
  const [liveMatches, setLiveMatches] = useState([]);
  const [pastMatches, setPastMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch live matches from backend
        const liveRes = await fetch(`${API_URL}/live-matches`);
        const liveData = await liveRes.json();

        // Fetch past matches from backend
        const pastRes = await fetch(`${API_URL}/past-matches`);
        const pastData = await pastRes.json();

        setLiveMatches(liveData.data || []);
        setPastMatches(pastData.data || []);
      } catch (err) {
        console.error("Error fetching matches:", err);
        setError("Failed to load match data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading matches...</h2>;
  if (error) return <h2 style={{ textAlign: "center", marginTop: "50px", color: "red" }}>{error}</h2>;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>🏏 Live Cricket Scoreboard</h1>

      {/* LIVE MATCHES */}
      <section>
        <h2>Live Matches</h2>
        {liveMatches.length > 0 ? (
          liveMatches.map((match, index) => (
            <div key={index} style={cardStyle}>
              <h3>{match.name}</h3>
              <p><strong>Status:</strong> {match.status}</p>
              {match.score && match.score.length > 0 && (
                <p>
                  <strong>Score:</strong>{" "}
                  {match.score.map((s) => `${s.r}/${s.w} (${s.o} ov)`).join(" | ")}
                </p>
              )}
              <p><strong>Venue:</strong> {match.venue}</p>
            </div>
          ))
        ) : (
          <p>No live matches currently available.</p>
        )}
      </section>

      {/* PAST MATCHES */}
      <section style={{ marginTop: "40px" }}>
        <h2>Recently Played Matches</h2>
        {pastMatches.length > 0 ? (
          pastMatches.map((match, index) => (
            <div key={index} style={cardStyle}>
              <h3>{match.name}</h3>
              <p><strong>Status:</strong> {match.status}</p>
              <p><strong>Winner:</strong> {match.winner_team || "N/A"}</p>
              <p><strong>Venue:</strong> {match.venue}</p>
              <p><strong>Date:</strong> {match.date || match.dateTimeGMT}</p>
            </div>
          ))
        ) : (
          <p>No past matches found.</p>
        )}
      </section>
    </div>
  );
}

// Simple card design
const cardStyle = {
  border: "1px solid #ccc",
  padding: "15px",
  marginBottom: "10px",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

export default App;
