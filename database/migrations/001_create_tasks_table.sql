-- Migration 001: Create Tasks Table

CREATE TABLE IF NOT EXISTS tasks (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT '',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    deadline DATE NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at BIGINT NOT NULL
);
