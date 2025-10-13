// Alternância de tema (azul claro / preto com acento vermelho) com persistência
(function () {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");

  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const saved = localStorage.getItem("theme");
  const initial = saved || (prefersDark ? "dark" : "light");

  root.setAttribute("data-theme", initial);
  if (toggleBtn) toggleBtn.textContent = initial === "light" ? "🌙" : "☀️";

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      const next = current === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      toggleBtn.textContent = next === "light" ? "🌙" : "☀️";
    });
  }

  // Pixel toggle (clicar na imagem para pixelizar) e filtros/modal (delegação)
  (function () {
    const img = document.querySelector('.hero-image.pixel-toggle');
    if (img) {
      img.setAttribute('role', 'button');
      img.setAttribute('tabindex', '0');
      img.setAttribute('aria-pressed', img.classList.contains('pixel') ? 'true' : 'false');
      function togglePixel() {
        img.classList.toggle('pixel');
        img.setAttribute('aria-pressed', img.classList.contains('pixel') ? 'true' : 'false');
      }
      img.addEventListener('click', togglePixel);
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); togglePixel(); }
      });
    }

    // Filtros de projetos
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectGrid = document.querySelector('.projects-grid');
    if (filterBtns.length && projectGrid) {
      const cards = Array.from(projectGrid.querySelectorAll('.project-card'));
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const filter = btn.getAttribute('data-filter');
          cards.forEach(card => {
            const tags = (card.getAttribute('data-tags') || '').split(' ').filter(Boolean);
            const show = filter === 'all' || tags.includes(filter);
            card.style.display = show ? '' : 'none';
          });
        });
      });
    }

    // Modal de projetos
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    const backdrop = modal.querySelector('.project-modal-backdrop');
    const closeBtn = modal.querySelector('.project-modal-close');
    const titleEl = modal.querySelector('.project-modal-title');
    const descEl = modal.querySelector('.project-modal-desc');
    const primary = modal.querySelector('#project-modal-primary');
    const secondary = modal.querySelector('#project-modal-secondary');

    const details = {
      "dashboard-minimal": {
        title: "Dashboard minimal",
        desc: "Design de painel focado em leitura, contraste e hierarquia suave.",
        primary: "#",
        secondary: "#"
      },
      "marca-8bit": {
        title: "Marca 8-bit",
        desc: "Sistema visual com estética pixel e grade modular.",
        primary: "#",
        secondary: "#"
      },
      "landing-pastel": {
        title: "Landing pastel",
        desc: "Página com hero diferenciado e micro-interações suaves.",
        primary: "#",
        secondary: "#"
      },
      "portfolio-pixel": {
        title: "Portfolio pixel",
        desc: "Site pessoal com tema claro azul e escuro preto + vermelho.",
        primary: "#",
        secondary: "#"
      }
    };

    function openModal(key) {
      const d = details[key];
      if (!d) return;
      titleEl.textContent = d.title;
      descEl.textContent = d.desc;
      primary.href = d.primary || '#';
      secondary.href = d.secondary || '#';
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      closeBtn && closeBtn.focus();
    }
    function closeModal() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }

    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-project]');
      if (trigger) {
        e.preventDefault();
        const key = trigger.getAttribute('data-project');
        openModal(key);
      }
    });

    backdrop && backdrop.addEventListener('click', closeModal);
    closeBtn && closeBtn.addEventListener('click', closeModal);
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  })();
})();
