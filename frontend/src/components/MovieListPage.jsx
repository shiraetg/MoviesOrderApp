import React, { useState, useEffect } from 'react';
import { NavLink, Link as RouterLink } from 'react-router-dom';
import { Container, TextField, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

function MovieListPage({ records }) {
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const userRole = sessionStorage.getItem('userRole') === 'true';

    useEffect(() => {
        setFilteredMovies(records);
    }, [records]);

    // Update movies list according to search query
    useEffect(() => {
        const filtered = records.filter(movie =>
            movie.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredMovies(filtered);
    }, [searchQuery, records]);

    const handleAddMovie = async () => {
        await fetchMovies();
    };

    const fetchMovies = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/movies');

            if (response.ok) {
                const data = await response.json();
                setFilteredMovies(data);
            } else {
                console.error('Failed to fetch movies');
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            {userRole && (
                <Button component={RouterLink} to="/api/movies/add-movie" variant="contained" startIcon={<AddIcon />} sx={{ mb: 2, backgroundColor: '#86FCD7', color: 'white' }} onClick={handleAddMovie}>
                    Add Movie
                </Button>
            )}
            <TextField fullWidth type="text" label="Search movie by name..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} variant="outlined" sx={{ mb: 2 }}/>
            {filteredMovies.length === 0 && (
                <Typography variant="body1" sx={{ mt: 2 }}>
                    No movies found.
                </Typography>
            )}
            {filteredMovies.length > 0 && (
                <Grid container spacing={2}>
                    {filteredMovies.map((movie, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            {movie.status ? (
                                <NavLink to={`/api/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
                                    <Card sx={{ minHeight: 300, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <CardContent>
                                            <Typography variant="h5" component="h2" sx={{ fontSize: 24 }}>
                                                {movie.name}
                                            </Typography>
                                            <Typography variant="subtitle1" sx={{ fontSize: 18 }}>
                                                {movie.shortDescription}
                                            </Typography>
                                            <Typography variant="body2">
                                                Duration: {movie.duration} mins
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </NavLink>
                            ) : (
                                <Card
                                    sx={{ minHeight: 300, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'lightgray', opacity: 0.5, pointerEvents: 'none' }}>
                                    <CardContent>
                                        <Typography variant="h5" component="h2" sx={{ fontSize: 24 }}>
                                            {movie.name}
                                        </Typography>
                                        <Typography variant="subtitle1" sx={{ fontSize: 18 }}>
                                            {movie.shortDescription}
                                        </Typography>
                                        <Typography variant="body2">
                                            Duration: {movie.duration} mins
                                        </Typography>
                                    </CardContent>
                                </Card>
                            )}
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}

export default MovieListPage;
