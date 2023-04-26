import { useState } from "react";

/*
Notes:
    * The idea is to create a text input element so that when the user wants to guess a letter, they can select the input element and type in the desired letter using their keyboard. I thought that this would be preferable to creating an on-screen keyboard (similar to Wordle's interface) because:
        - Mobile users can use their existing keyboard
        - It would be (at least theoretically) easier to add support for other languages
        - The component should take up less screen space
*/

/*
Default function for the letterIsValid prop of the LetterInput component (please see below)
*/
function isLetter(letter) {
    const p = /^[A-Za-z]$/; 
    return p.test(letter);
}

function InputLetter({isValidLetter=isLetter, guessedLetters, onGuessSubmitted}) {
    const [inputLetter, setInputLetter] = useState('');
    const [canGuessLetter, setCanGuessLetter] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    function submitGuess(guess=inputLetter) {
        if(canGuessLetter) {
            setInputLetter('');
            setCanGuessLetter(false);
            onGuessSubmitted(guess);
        }   
    }

    function inputLetterChanged(newLetter) {
        if(!newLetter) { 
            setErrorMsg("");
            setCanGuessLetter(false);
        }
        else if(guessedLetters.has(newLetter)) {
            setErrorMsg("Already guessed that letter.");
            setCanGuessLetter(false);
        }   
        else if(!isValidLetter(newLetter)) {
            setErrorMsg("Invalid letter.");
            setCanGuessLetter(false);
        }
        else {
            setErrorMsg("");
            setCanGuessLetter(true);
        }
    }

    return(
        <div className="letter-input">
            <form onSubmit={(e) => {
                e.preventDefault();
                submitGuess()}}>
            <label>
                Guess a letter:
                <input type="text" value={inputLetter} maxLength={1}
                className="input-text"
                onChange={(e) => {
                    const newLetter = e.target.value.toUpperCase();
                    if(isLetter(newLetter)) {
                        setInputLetter(newLetter);
                        inputLetterChanged(newLetter);
                    }
                }}
                />
            </label>
            <div>
                <input type="submit" value="Submit Guess"
                disabled={!canGuessLetter}
                className="input-submit"/>
            </div>
            <div className="error-msg">
                {errorMsg && ( <div>{errorMsg}</div>)}
            </div>
            </form>
        </div>
    )
}

export default InputLetter;