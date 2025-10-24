// client/src/components/Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo.png";
import { FaBars } from "react-icons/fa";

export default function Navbar({ dark, setDark }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleExit = () => {
    if (window.confirm("Exit the app? This will attempt to close the window.")) {
      window.close();
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <header className="navbar">
      <div className="brand">
        <img src={logo} alt="PlayPulse logo" className="logo" />
        <div className="brand-text">PlayPulse</div>
      </div>

      <nav className="navlinks">
        <Link to="/">Home</Link>
        <Link to="/game/cricket">Games</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <div className="menu">
        <button className="menu-btn" onClick={() => setOpen((v) => !v)} aria-label="menu">
          <FaBars />
        </button>

        {open && (
          <div className="menu-pop">
            <button onClick={() => { navigate("/"); setOpen(false); }}>🏠 Home</button>
            <button
              onClick={() => {
                setDark((d) => !d);
                setOpen(false);
              }}
            >
              {dark ? "🌙 Dark Mode" : "🌞 Light Mode"}
            </button>
            <button onClick={() => { navigate("/contact"); setOpen(false); }}>✉ Contact</button>
            <button onClick={handleBack}>↩ Back</button>
            <button onClick={handleExit}>⏻ Exit</button>
          </div>
        )}
      </div>
    </header>
  );
}
