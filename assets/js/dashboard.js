/**
 * Vocalis - Clinical Admin Dashboard Scripts
 * Chart.js configurations, table filters & patient status management
 */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardCharts();
  initPatientTableFilters();
  initSidebarToggle();
});

function initDashboardCharts() {
  const assessChartCanvas = document.getElementById('assessmentsChart');
  const conditionsChartCanvas = document.getElementById('conditionsDoughnutChart');

  if (typeof Chart === 'undefined') return;

  // Chart 1: Assessment Volume & Success Rates
  if (assessChartCanvas) {
    const isDark = document.documentElement.classList.contains('dark');
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';
    const textColor = isDark ? '#94a3b8' : '#64748b';

    new Chart(assessChartCanvas, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Clinical Assessments Completed',
            data: [65, 82, 90, 115, 128, 142, 160, 175, 182, 195, 210, 230],
            backgroundColor: 'rgba(14, 165, 233, 0.85)',
            borderRadius: 8,
            barThickness: 16
          },
          {
            label: 'Milestone Goal Graduations',
            data: [40, 52, 68, 80, 95, 108, 122, 134, 140, 155, 170, 188],
            backgroundColor: 'rgba(16, 185, 129, 0.85)',
            borderRadius: 8,
            barThickness: 16
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: textColor,
              font: { family: 'Plus Jakarta Sans', size: 12, weight: 600 }
            }
          },
          tooltip: {
            backgroundColor: '#0f172a',
            padding: 12,
            cornerRadius: 8
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: textColor }
          },
          y: {
            grid: { color: gridColor },
            ticks: { color: textColor }
          }
        }
      }
    });
  }

  // Chart 2: Clinical Condition Distribution
  if (conditionsChartCanvas) {
    new Chart(conditionsChartCanvas, {
      type: 'doughnut',
      data: {
        labels: [
          'Child Speech Delay (38%)',
          'Articulation & Phonics (24%)',
          'Stuttering & Fluency (16%)',
          'Adult Neuro-Rehab (12%)',
          'Autism & AAC Devices (10%)'
        ],
        datasets: [{
          data: [38, 24, 16, 12, 10],
          backgroundColor: [
            '#06b6d4', // Cyan
            '#8b5cf6', // Violet
            '#f97316', // Coral
            '#10b981', // Emerald
            '#f43f5e'  // Rose
          ],
          borderWidth: 0,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              padding: 14,
              color: document.documentElement.classList.contains('dark') ? '#cbd5e1' : '#475569',
              font: { family: 'Plus Jakarta Sans', size: 11, weight: 500 }
            }
          }
        }
      }
    });
  }
}

function initPatientTableFilters() {
  const search = document.getElementById('patientSearchInput');
  const statusFilter = document.getElementById('statusFilterSelect');
  const rows = document.querySelectorAll('.patient-table-row');

  function filterTable() {
    const term = search ? search.value.toLowerCase().trim() : '';
    const status = statusFilter ? statusFilter.value.toLowerCase() : 'all';

    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      const rowStatus = row.dataset.status ? row.dataset.status.toLowerCase() : '';
      const matchesSearch = text.includes(term);
      const matchesStatus = (status === 'all' || rowStatus === status);

      if (matchesSearch && matchesStatus) {
        row.classList.remove('hidden');
      } else {
        row.classList.add('hidden');
      }
    });
  }

  if (search) search.addEventListener('input', filterTable);
  if (statusFilter) statusFilter.addEventListener('change', filterTable);
}

function initSidebarToggle() {
  const sidebarBtn = document.getElementById('adminSidebarToggle');
  const sidebar = document.getElementById('adminSidebar');
  const overlay = document.getElementById('adminSidebarOverlay');

  if (!sidebarBtn || !sidebar) return;

  sidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('-translate-x-full');
    if (overlay) overlay.classList.toggle('hidden');
  });

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.add('-translate-x-full');
      overlay.classList.add('hidden');
    });
  }
}
