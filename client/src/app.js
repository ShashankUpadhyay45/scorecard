// client/src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";
import Game from "./pages/Game";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  const [dark, setDark] = useState(false);
  return (
    <div className={dark ? "app dark" : "app"}>
      <Router>
        <SplashScreen />
        <Navbar dark={dark} setDark={setDark} />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game/:id" element={<Game />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <footer className="footer">© 2025 PlayPulse. All rights reserved.</footer>
      </Router>
    </div>
  );
}
