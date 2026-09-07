-- Initial Seed Data for Tasks Table

INSERT INTO tasks (id, title, category, priority, deadline, completed, created_at)
VALUES 
    ('1', 'Pelajari REST API & Express.js', 'Belajar', 'high', CURDATE() + INTERVAL 1 DAY, FALSE, UNIX_TIMESTAMP() * 1000),
    ('2', 'Desain UI Taskflow Modern', 'Desain', 'medium', CURDATE(), TRUE, UNIX_TIMESTAMP() * 1000 - 3600000);
