/* =========================================
   AMAN LAKHERA — MOJAVE PORTFOLIO
   script.js
   ========================================= */

/* ─── Stars Canvas ─── */
(function () {
  const canvas = document.getElementById('starsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function generateStars(n) {
    stars = [];
    for (let i = 0; i < n; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.75,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random(),
        da: (Math.random() - 0.5) * 0.008,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
      s.a += s.da;
      if (s.a <= 0 || s.a >= 1) s.da *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220, 200, 170, ${s.a})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  resize();
  generateStars(200);
  draw();
  window.addEventListener('resize', () => { resize(); generateStars(200); });
})();

/* ─── Nav scroll state ─── */
(function () {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

/* ─── Hamburger / Mobile menu ─── */
(function () {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });
  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ─── Reveal on scroll ─── */
(function () {
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger children in same parent
          const delay = Array.from(entry.target.parentNode.querySelectorAll('.reveal'))
            .indexOf(entry.target) * 80;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach(el => observer.observe(el));
})();

/* ─── Active nav link highlight ─── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  }, { passive: true });
})();

/* ─── Smooth cursor glow (desktop only) ─── */
(function () {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed; pointer-events:none; z-index:9999;
    width:300px; height:300px;
    border-radius:50%;
    background:radial-gradient(circle, rgba(232,113,42,0.06) 0%, transparent 70%);
    transform:translate(-50%,-50%);
    transition:left 0.12s ease, top 0.12s ease;
    left:-300px; top:-300px;
  `;
  document.body.appendChild(glow);

  window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  }, { passive: true });
})();

/* ─── Typing effect on hero eyebrow ─── */
(function () {
  const eyebrow = document.querySelector('.hero-eyebrow');
  if (!eyebrow) return;
  const text = 'Hello, I\'m';
  eyebrow.textContent = '';
  // wait for reveal animation
  setTimeout(() => {
    let i = 0;
    const interval = setInterval(() => {
      eyebrow.textContent = text.slice(0, ++i);
      if (i >= text.length) clearInterval(interval);
    }, 70);
  }, 600);
})();

/* ─── Skill card tilt on hover ─── */
(function () {
  document.querySelectorAll('.skill-card, .project-card, .cert-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -8;
      card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ─── Scroll progress bar ─── */
(function () {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position:fixed; top:0; left:0; height:2px; z-index:9998;
    background:linear-gradient(90deg, #e8712a, #c8954a);
    width:0%; transition:width 0.1s linear;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total    = document.body.scrollHeight - window.innerHeight;
    bar.style.width = (scrolled / total * 100) + '%';
  }, { passive: true });
})();

/* ─── Console easter egg ─── */
console.log(
  '%c Aman Lakhera — Portfolio %c\n' +
  '%c Software Developer · Cybersecurity Analyst · Data Science\n' +
  'Contact: amanlakhera510@hotmail.com\n' +
  'GitHub:  github.com/aman2305',
  'background:#e8712a;color:#0a0806;font-weight:bold;padding:6px 16px;font-size:14px;',
  '',
  'color:#c8954a;font-size:12px;'
);
