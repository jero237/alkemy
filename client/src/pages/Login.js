import { useState } from 'react';
import { CssBaseline, TextField, Avatar, Button, Link, Grid, Box, Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const URL = process.env.REACT_APP_API_URL

const theme = createTheme();

export default function SignIn() {

    const navigate = useNavigate()

    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        setError(false);
        setErrorMsg("");
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = (event) => {
        if (!form.password || !form.username) return setError(true)
        console.log(form)
        axios.post(`${URL}/auth/login`, form)
            .then(res => {
                console.log(res)
                navigate("/dashboard")
            })
            .catch(err => {
                console.log(err.response.data)
                setError(true)
                setErrorMsg(err.response.data.message)
            })
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="username"
                            autoComplete="email"
                            value={form.username}
                            onChange={handleChange}
                            autoFocus
                            error={error && !form.username || error && !!errorMsg}
                            helperText={error && errorMsg}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={form.password}
                            onChange={handleChange}
                            error={error && !form.password || error && !!errorMsg}
                            helperText={error && errorMsg}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                    <Button endIcon={<GitHubIcon />} color="inherit" href="https://github.com/jero237">jero237</Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
}