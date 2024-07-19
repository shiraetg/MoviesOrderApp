import React from 'react';
import Cookies from 'js-cookie';
import { FaTrash } from 'react-icons/fa';
import { Container, Typography, Button, Box, IconButton, Paper, Divider } from '@mui/material';

function CartPage({ refreshMovies }) {
    const [cartItems, setCartItems] = React.useState([]);

    React.useEffect(() => {
        const cart = Cookies.get('cart');
        if (cart) {
            setCartItems(JSON.parse(cart));
        }
    }, []);

    // Remove movie from cart and update cookies
    const removeFromCart = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7 });
    };

    const handleOrder = async () => {
        try {
            const movieIds = cartItems.map(movie => movie.id);

            const id = sessionStorage.getItem('userId');

            const loanedMovies = movieIds.map(movie => ({
                movieId: movie,
                userId: sessionStorage.getItem('userId'),
                loanDate: new Date()
            }));

            // Add loan record to loans table
            const loanResponse = await fetch('http://localhost:8080/api/loans', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loanedMovies)
            });

            if (!loanResponse.ok) {
                throw new Error('Failed to add loans');
            }

            // Update all movies' statuses to be unavailable since they are loaned
            const statusResponse = await fetch('http://localhost:8080/api/movies/update-movies-statuses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ movies: movieIds })
            });

            if (!statusResponse.ok) {
                throw new Error('Failed to update movie statuses');
            }

            alert('Order placed successfully!');

            // Reset cart to be empty
            setCartItems([]);

            // Reset cookies of cart to be empty
            Cookies.remove('cart');

            // Re-render movies list after loaning movies
            refreshMovies();
        } catch (error) {
            console.error('Error placing order:', error);

            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <Container maxWidth="md">
            <Box mt={4} mb={2}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Cart
                </Typography>
            </Box>
            {cartItems.length === 0 ? (
                <Typography variant="body1">Your cart is empty.</Typography>
            ) : (
                <Box>
                    {cartItems.map(item => (
                        <Paper key={item.id} sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6">{item.name}</Typography>
                            <IconButton onClick={() => removeFromCart(item.id)}>
                                <FaTrash />
                            </IconButton>
                        </Paper>
                    ))}
                    <Divider />
                    <Box mt={2}>
                        <Button variant="contained" sx={{ backgroundColor: '#86FCD7', color: 'white' }} onClick={handleOrder} fullWidth>
                            Place Order
                        </Button>
                    </Box>
                </Box>
            )}
        </Container>
    );
}

export default CartPage;
