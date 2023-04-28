import { Button, Card, CardContent, CardHeader, Box } from '@mui/material';
import React from 'react';
import CreatePrivateGame from './CreatePrivateGame';
import JoinPrivateGame from './JoinPrivateGame';
import { useNavigate } from 'react-router-dom';
import PrivateGameServices from '../Services/PrivateGameServices.js';

const Homepage = () => {
    const navigate = useNavigate();

    const hadndleSinglePlayer = () => {
        PrivateGameServices.getGame("Main")
            .then((response) => {
                // console.log(response.data);
                const wordList = response.data.game.words;
                const typeOfGame = "singlePlayer";
                navigate('/game', { state: { wordList, typeOfGame } });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const SignOut = () => {
        localStorage.removeItem("loggedInUser");
        window.location.href = "/";
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ width: "50vw", height: "82vh", background: "rgba(255, 255, 255, 0.9)", borderRadius: 5 }}>
                <CardHeader
                    titleTypographyProps={{
                    variant: 'h3',
                    style:
                    {backgroundImage: 'linear-gradient(to bottom, #decdfe, #5502fc)',
                    webkitBackgroundClip: 'text',
                    webkitTextFillColor: 'transparent'}
                }}
                    title="Welcome to Hangman!"
                />
                <CardContent>
                    <Button variant="contained" sx={{ height: 56, width: 200, background: "#7e4fdc", ":hover": { background: "#a375ff" } }} onClick={() => hadndleSinglePlayer()}>Play</Button>
                    <CreatePrivateGame />
                    <JoinPrivateGame />
                    <Button variant="contained" sx={{ height: 56, width: 200, background: "#7e4fdc", ":hover": { background: "#a375ff" }, marginTop: 2 }} href="/leaderboard">
                        Leaderboard
                    </Button>
                    <br />
                    <Button variant="contained" sx={{ height: 56, width: 200, background: "#5502fc", ":hover": { background: "#d81111" }, marginTop: 2 }} onClick={() => SignOut()}>
                        SignOut
                    </Button>
                </CardContent>
            </Card>
        </div>
    );

}

export default Homepage;