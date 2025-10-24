import React from "react";
import "./GameCard.css";

export default function GameCard({ data, type }) {
  return (
    <div className="game-card">
      <h4>{type}</h4>
      <p>
        <strong>
          {data?.team1 || data?.teams?.home?.name || "Team A"} vs{" "}
          {data?.team2 || data?.teams?.away?.name || "Team B"}
        </strong>
      </p>
      <p>Status: {data?.status || "Live / Upcoming"}</p>
      <p>
        {data?.venue?.name ? `Venue: ${data.venue.name}` : "Venue info not available"}
      </p>
    </div>
  );
}
