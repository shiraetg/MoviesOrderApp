package com.MoviesOrderSystem.Review;

import com.MoviesOrderSystem.DTO.ReviewDTO;
import com.MoviesOrderSystem.Entity.Review;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/reviews")
public class ReviewController {
    private final JdbcClientReviewRepository jdbcClientReviewRepository;

    public ReviewController(JdbcClientReviewRepository jdbcClientReviewRepository) {
        this.jdbcClientReviewRepository = jdbcClientReviewRepository;
    }

    @GetMapping("")
    List<Review> findAll() {
        return jdbcClientReviewRepository.findAll();
    }

    @GetMapping("/{movieId}")
    List<Review> findByMovieId(@PathVariable Integer movieId) {
        List<Review> reviews = jdbcClientReviewRepository.findByMovieId(movieId);

        if (reviews.isEmpty()) {
            throw new ReviewNotFoundException();
        }

        return reviews;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    public int addReview(@RequestBody ReviewDTO reviewDTO) {
        Review review = new Review(reviewDTO.getReview_id(), reviewDTO.getMovie_id(), reviewDTO.getUser_id(), reviewDTO.getReview_content());

        jdbcClientReviewRepository.create(review);

        return review.getReview_id();
    }
}
