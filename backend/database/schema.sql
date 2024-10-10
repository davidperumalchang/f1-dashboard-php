-- Create schema
CREATE SCHEMA f1_app;

-- Table for event schedule
CREATE TABLE f1_app.event_schedule (
    id SERIAL PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    circuit_name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL
);

-- Table for team
CREATE TABLE f1_app.team (
    id SERIAL PRIMARY KEY,
    team_name VARCHAR(255) NOT NULL,
    points INT NOT NULL,
    wins INT NOT NULL,
    podiums INT NOT NULL
);

-- Table for users
CREATE TABLE f1_app.users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

