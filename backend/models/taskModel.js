const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const dbFile = path.join(dataDir, 'tasks.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize seed data if file doesn't exist
if (!fs.existsSync(dbFile)) {
  const initialTasks = [
    {
      id: '1',
      title: 'Pelajari REST API & Express.js',
      category: 'Belajar',
      priority: 'high',
      deadline: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      completed: false,
      createdAt: Date.now()
    },
    {
      id: '2',
      title: 'Desain UI Taskflow Modern',
      category: 'Desain',
      priority: 'medium',
      deadline: new Date().toISOString().split('T')[0],
      completed: true,
      createdAt: Date.now() - 3600000
    }
  ];
  fs.writeFileSync(dbFile, JSON.stringify(initialTasks, null, 2), 'utf-8');
}

class TaskModel {
  static getAll() {
    try {
      const data = fs.readFileSync(dbFile, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Error reading database:', err);
      return [];
    }
  }

  static save(tasks) {
    try {
      fs.writeFileSync(dbFile, JSON.stringify(tasks, null, 2), 'utf-8');
      return true;
    } catch (err) {
      console.error('Error writing to database:', err);
      return false;
    }
  }
}

module.exports = TaskModel;
