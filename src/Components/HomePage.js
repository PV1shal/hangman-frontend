import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import React from 'react';
import CreatePrivateGame from './CreatePrivateGame';
import JoinPrivateGame from './JoinPrivateGame';
import { useNavigate } from 'react-router-dom';
import PrivateGameServices from '../services/PrivateGameServices';

const Homepage = () => {
    const navigate = useNavigate();

    const hadndleSinglePlayer = () => {
        PrivateGameServices.getGame("Main")
            .then((response) => {
                // console.log(response.data);
                const wordList = response.data.game.words;
                navigate('/game', { state: { wordList } });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ width: "35vw", height: "35vh", background: "rgba(255, 255, 255, 0.9)", borderRadius: 5 }}>
                <CardHeader
                    titleTypographyProps={{ variant: 'h3' }}
                    title="Welcome to Hangman!"
                />
                <CardContent>
                    <Button variant="contained" sx={{ height: 56, width: 200, background: "#4abd46", ":hover": { background: "#368a33" } }} onClick={() => hadndleSinglePlayer()}>Play</Button>
                    <CreatePrivateGame />
                    <JoinPrivateGame />
                </CardContent>
            </Card>
        </div>
    );

}

export default Homepage;