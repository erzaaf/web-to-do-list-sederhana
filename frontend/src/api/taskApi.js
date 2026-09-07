/**
 * Task API Client Service
 */

const API_BASE_URL = '/api/tasks';

export const taskApi = {
  async getAllTasks() {
    try {
      const response = await fetch(API_BASE_URL);
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      return result.data;
    } catch (err) {
      console.warn('Backend API offline, falling back to LocalStorage:', err.message);
      const local = localStorage.getItem('taskflow_tasks');
      return local ? JSON.parse(local) : [];
    }
  },

  async createTask(taskData) {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      return result.data;
    } catch (err) {
      console.warn('API Error, saving to LocalStorage:', err);
      const tasks = JSON.parse(localStorage.getItem('taskflow_tasks') || '[]');
      const newTask = {
        id: Date.now().toString(),
        ...taskData,
        completed: false,
        createdAt: Date.now()
      };
      tasks.unshift(newTask);
      localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
      return newTask;
    }
  },

  async updateTask(id, taskData) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      return result.data;
    } catch (err) {
      console.warn('API Error, updating LocalStorage:', err);
      let tasks = JSON.parse(localStorage.getItem('taskflow_tasks') || '[]');
      tasks = tasks.map(t => t.id === id ? { ...t, ...taskData } : t);
      localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
      return tasks.find(t => t.id === id);
    }
  },

  async toggleTaskStatus(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}/toggle`, {
        method: 'PATCH'
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      return result.data;
    } catch (err) {
      console.warn('API Error, toggling LocalStorage:', err);
      let tasks = JSON.parse(localStorage.getItem('taskflow_tasks') || '[]');
      let updated;
      tasks = tasks.map(t => {
        if (t.id === id) {
          updated = { ...t, completed: !t.completed };
          return updated;
        }
        return t;
      });
      localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
      return updated;
    }
  },

  async deleteTask(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      return true;
    } catch (err) {
      console.warn('API Error, deleting from LocalStorage:', err);
      let tasks = JSON.parse(localStorage.getItem('taskflow_tasks') || '[]');
      tasks = tasks.filter(t => t.id !== id);
      localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
      return true;
    }
  },

  async clearCompleted() {
    try {
      const response = await fetch(`${API_BASE_URL}/completed/clear`, {
        method: 'DELETE'
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      return true;
    } catch (err) {
      console.warn('API Error, clearing LocalStorage:', err);
      let tasks = JSON.parse(localStorage.getItem('taskflow_tasks') || '[]');
      tasks = tasks.filter(t => !t.completed);
      localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
      return true;
    }
  }
};
