/**
 * Task Store - Reactive Application State
 */

class TaskStore {
  constructor() {
    this.state = {
      tasks: [],
      filter: 'all', // 'all' | 'pending' | 'completed'
      sort: 'newest', // 'newest' | 'oldest' | 'priority' | 'deadline'
      searchQuery: '',
      loading: false
    };
    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  getFilteredAndSortedTasks() {
    let filtered = [...this.state.tasks];

    // Status filter
    if (this.state.filter === 'pending') {
      filtered = filtered.filter(t => !t.completed);
    } else if (this.state.filter === 'completed') {
      filtered = filtered.filter(t => t.completed);
    }

    // Search query filter
    if (this.state.searchQuery.trim()) {
      const q = this.state.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(q) || 
        (t.category && t.category.toLowerCase().includes(q))
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      if (this.state.sort === 'newest') return b.createdAt - a.createdAt;
      if (this.state.sort === 'oldest') return a.createdAt - b.createdAt;
      if (this.state.sort === 'priority') {
        const pWeight = { high: 3, medium: 2, low: 1 };
        return (pWeight[b.priority] || 2) - (pWeight[a.priority] || 2);
      }
      if (this.state.sort === 'deadline') {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      }
      return 0;
    });

    return filtered;
  }
}

export const taskStore = new TaskStore();
