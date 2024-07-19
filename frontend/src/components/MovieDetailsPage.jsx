import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link as RouterLink, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Container, Typography, Button, Box, Divider, CircularProgress } from '@mui/material';
import { Delete as DeleteIcon, ShoppingCartOutlined as ShoppingCartIcon } from '@mui/icons-material';

function MovieDetailsPage({ refreshMovies }) {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const history = useHistory();
    const location = useLocation();

    // Get user rule from session storage in order to display different actions according to the rule
    const userRole = sessionStorage.getItem('userRole') === 'true';

    useEffect(() => {
        fetch(`http://localhost:8080/api/movies/${id}`)
            .then(response => response.json())
            .then(data => setMovie(data))
            .catch(error => console.error('Error fetching movie details:', error));
    }, [id]);

    // Add movie to cart if it is not in it already
    const handleAddToCart = () => {
        const cartItems = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
        if (!cartItems.find(item => item.id === movie.id)) {
            cartItems.push({ id: movie.id, name: movie.name });

            // Add movie to cart in cookies
            Cookies.set('cart', JSON.stringify(cartItems), { expires: 7 }); // Cookie expires in 7 days
            alert('Movie added to cart!');
        } else {
            alert('This movie is already in your cart.');
        }
    };

    const handleRemoveMovie = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/movies/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json'}
            });

            if (response.ok) {
                alert('Movie removed successfully!');

                // Re-render movies list after deleting a movie
                refreshMovies();

                // Navigate back to movies list page
                history.push("/api/movies");
            } else {
                alert('Failed to remove movie');
            }
        } catch (error) {
            console.error('Error removing movie: ', error);

            alert('Error removing movie');
        }
    };

    // Show loader until movie details are retrieved from api call
    if (!movie) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box sx={{ mb: 2 }}>
                <Button component={RouterLink} to="/api/movies" variant="contained" sx={{ backgroundColor: '#86FCD7', color: 'white', mt: 1 }}>
                    Return to Movies
                </Button>
            </Box>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h4" component="h2">
                    {movie.name}
                </Typography>
            </Box>
            <Typography variant="body1" className="long-description" gutterBottom>
                {movie.longDescription}
            </Typography>
            <Typography variant="body2" gutterBottom>
                Duration: {movie.duration} mins
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button onClick={handleAddToCart} variant="contained" startIcon={<ShoppingCartIcon />} sx={{ backgroundColor: '#86FCD7', color: 'white', mr: 1 }}>
                        Add To Cart
                    </Button>
                    {userRole && (
                        <Button onClick={handleRemoveMovie} variant="contained" startIcon={<DeleteIcon />} sx={{ backgroundColor: '#FF616D', color: 'white' }}>
                            Delete Movie
                        </Button>
                    )}
                </Box>
                <Button component={RouterLink} to={`${location.pathname}/reviews`} variant="contained" sx={{ backgroundColor: '#86FCD7', color: 'white' }}>
                    Reviews
                </Button>
            </Box>
        </Container>
    );
}

export default MovieDetailsPage;
