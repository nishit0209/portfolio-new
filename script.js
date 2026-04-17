gsap.registerPlugin(ScrollTrigger);

// Custom cursor that works on both desktop and mobile
const cur = document.getElementById('cur');
const ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

// For desktop: track mouse movement
document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
});

// For mobile: track touch movement
document.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  mx = touch.clientX;
  my = touch.clientY;
});

// Animate cursor
function animateCursor() {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  
  if (cur) {
    cur.style.left = mx + 'px';
    cur.style.top = my + 'px';
  }
  if (ring) {
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
  }
  
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects for interactive elements
const interactiveElements = document.querySelectorAll('a, button, .nav-links a, .btn-primary, .btn-secondary, .nav-cta, .proj-link, .form-submit, .hamburger, .skill-tag, .chip, .proj-card');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cur) cur.style.width = '20px';
    if (cur) cur.style.height = '20px';
    if (ring) ring.style.width = '60px';
    if (ring) ring.style.height = '60px';
    if (ring) ring.style.borderColor = 'rgba(236,72,153,0.9)';
  });
  el.addEventListener('mouseleave', () => {
    if (cur) cur.style.width = '12px';
    if (cur) cur.style.height = '12px';
    if (ring) ring.style.width = '45px';
    if (ring) ring.style.height = '45px';
    if (ring) ring.style.borderColor = 'rgba(139,92,246,0.7)';
  });
  
  // For mobile touch
  el.addEventListener('touchstart', () => {
    if (cur) cur.style.width = '20px';
    if (cur) cur.style.height = '20px';
    if (ring) ring.style.width = '60px';
    if (ring) ring.style.height = '60px';
  });
  el.addEventListener('touchend', () => {
    setTimeout(() => {
      if (cur) cur.style.width = '12px';
      if (cur) cur.style.height = '12px';
      if (ring) ring.style.width = '45px';
      if (ring) ring.style.height = '45px';
    }, 100);
  });
});

// Scroll progress bar
const prog = document.getElementById('scroll-prog');
window.addEventListener('scroll', () => {
  const p = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  if (prog) prog.style.transform = `scaleX(${p})`;
});

// Nav on scroll
const navbar = document.getElementById('navbar');
ScrollTrigger.create({
  start: 80,
  onEnter: () => navbar.classList.add('scrolled'),
  onLeaveBack: () => navbar.classList.remove('scrolled')
});

// Mobile menu
let mobOpen = false;
function toggleMob() {
  mobOpen = !mobOpen;
  const mobMenu = document.getElementById('mob-menu');
  if (mobMenu) mobMenu.classList.toggle('open', mobOpen);
  const h = document.getElementById('hamburger');
  if (h) {
    const spans = h.querySelectorAll('span');
    if (mobOpen) {
      gsap.to(spans[0], { rotate: 45, y: 6.5, duration: .3 });
      gsap.to(spans[1], { opacity: 0, duration: .2 });
      gsap.to(spans[2], { rotate: -45, y: -6.5, duration: .3 });
    } else {
      gsap.to(spans, { rotate: 0, y: 0, opacity: 1, duration: .3 });
    }
  }
}
function closeMob() { if (mobOpen) toggleMob(); }

// Hero name animation with SplitText
function splitChars(container) {
  const words = container.querySelectorAll('.word');
  words.forEach(word => {
    const text = word.textContent;
    word.innerHTML = '';
    [...text].forEach(c => {
      const s = document.createElement('span');
      s.className = 'char';
      s.textContent = c === ' ' ? '\u00a0' : c;
      word.appendChild(s);
    });
  });
  return container.querySelectorAll('.char');
}

const heroName = document.getElementById('hero-name');
const allChars = splitChars(heroName);

const heroTl = gsap.timeline({ delay: 0.2 });
heroTl
  .from('#h-tag', { y: 20, opacity: 0, duration: .6 })
  .from(allChars, { y: 80, opacity: 0, rotationX: -60, duration: .7, stagger: .03, ease: 'back.out(1.6)' }, '-=.2')
  .from('#h-role', { y: 20, opacity: 0, duration: .6 }, '-=.3')
  .from('#h-desc', { y: 20, opacity: 0, duration: .6 }, '-=.4')
  .from('#h-btns', { y: 20, opacity: 0, duration: .6 }, '-=.4')
  .from('#h-stats > div', { y: 20, opacity: 0, duration: .5, stagger: .1 }, '-=.3')
  .from('#h-right', { x: 60, opacity: 0, duration: .9, ease: 'power2.out' }, '-=.8');

// 3D avatar tilt - works on both desktop and mobile
const scene = document.getElementById('avatar-scene');
const card = document.getElementById('avatar-card');

if (scene && card) {
  // Desktop: mouse move effect
  document.addEventListener('mousemove', (e) => {
    const rect = scene.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);
    
    const rotateY = deltaX * 15;
    const rotateX = -deltaY * 15;
    
    gsap.to(card, {
      rotateY: rotateY,
      rotateX: rotateX,
      duration: 0.5,
      ease: 'power2.out'
    });
  });
  
  // Mobile: touch move effect
  let touchStartX = 0, touchStartY = 0;
  let currentRotateY = 0, currentRotateX = 0;
  
  card.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    currentRotateY = 0;
    currentRotateX = 0;
  });
  
  card.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const deltaX = (touch.clientX - touchStartX) / 10;
    const deltaY = (touch.clientY - touchStartY) / 10;
    
    currentRotateY = Math.min(Math.max(deltaX, -20), 20);
    currentRotateX = Math.min(Math.max(-deltaY, -20), 20);
    
    gsap.to(card, {
      rotateY: currentRotateY,
      rotateX: currentRotateX,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  card.addEventListener('touchend', () => {
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)'
    });
  });
  
  // Reset on mouse leave
  scene.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.4)'
    });
  });
}

// 3D scroll panels reveal
gsap.utils.toArray('.panel-3d').forEach(el => {
  gsap.to(el, {
    opacity: 1,
    rotateX: 0,
    y: 0,
    duration: .9,
    ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%', once: true }
  });
});

// About cards stagger
gsap.to('.about-card', {
  opacity: 1,
  x: 0,
  duration: .7,
  stagger: .15,
  ease: 'power2.out',
  scrollTrigger: { trigger: '.about-right', start: 'top 80%', once: true }
});

// Skills 3D card flip in
gsap.utils.toArray('.skill-group').forEach((el, i) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: .8,
    delay: i * .12,
    ease: 'power3.out',
    scrollTrigger: { trigger: '#skills', start: 'top 75%', once: true }
  });
});

// Project cards cinematic reveal
gsap.utils.toArray('.proj-card').forEach((el, i) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    rotateX: 0,
    duration: 1,
    delay: i * .2,
    ease: 'power3.out',
    scrollTrigger: { trigger: '#projects .proj-grid', start: 'top 80%', once: true }
  });
});

// Contact reveal
gsap.to('.ci-card', {
  opacity: 1,
  x: 0,
  duration: .7,
  stagger: .12,
  ease: 'power2.out',
  scrollTrigger: { trigger: '.contact-info', start: 'top 80%', once: true }
});
gsap.to('.contact-form', {
  opacity: 1,
  x: 0,
  duration: .9,
  ease: 'power2.out',
  scrollTrigger: { trigger: '.contact-form', start: 'top 80%', once: true }
});

// Footer reveal
gsap.to('#footer', {
  opacity: 1,
  duration: 1,
  ease: 'power2.out',
  scrollTrigger: { trigger: '#footer', start: 'top 90%', once: true }
});

// Parallax hero mesh
gsap.to('.mc1', { y: 120, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 } });
gsap.to('.mc2', { y: -80, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.5 } });

// Formspree handling
const form = document.getElementById('fs-form');
const statusDiv = document.getElementById('form-status');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (statusDiv) {
      statusDiv.style.color = '#8b5cf6';
      statusDiv.textContent = 'Sending...';
    }
    const formData = new FormData(form);
    try {
      const response = await fetch(form.action, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } });
      if (response.ok) {
        if (statusDiv) {
          statusDiv.style.color = '#4ade80';
          statusDiv.textContent = '✓ Message sent successfully! I\'ll get back soon.';
        }
        form.reset();
      } else {
        if (statusDiv) {
          statusDiv.style.color = '#f87171';
          statusDiv.textContent = '❌ Oops! Something went wrong. Please try again.';
        }
      }
    } catch (err) {
      if (statusDiv) {
        statusDiv.style.color = '#f87171';
        statusDiv.textContent = '❌ Network error. Check your connection.';
      }
    }
    setTimeout(() => { if (statusDiv) statusDiv.textContent = ''; }, 5000);
  });
}

// Smooth nav active highlight on scroll
const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
sections.forEach(id => {
  ScrollTrigger.create({
    trigger: '#' + id,
    start: 'top center',
    end: 'bottom center',
    onToggle: ({ isActive }) => {
      document.querySelectorAll('.nav-links a').forEach(a => {
        if (a.getAttribute('href') === '#' + id) {
          a.style.color = isActive ? 'var(--white)' : '';
        }
      });
    }
  });
});