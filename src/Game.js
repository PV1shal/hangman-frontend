//Will eventually move stuff out of App js to here when routing everything
import './App.css';
import React, { useState, useEffect } from 'react';
import InputLetter from './InputLetter';
import DisplayWord from './DisplayWord';

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

  // For login to the game
  //
  useEffect(() => {
    const storedName = localStorage.getItem("loggedInUser");
      if (storedName) {
      setUserName(storedName);
     }
  }, []);

   useEffect(() => {
     if (userName) {
       localStorage.setItem("loggedInUser", userName);
     }
   }, [userName]);
  
  // To read the game state from the URL query parameter
  // useEffect(() => {
  //   const queryParams = new URLSearchParams(window.location.search);
  //   const gameId = queryParams.get("gameId");
  //   const answer = queryParams.get("answer");
  //   const guessedLetters = queryParams.get("charsGuessed");
  //   const numLives = queryParams.get("lives");
  //   if (gameId && answer) {
  //     setGameAnswer(answer);
  //     setUnrevealedLetters(new Set(new Array(...answer).filter(char => isLetter(char))));
  //     setCharsGuessed(new Set(guessedLetters ? guessedLetters.split("") : []));
  //     setLives(numLives ? parseInt(numLives) : 0);
  //     setGameOngoing(true);
  //   }
  // }, []);

    function newGame(newAnswer) {
      const answer = newAnswer.toUpperCase();
      setGameAnswer(answer);
      setUnrevealedLetters(new Set(new Array(...answer).filter(char => isLetter(char))));
      setCharsGuessed(new Set());
      setLives(5);
      setMsg("");
      setGameOngoing(true);

      // To generate a unique game ID
      // const gameId = Math.random().toString(36).substr(2, 9);
      // // Update the URL query parameter with the game ID and game state
      // const queryParams = new URLSearchParams(window.location.search);
      // queryParams.set("gameId", gameId);
      // queryParams.set("answer", answer);
      // queryParams.set("charsGuessed", "");
      // queryParams.set("lives", "5");
      // window.history.replaceState({}, "", "?" + queryParams.toString());
      // // Update the game URL state variable with the generated URL
      // setGameUrl(window.location.href);
    }

  function onGuessSubmitted(guessedChar) {
    if(unrevealedLetters.has(guessedChar)) {
      let newSet = new Set(unrevealedLetters);
      newSet.delete(guessedChar);
      setUnrevealedLetters(newSet);
 
      if(newSet.size <= 0) {
        setMsg("You won!");
        setGameOngoing(false); 
      }
    }
    else {
      const p = lives - 1;
      setLives(p);
      if(p <= 0) {
        setMsg("You lost.");
        setGameOngoing(false);
      }
    }

    let newCharsGuessed = new Set(charsGuessed);
    newCharsGuessed.add(guessedChar);
    setCharsGuessed(newCharsGuessed);
  }

  function newGameButtonClicked() {
    const newAnswer = "popcorn"; //this is where you set the word for the game
    newGame(newAnswer);
  //   const gameId = Math.random().toString(36).substr(2, 9); // to generate a random game ID
  //   setGameUrl(`${window.location.href}?game=${gameId}`); // to update the gameUrl with the new game ID
  }

  // For the share game button
  // function shareGame() {
  //   const queryParams = new URLSearchParams({
  //     word: gameAnswer,
  //     guessedLetters: Array.from(charsGuessed).join(""),
  //     lives: lives
  //   });
  //   const url = `${window.location.href.split("?")[0]}?${queryParams.toString()}`;
  //   navigator.clipboard.writeText(url);
  //   alert("Game URL copied to clipboard!");
  // }

  // For Logout
  const SignOut = () => {
    // Remove the game ID from the URL query parameter
    // const urlParams = new URLSearchParams(window.location.search);
    // urlParams.delete("gameId");
    // const newUrl = window.location.pathname + "?" + urlParams.toString();
    // window.history.replaceState(null, "", newUrl);

    localStorage.removeItem("loggedInUser");
    window.location.href = "/";
  };

  return (
    <div className="App">
      <DisplayWord answer={gameAnswer} unrevealedLetters={unrevealedLetters} isSpecialChar={isSpecialChar} isGameFinished={!gameOngoing}/>
      <div>
        <button className="logout" title="logout" onClick={() => SignOut()}>Logout</button>
        {/* <button onClick={shareGame}>Share Game</button> */}
      </div>
      <div>
        <h2>Guessed Letters:</h2>
        <div className="guessed-letters">
          {new Array(charsGuessed).map((letter) => {
            return(<div className="guessed-letter">{letter}</div>);
          })}
        </div>
        <div>
          Lives: {lives}
        </div>
        {gameOngoing ? 
        (<InputLetter isValidLetter={isLetter} guessedLetters={charsGuessed} onGuessSubmitted={onGuessSubmitted}/>)
        :
        (<button onClick={newGameButtonClicked}>New Game</button>)}
      </div>
      <div className="msg">
                {msg && ( <div>{msg}</div>)}
            </div>
    </div>
      
  );
}

export default Game;