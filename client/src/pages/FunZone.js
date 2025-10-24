import React from "react";
import { Link } from "react-router-dom";

function FunZone() {
  return (
    <div className="funzone">
      <h2>🎮 Welcome to the PlayPulse Fun Zone</h2>
      <p>Take a break! Try one of these mini-games below 👇</p>

      <div className="game-buttons">
        <Link to="/funzone/tictactoe" className="btn">Tic Tac Toe</Link>
        <Link to="/funzone/memory" className="btn">Memory Match</Link>
        <Link to="/funzone/snake" className="btn">Snake Game</Link>
      </div>
    </div>
  );
}

export default FunZone;
