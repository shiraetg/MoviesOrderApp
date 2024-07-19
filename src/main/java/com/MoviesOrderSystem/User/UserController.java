package com.MoviesOrderSystem.User;

import com.MoviesOrderSystem.DTO.LoginDTO;
import com.MoviesOrderSystem.DTO.UserDTO;
import com.MoviesOrderSystem.Entity.User;
import com.MoviesOrderSystem.response.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final JdbcClientUsersRepository jdbcClientUsersRepository;

    public UserController(JdbcClientUsersRepository jdbcClientUsersRepository) {
        this.jdbcClientUsersRepository = jdbcClientUsersRepository;
    }

    @GetMapping("")
    List<User> findAll() {
        return jdbcClientUsersRepository.findAll();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    public String addUser(@RequestBody UserDTO userDTO) {
        User user = new User(userDTO.getUserId(), userDTO.getFirstName(), userDTO.getLastName(), userDTO.getUserName(),
                userDTO.getDateOfBirth(), userDTO.getGender(), userDTO.getEmail(), this.passwordEncoder.encode(userDTO.getPassword()), userDTO.getIsAdmin());

        jdbcClientUsersRepository.create(user);

        return user.getUsername();
    }

    @PostMapping(path = "/login")
    public LoginResponse loginUser(@RequestBody LoginDTO loginDTO) {
        User user1 = jdbcClientUsersRepository.findByEmail(loginDTO.getEmail());

        if (user1 != null) {
            String password = loginDTO.getPassword();
            String encodedPassword = user1.getPassword();
            Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);

            if (isPwdRight) {
                Optional<User> user = jdbcClientUsersRepository.findOneByEmailAndPassword(loginDTO.getEmail(), encodedPassword);
                if (user.isPresent()) {
                    return new LoginResponse("Login Success", true);
                } else {
                    return new LoginResponse("Login Failed", false);
                }
            } else {

                return new LoginResponse("password Not Match", false);
            }
        } else {
            return new LoginResponse("Email not exits", false);
        }
    }

    @GetMapping("/{email}")
    public int getUserIdByEmail(@PathVariable String email) {
        return jdbcClientUsersRepository.findByEmail(email).getId();
    }

    @GetMapping("/user-details/{userId}")
    public User getUserById(@PathVariable int userId) {
        Optional<User> user = jdbcClientUsersRepository.findById(userId);

        if (user.isPresent()) {
            return user.get();
        }

        return null;
    }

    @GetMapping("/user-role/{userId}")
    public boolean getUserRoleById(@PathVariable int userId) {
        Optional<User> user = jdbcClientUsersRepository.findById(userId);

        if (user.isPresent()) {
            return user.get().getIsAdmin();
        }

        return false;
    }

    @PutMapping("/update-user-role/{userId}")
    public void updateUserRole(@PathVariable int userId, @RequestBody Map<String, Boolean> isAdminMap) {
        Boolean isAdmin = isAdminMap.get("isAdmin");
        jdbcClientUsersRepository.updateUserRole(userId, isAdmin);
    }
}
