import axios from 'axios';

class LoginServices {
    checkUser = (data) => {
        return axios.get(`https://hangman-backend.herokuapp.com/api/hangman/users/${data}`);
    }

    addUser = (data) => {
        return axios.post(`https://hangman-backend.herokuapp.com/api/hangman/users`, data);
    }
}

export default new LoginServices();