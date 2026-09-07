/**
 * TaskModal Component (Add & Edit Task Modal)
 */

export function renderTaskModal(containerId, callbacks) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div id="task-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm opacity-0 pointer-events-none transition-all duration-200">
      <div id="task-modal-card" class="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-md overflow-hidden transform scale-95 transition-all duration-200">
        
        <!-- Modal Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 id="modal-title" class="text-lg font-semibold text-slate-900">Tambah Task Baru</h3>
          <button id="close-modal-btn" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-all cursor-pointer">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Modal Form -->
        <form id="task-form" class="p-6 space-y-4">
          <input type="hidden" id="task-id-input">

          <!-- Title -->
          <div>
            <label for="task-title-input" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Judul Task <span class="text-rose-500">*</span></label>
            <input type="text" id="task-title-input" required placeholder="Contoh: Menyelesaikan laporan keuangan" 
              class="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all">
          </div>

          <!-- Category & Priority Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Category -->
            <div>
              <label for="task-category-input" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Kategori</label>
              <input type="text" id="task-category-input" placeholder="Pekerjaan, Personal, dll." 
                class="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all">
            </div>

            <!-- Priority -->
            <div>
              <label for="task-priority-input" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Prioritas</label>
              <div class="relative">
                <select id="task-priority-input" class="w-full appearance-none px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all cursor-pointer">
                  <option value="low">Rendah (Low)</option>
                  <option value="medium" selected>Sedang (Medium)</option>
                  <option value="high">Tinggi (High)</option>
                </select>
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                  <i data-lucide="chevron-down" class="w-4 h-4"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- Deadline Date -->
          <div>
            <label for="task-deadline-input" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Tanggal Deadline</label>
            <input type="date" id="task-deadline-input" 
              class="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all cursor-pointer">
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 mt-6">
            <button type="button" id="cancel-modal-btn" class="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all cursor-pointer">
              Batal
            </button>
            <button type="submit" class="px-5 py-2 text-sm font-medium bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-sm hover:shadow transition-all cursor-pointer">
              Simpan Task
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  const modal = document.getElementById('task-modal');
  const card = document.getElementById('task-modal-card');

  document.getElementById('close-modal-btn')?.addEventListener('click', closeModal);
  document.getElementById('cancel-modal-btn')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.getElementById('task-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('task-id-input').value;
    const title = document.getElementById('task-title-input').value.trim();
    const category = document.getElementById('task-category-input').value.trim();
    const priority = document.getElementById('task-priority-input').value;
    const deadline = document.getElementById('task-deadline-input').value;

    if (!title) return;

    callbacks.onSubmit({ id, title, category, priority, deadline });
    closeModal();
  });

  function closeModal() {
    card.classList.remove('scale-100');
    card.classList.add('scale-95');
    modal.classList.add('opacity-0', 'pointer-events-none');
  }
}

export function openTaskModal(task = null) {
  const modal = document.getElementById('task-modal');
  const card = document.getElementById('task-modal-card');
  const modalTitle = document.getElementById('modal-title');
  const form = document.getElementById('task-form');

  form.reset();

  if (task) {
    modalTitle.textContent = 'Edit Task';
    document.getElementById('task-id-input').value = task.id;
    document.getElementById('task-title-input').value = task.title;
    document.getElementById('task-category-input').value = task.category || '';
    document.getElementById('task-priority-input').value = task.priority || 'medium';
    document.getElementById('task-deadline-input').value = task.deadline || '';
  } else {
    modalTitle.textContent = 'Tambah Task Baru';
    document.getElementById('task-id-input').value = '';
  }

  modal.classList.remove('pointer-events-none', 'opacity-0');
  card.classList.remove('scale-95');
  card.classList.add('scale-100');

  setTimeout(() => document.getElementById('task-title-input')?.focus(), 100);
}
