/* ============================================================
   RUTHWIK VANAPARTHY — PORTFOLIO JAVASCRIPT
   ============================================================ */

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
}, { passive: true });

/* ── Mobile menu ── */
const hamburger = document.getElementById('navHamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileClose = document.getElementById('mobileNavClose');

function openMobileNav() {
  hamburger.classList.add('open');
  mobileNav.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileNav() {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMobileNav);
mobileClose.addEventListener('click', closeMobileNav);
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

function updateActiveNav() {
  let scrollY = window.pageYOffset;
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    const height = section.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + section.id) link.classList.add('active');
      });
    }
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

/* ── Typed animation ── */
const roles = ['Data Analyst', 'AI/ML Enthusiast', 'Vibe Coder', 'Python Developer', 'Problem Solver'];
let roleIdx = 0, charIdx = 0, isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeRole() {
  if (!typedEl) return;
  const current = roles[roleIdx];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typedEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
  }
  let delay = isDeleting ? 60 : 110;
  if (!isDeleting && charIdx === current.length) { delay = 1800; isDeleting = true; }
  if (isDeleting && charIdx === 0) { isDeleting = false; roleIdx = (roleIdx + 1) % roles.length; delay = 400; }
  setTimeout(typeRole, delay);
}
setTimeout(typeRole, 800);

/* ── Scroll reveal animations ── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => observer.observe(el));

/* ── Particle generator ── */
const particleContainer = document.querySelector('.hero-particles');
if (particleContainer) {
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.width = (Math.random() * 3 + 1) + 'px';
    p.style.height = p.style.width;
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.opacity = Math.random() * 0.6;
    if (Math.random() > 0.5) p.style.background = '#06b6d4';
    particleContainer.appendChild(p);
  }
}

/* ── Back to top ── */
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) backToTopBtn.classList.add('visible');
  else backToTopBtn.classList.remove('visible');
}, { passive: true });
backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── Project filter ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card[data-category]');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    projectCards.forEach(card => {
      if (cat === 'all' || card.dataset.category === cat) {
        card.style.display = 'flex';
        card.style.animation = 'fadeInUp 0.4s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* ── Contact form validation ── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;
    const fields = [
      { id: 'fname', msg: 'Please enter your first name.' },
      { id: 'lname', msg: 'Please enter your last name.' },
      { id: 'femail', msg: 'Please enter a valid email.', type: 'email' },
      { id: 'fmessage', msg: 'Please enter your message.' }
    ];
    fields.forEach(f => {
      const el = document.getElementById(f.id);
      const group = el.closest('.form-group');
      const errEl = group.querySelector('.error-msg');
      group.classList.remove('invalid');
      let val = el.value.trim();
      let fail = false;
      if (!val) fail = true;
      if (f.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) fail = true;
      if (fail) {
        valid = false;
        group.classList.add('invalid');
        if (errEl) errEl.textContent = f.msg;
      }
    });
    if (valid) {
      const successEl = document.getElementById('formSuccess');
      const submitBtn = contactForm.querySelector('.form-submit-btn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      setTimeout(() => {
        successEl.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.innerHTML = '&#10003; Message Sent!';
        contactForm.reset();
        setTimeout(() => {
          successEl.style.display = 'none';
          submitBtn.innerHTML = 'Send Message &#8594;';
        }, 5000);
      }, 1200);
    }
  });

  /* Clear validation on input */
  contactForm.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => el.closest('.form-group').classList.remove('invalid'));
  });
}

/* ── Smooth scroll for nav/hero links ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Skill tag hover ripple ── */
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', function () {
    this.style.transition = 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)';
  });
  tag.addEventListener('mouseleave', function () {
    this.style.transition = 'all 0.15s ease';
  });
});

console.log('%cRuthwik Vanaparthy Portfolio', 'color:#6366f1;font-size:18px;font-weight:bold;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'color:#06b6d4;font-size:12px;');
