import React, { useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

function AddReviewPage() {
    const [reviewContent, setReviewContent] = useState('');
    const { movieId } = useParams();
    const location = useLocation();
    const { movieName } = location.state || {};
    const history = useHistory();

    const userId = sessionStorage.getItem('userId');

    const handleReviewSubmit = async () => {
        const reviewData = {
            movie_id: parseInt(movieId),
            user_id: parseInt(sessionStorage.getItem('userId')),
            review_content: reviewContent
        };

        try {
            // Add review record to reviews table
            const response = await fetch('http://localhost:8080/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData)
            });

            if (response.ok) {
                alert('Review added successfully!');

                // Navigate back to loan history page
                history.push(`/${userId}/loan-history`);
            } else {
                console.error('Failed to add review');

                alert('Failed to add review');
            }
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={4} mb={2}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Add Review
                </Typography>
            </Box>
            <Box mb={2}>
                <Typography variant="h6">Movie Name:</Typography>
                <Typography variant="body1">{movieName}</Typography>
            </Box>
            <Box mb={2}>
                <TextField label="Review" variant="outlined" fullWidth multiline rows={4} value={reviewContent} onChange={(e) => setReviewContent(e.target.value)} placeholder="Write your review here..."/>
            </Box>
            <Button variant="contained" sx={{ backgroundColor: '#86FCD7', color: 'white' }} onClick={handleReviewSubmit} fullWidth>
                Add Review
            </Button>
        </Container>
    );
}

export default AddReviewPage;
