//Will eventually move stuff out of App js to here when routing everything
import './App.css';
import React, { useState, useEffect } from 'react';
import InputLetter from './InputLetter';
import DisplayWord from './DisplayWord';
import { Button, Card, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation } from 'react-router-dom';
import loginServices from './services/loginServices';

function isLetter(char) {
  return /^[A-Za-z]$/.test(char);
}

function isSpecialChar(char) {
  return !isLetter(char);
}


function Game() {

  const [userName, setUserName] = useState("");
  // const [gameUrl, setGameUrl] = useState(""); 
  const [gameOngoing, setGameOngoing] = useState(false)
  const [gameAnswer, setGameAnswer] = useState("");
  const [charsGuessed, setCharsGuessed] = useState(new Set());
  const [unrevealedLetters, setUnrevealedLetters] = useState(new Set());
  const [lives, setLives] = useState(0);
  const [msg, setMsg] = useState("");
  const [showGame, setShowGame] = useState(false);
  const [answer, setAnswer] = useState('');
  const [points, setPoints] = useState(0);

  const location = useLocation();
  const wordsList = location.state?.wordList;

  // For login to the game
  //
  useEffect(() => {
    const storedName = localStorage.getItem("loggedInUser");
    if (storedName) {
      setUserName(storedName);
    }
    loginServices.checkUser(storedName)
      .then((response) => {
        setPoints(response.data.user.score);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (userName) {
      localStorage.setItem("loggedInUser", userName);
    }
  }, [userName]);

  function newGame(newAnswer) {
    const answer = newAnswer.toUpperCase();
    setGameAnswer(answer);
    setUnrevealedLetters(new Set(new Array(...answer).filter(char => isLetter(char))));
    setCharsGuessed(new Set());
    setLives(5);
    setMsg("");
    setGameOngoing(true);
  }

  function onGuessSubmitted(guessedChar) {
    if (unrevealedLetters.has(guessedChar)) {
      let newSet = new Set(unrevealedLetters);
      newSet.delete(guessedChar);
      setUnrevealedLetters(newSet);

      if (newSet.size <= 0) {
        setMsg("You won!");
        setGameOngoing(false);
        setPoints(points + 1);
        handleSavePoints();
      }
    }
    else {
      const p = lives - 1;
      setLives(p);
      if (p <= 0) {
        setMsg("You lost. The answer was: " + answer);
        setGameOngoing(false);
      }
    }

    let newCharsGuessed = new Set(charsGuessed);
    newCharsGuessed.add(guessedChar);
    setCharsGuessed(newCharsGuessed);
  }

  function newGameButtonClicked() {
    var randomWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    newGame(randomWord);
    setShowGame(true);
    setAnswer(randomWord);
    console.log(randomWord);
  }

  const handleSavePoints = () => {
    var data = {
      "userDetails": {
        "username": userName,
        "score": points + 1
      }
    }
    loginServices.addUser(data)
      .catch((err) => { console.log(err); });
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card sx={{ width: "40vw", height: "50vh", background: "rgba(255, 255, 255, 0.9)", borderRadius: 5 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton sx={{ marginLeft: 2 }}>
            <ArrowBackIcon sx={{ color: "#4abd46" }} onClick={() => window.location.href = "/"} />
          </IconButton>
          <h1 style={{ textAlign: "center", flex: "1" }}>{userName} your current score is: {points}</h1>
        </div>
        <div style={{ marginTop: "50px" }}>
          <DisplayWord answer={gameAnswer} unrevealedLetters={unrevealedLetters} isSpecialChar={isSpecialChar} isGameFinished={!gameOngoing} />
        </div>
        <div>
          <h2>Guessed Letters:</h2>
          <div className="guessed-letters">
            {new Array(charsGuessed).map((letter) => {
              return (<div className="guessed-letter">{letter}</div>);
            })}
          </div>
          <div>
            Lives: {lives}
          </div>
          {gameOngoing ?
            (<InputLetter isValidLetter={isLetter} guessedLetters={charsGuessed} onGuessSubmitted={onGuessSubmitted} />)
            :
            (<Button variant="contained" sx={{ ml: 2, height: 56, width: 200, background: "#4abd46", ":hover": { background: "#368a33" } }} onClick={newGameButtonClicked}>New Game</Button>)}
        </div>
        <div className="msg">
          {msg && (<div>{msg}</div>)}
        </div>
      </Card>
    </div>

  );
}

export default Game;