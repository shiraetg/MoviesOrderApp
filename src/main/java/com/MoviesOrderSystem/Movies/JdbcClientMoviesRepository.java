package com.MoviesOrderSystem.Movies;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;
import com.MoviesOrderSystem.Entity.Movie;

import java.util.List;
import java.util.Optional;

@Repository
public class JdbcClientMoviesRepository {

    private final JdbcClient jdbcClient;

    public JdbcClientMoviesRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<Movie> findAll() {
        return jdbcClient.sql("select * from Movie").query(Movie.class).list();
    }

    public Optional<Movie> findById(Integer id) {
        return jdbcClient.sql("select id, name, category, short_description, long_description, duration from movie where id = :id").param("id", id).query(Movie.class).optional();
    }

    public void create(Movie movie) {
        var updated = jdbcClient.sql("INSERT INTO Movie(name, category, short_description, long_description, duration) VALUES(?,?,?,?,?)").
                params(List.of(movie.getName(), movie.getCategory().toString(), movie.getShortDescription(), movie.getLongDescription(), movie.getDuration())).update();

        Assert.state(updated == 1, "Failed to create movie " + movie.getName());
    }

    public void update(Movie movie, Integer id) {
        var updated = jdbcClient.sql("update Movie set name = ?, category = ?, short_description = ?, long_description = ?, duration = ? where id = ?").
                params(List.of(movie.getName(), movie.getCategory(), movie.getShortDescription(), movie.getLongDescription(), movie.getDuration(), id)).update();

        Assert.state(updated == 1, "Failed to update movie " + movie.getName());
    }

    public void delete(Integer id) {
        jdbcClient.sql("DELETE FROM loan WHERE movie_id = :id").param("id", id).update();

        var updated = jdbcClient.sql("DELETE FROM movie WHERE id = :id").param("id", id).update();

        Assert.state(updated == 1, "Failed to delete movie " + id);
    }

    public int count() {
        return jdbcClient.sql("select * from movie").query().listOfRows().size();
    }

    public void saveAll(List<Movie> movies) {
        movies.stream().forEach(this::create);
    }

    public List<Movie> findAllByCategory(String category) {
        return jdbcClient.sql("select * from movie where category = :category").param("category", category).query(Movie.class).list();
    }

    public void updateMoviesStatuses(List<Integer> moviesIds) {
        jdbcClient.sql("update movie set status = false where id in (:moviesIds)").param("moviesIds", moviesIds).update();
    }

    public void returnLoanedMovie(String movieId) {
        jdbcClient.sql("update movie set status = true where id = :movieId").param("movieId", Integer.valueOf(movieId)).update();
    }
}
