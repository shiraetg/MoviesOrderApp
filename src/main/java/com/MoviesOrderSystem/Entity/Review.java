package com.MoviesOrderSystem.Entity;

import jakarta.persistence.*;

@Table(name = "Review")
public class Review {
    @Id
    @Column(name = "review_id", length = 45)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int review_id;

    @Column(name = "movie_id", length = 255)
    private int movie_id;

    @Column(name = "user_id", length = 255)
    private int user_id;

    @Column(name = "review_content", length = 255)
    private String review_content;

    public Review(int review_id, int movie_id, int user_id, String review_content) {
        this.review_id = review_id;
        this.movie_id = movie_id;
        this.user_id = user_id;
        this.review_content = review_content;
    }

    public Review() {
    }

    public int getReview_id() {
        return review_id;
    }

    public void setReview_id(int review_id) {
        this.review_id = review_id;
    }

    public int getMovie_id() {
        return movie_id;
    }

    public void setMovie_id(int movie_id) {
        this.movie_id = movie_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getReview_content() {
        return review_content;
    }

    public void setReview_content(String review_content) {
        this.review_content = review_content;
    }

    @Override
    public String toString() {
        return "Review{" +
                "review_id=" + review_id +
                ", movie_id='" + movie_id + '\'' +
                ", user_id='" + user_id + '\'' +
                ", review_content='" + review_content + '\'' +
                '}';
    }
}
