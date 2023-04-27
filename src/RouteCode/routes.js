// To be moved to App.js when the game has been moved
import React from "react";
import Hangman from "../App";
import LoginPage from "../Components/LoginPage";
import { Routes, Route } from "react-router-dom";

function Routes() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/hangman" element={<Hangman />} />
        </Routes>
    </div>
  );
}

export default Routes;