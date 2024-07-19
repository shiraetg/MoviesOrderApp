package com.MoviesOrderSystem.Review;

import com.MoviesOrderSystem.Entity.Review;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.util.List;

@Repository
public class JdbcClientReviewRepository {
    private final JdbcClient jdbcClient;

    public JdbcClientReviewRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<Review> findAll() {
        return jdbcClient.sql("select * from Review").query(Review.class).list();
    }

    public List<Review> findByMovieId(Integer movieId) {
        return jdbcClient.sql("select user_id, review_content from Review where movie_id = :movieId").param("movieId", movieId).query(Review.class).list();
    }

    public void create(Review review) {
        var updated = jdbcClient.sql("INSERT INTO Review(movie_id, user_id, review_content) VALUES(?,?,?)").
                params(List.of(review.getMovie_id(), review.getUser_id(), review.getReview_content())).update();

        Assert.state(updated == 1, "Failed to create review " + review.getReview_id());
    }
}
