import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import Cookies from 'js-cookie';

function ProfilePage() {
    const [userDetails, setUserDetails] = useState(null);
    const id = sessionStorage.getItem('userId');

    useEffect(() => {
        if (!id) return;

        // Get user details by user id
        fetch(`http://localhost:8080/api/users/user-details/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }
                return response.json();
            })
            .then(data => setUserDetails(data))
            .catch(error => console.error('Error fetching user details:', error));
    }, [id]);

    if (!userDetails) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container maxWidth="sm" sx={{ padding: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Profile
            </Typography>
            <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body1" fontWeight="bold">First Name:</Typography>
                            <Typography variant="body1">{userDetails.firstName}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body1" fontWeight="bold">Last Name:</Typography>
                            <Typography variant="body1">{userDetails.lastName}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body1" fontWeight="bold">Date of Birth:</Typography>
                            <Typography variant="body1">{userDetails.dateOfBirth}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body1" fontWeight="bold">Gender:</Typography>
                            <Typography variant="body1">{userDetails.gender}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body1" fontWeight="bold">Email:</Typography>
                            <Typography variant="body1">{userDetails.email}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default ProfilePage;
