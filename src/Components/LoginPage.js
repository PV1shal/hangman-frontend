import { useState, useEffect } from 'react';
import LoginServices from '../services/loginServices.js';
import './LoginPage.css';

const LoginPage = () => {

    const [userName, setUserName] = useState();

    useEffect(() => {
        if (localStorage.getItem('loggedInUser') !== null) {
            window.location.href = '/home';
        }
    }, []);


    const validateUser = (e) => {
        if (userName === undefined || userName === '') {
            alert('Please enter a username');
            return;
        }
        e.preventDefault();
        LoginServices.checkUser(userName)
            .then((response) => {
                localStorage.setItem('loggedInUser', userName);
                window.location.href = '/home';
            }).catch((err) => {
                var data = {
                    "userDetails": {
                        "username": userName,
                        "score": 0
                    }
                }
                LoginServices.addUser(data)
                    .then((response) => {
                        localStorage.setItem('loggedInUser', userName);
                        window.location.href = '/home';
                    })
                    .catch((err) => { console.log(err); });
            });
    }

    return (
        <div className='LoginDiv'>
            <h1>Hangman</h1>
            <form onSubmit={(e) => validateUser(e)} style={{ display: "block" }}>
                <input type="text" placeholder='Enter Username' onChange={(e) => setUserName(e.target.value)} />
                <button type="submit" >Login</button>
            </form>
        </div>
    );
}

export default LoginPage;