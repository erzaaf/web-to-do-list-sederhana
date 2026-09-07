/**
 * Main Application Orchestrator
 */

import { store } from './store.js';
import { TaskAPI } from './api.js';
import { renderHeader } from './components/Header.js';
import { renderStats } from './components/Stats.js';
import { renderToolbar } from './components/Toolbar.js';
import { renderTaskList } from './components/TaskList.js';
import { renderTaskModal, openTaskModal } from './components/TaskModal.js';
import { renderConfirmModal, openConfirmModal } from './components/ConfirmModal.js';
import { Toast } from './components/Toast.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initial Static Component Mounts
  renderHeader('header-root', {
    onAddClick: () => openTaskModal()
  });

  renderTaskModal('modal-root', {
    onSubmit: handleTaskSubmit
  });

  renderConfirmModal('confirm-root');

  // 2. Subscribe Store State Changes to UI Rerender
  store.subscribe((state) => {
    renderStats('stats-root', state.tasks);

    renderToolbar('toolbar-root', state, {
      onSearch: (query) => store.setState({ searchQuery: query }),
      onFilter: (filter) => store.setState({ filter }),
      onSort: (sort) => store.setState({ sort }),
      onClearCompleted: handleClearCompletedPrompt
    });

    const filteredTasks = store.getFilteredAndSortedTasks();
    renderTaskList('task-list-root', filteredTasks, state.tasks.length, {
      onAddClick: () => openTaskModal(),
      onToggle: handleToggleTask,
      onEdit: handleEditTask,
      onDelete: handleDeleteTaskPrompt
    });

    if (window.lucide) window.lucide.createIcons();
  });

  // 3. Fetch Initial Data from Backend REST API
  try {
    const tasks = await TaskAPI.getAllTasks();
    store.setState({ tasks });
  } catch (err) {
    console.error('Failed to load initial tasks:', err);
    Toast.show('Gagal memuat task dari server', 'danger');
  }
});

// Handlers
async function handleTaskSubmit(formData) {
  const { id, title, category, priority, deadline } = formData;

  if (id) {
    // Edit existing task
    const updated = await TaskAPI.updateTask(id, { title, category, priority, deadline });
    const tasks = store.getState().tasks.map(t => t.id === id ? updated : t);
    store.setState({ tasks });
    Toast.show('Task berhasil diperbarui!', 'success');
  } else {
    // Create new task
    const newTask = await TaskAPI.createTask({ title, category, priority, deadline });
    const tasks = [newTask, ...store.getState().tasks];
    store.setState({ tasks });
    Toast.show('Task baru berhasil ditambahkan!', 'success');
  }
}

async function handleToggleTask(id) {
  const updated = await TaskAPI.toggleTaskStatus(id);
  const tasks = store.getState().tasks.map(t => t.id === id ? updated : t);
  store.setState({ tasks });

  Toast.show(updated.completed ? 'Task ditandai selesai! 🎉' : 'Task dikembalikan ke belum selesai', 'info');
}

function handleEditTask(id) {
  const task = store.getState().tasks.find(t => t.id === id);
  if (task) {
    openTaskModal(task);
  }
}

function handleDeleteTaskPrompt(id) {
  const task = store.getState().tasks.find(t => t.id === id);
  if (!task) return;

  openConfirmModal({
    title: 'Hapus Task?',
    description: `Apakah Anda yakin ingin menghapus "${task.title}"? Tindakan ini tidak dapat dibatalkan.`,
    onConfirm: async () => {
      await TaskAPI.deleteTask(id);
      const tasks = store.getState().tasks.filter(t => t.id !== id);
      store.setState({ tasks });
      Toast.show('Task berhasil dihapus', 'danger');
    }
  });
}

function handleClearCompletedPrompt() {
  openConfirmModal({
    title: 'Hapus Semua Task Selesai?',
    description: 'Apakah Anda yakin ingin menghapus semua task yang telah ditandai sebagai selesai?',
    onConfirm: async () => {
      await TaskAPI.clearCompleted();
      const tasks = store.getState().tasks.filter(t => !t.completed);
      store.setState({ tasks });
      Toast.show('Semua task selesai berhasil dihapus', 'danger');
    }
  });
}
