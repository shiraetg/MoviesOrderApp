import { useState } from "react";
import { useHistory, Link } from 'react-router-dom';
import axios from "axios";
import { Container, Typography, TextField, Button, Box, Paper, CssBaseline } from '@mui/material';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    async function login(event) {
        event.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/users/login", {
                email: email,
                password: password,
            });

            if (res.data.message === "Email not exists") {
                alert("Email not exists");
            } else if (res.data.message === "Login Success") {
                const userIdResponse = await axios.get(`http://localhost:8080/api/users/${email}`);

                // Update user id in session storage
                sessionStorage.setItem("userId", userIdResponse.data);

                // Get user role (admin/ not admin) by user id
                const userRoleResponse = await axios.get(`http://localhost:8080/api/users/user-role/${userIdResponse.data}`);

                // Store user rule in sesstino storage
                sessionStorage.setItem("userRole", userRoleResponse.data);

                // Navigate to movies list page
                history.push("/api/movies");
            } else {
                alert("Incorrect Email and Password combination");
            }
        } catch (err) {
            alert(err);
        }
    }

    return (
        <Box
            sx={{ backgroundColor: '#f4f4f4', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CssBaseline />
            <Container maxWidth="xs">
                <Paper elevation={3} sx={{ padding: 3 }}>
                    <Typography variant="h5" component="h1" align="center" gutterBottom>
                        Log in
                    </Typography>
                    <form onSubmit={login}>
                        <Box mb={2}>
                            <TextField variant="outlined" label="Email" type="email" fullWidth value={email} onChange={(event) => setEmail(event.target.value)}/>
                        </Box>
                        <Box mb={2}>
                            <TextField variant="outlined" label="Password" type="password" fullWidth value={password} onChange={(event) => setPassword(event.target.value)}/>
                        </Box>
                        <Box textAlign="center" mb={2}>
                            <Button type="submit" variant="contained" sx={{ backgroundColor: '#86FCD7', color: 'white' }} fullWidth>
                                Log In
                            </Button>
                        </Box>
                    </form>
                    <Box textAlign="center">
                        <Button component={Link} to="/register" variant="outlined" color="primary" fullWidth>
                            Register
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}

export default Login;
