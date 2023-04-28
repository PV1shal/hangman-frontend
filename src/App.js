import React from "react";
import { Routes, Route } from "react-router-dom";
import Game from "./Game";
import LoginPage from "./components/LoginPage.js";
import HomePage from "./components/HomePage.js";
import { Button } from '@mui/material';

function App() {

  // For Logout
  const SignOut = () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/";
  };

  return (
    <div className="App">
      {(localStorage.getItem("loggedInUser") !== null) &&
        <div>
          <Button variant="contained" sx={{ height: 56, width: 200, background: "#4abd46", ":hover": { background: "#368a33" }, marginTop: 2 }} onClick={SignOut}>Sign Out</Button>
        </div>
      }
      <div class="slider-thumb"></div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;