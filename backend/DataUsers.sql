CREATE DATABASE my_database;
USE my_database;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password, created_at) VALUES
('OATae', 'supavitoat@gmail.com', '123456', '2025-02-28 10:05:12'),
('BOB', 'bob@gmail.com', '12345678', '2025-02-28 10:05:50'),
('TESTTIME', 'ttt@gmail.com', 'qwerty', '2025-02-28 10:09:35'),
('TESTTIME', 'tttt@gmail.com', 'qwerty', '2025-02-28 10:12:48'),
('OATaeV4', 'abcdefg@gmail.com', 'qqqqwertyyy', '2025-02-28 10:15:13'),
('TESTTIMEV3', 'abcde@gmail.com', 'qqqqwertyyy', '2025-02-28 10:22:06'),
('...', '....@gmail.com', '789', '2025-02-28 11:09:06'),
('456', '456@gmail.com', '10', '2025-02-28 11:24:15'),
('456หก', '45หกท6@gmail.com', '10', '2025-02-28 11:34:08');
