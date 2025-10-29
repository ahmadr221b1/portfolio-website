document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const toggleBtn = document.getElementById('theme-toggle');
  const footerYear = document.getElementById('current-year');
  const footerName = document.getElementById('footer-name');
  const videoTriggers = document.querySelectorAll('.video-trigger');
  const formSuccess = document.getElementById('form-success');

  const sunIcon = `
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5"></circle>
      <g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
        <line x1="12" y1="3" x2="12" y2="5"></line>
        <line x1="12" y1="19" x2="12" y2="21"></line>
        <line x1="21" y1="12" x2="19" y2="12"></line>
        <line x1="5" y1="12" x2="3" y2="12"></line>
        <line x1="18.364" y1="5.636" x2="16.95" y2="7.05"></line>
        <line x1="7.05" y1="16.95" x2="5.636" y2="18.364"></line>
        <line x1="18.364" y1="18.364" x2="16.95" y2="16.95"></line>
        <line x1="7.05" y1="7.05" x2="5.636" y2="5.636"></line>
      </g>
    </svg>
  `;

  const moonIcon = `
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor"></path>
    </svg>
  `;

  function updateToggleIcon(theme) {
    if (!toggleBtn) return;
    toggleBtn.innerHTML = theme === 'dark' ? moonIcon : sunIcon;
    toggleBtn.setAttribute('data-icon', theme === 'dark' ? 'moon' : 'sun');
    toggleBtn.setAttribute('aria-pressed', theme === 'dark');
  }

  // Set current year automatically
  const now = new Date();
  footerYear.textContent = now.getFullYear();

  // Optionally set your name in the footer based on hero name
  const heroName = document.getElementById('hero-name');
  if (heroName) {
    footerName.textContent = heroName.textContent.replace(/\s+/g, ' ');
  }

  // Theme toggle functionality
  function applyTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
    updateToggleIcon(theme);
  }

  // Determine saved theme from localStorage or use system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    // Use system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = body.classList.contains('dark') ? 'dark' : 'light';
      const newTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  videoTriggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-video-id');
      if (!id) return;
      const url = `https://www.youtube.com/watch?v=${id}`;
      window.open(url, '_blank', 'noopener');
    });
  });

  // Contact form success message
  const params = new URLSearchParams(window.location.search);
  if (formSuccess && params.get('form') === 'sent') {
    formSuccess.hidden = false;
    // Clean the URL so the message doesn't persist after refresh
    const newUrl = window.location.origin + window.location.pathname + window.location.hash;
    window.history.replaceState({}, '', newUrl);
  }

  // Skills category switching
  const categoryButtons = document.querySelectorAll('.category-btn');
  const skillSets = document.querySelectorAll('.skill-set');

  categoryButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      categoryButtons.forEach((b) => b.classList.remove('active'));
      // Add active to clicked
      btn.classList.add('active');
      // Hide all skill sets
      skillSets.forEach((set) => set.classList.add('hidden'));
      // Show target skill set
      const targetId = btn.getAttribute('data-category');
      const targetSet = document.getElementById(targetId);
      if (targetSet) {
        targetSet.classList.remove('hidden');
      }
    });
  });
});
