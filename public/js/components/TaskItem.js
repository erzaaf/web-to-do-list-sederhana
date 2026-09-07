/**
 * TaskItem Component - Single Task Card Renderer
 */

export function renderTaskItem(task) {
  const priorityBadge = {
    high: 'bg-rose-50 text-rose-600 border-rose-200/60',
    medium: 'bg-amber-50 text-amber-600 border-amber-200/60',
    low: 'bg-slate-100 text-slate-600 border-slate-200/60'
  }[task.priority] || 'bg-slate-100 text-slate-600';

  const priorityLabel = {
    high: 'Tinggi',
    medium: 'Sedang',
    low: 'Rendah'
  }[task.priority] || 'Sedang';

  // Deadline Formatting
  let deadlineBadge = '';
  if (task.deadline) {
    const todayStr = new Date().toISOString().split('T')[0];
    const isOverdue = !task.completed && task.deadline < todayStr;
    const isToday = task.deadline === todayStr;

    let deadlineColor = 'text-slate-500 bg-slate-100';
    if (isOverdue) deadlineColor = 'text-rose-600 bg-rose-50 border border-rose-200/60 font-medium';
    else if (isToday) deadlineColor = 'text-amber-600 bg-amber-50 border border-amber-200/60 font-medium';

    const formattedDate = formatDate(task.deadline);
    deadlineBadge = `
      <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs ${deadlineColor}">
        <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
        <span>${isToday ? 'Hari ini' : formattedDate}</span>
      </div>
    `;
  }

  // Category Tag
  const categoryTag = task.category ? `
    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-brand-50 text-brand-600 border border-brand-100">
      <i data-lucide="tag" class="w-3 h-3"></i>
      ${escapeHtml(task.category)}
    </span>
  ` : '';

  return `
    <li class="group bg-white rounded-2xl border border-slate-200/80 p-4 transition-all duration-200 hover:shadow-md ${
      task.completed ? 'bg-slate-50/70 border-slate-200 opacity-80' : ''
    }">
      <div class="flex items-start gap-3">
        <!-- Checkbox Button -->
        <button data-action="toggle" data-id="${task.id}" class="mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
          task.completed 
            ? 'bg-brand-600 border-brand-600 text-white' 
            : 'border-slate-300 hover:border-brand-500 bg-white'
        }">
          <i data-lucide="check" class="w-3.5 h-3.5 ${task.completed ? 'block' : 'hidden'}"></i>
        </button>

        <!-- Task Details -->
        <div class="flex-1 min-w-0">
          <h4 class="text-sm sm:text-base font-medium text-slate-800 break-words ${
            task.completed ? 'line-through text-slate-400' : ''
          }">${escapeHtml(task.title)}</h4>
          
          <!-- Metadata Badges -->
          <div class="flex flex-wrap items-center gap-2 mt-2">
            <!-- Priority -->
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border ${priorityBadge}">
              <span class="w-1.5 h-1.5 rounded-full ${task.priority === 'high' ? 'bg-rose-500' : task.priority === 'medium' ? 'bg-amber-500' : 'bg-slate-400'}"></span>
              ${priorityLabel}
            </span>

            <!-- Category -->
            ${categoryTag}

            <!-- Deadline -->
            ${deadlineBadge}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <button data-action="edit" data-id="${task.id}" title="Edit Task" class="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all cursor-pointer">
            <i data-lucide="edit-3" class="w-4 h-4"></i>
          </button>
          <button data-action="delete" data-id="${task.id}" title="Hapus Task" class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    </li>
  `;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateStr).toLocaleDateString('id-ID', options);
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
