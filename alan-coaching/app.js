// ============================================================
// ALAN COACHING — Interações
// ============================================================
(function(){
  "use strict";

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 12);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  /* ---------- Custom crosshair cursor ---------- */
  const crosshair = document.getElementById('crosshair');
  if (!reduceMotion) {
    window.addEventListener('mousemove', (e) => {
      crosshair.style.left = e.clientX + 'px';
      crosshair.style.top = e.clientY + 'px';
    }, { passive: true });
  }

  /* ---------- Ambient particle canvas (hero) ---------- */
  const canvas = document.getElementById('fx-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = Math.min(window.innerHeight, 900);
  }
  function initParticles(){
    const count = window.innerWidth < 768 ? 26 : 55;
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      vy: Math.random() * 0.25 + 0.05,
      vx: (Math.random() - 0.5) * 0.15,
      hue: Math.random() > 0.5 ? '139,92,246' : '59,130,246',
      alpha: Math.random() * 0.5 + 0.15,
    }));
  }
  function drawParticles(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    particles.forEach(p => {
      p.y -= p.vy;
      p.x += p.vx;
      if (p.y < -10) p.y = canvas.height + 10;
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.hue},${p.alpha})`;
      ctx.fill();
    });
    if (!reduceMotion) requestAnimationFrame(drawParticles);
  }
  resizeCanvas();
  initParticles();
  drawParticles();
  window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

  /* ---------- Reveal-on-scroll ---------- */
  const revealTargets = document.querySelectorAll('.service-card, .tl-item, .strategy-card, .plan-card, .clip-card');
  revealTargets.forEach(el => el.setAttribute('data-reveal', ''));
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

  /* ---------- Animated stat counters ---------- */
  const statNums = document.querySelectorAll('.stat-num');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();
      function tick(now){
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      statObserver.unobserve(el);
    });
  }, { threshold: 0.6 });
  statNums.forEach(el => statObserver.observe(el));

  /* ---------- Language toggle (Sobre) ---------- */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      document.querySelectorAll('.lang-btn').forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
      });
      document.querySelectorAll('.about-text').forEach(t => {
        t.hidden = t.dataset.lang !== lang;
      });
    });
  });

  /* ---------- Clips grid + filter ---------- */
  const clipsGrid = document.getElementById('clipsGrid');
  function renderClips(filter){
    clipsGrid.innerHTML = '';
    const list = filter === 'all' ? CLIPS : CLIPS.filter(c => c.category === filter);
    list.forEach(clip => {
      const card = document.createElement('div');
      card.className = 'clip-card';
      card.innerHTML = `
        <div class="clip-thumb">
          <span class="platform-tag">${clip.platform.toUpperCase()}</span>
          <div class="clip-play">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M8 5V19L19 12L8 5Z" fill="white"/></svg>
          </div>
        </div>
        <div class="clip-body">
          <h4>${clip.title}</h4>
          <span>${clip.platform} · ${clip.duration}</span>
        </div>`;
      clipsGrid.appendChild(card);
    });
  }
  renderClips('all');
  document.getElementById('filterBar').addEventListener('click', (e) => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    renderClips(chip.dataset.filter);
  });

  /* ---------- Strategy grid + modal ---------- */
  const strategyGrid = document.getElementById('strategyGrid');
  STRATEGIES.forEach((s, i) => {
    const card = document.createElement('button');
    card.className = 'strategy-card';
    card.innerHTML = `<span class="s-icon">${s.code}</span><h4>${s.title}</h4><p>${s.desc}</p>`;
    card.addEventListener('click', () => openModal(s));
    strategyGrid.appendChild(card);
  });

  const modalOverlay = document.getElementById('modalOverlay');
  const modalContent = document.getElementById('modalContent');
  function openModal(s){
    modalContent.innerHTML = `
      <span class="s-icon">${s.code}</span>
      <h3>${s.title}</h3>
      <p>${s.body}</p>
      <ul>
        <li>Aplicável em coaching ao vivo e análise de VOD</li>
        <li>Exemplos práticos com base em partidas reais</li>
        <li>Ajustado ao seu elo atual</li>
      </ul>`;
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.getElementById('modalClose').addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  /* ---------- Testimonial slider ---------- */
  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('testimonialDots');
  TESTIMONIALS.forEach((t, i) => {
    const slide = document.createElement('div');
    slide.className = 'a-slide t-slide' + (i === 0 ? ' active' : '');
    slide.innerHTML = `
      <div class="t-avatar">${t.name.charAt(0)}</div>
      <p class="t-quote">"${t.quote}"</p>
      <div class="t-name">${t.name}</div>
      <div class="t-rank"><span class="before">${t.before}</span> → <span class="after">${t.after}</span></div>`;
    track.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = 't-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });
  let current = 0;
  const slides = () => track.querySelectorAll('.t-slide');
  const dots = () => dotsWrap.querySelectorAll('.t-dot');
  function goToSlide(i){
    slides().forEach((s, idx) => s.classList.toggle('active', idx === i));
    dots().forEach((d, idx) => d.classList.toggle('active', idx === i));
    current = i;
  }
  let autoplay = setInterval(() => goToSlide((current + 1) % TESTIMONIALS.length), 5000);
  document.getElementById('testimonialSlider').addEventListener('mouseenter', () => clearInterval(autoplay));
  document.getElementById('testimonialSlider').addEventListener('mouseleave', () => {
    autoplay = setInterval(() => goToSlide((current + 1) % TESTIMONIALS.length), 5000);
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen){
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Contact form ---------- */
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    if (!data.get('nome') || !data.get('email') || !data.get('mensagem')){
      formStatus.textContent = 'Preencha os campos obrigatórios antes de enviar.';
      return;
    }
    formStatus.textContent = `Obrigado, ${data.get('nome').split(' ')[0]}! Sua solicitação foi enviada. Alan entrará em contato em breve.`;
    form.reset();
  });

  /* ---------- Scheduler ---------- */
  const scheduler = document.getElementById('scheduler');
  let selectedSlot = null;
  Object.entries(SCHEDULE).forEach(([day, slots]) => {
    const col = document.createElement('div');
    col.className = 'sched-day';
    const heading = document.createElement('h4');
    heading.textContent = day;
    col.appendChild(heading);
    slots.forEach((time, idx) => {
      const btn = document.createElement('button');
      btn.className = 'sched-slot';
      const taken = Math.random() < 0.25;
      btn.textContent = time + (taken ? ' · ocupado' : '');
      if (taken) btn.disabled = true;
      btn.addEventListener('click', () => {
        if (selectedSlot) selectedSlot.classList.remove('selected');
        btn.classList.add('selected');
        selectedSlot = btn;
        formStatus.textContent = '';
        const discordField = form.querySelector('[name="mensagem"]');
        if (discordField && !discordField.value.includes('Horário preferido')) {
          discordField.value += (discordField.value ? '\n' : '') + `Horário preferido: ${day}, ${time}`;
        }
      });
      col.appendChild(btn);
    });
    scheduler.appendChild(col);
  });

})();
