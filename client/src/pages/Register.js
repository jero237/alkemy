import { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Box, Typography, Container } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const URL = process.env.REACT_APP_API_URL
const theme = createTheme();

export default function Register() {

    const navigate = useNavigate()

    const [form, setForm] = useState({ username: "", password: "", name: "" });
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        e.target.name === "username" && setErrorMsg("")
        setError(false);
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = () => {
        if (!form.username || !form.password || !form.name) return setError(true)
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.username)) return setErrorMsg("Invalid email")
        axios.post(`${URL}/auth/register`, form)
            .then(res => {
                if (!res.data) return setError(true)
                navigate("/")
            }
            )
            .catch(err => setErrorMsg(err.response.data.message))
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <TextField
                            margin="normal"
                            autoComplete="name"
                            name="name"
                            required
                            fullWidth
                            label="Name"
                            autoFocus
                            onChange={handleChange}
                            error={error && !form.name}
                            helperText={error && !form.name && "Name is required"}
                            value={form.name}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="username"
                            autoComplete="email"
                            onChange={handleChange}
                            error={error && !form.username || !!errorMsg}
                            helperText={error && !form.username && "Email is required" || errorMsg}
                            value={form.username}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            autoComplete="new-password"
                            onChange={handleChange}
                            error={error && !form.password}
                            helperText={error && !form.password && "Password is required"}
                            value={form.password}
                        />
                        <Button
                            onClick={handleSubmit}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Link href="/" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}