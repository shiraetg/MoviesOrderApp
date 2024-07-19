import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, Box, ListItemButton } from '@mui/material';

function Sidebar({ records }) {
    const history = useHistory();
    const [selectedCategory, setSelectedCategory] = useState(null);

    const formatCategoryName = (category) => {
        return category.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase());
    };

    const handleCategoryClick = (category) => {
        const categoryName = category.toLowerCase().replace(/_/g, '-');
        setSelectedCategory(category);
        if (category === 'All') {
            // Navigate to all movies list page
            history.push('/api/movies');
        } else {
            // Navigate to movies list by category page
            history.push(`/api/movies/category/${category}`);
        }
    };

    return (
        <Box sx={{ borderRight: '1px solid gray', padding: 3, boxSizing: 'border-box' }}>
            <Typography variant="h6">Categories</Typography>
            <List>
                <ListItemButton selected={selectedCategory === null} onClick={() => handleCategoryClick('All')}>
                    <ListItemText primary="All" />
                </ListItemButton>
                {records.map((category, index) => (
                    <ListItemButton key={index} selected={selectedCategory === category} onClick={() => handleCategoryClick(category)}>
                        <ListItemText primary={formatCategoryName(category)} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
}

export default Sidebar;
