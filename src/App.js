import './App.css';
import React, { useState } from 'react';
import InputLetter from './InputLetter';
import DisplayWord from './DisplayWord';

function isLetter(char) {
  return /^[A-Za-z]$/.test(char);
}

function isSpecialChar(char) {
  return !isLetter(char);
}


function App() {

  const [gameOngoing, setGameOngoing] = useState(false)
  const [gameAnswer, setGameAnswer] = useState("");
  const [charsGuessed, setCharsGuessed] = useState(new Set());
  const [unrevealedLetters, setUnrevealedLetters] = useState(new Set());
  const [lives, setLives] = useState(0);
  const [msg, setMsg] = useState("");

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
  }

  return (
    <div className="App">
      <DisplayWord answer={gameAnswer} unrevealedLetters={unrevealedLetters} isSpecialChar={isSpecialChar} isGameFinished={!gameOngoing}/>
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

export default App;