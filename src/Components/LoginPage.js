import { useState, useEffect } from 'react';
import loginServices from '../Services/loginServices';
import './LoginPage.css';

const LoginPage = () => {

    const [userName, setUserName] = useState();

    useEffect(() => {
        if (localStorage.getItem('loggedInUser') !== null) {
            window.location.href = '/hangman';
        }
    }, []);


    const validateUser = (e) => {
        if (userName === undefined || userName === '') {
            alert('Please enter a username');
            return;
        }
        e.preventDefault();
        loginServices.checkUser(userName)
            .then((response) => {
                localStorage.setItem('loggedInUser', userName);
                window.location.href = '/hangman';
            }).catch((err) => {
                var data = {
                    "userDetails": {
                        "username": userName
                    }
                }
                loginServices.addUser(data)
                    .then((response) => {
                        localStorage.setItem('loggedInUser', userName);
                        window.location.href = '/hangman';
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