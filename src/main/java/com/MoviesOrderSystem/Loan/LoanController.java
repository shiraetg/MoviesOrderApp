package com.MoviesOrderSystem.Loan;

import com.MoviesOrderSystem.Entity.Loan;
import com.MoviesOrderSystem.Entity.Movie;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/loans")
public class LoanController {
    private final JdbcClientLoansRepository jdbcClientLoansRepository;

    public LoanController(JdbcClientLoansRepository jdbcClientLoansRepository) {
        this.jdbcClientLoansRepository = jdbcClientLoansRepository;
    }

    @GetMapping("")
    List<Loan> findAll() {
        return jdbcClientLoansRepository.findAll();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    void create(@Valid @RequestBody List<Loan> loans) {
        jdbcClientLoansRepository.addLoan(loans);
    }

    @GetMapping("/{user_id}")
    List<Loan> findAllLoansOfUser(@PathVariable Integer user_id) {
        return jdbcClientLoansRepository.findAllLoansOfUser(user_id);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/update-return-date")
    void create(@Valid @RequestBody Map<String, Object> requestBody) {
        jdbcClientLoansRepository.updateReturnDateOfLoan(requestBody);
    }

    @GetMapping("/{userId}/loaned-movies")
    public List<Movie> getUserLoanedMovies(@PathVariable int userId) {
        return jdbcClientLoansRepository.getUserLoanedMovies(userId);
    }
}
