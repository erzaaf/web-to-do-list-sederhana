const db = require('../config/db');

// @desc    Get all tasks
// @route   GET /api/tasks
exports.getAllTasks = (req, res) => {
  try {
    const tasks = db.getTasks();
    res.json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create new task
// @route   POST /api/tasks
exports.createTask = (req, res) => {
  try {
    const { title, category, priority, deadline } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ success: false, message: 'Judul task wajib diisi' });
    }

    const tasks = db.getTasks();
    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      category: category ? category.trim() : '',
      priority: priority || 'medium',
      deadline: deadline || '',
      completed: false,
      createdAt: Date.now()
    };

    tasks.unshift(newTask);
    db.saveTasks(tasks);

    res.status(201).json({ success: true, data: newTask, message: 'Task berhasil ditambahkan' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
exports.updateTask = (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, priority, deadline, completed } = req.body;

    let tasks = db.getTasks();
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Task tidak ditemukan' });
    }

    tasks[index] = {
      ...tasks[index],
      title: title !== undefined ? title.trim() : tasks[index].title,
      category: category !== undefined ? category.trim() : tasks[index].category,
      priority: priority !== undefined ? priority : tasks[index].priority,
      deadline: deadline !== undefined ? deadline : tasks[index].deadline,
      completed: completed !== undefined ? Boolean(completed) : tasks[index].completed
    };

    db.saveTasks(tasks);

    res.json({ success: true, data: tasks[index], message: 'Task berhasil diperbarui' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Toggle task status (completed / pending)
// @route   PATCH /api/tasks/:id/toggle
exports.toggleTaskStatus = (req, res) => {
  try {
    const { id } = req.params;
    let tasks = db.getTasks();
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Task tidak ditemukan' });
    }

    tasks[index].completed = !tasks[index].completed;
    db.saveTasks(tasks);

    res.json({ success: true, data: tasks[index], message: 'Status task berhasil diubah' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete single task
// @route   DELETE /api/tasks/:id
exports.deleteTask = (req, res) => {
  try {
    const { id } = req.params;
    let tasks = db.getTasks();
    const exists = tasks.some(t => t.id === id);

    if (!exists) {
      return res.status(404).json({ success: false, message: 'Task tidak ditemukan' });
    }

    tasks = tasks.filter(t => t.id !== id);
    db.saveTasks(tasks);

    res.json({ success: true, message: 'Task berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete all completed tasks
// @route   DELETE /api/tasks/completed/clear
exports.clearCompleted = (req, res) => {
  try {
    let tasks = db.getTasks();
    const initialCount = tasks.length;
    tasks = tasks.filter(t => !t.completed);

    db.saveTasks(tasks);

    res.json({ 
      success: true, 
      message: 'Semua task selesai berhasil dihapus',
      deletedCount: initialCount - tasks.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
