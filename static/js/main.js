/* ===================================================================
   IPS 360° — page behavior
   =================================================================== */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --- THEME TOGGLE (persists in localStorage) --- */
const root = document.documentElement;
const savedTheme = localStorage.getItem('ips360-theme') || 'lime';
root.setAttribute('data-theme', savedTheme);

document.querySelectorAll('.theme-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'lime' ? 'nebula' : 'lime';
    root.setAttribute('data-theme', next);
    localStorage.setItem('ips360-theme', next);
  });
});

/* --- LANDING LOADER (short, clean intro) --- */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (!loader) return;
  const delay = prefersReducedMotion ? 0 : 700;
  setTimeout(() => loader.classList.add('hidden'), delay);
});

/* --- LOGIN BAR(S) — visual-only submit feedback, no backend wired yet --- */
document.querySelectorAll('.login-bar').forEach(bar => {
  bar.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = bar.querySelector('input');
    const btn = bar.querySelector('button');
    if (!input.value) return;
    bar.classList.add('sent');
    const original = btn.textContent;
    btn.textContent = '✓';
    input.value = '';
    input.placeholder = 'Login link sent — check your inbox';
    setTimeout(() => { btn.textContent = original; bar.classList.remove('sent'); }, 3000);
  });
});

/* --- TYPEWRITER EFFECT --- */
const typedTextSpan = document.getElementById("hero-headline");
if (typedTextSpan) {
  const rawText = "Students perform better.\nTeachers teach better.";
  let charIndex = 0;

  function typeWriter() {
    if (charIndex < rawText.length) {
      let currentHTML = rawText.substring(0, charIndex + 1);
      let formattedHTML = currentHTML.replace('\n', '<br><span class="accent">');
      if (currentHTML.includes('\n')) formattedHTML += '</span>';
      typedTextSpan.innerHTML = formattedHTML + '<span class="type-cursor"></span>';
      charIndex++;
      setTimeout(typeWriter, 40);
    } else {
      typedTextSpan.querySelector('.type-cursor').style.animation = "blink 1s step-end infinite";
    }
  }

  if (prefersReducedMotion) {
    // Skip the letter-by-letter animation, show final text immediately
    typedTextSpan.innerHTML = "Students perform better.<br><span class='accent'>Teachers teach better.</span>";
  } else {
    window.addEventListener('load', () => setTimeout(typeWriter, 900));
  }
}

/* --- MOUSE GLOW MICRO-INTERACTION --- */
document.querySelectorAll('.glow-effect').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

/* --- COUNT-UP METRICS --- */
const countEls = document.querySelectorAll('.counter');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseInt(el.getAttribute('data-target'));
      let count = 0;
      const speed = target / 40;
      const updateCount = () => {
        count += speed;
        if (count < target) {
          el.innerText = Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else {
          el.innerText = target;
        }
      };
      updateCount();
      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
countEls.forEach(el => countObserver.observe(el));

/* --- SCROLL REVEAL --- */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

/* --- HERO BARS / FEEDBACK CHART ANIMATE IN --- */
window.addEventListener('load', () => {
  document.querySelectorAll('#bars .bar').forEach(b => {
    const h = b.getAttribute('data-h');
    b.style.height = '4px';
    requestAnimationFrame(() => setTimeout(() => { b.style.height = h + 'px'; }, 200));
  });
  document.querySelectorAll('#feedback-chart .fill').forEach(f => {
    const h = f.getAttribute('data-h');
    f.style.height = '0%';
    setTimeout(() => { f.style.transition = 'height 1s ease'; f.style.height = h + '%'; }, 300);
  });
});

/* --- SCORE BARS ANIMATE ON VIEW --- */
const scoreObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.score-fill').forEach(f => {
        f.style.transition = 'width 1.1s cubic-bezier(.2,.8,.2,1)';
        f.style.width = f.getAttribute('data-w') + '%';
      });
      scoreObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.score-list').forEach(el => scoreObserver.observe(el));

/* --- ENGINE TOGGLE --- */
document.querySelectorAll('.engine-toggle button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.engine-toggle button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.engine-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('panel-' + btn.dataset.engine).classList.add('active');
  });
});

/* --- TRAJECTORY SCROLL LOGIC --- */
const path = document.getElementById('traj-active-line');
if (path) {
  const pathLength = path.getTotalLength();
  path.style.strokeDasharray = pathLength;
  path.style.strokeDashoffset = pathLength;

  const trajSection = document.getElementById('trajectory-section');
  const points = [
    { el: document.getElementById('pt-1'), triggerPct: 0.1 },
    { el: document.getElementById('pt-2'), triggerPct: 0.45 },
    { el: document.getElementById('pt-3'), triggerPct: 0.95 }
  ];

  window.addEventListener('scroll', () => {
    const rect = trajSection.getBoundingClientRect();
    const sectionTop = rect.top;
    const windowHeight = window.innerHeight;
    const startDrawingAt = windowHeight * 0.8;
    let drawPct = (startDrawingAt - sectionTop) / (rect.height);
    drawPct = Math.max(0, Math.min(1, drawPct));
    path.style.strokeDashoffset = pathLength - (pathLength * drawPct);
    points.forEach(pt => {
      if (drawPct >= pt.triggerPct) pt.el.classList.add('active');
      else pt.el.classList.remove('active');
    });
  });
}