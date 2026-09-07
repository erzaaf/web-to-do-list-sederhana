/**
 * Toast Notification Component
 */

export const Toast = {
  show(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const iconName = type === 'success' ? 'check-circle' : type === 'danger' ? 'trash-2' : 'info';
    const bgColor = type === 'success' ? 'bg-emerald-600' : type === 'danger' ? 'bg-rose-600' : 'bg-slate-800';

    toast.className = `toast-enter flex items-center gap-3 ${bgColor} text-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium pointer-events-auto`;
    toast.innerHTML = `
      <i data-lucide="${iconName}" class="w-4 h-4"></i>
      <span class="flex-1">${this.escapeHtml(message)}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.classList.remove('toast-enter');
      toast.classList.add('toast-exit');
      toast.addEventListener('animationend', () => toast.remove());
    }, 3000);
  },

  escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[m]);
  }
};
