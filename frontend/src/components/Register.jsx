import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Paper, CssBaseline, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const history = useHistory();

    async function save(event) {
        event.preventDefault();

        try {
            // Add user to users table
            await axios.post("http://localhost:8080/api/users", { firstName: firstName, lastName: lastName, userName: userName, email: email, password: password, dateOfBirth: dateOfBirth, gender: gender });

            alert("User Registered Successfully");

            // Navigate to login page
            history.push("/");
        } catch (err) {
            alert(err);
        }
    }

    return (
        <Box sx={{ backgroundColor: '#f4f4f4', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <CssBaseline />
            <Container maxWidth="xs">
                <Paper elevation={3} sx={{ padding: 3 }}>
                    <Box textAlign="center" mb={2}>
                        <Typography variant="h5" component="h1" gutterBottom>
                            Register
                        </Typography>
                    </Box>
                    <form onSubmit={save}>
                        <TextField fullWidth margin="normal" variant="outlined" label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                        <TextField fullWidth margin="normal" variant="outlined" label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                        <TextField fullWidth margin="normal" variant="outlined" label="Username" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                        <TextField fullWidth margin="normal" variant="outlined" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <TextField fullWidth margin="normal" variant="outlined" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <TextField fullWidth margin="normal" variant="outlined" label="Date of Birth" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} InputLabelProps={{ shrink: true }}/>
                        <FormControl fullWidth margin="normal" variant="outlined">
                            <InputLabel>Gender</InputLabel>
                            <Select value={gender} onChange={(e) => setGender(e.target.value)} label="Gender">
                                <MenuItem value="">Select Gender</MenuItem>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, backgroundColor: '#86FCD7', color: 'white' }}>
                            Register
                        </Button>
                    </form>
                    <Box mt={2} textAlign="center">
                        <Button component={Link} to="/" variant="text" color="primary">
                            Already have a user? Click here to login
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}

export default Register;
