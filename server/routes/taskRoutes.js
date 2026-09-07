const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  createTask,
  updateTask,
  toggleTaskStatus,
  deleteTask,
  clearCompleted
} = require('../controllers/taskController');

router.get('/', getAllTasks);
router.post('/', createTask);
router.delete('/completed/clear', clearCompleted);
router.put('/:id', updateTask);
router.patch('/:id/toggle', toggleTaskStatus);
router.delete('/:id', deleteTask);

module.exports = router;
