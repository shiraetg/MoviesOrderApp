package com.MoviesOrderSystem.User;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;
import com.MoviesOrderSystem.Entity.User;

import java.util.List;
import java.util.Optional;

@Repository
public class JdbcClientUsersRepository {
    private final JdbcClient jdbcClient;

    public JdbcClientUsersRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<User> findAll() {
        return jdbcClient.sql("select * from users").query(User.class).list();
    }

    public Optional<User> findById(Integer id) {
        return jdbcClient.sql("select * from users where id = :id").param("id", id).query(User.class).optional();
    }

    public void create(User user) {
        var updated = jdbcClient.sql("INSERT INTO users(first_name, last_name, user_name, date_of_birth, gender, email, password) VALUES(?,?,?,?,?,?,?)").
                params(List.of(user.getFirstName(), user.getLastName(), user.getUsername(), user.getDateOfBirth(), user.getGender(), user.getEmail(), user.getPassword())).update();

        Assert.state(updated == 1, "Failed to create user " + user.getUsername());
    }

    public void update(User user, Integer id) {
        var updated = jdbcClient.sql("update users set first_name = ?, last_name = ?, user_name = ?, date_of_birth = ?, gender = ?, email = ?, password = ? where id = ?").
                params(List.of(user.getFirstName(), user.getLastName(), user.getUsername(), user.getDateOfBirth(), user.getGender(), user.getEmail(), user.getPassword())).update();

        Assert.state(updated == 1, "Failed to update user " + user.getUsername());
    }

    public void delete(Integer id) {
        var updated = jdbcClient.sql("delete from users where id = :id").param("id", id).update();

        Assert.state(updated == 1, "Failed to delete user " + id);
    }

    public int count() {
        return jdbcClient.sql("select * from users").query().listOfRows().size();
    }

    public void saveAll(List<User> users) {
        users.stream().forEach(this::create);
    }

    public List<User> findByUsername(String username) {
        return jdbcClient.sql("select * from users where user_name = :username").param("username", username).query(User.class).list();
    }

    public Optional<User> findOneByEmailAndPassword(String email, String password) {
        return jdbcClient.sql("SELECT * FROM users WHERE email = ? AND password = ?").params(List.of(email, password)).query(User.class).optional();
    }

    public User findByEmail(String email) {
        List<User> users =  jdbcClient.sql("SELECT * FROM users WHERE email = :email").param("email", email).query(User.class).list();

        if (!users.isEmpty()) {
            return users.get(0);
        }
        return null;
    }

    public void updateUserRole(Integer userId, boolean isAdmin) {
        var updated = jdbcClient.sql("UPDATE users SET is_admin = ? WHERE id = ?")
                .params(List.of(isAdmin, userId))
                .update();

        Assert.state(updated == 1, "Failed to update user role for user with ID: " + userId);

    }
}

