import axios from 'axios';

class PrivateGameServices {
    addNewGame = (newGame) => {
        return axios.post('https://hangman-backend.herokuapp.com/api/hangman/games', newGame);
    }
}

export default new PrivateGameServices();