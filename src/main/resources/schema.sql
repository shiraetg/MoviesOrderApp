CREATE TABLE IF NOT EXISTS Movie (
    id SERIAL PRIMARY KEY,
    name varchar(250) NOT NULL,
    category varchar(100),
    short_description varchar(200),
    long_description varchar(500),
    duration INT,
    status BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    date_of_birth VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS Loan (
    id SERIAL PRIMARY KEY,
    movie_id INT,
    user_id INT,
    loan_date DATE NOT NULL,
    return_date DATE
);

CREATE TABLE IF NOT EXISTS public.review
(
    review_id SERIAL PRIMARY KEY,
    movie_id INT NOT NULL,
    user_id INT NOT NULL,
    review_content TEXT
);

