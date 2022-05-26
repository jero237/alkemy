import React from 'react'
import { Box, CircularProgress } from '@mui/material'

function Loading() {
    return (
        <Box sx={{
            marginTop: "30vh",
            display: 'flex',
            flexDirection: 'column',
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <CircularProgress size="5rem" />
        </Box>
    )
}

export default Loading