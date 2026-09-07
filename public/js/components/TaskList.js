/**
 * TaskList & Empty State Component
 */

import { renderTaskItem } from './TaskItem.js';

export function renderTaskList(containerId, filteredTasks, totalTasksCount, callbacks) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (filteredTasks.length === 0) {
    const isSearchOrFilterActive = totalTasksCount > 0;
    
    container.innerHTML = `
      <div class="flex flex-col items-center justify-center py-12 px-4 text-center bg-white rounded-2xl border border-dashed border-slate-200">
        <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
          <i data-lucide="${isSearchOrFilterActive ? 'search-x' : 'clipboard-list'}" class="w-8 h-8"></i>
        </div>
        <h3 class="text-base font-semibold text-slate-700">
          ${isSearchOrFilterActive ? 'Task tidak ditemukan' : 'Belum ada task'}
        </h3>
        <p class="text-sm text-slate-500 max-w-xs mt-1">
          ${isSearchOrFilterActive 
            ? 'Coba sesuaikan kata kunci pencarian atau filter Anda.' 
            : 'Tambahkan task baru Anda untuk memulai mengatur kegiatan hari ini.'}
        </p>
        ${!isSearchOrFilterActive ? `
          <button id="empty-add-btn" class="mt-4 px-4 py-2 bg-brand-50 hover:bg-brand-100 text-brand-600 font-medium text-sm rounded-xl transition-all duration-200 cursor-pointer inline-flex items-center gap-2">
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>Buat Task Pertama</span>
          </button>
        ` : ''}
      </div>
    `;

    document.getElementById('empty-add-btn')?.addEventListener('click', callbacks.onAddClick);
    return;
  }

  container.innerHTML = `
    <ul class="space-y-3">
      ${filteredTasks.map(renderTaskItem).join('')}
    </ul>
  `;

  // Attach Delegated Event Listeners for toggle, edit, delete
  container.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = btn.dataset.action;
      const id = btn.dataset.id;

      if (action === 'toggle') callbacks.onToggle(id);
      if (action === 'edit') callbacks.onEdit(id);
      if (action === 'delete') callbacks.onDelete(id);
    });
  });
}
