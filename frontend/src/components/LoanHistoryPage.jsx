import React, { useState, useEffect } from 'react';
import { FaUndo } from 'react-icons/fa';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Container, Typography, Paper, Button, Box, Grid } from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';

function LoanHistoryPage({ refreshMovies }) {
    const { id } = useParams();
    const [loanHistoryItems, setLoanHistoryItems] = useState([]);
    const [movieDetails, setMovieDetails] = useState({});
    const history = useHistory();

    useEffect(() => {
        fetchLoanHistory();
    }, [id]);

    const fetchLoanHistory = async () => {
        try {
            // Get all loaned movies of user by user id
            const response = await fetch(`http://localhost:8080/api/loans/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();
            setLoanHistoryItems(data);
            const movieIds = data.map(item => item.movieId);

            // Fetch movie details for each loaned movie
            fetchMovieDetails(movieIds);
        } catch (error) {
            console.error('Error fetching loan history: ', error);
        }
    };

    const fetchMovieDetails = async (movieIds) => {
        try {
            for (const movieId of movieIds) {
                const response = await fetch(`http://localhost:8080/api/movies/${movieId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                const data = await response.json();
                setMovieDetails(prevState => ({
                    ...prevState,
                    [movieId]: data
                }));
            }
        } catch (error) {
            console.error('Error fetching movie details: ', error);
        }
    };

    // Return a loaned movie
    const returnLoanedMovie = async (movieId) => {
        const returnedMovie = {
            movieId: movieId,
            userId: parseInt(sessionStorage.getItem('userId')),
            returnDate: new Date().toISOString().split('T')[0]
        };

        try {
            // Update return date in loan record
            const response1 = await fetch('http://localhost:8080/api/loans/update-return-date', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(returnedMovie)
            });

            if (response1.ok) {
                alert('Movie returned successfully!');

                // Re-render loan history page
                await fetchLoanHistory();

                // Re-render movies list after returning movie and making it available again
                await refreshMovies();
            } else {
                throw new Error('Failed to return movie');
            }
        } catch (error) {
            console.error('Error returning movie: ', error);
        }

        try {
            // Update movie status in movies table to be available
            const response2 = await fetch(`http://localhost:8080/api/movies/update-returned-movie/${movieId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response2.ok) {
                console.log('Movie status updated successfully!');
            } else {
                throw new Error('Failed to update status of movie');
            }
        } catch (error) {
            console.error('Error updating status of movie:', error);
        }
    };

    return (
        <Container maxWidth="md">
            <Box mt={4} mb={2}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Loan History
                </Typography>
            </Box>
            {loanHistoryItems.length === 0 ? (
                <Typography variant="body1">Your Loan History is empty.</Typography>
            ) : (
                <Box>
                    {loanHistoryItems.map(item => (
                        <Paper key={item.id} sx={{ p: 2, mb: 2 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={3}>
                                    <Typography variant="h6">{movieDetails[item.movieId]?.name}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="body2">Loaned at: {item.loanDate}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    {item.returnDate ? (
                                        <Typography variant="body2">Returned at: {item.returnDate}</Typography>
                                    ) : (
                                        <Button variant="contained" color="primary" onClick={() => returnLoanedMovie(item.movieId)} startIcon={<FaUndo />}>
                                            Return Movie
                                        </Button>
                                    )}
                                </Grid>
                                <Grid item xs={3}>
                                    <Button
                                        component={Link}
                                        to={{
                                            pathname: `${history.location.pathname}/add-review/${item.movieId}`,
                                            state: { movieName: movieDetails[item.movieId]?.name }
                                        }}
                                        variant="contained" color="secondary" startIcon={<RateReviewIcon />} >
                                        Add Review
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}
                </Box>
            )}
        </Container>
    );
}

export default LoanHistoryPage;
