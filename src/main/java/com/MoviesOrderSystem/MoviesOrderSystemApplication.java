package com.MoviesOrderSystem;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class MoviesOrderSystemApplication {

	private static final Logger log = LoggerFactory.getLogger(MoviesOrderSystemApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(MoviesOrderSystemApplication.class, args);
	}
}



