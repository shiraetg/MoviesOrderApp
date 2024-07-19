package com.MoviesOrderSystem.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.sql.Date;
@Table("loan")
public record Loan(
        @Id @Column("id")
        Integer id,
        @Column("movie_id") Integer movieId,
        @Column("user_id")  Integer userId,
        @Column("loan_date") Date loanDate,
        @Column("return_date") Date returnDate
) {

}