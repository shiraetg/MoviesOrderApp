import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieListPage from './MovieListPage';

function MoviesByCategoryPage() {
    const { category } = useParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!category) return;
        // Get movies by category
        fetch(`http://localhost:8080/api/movies/categories/${category}`)
            .then(response => response.json())
            .then(data => {
                setMovies(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching movies by category: ', error);
                setLoading(false);
            });
    }, [category]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (movies.length === 0) {
        return (
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', minHeight: '100vh', textAlign: 'center', paddingLeft: '35%' }}>
                <div style={{ fontSize: '24px' }}>
                    No movies found for this category.
                </div>
            </div>
        );
    }

    return <MovieListPage records={movies} />;
}

export default MoviesByCategoryPage;
