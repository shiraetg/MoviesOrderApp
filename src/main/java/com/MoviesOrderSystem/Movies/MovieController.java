package com.MoviesOrderSystem.Movies;

import com.MoviesOrderSystem.DTO.MovieDTO;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import com.MoviesOrderSystem.Entity.Movie;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/movies")
public class MovieController {
    private final JdbcClientMoviesRepository jdbcClientMoviesRepository;

    public MovieController(JdbcClientMoviesRepository jdbcClientMoviesRepository) {
        this.jdbcClientMoviesRepository = jdbcClientMoviesRepository;
    }

    @GetMapping("")
    List<Movie> findAll() {
        return jdbcClientMoviesRepository.findAll();
    }

    @GetMapping("/{id}")
    Movie findById(@PathVariable Integer id) {
        Optional<Movie> movie = jdbcClientMoviesRepository.findById(id);

        if (movie.isEmpty()) {
            throw new MovieNotFoundException();
        }

        return movie.get();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    public String addMovie(@RequestBody MovieDTO movieDTO) {
        Movie movie = new Movie(movieDTO.getId(), movieDTO.getName(), movieDTO.getCategory(),
                movieDTO.getShortDescription(), movieDTO.getLongDescription(), movieDTO.getDuration(), movieDTO.getStatus());

        jdbcClientMoviesRepository.create(movie);

        return movie.getName();
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{id}")
    void update(@Valid @RequestBody Movie movie, @PathVariable Integer id) {
        jdbcClientMoviesRepository.update(movie, id);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        jdbcClientMoviesRepository.delete(id);
    }

    @GetMapping("/categories/{category}")
    List<Movie> findByCategory(@PathVariable String category) {
        String uppercaseCategory = category.toUpperCase();

        return jdbcClientMoviesRepository.findAllByCategory(uppercaseCategory);
    }

    @PostMapping("/update-movies-statuses")
    public ResponseEntity<?> updateMoviesStatuses(@RequestBody Map<String, List<Integer>> requestBody) {
        try {
            List<Integer> moviesIds = requestBody.get("movies");

            jdbcClientMoviesRepository.updateMoviesStatuses(moviesIds);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update movies statuses, error: " + e);
        }
    }

    @PostMapping("/update-returned-movie/{id}")
    public ResponseEntity<?> updateReturnedMovie(@PathVariable("id") String movieId) {
        try {
            jdbcClientMoviesRepository.returnLoanedMovie(movieId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to return movie " + e);
        }
    }

    @GetMapping("/categories")
    Category[] findAllCategories() {
        return Category.values();
    }
}
