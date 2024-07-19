import React, { useState, useEffect } from 'react';
import { Button, Container, Grid, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

function UserManagementPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            // Get all users
            const response = await fetch('http://localhost:8080/api/users');
            if (response.ok) {
                const data = await response.json();
                const usersWithMovies = await Promise.all(data.map(async user => {
                    user.movies = await fetchUserMovies(user.id);
                    return user;
                }));
                setUsers(usersWithMovies);
            } else {
                console.error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchUserMovies = async (userId) => {
        try {

            // Get all movies loaned by user
            const response = await fetch(`http://localhost:8080/api/loans/${userId}/loaned-movies`);
            if (response.ok) {
                const movies = await response.json();
                return movies.map(movie => movie.name);
            }
        } catch (error) {
            console.error(`Error fetching movies for user ${userId}: `, error);
            return [];
        }
    };

    const updateUserRole = async (userId, isAdmin) => {
        try {
            // Update user role (make admin / not admin)
            const response = await fetch(`http://localhost:8080/api/users/update-user-role/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isAdmin })
            });

            if (response.ok) {
                fetchUsers();
            } else {
                console.error('Failed to update user role');
            }
        } catch (error) {
            console.error('Error updating user role: ', error);
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h2" gutterBottom>
                User Management
            </Typography>
            <Grid container spacing={7}>
                {users.map(user => (
                    <Grid item xs={12} md={6} key={user.id}>
                        <Paper
                            elevation={3}
                            sx={{ padding: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: user.isAdmin ? '#ffffcc' : 'inherit'}}>
                            <Typography variant="h6">
                                {user.username} ({user.isAdmin ? 'Admin' : 'User'})
                            </Typography>
                            {user.movies && user.movies.length > 0 && (
                                <>
                                    <Typography variant="body1">Currently loaned movies:</Typography>
                                    <List>
                                        {user.movies.map((movie, index) => (
                                            <ListItem key={index}>
                                                <ListItemText primary={'- ' +movie} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </>
                            )}
                            <Button variant="contained" sx={{ backgroundColor: '#86FCD7', color: '#fff', mt: 2 }} onClick={() => updateUserRole(user.id, !user.isAdmin)}>
                                {user.isAdmin ? 'Make Non-Admin' : 'Make Admin'}
                            </Button>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default UserManagementPage;
