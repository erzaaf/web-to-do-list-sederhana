/**
 * Statistics Component
 */

export function renderStats(containerId, tasks) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  container.innerHTML = `
    <section class="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
      <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-slate-100 text-slate-600 hidden sm:block">
            <i data-lucide="list-todo" class="w-5 h-5"></i>
          </div>
          <div>
            <p class="text-xs font-medium text-slate-500">Total Task</p>
            <h3 class="text-xl sm:text-2xl font-bold text-slate-900">${total}</h3>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-amber-50 text-amber-600 hidden sm:block">
            <i data-lucide="clock" class="w-5 h-5"></i>
          </div>
          <div>
            <p class="text-xs font-medium text-slate-500">Belum Selesai</p>
            <h3 class="text-xl sm:text-2xl font-bold text-amber-600">${pending}</h3>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-emerald-50 text-emerald-600 hidden sm:block">
            <i data-lucide="check-circle-2" class="w-5 h-5"></i>
          </div>
          <div>
            <p class="text-xs font-medium text-slate-500">Selesai</p>
            <h3 class="text-xl sm:text-2xl font-bold text-emerald-600">${completed}</h3>
          </div>
        </div>
      </div>
    </section>
  `;
}
