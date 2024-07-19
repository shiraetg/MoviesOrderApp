import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Container, Box } from '@mui/material';

function AddMoviePage({ categories, refreshMovies }) {
    const history = useHistory();

    const [formData, setFormData] = useState({ name: '', category: '', shortDescription: '', longDescription: '', duration: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleAddMovie = async () => {
        try {
            // Add movie record to movies table
            const response = await fetch('http://localhost:8080/api/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Movie added successfully!');

                // Reset form
                setFormData({ name: '', category: '', shortDescription: '', longDescription: '', duration: '' });

                // Re-render movies list after adding new movie
                refreshMovies();

                // Navigate back to movies list page
                history.push("/api/movies");
            } else {
                console.error('Failed to add movie');

                alert('Failed to add movie');
            }
        } catch (error) {
            console.error('Error adding movie: ', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddMovie();
    };

    const handleCancel = () => {
        history.push("/api/movies");
    };

    const formatCategoryName = (category) => {
        return category.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase());
    };

    return (
        <Container maxWidth="sm">
            <Box mt={4} mb={2}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontFamily: 'Arial, sans-serif' }}>
                    Add New Movie
                </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                    <TextField label="Name" variant="outlined" id="name" name="name" value={formData.name} onChange={handleChange}/>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select labelId="category-label" id="category" name="category" value={formData.category} onChange={handleChange} label="Category">
                        <MenuItem value="">
                            <em>Select Category</em>
                        </MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                                {formatCategoryName(category)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField label="Short Description" variant="outlined" id="shortDescription" name="shortDescription" value={formData.shortDescription} onChange={handleChange}/>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField label="Long Description" variant="outlined" id="longDescription" name="longDescription" value={formData.longDescription} onChange={handleChange} multiline maxRows={4} inputProps={{ maxLength: 500 }}/>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField label="Duration (minutes)" variant="outlined" type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange}/>
                </FormControl>
                 <Button variant="contained" sx={{ backgroundColor: '#86FCD7', color: 'white', marginRight: '10px' }} onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="contained" sx={{ backgroundColor: '#86FCD7', color: 'white' }} type="submit">
                    Add Movie
                </Button>
            </form>
        </Container>
    );
}

export default AddMoviePage;
