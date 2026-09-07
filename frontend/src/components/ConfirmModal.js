/**
 * ConfirmModal Component
 */

let onConfirmCallback = null;

export function renderConfirmModal(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div id="confirm-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm opacity-0 pointer-events-none transition-all duration-200">
      <div id="confirm-modal-card" class="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-sm p-6 transform scale-95 transition-all duration-200 text-center">
        <div class="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <i data-lucide="alert-triangle" class="w-6 h-6"></i>
        </div>
        <h3 id="confirm-modal-title" class="text-lg font-semibold text-slate-900">Konfirmasi Hapus</h3>
        <p id="confirm-modal-desc" class="text-sm text-slate-500 mt-2 mb-6">Apakah Anda yakin ingin menghapus task ini?</p>
        <div class="flex items-center justify-center gap-3">
          <button id="confirm-cancel-btn" class="w-full py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer">
            Batal
          </button>
          <button id="confirm-action-btn" class="w-full py-2.5 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-sm transition-all cursor-pointer">
            Hapus
          </button>
        </div>
      </div>
    </div>
  `;

  const modal = document.getElementById('confirm-modal');
  const card = document.getElementById('confirm-modal-card');

  document.getElementById('confirm-cancel-btn')?.addEventListener('click', closeConfirmModal);
  document.getElementById('confirm-action-btn')?.addEventListener('click', () => {
    if (typeof onConfirmCallback === 'function') {
      onConfirmCallback();
    }
    closeConfirmModal();
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeConfirmModal();
  });
}

export function openConfirmModal({ title, description, onConfirm }) {
  const modal = document.getElementById('confirm-modal');
  const card = document.getElementById('confirm-modal-card');

  document.getElementById('confirm-modal-title').textContent = title || 'Konfirmasi Hapus';
  document.getElementById('confirm-modal-desc').textContent = description || 'Apakah Anda yakin?';

  onConfirmCallback = onConfirm;

  modal.classList.remove('pointer-events-none', 'opacity-0');
  card.classList.remove('scale-95');
  card.classList.add('scale-100');
}

export function closeConfirmModal() {
  const modal = document.getElementById('confirm-modal');
  const card = document.getElementById('confirm-modal-card');

  card.classList.remove('scale-100');
  card.classList.add('scale-95');
  modal.classList.add('opacity-0', 'pointer-events-none');
  onConfirmCallback = null;
}
