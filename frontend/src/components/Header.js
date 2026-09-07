/**
 * Header Component
 */

export function renderHeader(containerId, { onAddClick }) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <header class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <div class="flex items-center gap-2">
          <div class="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
            <i data-lucide="check-square" class="w-5 h-5"></i>
          </div>
          <h1 class="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">Taskflow</h1>
        </div>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">Kelola tugas harian Anda dengan lebih rapi dan efisien.</p>
      </div>

      <button id="open-add-modal-btn" class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-medium rounded-xl shadow-sm hover:shadow transition-all duration-200 cursor-pointer">
        <i data-lucide="plus" class="w-4 h-4"></i>
        <span>Tambah Task</span>
      </button>
    </header>
  `;

  document.getElementById('open-add-modal-btn')?.addEventListener('click', onAddClick);
}
