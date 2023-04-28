import React from "react";
import { Routes, Route } from "react-router-dom";
import Game from "./Game";
import LoginPage from "./components/LoginPage.js";
import HomePage from "./components/HomePage.js";
import { Button } from '@mui/material';
import Leaderboard from "./components/LeaderBoard";

function App() {

  return (
    <div className="App">
      <div class="slider-thumb"></div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;