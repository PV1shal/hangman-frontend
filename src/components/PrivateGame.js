import React, { useState, useEffect } from 'react';
import { Box, Button, List, ListItem, ListItemText, Modal, TextField, Typography, Fab, Chip, Alert } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';

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

function PrivateGame() {
    const [open, setOpen] = useState(false);
    const [words, setWords] = useState([]);
    const [roomId, setRoomId] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const issueAlert = () => {
        setShowAlert(true);
    };

    const handleModal = () => {
        setOpen(true);
    }

    const closeModal = () => {
        setOpen(false);
        setShowAlert(false);
    }

    const handleAddWord = () => {
        const newWord = document.getElementById('words').value.trim();
        if (newWord !== '') {
            setWords([...words, newWord]);
            document.getElementById('words').value = '';
        }
    };

    const handleDeleteWord = (index) => {
        const newWords = [...words];
        newWords.splice(index, 1);
        setWords(newWords);
    };

    function generateId(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        setRoomId(result);
    }

    useEffect(() => {
        generateId(10);
    }, [open]);

    return (
        <div>

            {showAlert && (
                <Alert severity="success" onClose={() => setShowAlert(false)} sx={{
                    position: "fixed",
                    zIndex: "9999",
                }}>
                    Copied to clipboard!
                </Alert>
            )}

            <Button onClick={handleModal}>Create a new game</Button>
            <Modal
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                open={open}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form" noValidate sx={style}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        Create a private Game
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextField id="words" label="Enter your custom words" variant="outlined" sx={{ width: "20vw" }} />
                        <Button variant="contained" sx={{ ml: 2, height: 56, background: "#4abd46", ":hover": { background: "#368a33" } }} onClick={handleAddWord}>
                            Add
                        </Button>
                    </Typography>
                    {words.length > 0 && (
                        <Typography sx={{ mt: 2 }}>
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                {words.map((word, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={word} />
                                        <Fab size='small' aria-label="edit" onClick={() => handleDeleteWord(index)} sx={{ background: "#f76363", ':hover': { background: "#ed4040" } }}>
                                            <DeleteIcon />
                                        </Fab>
                                    </ListItem>
                                ))}
                            </List>
                        </Typography>
                    )}

                    <Typography sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                        Share this code with to your friends: <Chip label={roomId} variant="outlined" sx={{ fontWeight: "bold" }} onClick={() => { navigator.clipboard.writeText(roomId); issueAlert() }} />
                        <Box sx={{ ml: 'auto', mr: '5%' }}>
                            <Fab color="secondary" aria-label="refresh" size='small'>
                                <RefreshIcon onClick={() => generateId(10)} />
                            </Fab>
                        </Box>
                    </Typography>

                    <Typography sx={{ mt: 2, textAlign: 'center' }}>
                        <Button variant="contained" sx={{ height: "3.5vh", width: "7.5vw" }}>Create</Button>
                    </Typography>

                </Box>
            </Modal>
        </div >
    );
}

export default PrivateGame;
