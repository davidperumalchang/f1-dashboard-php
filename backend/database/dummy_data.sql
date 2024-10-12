-- Event_schedule table
INSERT INTO f1_app.event_schedule (event_name, event_date, circuit_name, location, country) VALUES
('Australian Grand Prix', '2024-03-17', 'Melbourne Grand Prix Circuit', 'Melbourne', 'Australia'),
('Austrian Grand Prix', '2024-03-24', 'Red Bull Ring', 'Spielberg', 'Austria'),
('Belgian Grand Prix', '2024-04-28', 'Spa-Francorchamps', 'Stavelot', 'Belgium'),
('British Grand Prix', '2024-05-12', 'Silverstone Circuit', 'Silverstone', 'United Kingdom'),
('Canadian Grand Prix', '2024-05-26', 'Circuit Gilles Villeneuve', 'Montreal', 'Canada'),
('French Grand Prix', '2024-06-02', 'Circuit Paul Ricard', 'Le Castellet', 'France'),
('Hungarian Grand Prix', '2024-06-09', 'Hungaroring', 'Mogyoród', 'Hungary'),
('Italian Grand Prix', '2024-06-23', 'Autodromo Nazionale Monza', 'Monza', 'Italy'),
('Singapore Airlines Singapore Grand Prix', '2024-06-30', 'Marina Bay Street Circuit', 'Singapore', 'Singapore'),
('United States Grand Prix', '2024-07-14', 'Circuit of the Americas', 'Austin', 'United States'),
('Mexican Grand Prix', '2024-07-28', 'Autódromo Hermanos Rodríguez', 'Mexico City', 'Mexico'),
('Brazilian Grand Prix', '2024-08-04', 'Autódromo José Carlos Pace', 'São Paulo', 'Brazil'),
('United States Grand Prix', '2024-08-25', 'Circuit of the Americas', 'Austin', 'United States'),
('Japanese Grand Prix', '2024-09-08', 'Suzuka Circuit', 'Suzuka', 'Japan'),
('Mexican Grand Prix', '2024-09-22', 'Autódromo Hermanos Rodríguez', 'Mexico City', 'Mexico'),
('Saudi Arabian Grand Prix', '2024-10-05', 'Jeddah Corniche Circuit', 'Jeddah', 'Saudi Arabia'),
('Abu Dhabi Grand Prix', '2024-11-02', 'Yas Marina Circuit', 'Abu Dhabi', 'United Arab Emirates');


-- Team table
INSERT INTO f1_app.team (team_name, points, wins, podiums) VALUES
('Red Bull Racing Honda RBPT', 300, 10, 20),
('Mercedes', 250, 8, 15),
('Ferrari', 200, 6, 12),
('McLaren Renault', 150, 5, 10),
('Renault', 100, 4, 8),
('Alpine Renault', 80, 3, 6),
('AlphaTauri Honda RBPT', 70, 2, 4),
('Haas Ferrari', 50, 1, 2),
('Williams Mercedes', 30, 0, 0),
('Alfa Romeo Ferrari', 20, 1, 3),
('Aston Martin Mercedes', 15, 0, 2),
('BWT Mercedes', 10, 0, 1),
('Mercedes AMG Petronas F1 Team', 5, 0, 0);


-- Drivers table
INSERT INTO f1_app.drivers (driver_name, team_id) VALUES
('Lewis Hamilton', 1),
('Max Verstappen', 2),
('Charles Leclerc', 3),
('Carlos Sainz', 4),
('George Russell', 5),
('Mick Schumacher', 6),
('Fernando Alonso', 7),
('Lando Norris', 8),
('Esteban Ocon', 9),
('Pierre Gasly', 10),
('Yuki Tsunoda', 11),
('Kevin Magnussen', 12),
('Nico Hulkenberg', 13),
('Valtteri Bottas', 1),
('Alexander Albon', 6),
('Nicholas Latifi', 5);

-- First admin user
INSERT INTO f1_app.users (email, password_hash) VALUES 
('admin@f1.com', '$2b$10$v3z88ojvGGUTsFedn6jbN.lrrPZdYXkhelajFlmO7E8RI.yLqkDeq');
