import * as React from 'react';
import { Button, Typography, Toolbar, Box, AppBar } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const URL = process.env.REACT_APP_API_URL

export default function ButtonAppBar({ name }) {

    const navigate = useNavigate()

    const handleLogOut = () => {
        axios.post(`${URL}/auth/logout`)
            .then(res => navigate('/'))
            .catch(err => console.log(err))
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {name}
                    </Typography>
                    <Button color="inherit" onClick={handleLogOut} >Log Out</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
