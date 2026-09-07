/**
 * Toolbar Component (Search, Sort, Filter & Clear Completed)
 */

export function renderToolbar(containerId, state, callbacks) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const { filter, sort, searchQuery, tasks } = state;
  const completedCount = tasks.filter(t => t.completed).length;

  container.innerHTML = `
    <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-6 space-y-4">
      <!-- Top Row: Search & Sort -->
      <div class="flex flex-col sm:flex-row gap-3">
        <!-- Search Input -->
        <div class="relative flex-1">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <i data-lucide="search" class="w-4 h-4"></i>
          </div>
          <input type="text" id="search-input" value="${escapeHtml(searchQuery)}" placeholder="Cari task berdasarkan judul atau kategori..." 
            class="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all duration-200">
          <button id="clear-search-btn" class="${searchQuery ? '' : 'hidden'} absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <!-- Sort Select -->
        <div class="flex items-center gap-2">
          <label for="sort-select" class="text-xs font-medium text-slate-500 whitespace-nowrap hidden sm:inline">Urutkan:</label>
          <div class="relative w-full sm:w-48">
            <select id="sort-select" class="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm py-2.5 pl-3 pr-8 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all duration-200 cursor-pointer">
              <option value="newest" ${sort === 'newest' ? 'selected' : ''}>Terbaru</option>
              <option value="oldest" ${sort === 'oldest' ? 'selected' : ''}>Terlama</option>
              <option value="priority" ${sort === 'priority' ? 'selected' : ''}>Prioritas (Tinggi → Rendah)</option>
              <option value="deadline" ${sort === 'deadline' ? 'selected' : ''}>Deadline Terdekat</option>
            </select>
            <div class="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400">
              <i data-lucide="chevron-down" class="w-4 h-4"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Row: Filter Tabs & Clear Completed -->
      <div class="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
        <!-- Filter Tabs -->
        <div class="flex items-center bg-slate-100/80 p-1 rounded-xl gap-1 text-xs sm:text-sm">
          <button data-filter="all" class="filter-btn ${filter === 'all' ? 'active-filter' : 'text-slate-600'} px-3 py-1.5 rounded-lg font-medium transition-all duration-200 cursor-pointer">
            Semua
          </button>
          <button data-filter="pending" class="filter-btn ${filter === 'pending' ? 'active-filter' : 'text-slate-600'} px-3 py-1.5 rounded-lg font-medium transition-all duration-200 cursor-pointer">
            Belum Selesai
          </button>
          <button data-filter="completed" class="filter-btn ${filter === 'completed' ? 'active-filter' : 'text-slate-600'} px-3 py-1.5 rounded-lg font-medium transition-all duration-200 cursor-pointer">
            Selesai
          </button>
        </div>

        <!-- Clear Completed Button -->
        <button id="clear-completed-btn" ${completedCount === 0 ? 'disabled' : ''} class="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-all duration-200 font-medium disabled:opacity-40 disabled:pointer-events-none cursor-pointer">
          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          <span>Hapus Selesai</span>
        </button>
      </div>
    </div>
  `;

  // Attach Listeners
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const sortSelect = document.getElementById('sort-select');
  const filterBtns = container.querySelectorAll('.filter-btn');
  const clearCompletedBtn = document.getElementById('clear-completed-btn');

  searchInput?.addEventListener('input', (e) => callbacks.onSearch(e.target.value));
  clearSearchBtn?.addEventListener('click', () => callbacks.onSearch(''));
  sortSelect?.addEventListener('change', (e) => callbacks.onSort(e.target.value));
  filterBtns.forEach(btn => btn.addEventListener('click', () => callbacks.onFilter(btn.dataset.filter)));
  clearCompletedBtn?.addEventListener('click', callbacks.onClearCompleted);
}

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[m]);
}
