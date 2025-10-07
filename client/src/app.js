import React, { useEffect, useState } from 'react';

const SERVER_URL = 'http://localhost:4000';

function App() {
  const [oldMatches, setOldMatches] = useState([]);
  const [liveScore, setLiveScore] = useState(null);

  useEffect(() => {
    // Fetch old matches on load
    fetch(`${SERVER_URL}/old-matches`)
      .then((res) => res.json())
      .then(setOldMatches)
      .catch(console.error);

    // Connect to live score SSE
    const eventSource = new EventSource(`${SERVER_URL}/live-score`);
    eventSource.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setLiveScore(data);
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div style={{ fontFamily: 'Arial', padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h1>🏏 Scorecard Display</h1>

      <section>
        <h2>Live Match</h2>
        {liveScore ? (
          <div style={{ border: '1px solid #333', padding: 10, borderRadius: 5 }}>
            <p><strong>Teams:</strong> {liveScore.teams}</p>
            <p><strong>Score:</strong> {liveScore.score}</p>
            <p><strong>Overs:</strong> {liveScore.overs}</p>
          </div>
        ) : (
          <p>Loading live score...</p>
        )}
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Old Matches</h2>
        {oldMatches.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {oldMatches.map((match) => (
              <li key={match.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                <p><strong>{match.teams}</strong></p>
                <p>Score: {match.score}</p>
                <p>Date: {match.date}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading old matches...</p>
        )}
      </section>
    </div>
  );
}

export default App;
