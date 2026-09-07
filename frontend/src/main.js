/**
 * Frontend Main Entrypoint
 */

import { taskStore } from './store/taskStore.js';
import { taskApi } from './api/taskApi.js';
import { renderHeader } from './components/Header.js';
import { renderStats } from './components/Stats.js';
import { renderToolbar } from './components/Toolbar.js';
import { renderTaskList } from './components/TaskList.js';
import { renderTaskModal, openTaskModal } from './components/TaskModal.js';
import { renderConfirmModal, openConfirmModal } from './components/ConfirmModal.js';
import { Toast } from './components/Toast.js';

document.addEventListener('DOMContentLoaded', async () => {
  renderHeader('header-root', {
    onAddClick: () => openTaskModal()
  });

  renderTaskModal('modal-root', {
    onSubmit: handleTaskSubmit
  });

  renderConfirmModal('confirm-root');

  taskStore.subscribe((state) => {
    renderStats('stats-root', state.tasks);

    renderToolbar('toolbar-root', state, {
      onSearch: (query) => taskStore.setState({ searchQuery: query }),
      onFilter: (filter) => taskStore.setState({ filter }),
      onSort: (sort) => taskStore.setState({ sort }),
      onClearCompleted: handleClearCompletedPrompt
    });

    const filteredTasks = taskStore.getFilteredAndSortedTasks();
    renderTaskList('task-list-root', filteredTasks, state.tasks.length, {
      onAddClick: () => openTaskModal(),
      onToggle: handleToggleTask,
      onEdit: handleEditTask,
      onDelete: handleDeleteTaskPrompt
    });

    if (window.lucide) window.lucide.createIcons();
  });

  try {
    const tasks = await taskApi.getAllTasks();
    taskStore.setState({ tasks });
  } catch (err) {
    console.error('Gagal memuat task dari server:', err);
    Toast.show('Gagal memuat task dari server', 'danger');
  }
});

async function handleTaskSubmit(formData) {
  const { id, title, category, priority, deadline } = formData;

  if (id) {
    const updated = await taskApi.updateTask(id, { title, category, priority, deadline });
    const tasks = taskStore.getState().tasks.map(t => t.id === id ? updated : t);
    taskStore.setState({ tasks });
    Toast.show('Task berhasil diperbarui!', 'success');
  } else {
    const newTask = await taskApi.createTask({ title, category, priority, deadline });
    const tasks = [newTask, ...taskStore.getState().tasks];
    taskStore.setState({ tasks });
    Toast.show('Task baru berhasil ditambahkan!', 'success');
  }
}

async function handleToggleTask(id) {
  const updated = await taskApi.toggleTaskStatus(id);
  const tasks = taskStore.getState().tasks.map(t => t.id === id ? updated : t);
  taskStore.setState({ tasks });

  Toast.show(updated.completed ? 'Task ditandai selesai! 🎉' : 'Task dikembalikan ke belum selesai', 'info');
}

function handleEditTask(id) {
  const task = taskStore.getState().tasks.find(t => t.id === id);
  if (task) {
    openTaskModal(task);
  }
}

function handleDeleteTaskPrompt(id) {
  const task = taskStore.getState().tasks.find(t => t.id === id);
  if (!task) return;

  openConfirmModal({
    title: 'Hapus Task?',
    description: `Apakah Anda yakin ingin menghapus "${task.title}"? Tindakan ini tidak dapat dibatalkan.`,
    onConfirm: async () => {
      await taskApi.deleteTask(id);
      const tasks = taskStore.getState().tasks.filter(t => t.id !== id);
      taskStore.setState({ tasks });
      Toast.show('Task berhasil dihapus', 'danger');
    }
  });
}

function handleClearCompletedPrompt() {
  openConfirmModal({
    title: 'Hapus Semua Task Selesai?',
    description: 'Apakah Anda yakin ingin menghapus semua task yang telah ditandai sebagai selesai?',
    onConfirm: async () => {
      await taskApi.clearCompleted();
      const tasks = taskStore.getState().tasks.filter(t => !t.completed);
      taskStore.setState({ tasks });
      Toast.show('Semua task selesai berhasil dihapus', 'danger');
    }
  });
}
