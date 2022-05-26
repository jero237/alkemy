import React from 'react'
import { Button, Paper, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { useNavigate } from 'react-router-dom'

export default function Header({ balance }) {

    const navigate = useNavigate()

    return (
        <Container sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            gap: '1rem'
        }}>
            <Button variant='contained' color='secondary' onClick={() => navigate("manage-transactions")}>Manage Transactions</Button>
            <Paper sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: '1rem',
            }}>
                <Typography variant="h6">Balance:</Typography>
                <Typography variant="h5">${balance}</Typography>
            </Paper>
        </Container>
    )
}
