import axios from 'axios';

class PrivateGameServices {
    addNewGame = (newGame) => {
        return axios.post('https://hangman-backend.herokuapp.com/api/hangman/games', newGame);
    }

    getGame = (gameId) => {
        return axios.get(`https://hangman-backend.herokuapp.com/api/hangman/games/${gameId}`);
    }
}

export default new PrivateGameServices();