import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Box, Button, Card, CardContent, CircularProgress } from '@mui/material';

function MovieReviewsPage() {
    const [reviews, setReviews] = useState([]);
    const [userNames, setUserNames] = useState({});
    const { id } = useParams();

    useEffect(() => {
        // Get all reviews of movie by movie id
        fetch(`http://localhost:8080/api/reviews/${id}`)
            .then(response => response.json())
            .then(data => {
                setReviews(data);
            })
            .catch(error => console.error('Error fetching reviews:', error));
    }, [id]);

    useEffect(() => {
        if (reviews.length > 0) {
            fetchUserNames();
        }
    }, [reviews]);

    const fetchUserNames = async () => {
        const uniqueUserIds = [...new Set(reviews.map(review => review.user_id))];

        try {
            // For each user, get user details by user id (to display in the review)
            for (const userId of uniqueUserIds) {
                const response = await fetch(`http://localhost:8080/api/users/user-details/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setUserNames(prevState => ({
                        ...prevState,
                        [userId]: data.firstName + " " + data.lastName
                    }));
                } else {
                    console.error(`Failed to fetch details for user ${userId}`);
                }
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    if (reviews.length === 0 && Object.keys(userNames).length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box sx={{ mb: 2 }}>
                <Button component={RouterLink} to={`/api/movies/${id}`} variant="contained" sx={{ backgroundColor: '#86FCD7', color: 'white' }} >
                    Return to Movie
                </Button>
            </Box>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Movie Reviews
                </Typography>
            </Box>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <Card key={index} sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6" component="h3">
                                {review.review_content}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Written by: {userNames[review.user_id]}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography variant="body1">No reviews available</Typography>
            )}
        </Container>
    );
}

export default MovieReviewsPage;
