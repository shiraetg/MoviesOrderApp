package com.MoviesOrderSystem.Loan;

import com.MoviesOrderSystem.Entity.Loan;
import com.MoviesOrderSystem.Entity.Movie;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.sql.Date;
import java.util.List;
import java.util.Map;

@Repository
public class JdbcClientLoansRepository {
    private final JdbcClient jdbcClient;

    public JdbcClientLoansRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<Loan> findAll() {
        return jdbcClient.sql("select * from Loan").query(Loan.class).list();
    }

    public void addLoan(List<Loan> loans) {
        for (Loan loan : loans) {
            var updated = jdbcClient.sql("INSERT INTO Loan(movie_id, user_id, loan_date) VALUES(?,?,?)").
                    params(List.of(loan.movieId(), loan.userId(), loan.loanDate())).update();

            Assert.state(updated == 1, "Failed to add loan of movie " + loan.movieId() + " by user " + loan.userId());
        }
    }

    public List<Loan> findAllLoansOfUser(Integer userId) {
        return jdbcClient.sql("select * from Loan where user_id = :userId").param("userId", userId).query(Loan.class).list();
    }

    public void updateReturnDateOfLoan(Map<String, Object> returnedMovie) {
        var updated = jdbcClient.sql("UPDATE Loan SET return_date = ? WHERE movie_id = ? and user_id = ?")
                .params(Date.valueOf(returnedMovie.get("returnDate").toString()), returnedMovie.get("movieId"), returnedMovie.get("userId"))
                .update();

        Assert.state(updated == 1, "Failed to update return date of loaned movie " + returnedMovie.get("movieId"));
    }

    public List<Movie> getUserLoanedMovies(Integer userId) {
        return jdbcClient.sql("SELECT * FROM movie WHERE id IN (SELECT movie_id FROM loan WHERE user_id = :userId AND return_date IS NULL);").param("userId", userId).query(Movie.class).list();
    }
}
