import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './Sidebar';
import MovieListPage from './MovieListPage';
import MovieDetailsPage from './MovieDetailsPage';
import ProfilePage from './ProfilePage';
import LoanHistoryPage from './LoanHistoryPage';
import CartPage from './CartPage';
import MoviesByCategoryPage from './MoviesByCategoryPage';
import Toolbar from './Toolbar';
import AddMoviePage from './AddMoviePage';
import MovieReviewsPage from './MovieReviewsPage';
import AddReviewPage from "./AddReviewPage";
import UserManagementPage from "./UserManagementPage";

function MainContent({ movies, categories, refreshMovies }) {
    return (
         <Router>
             <div>
                 <Toolbar />
                 <div style={{ display: 'flex', flexDirection: 'row' }}>
                     <Sidebar records={categories || []} />
                     <Switch>
                        <Route exact path="/api/movies">
                            <MovieListPage records={movies} />
                        </Route>
                        <Route exact path="/api/movies/add-movie">
                            <AddMoviePage categories={categories} refreshMovies={refreshMovies}/>
                        </Route>
                        <Route exact path="/api/movies/:id">
                            <MovieDetailsPage refreshMovies={refreshMovies}/>
                        </Route>
                        <Route exact path="/profile">
                            <ProfilePage />
                        </Route>
                        <Route exact path="/:id/loan-history">
                            <LoanHistoryPage refreshMovies={refreshMovies}/>
                        </Route>
                        <Route exact path="/cart">
                            <CartPage refreshMovies={refreshMovies}/>
                        </Route>
                        <Route exact path="/api/movies/:id/reviews">
                             <MovieReviewsPage />
                        </Route>
                        <Route exact path="/:id/loan-history/add-review/:movieId">
                             <AddReviewPage />
                        </Route>
                        <Route exact path="/user-management">
                            <UserManagementPage />
                        </Route>
                        {categories.map((category, index) => (
                            <Route key={index} exact path={`/api/movies/category/:category`}>
                                <MoviesByCategoryPage category={category} />
                            </Route>
                        ))}
                     </Switch>
                 </div>
             </div>
        </Router>
    );
}

export default MainContent;
