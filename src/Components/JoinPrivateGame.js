import React, { useState, useEffect } from 'react';
import { Box, Button, List, ListItem, ListItemText, Modal, TextField, Typography, Fab, Chip, Alert, CircularProgress, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PrivateGameServices from '../services/PrivateGameServices';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "25vw",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const JoinPrivateGame = () => {

    const [open, setOpen] = useState(false);
    const [wrongCodeError, setWrongCodeError] = useState(false);

    const handleModal = () => {
        setOpen(true);
    }

    const closeModal = () => {
        setOpen(false);
        setWrongCodeError(false);
    }

    const handleEnteredCode = () => {
        var roomId = document.getElementById('roomId').value.trim();
        PrivateGameServices.getGame(roomId)
            .then((response) => {
                console.log(response.data.game);
            })
            .catch((error) => {
                setWrongCodeError(true);
            });
    }

    return (
        <div>

            {wrongCodeError && <Alert severity="error" sx={{
                position: "absolute",
                right: "0",
                zIndex: "9999",
            }}>Something went wrong! Check the entered code</Alert>}

            <Button onClick={handleModal}>Join a Private Game</Button>
            <Modal
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                open={open}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form" noValidate sx={style}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        Join a private Game
                        <IconButton
                            aria-label="close"
                            sx={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                            }}
                            onClick={closeModal}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextField id="roomId" label="Enter your custom words" variant="outlined" sx={{ width: "20vw" }} />
                        <Button variant="contained" sx={{ ml: 2, height: 56, background: "#4abd46", ":hover": { background: "#368a33" } }} onClick={handleEnteredCode}>
                            Enter
                        </Button>
                    </Typography>

                </Box>
            </Modal>
        </div>
    );

}

export default JoinPrivateGame;