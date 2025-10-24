// client/src/pages/Game.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Game() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // simple fetch wrapper to call server routes
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        let url = "/games/all";
        if (id === "cricket") url = "/cricket/live-matches";
        // other routing could be improved
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (e) {
        setData({ error: "Failed to fetch data" });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  return (
    <section className="game-details">
      <h1 style={{ textTransform: "capitalize" }}>{id}</h1>
      {loading && <p>Loading...</p>}
      {!loading && data && (
        <pre className="json-view">{JSON.stringify(data, null, 2)}</pre>
      )}
    </section>
  );
}
