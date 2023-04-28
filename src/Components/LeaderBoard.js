import { Box, IconButton, List, ListItem, ListItemText } from "@mui/material";
import React, { useState, useEffect } from 'react';
import loginServices from "../Services/loginServices.js";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "25vw",
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const Leaderboard = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        loginServices.getAllUsers()
            .then((response) => {
                var tempUserData = response.data.Users;
                tempUserData.sort((a, b) => {
                    return b.score - a.score;
                });
                setUsers(response.data.Users);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    return (
        <div>
            <Box sx={style}>
                <div style={{ display: "flex" }}>
                    <IconButton>
                        <ArrowBackIcon sx={{ color: "#a375ff" }} onClick={() => window.location.href = "/"} />
                    </IconButton>
                </div>
                <List>
                    <ListItem key="Heading">
                        <ListItemText primary={<h3>Username</h3>} sx={{ fontWeight: 10 }} />
                        <h3>Score</h3>
                    </ListItem>
                    {users.map((user) => (
                        <ListItem key={user.username}>
                            <ListItemText primary={user.username} />
                            {user.score}
                        </ListItem>
                    ))}
                </List>
            </Box>
        </div>
    );
}

export default Leaderboard;