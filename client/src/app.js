import React, { useEffect, useState } from "react";
import "./App.css";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [liveMatches, setLiveMatches] = useState([]);
  const [pastMatches, setPastMatches] = useState([]);

  // 🏏 Fetch live matches
  useEffect(() => {
    fetch(`${API_URL}/live-matches`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Live Matches:", data);
        setLiveMatches(data.data || []);
      })
      .catch((err) => console.error("Error fetching live matches:", err));
  }, []);

  // 🕒 Fetch past matches
  useEffect(() => {
    fetch(`${API_URL}/past-matches`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Past Matches:", data);
        setPastMatches(data.data || []);
      })
      .catch((err) => console.error("Error fetching past matches:", err));
  }, []);

  return (
    <div className="App">
      <h1>🏏 Live Cricket Scoreboard</h1>

      <section>
        <h2>Live
