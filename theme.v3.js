// Alternância de tema (azul claro / preto com acento vermelho) com persistência
(function () {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");

  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

  root.setAttribute("data-theme", initialTheme);
  if (toggleBtn) toggleBtn.textContent = initialTheme === "light" ? "🌙" : "☀️";

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      const next = current === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      toggleBtn.textContent = next === "light" ? "🌙" : "☀️";
    });
  }

  // Pixel toggle (clicar na imagem para pixelizar)
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
  })();

  // Filtros de projetos
  (function () {
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
  })();

  // Dropdown do Currículo
  (function () {
    const cvBtn = document.getElementById('cv-dropdown-btn');
    const cvMenu = document.getElementById('cv-dropdown-menu');
    if (!cvBtn || !cvMenu) return;

    cvBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Impede que o clique feche o menu imediatamente
      cvMenu.classList.toggle('active');
    });

    // Fecha o menu se clicar fora
    window.addEventListener('click', (e) => {
      if (!cvBtn.contains(e.target) && !cvMenu.contains(e.target)) {
        cvMenu.classList.remove('active');
      }
    });
  })();

  // Modal de projetos e Lógica de Tradução
  (function () {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    
    // --- Textos e Traduções ---
    const translations = {
      'pt': {
        'title': 'Samuel — Portfólio',
        'nav-projects': 'Projetos',
        'nav-courses': 'Cursos',
        'nav-about': 'Sobre',
        'nav-skills': 'Habilidades',
        'nav-contact': 'Contato',
        'hero-title': 'Samuel. Programador Full-Stack.',
        'hero-sub': 'Apaixonado por criar soluções digitais simples e eficientes que conectam pessoas e ideias, sempre buscando mais conecimento e inovação.',
        'hero-btn-projects': 'Ver projetos',
        'hero-btn-contact': 'Falar comigo',
        'hero-btn-cv': '📄 Curriculo',
        'cv-pt': 'Português (PT)',
        'cv-en': 'Inglês (EN)',
        'projects-title': 'Projetos',
        'filter-all': 'Todos',
        'filter-web': 'Web',
        'filter-delivery': 'Delivery',
        'filter-ecommerce': 'E-commerce',
        'project-fretefast-title': 'FreteFast',
        'project-fretefast-desc': 'Site desenvolvido para uma feira com foco em delivery rápido e eficiente.',
        'project-pizzaria-title': 'Delivery Pizzaria',
        'project-pizzaria-desc': 'Plataforma de pedidos online para uma pizzaria, com foco na experiência do usuário e design responsivo.',
        'project-farmacia-title': 'Farmácia Inteligente',
        'project-farmacia-desc': 'E-commerce farmacêutico com assistente de IA para recomendações e atendimento personalizado.',
        'btn-details': 'Ver detalhes',
        'btn-details-ia': 'Ver detalhes (IA)',
        'btn-visit': 'Visitar',
        'about-title': 'Sobre',
        'about-desc': 'Sou Samuel, um jovem desenvolvedor apaixonado por tecnologia, design digital e experiências web inovadoras. Atualmente, estou cursando Desenvolvimento de Software e Multiplataformas (DSM) na Fatec, onde aprofundo meus conhecimentos em Front-end, Back-end e banco de dados, explorando novas ferramentas e técnicas para criar projetos cada vez mais completos.',
        'contact-title': 'Contato',
        'contact-desc': 'Aberto a colaborações e novos projetos. Envie um e-mail para <a href="mailto:samu.santos.lopes.2007@gmail.com">samu.santos.lopes.2007@gmail.com</a> ou me chame no LinkedIn.',
        'contact-btn-email': 'Enviar e-mail',
        'footer-made': 'Desenvolvido com ☕', 
        'modal-tech-title': 'Tecnologias Usadas',
        'modal-close-label': 'Fechar',
        
        // --- CHAVES DA SEÇÃO DE CURSOS (ATUALIZADAS) ---
        'courses-title': 'Cursos e Certificações',
        'btn-certificate': 'Ver Certificado',
        'btn-enrolled': 'Ver Matrícula',
        
        'course-ebac-fs-title': 'Profissão: Desenvolvedor Full Stack Python',
        'course-ebac-fs-inst': 'EBAC',
        'course-ebac-fs-desc': 'Curso profissionalizante focado em Python, Django, e infraestrutura. (Cursando)',
        
        'course-ebac-ia-title': 'Inteligência Artificial',
        'course-ebac-ia-inst': 'EBAC',
        'course-ebac-ia-desc': 'Curso de participação cobrindo os conceitos e aplicações de Inteligência Artificial.',
        
        'course-bradesco-excel-title': 'Microsoft Excel 2016 (Trilha)',
        'course-bradesco-excel-inst': 'Fund. Bradesco',
        'course-bradesco-excel-desc': 'Trilha de conhecimento completa (Básico, Intermediário e Avançado) da ferramenta.',
        
        'course-inova-title': 'Escola de ',
        'course-inova-inst': 'INOVA CPS',
        'course-inova-desc': 'Programa de 40 horas sobre Engajar, Idear, Prototipar, Testar e Crescer.',
        
        'course-bradesco-py-title': 'Desenvolvimento Orientado a Objetos com Python',
        'course-bradesco-py-inst': 'Fund. Bradesco',
        'course-bradesco-py-desc': 'Curso autoinstrucional focado nos conceitos de POO aplicados à linguagem Python.',
        
        // --- CHAVES DA SEÇÃO DE HABILIDADES ---
        'skills-title': 'Minhas Habilidades',
        'skill-php': 'PHP',
        'skill-python': 'Python',
        'skill-js': 'JavaScript',
        'skill-mysql': 'MySQL',
        'skill-aws': 'AWS',
        'skill-html': 'HTML5',
        'skill-css': 'CSS3',
        'skill-figma': 'Figma',
        'skill-react': 'React',
        'skill-flask': 'Flask',
        'skill-csharp': 'C#',
        'skill-bootstrap': 'Bootstrap',
        'skill-git': 'Git',
        'skill-docker': 'Docker',
      },
      'en': {
        'title': 'Samuel — Portfolio',
        'nav-projects': 'Projects',
        'nav-courses': 'Courses',
        'nav-about': 'About',
        'nav-skills': 'Skills',
        'nav-contact': 'Contact',
        'hero-title': 'Samuel. Full-Stack Developer.',
        'hero-sub': 'Developer with hands-on experience in e-commerce projects (PHP and HTML/CSS) and Linux server administration on AWS (EC2, SSH).',
        'hero-btn-projects': 'View projects',
        'hero-btn-contact': 'Contact me',
        'hero-btn-cv': '📄 Resume',
        'cv-pt': 'Portuguese (PT)',
        'cv-en': 'English (EN)',
        'projects-title': 'Featured Projects',
        'filter-all': 'All',
        'filter-web': 'Web',
        'filter-delivery': 'Delivery',
        'filter-ecommerce': 'E-commerce',
        'project-fretefast-title': 'Market Delivery Site',
        'project-fretefast-desc': 'Created the UI for an e-commerce site focused on market item delivery, featuring product listings, prices, and quantity selection.',
        'project-pizzaria-title': 'Pizzeria System',
        'project-pizzaria-desc': 'Developed an online ordering system for a pizzeria, featuring a functional shopping cart in PHP integrated with a MySQL database.',
        'project-farmacia-title': 'Smart Pharmacy',
        'project-farmacia-desc': 'Pharmaceutical e-commerce with an AI assistant for recommendations and personalized service.',
        'btn-details': 'View details',
        'btn-details-ia': 'View details (AI)',
        'btn-visit': 'Visit',
        'about-title': 'About',
        'about-desc': 'I am Samuel, a young developer passionate about technology, digital design, and innovative web experiences. I am currently studying Multiplatform Software Development (DSM) at Fatec, where I am deepening my knowledge in Front-end, Back-end, and databases, exploring new tools and techniques to create ever-more complete projects.',
        'contact-title': 'Contact',
        'contact-desc': 'Open to collaborations and new projects. Send an email to <a href="mailto:samu.santos.lopes.2007@gmail.com">samu.santos.lopes.2007@gmail.com</a> or reach out on LinkedIn.',
        'contact-btn-email': 'Send email',
        'footer-made': 'Developed with ☕', 
        'modal-tech-title': 'Technologies Used',
        'modal-close-label': 'Close',
        
        // --- KEYS FOR COURSES SECTION (UPDATED) ---
        'courses-title': 'Courses & Certifications',
        'btn-certificate': 'View Certificate',
        'btn-enrolled': 'View Enrollment',

        'course-ebac-fs-title': 'Profession: Full Stack Python Developer',
        'course-ebac-fs-inst': 'EBAC',
        'course-ebac-fs-desc': 'Professional course focused on Python, Django, and infrastructure. (Enrolled)',

        'course-ebac-ia-title': 'Artificial Intelligence',
        'course-ebac-ia-inst': 'EBAC ',
        'course-ebac-ia-desc': 'Participation course covering the concepts and applications of Artificial Intelligence.',

        'course-bradesco-excel-title': 'Microsoft Excel 2016 (Track)',
        'course-bradesco-excel-inst': 'Fund. Bradesco ',
        'course-bradesco-excel-desc': 'Complete knowledge track (Basic, Intermediate, and Advanced) of the tool.',

        'course-inova-title': 'School of Innovators',
        'course-inova-inst': 'INOVA CPS',
        'course-inova-desc': '40-hour program on Engaging, Ideating, Prototyping, Testing, and Growing.',

        'course-bradesco-py-title': 'Object-Oriented Development with Python',
        'course-bradesco-py-inst': 'Fund. Bradesco',
        'course-bradesco-py-desc': 'Self-taught course focused on OOP concepts applied to the Python language.',
        
        // --- KEYS FOR SKILLS SECTION ---
        'skills-title': 'My Skills',
        'skill-php': 'PHP',
        'skill-python': 'Python',
        'skill-js': 'JavaScript',
        'skill-mysql': 'MySQL',
        'skill-aws': 'AWS',
        'skill-html': 'HTML5',
        'skill-css': 'CSS3',
        'skill-figma': 'Figma',
        'skill-react': 'React',
        'skill-flask': 'Flask',
        'skill-csharp': 'C#',
        'skill-bootstrap': 'Bootstrap',
        'skill-git': 'Git',
        'skill-docker': 'Docker',
      }
    };
    
    // Detalhes do Modal (agora com traduções)
    const details = {
      "fretefast": {
        title: { 'pt': 'FreteFast', 'en': 'Market Delivery Site' },
        desc: { 'pt': 'Site desenvolvido para uma feira com foco em delivery rápido e eficiente.', 'en': 'Created the UI for an e-commerce site focused on market item delivery, featuring product listings, prices, and quantity selection.' },
        primary: "https://fretefast-vkyf.vercel.app/",
        secondary: "https://github.com/Rlopes2005/Fretefast",
        tech: ["HTML", "CSS", "JavaScript"],
        primaryLang: { 'pt': 'Ver online', 'en': 'Visit Site' },
        secondaryLang: { 'pt': 'Ver GitHub', 'en': 'View GitHub' }
      },
      "pizzaria": {
        title: { 'pt': 'Delivery Pizzaria', 'en': 'Pizzeria System' },
        desc: { 'pt': 'Plataforma de pedidos online para uma pizzaria, com foco na experiência do usuário e design responsivo.', 'en': 'Developed an online ordering system for a pizzeria, featuring a functional shopping cart in PHP integrated with a MySQL database.' },
        primary: "https://dicampo.infinityfreeapp.com/",
        secondary: "https://www.instagram.com/dicampo_pizzaria/",
        tech: ["PHP", "MySQL", "JavaScript", "Tailwind", "CSS"],
        primaryLang: { 'pt': 'Ver online', 'en': 'Visit Site' },
        secondaryLang: { 'pt': 'Ver Instagram', 'en': 'View Instagram' }
      },
      "farmacia": {
        title: { 'pt': 'Farmácia Inteligente', 'en': 'Smart Pharmacy' },
        desc: { 'pt': 'E-commerce farmacêutico com assistente de IA para recomendações e atendimento personalizado.', 'en': 'Pharmaceutical e-commerce with an AI assistant for recommendations and personalized service.' },
        primary: "https://www.youtube.com/watch?v=lEbBU8k7w9Q",
        secondary: "https://www.youtube.com/watch?v=U-WxNKlprn4",
        tech: ["PHP", "MySQL", "JavaScript", "CSS", "Python"],
        primaryLang: { 'pt': 'Ver online', 'en': 'Visit Site' },
        secondaryLang: { 'pt': 'Detalhes (IA)', 'en': 'Details (AI)' }
      }
    };

    // Elementos do Modal
    const backdrop = modal.querySelector('.project-modal-backdrop');
    const closeBtn = modal.querySelector('.project-modal-close');
    const titleEl = modal.querySelector('#project-modal-title');
    const descEl = modal.querySelector('#project-modal-desc');
    const techTitleEl = modal.querySelector('#project-modal-tech-title');
    const techListEl = modal.querySelector('#project-modal-techlist');
    const primary = modal.querySelector('#project-modal-primary');
    const secondary = modal.querySelector('#project-modal-secondary');

    // Elementos de Tradução
    const langBtnPt = document.getElementById('lang-pt');
    const langBtnEn = document.getElementById('lang-en');

    function setLanguage(lang) {
      if (lang !== 'en' && lang !== 'pt') lang = 'pt';
      
      const langData = translations[lang];
      if (!langData) return;

      // Salva a preferência
      localStorage.setItem('lang', lang);
      document.documentElement.lang = lang;

      // Atualiza botões
      langBtnPt.classList.toggle('active', lang === 'pt');
      langBtnEn.classList.toggle('active', lang === 'en');

      // Atualiza todos os textos com 'data-i18n-key'
      document.querySelectorAll('[data-i18n-key]').forEach(el => {
        const key = el.getAttribute('data-i18n-key');
        if (langData[key]) {
          // Usamos innerHTML para permitir links no texto (como no 'contact-desc')
          el.innerHTML = langData[key];
        }
      });
      
      // Atualiza o título da página
      document.title = langData['title'];
    }

    function openModal(key) {
      const d = details[key];
      if (!d) return;
      
      const lang = localStorage.getItem('lang') || 'pt';

      // Preenche os textos do modal com a língua correta
      titleEl.textContent = d.title[lang];
      descEl.textContent = d.desc[lang];
      primary.textContent = d.primaryLang[lang];
      secondary.textContent = d.secondaryLang[lang];
      
      // Preenche textos estáticos do modal
      techTitleEl.textContent = translations[lang]['modal-tech-title'];
      closeBtn.setAttribute('aria-label', translations[lang]['modal-close-label']);
      
      // Preenche os links
      primary.href = d.primary || '#';
      secondary.href = d.secondary || '#';

      // Preenche as tecnologias
      if (techListEl) {
        techListEl.innerHTML = ''; // Limpa as anteriores
        if (d.tech && d.tech.length > 0) {
          d.tech.forEach(techName => {
            const span = document.createElement('span');
            span.textContent = techName;
            techListEl.appendChild(span);
          });
        }
      }

      // Abre o modal
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      closeBtn && closeBtn.focus();
    }
    
    function closeModal() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }

    // Listener para abrir o modal
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('button[data-project]');
      if (trigger) {
        e.preventDefault();
        const key = trigger.getAttribute('data-project');
        openModal(key);
      }
    });

    // Listeners para fechar o modal
    backdrop && backdrop.addEventListener('click', closeModal);
    closeBtn && closeBtn.addEventListener('click', closeModal);
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    // --- Inicialização da Tradução ---
    langBtnPt.addEventListener('click', () => setLanguage('pt'));
    langBtnEn.addEventListener('click', () => setLanguage('en'));

    // Carrega a língua salva ou padrão
    const savedLang = localStorage.getItem('lang') || 'pt';
    setLanguage(savedLang);

  })();
})();