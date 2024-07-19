import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Toolbar from './components/Toolbar';
import MovieListPage from './components/MovieListPage';
import useFetchData from './useFetchData';
import Sidebar from './components/Sidebar';
import MovieDetailsPage from './components/MovieDetailsPage';
import ProfilePage from './components/ProfilePage';
import LoanHistoryPage from './components/LoanHistoryPage';
import CartPage from './components/CartPage';
import MoviesByCategoryPage from './components/MoviesByCategoryPage';
import Register from './components/Register';
import Login from './components/Login';
import MainContent from './components/MainContent'
import Cookies from 'js-cookie';

function App() {
    const { data: movies, loading: moviesLoading, error: moviesError, refetch: refreshMovies } = useFetchData('http://localhost:8080/api/movies');

    const { data: categories, loading: categoriesLoading, error: categoriesError } = useFetchData('http://localhost:8080/api/movies/categories');

    const { data: loanHistory, loading: loanHistoryLoading, error: loanHistoryError } = useFetchData('http://localhost:8080/api/users/');

    const userId = sessionStorage.getItem('userId');

    const userRole = sessionStorage.getItem('userRole');

    if (moviesLoading) {
        return <div>Loading...</div>;
    }

    if (moviesError) {
        return <div>Error: {moviesError.message}</div>;
    }

    return (
    <Router>
        <div>
            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/" component={Login} />
                <MainContent movies={movies} categories={categories} refreshMovies={refreshMovies} />
            </Switch>
        </div>
    </Router>
    )
}

export default App;
