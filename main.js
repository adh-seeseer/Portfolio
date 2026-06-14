/* =====================================================
   SHISHIR ADHIKARI — PORTFOLIO JS
   Handles: nav, scroll active, skill bars, EmailJS form, toast
===================================================== */

/* ---- EmailJS config ----
   Steps to activate the contact form:
   1. Go to https://www.emailjs.com and create a free account
   2. Add Email Service → connect your Gmail (shishiradh10@gmail.com)
      → note the Service ID (e.g. "service_abc123")
   3. Create an Email Template with these variables:
        {{name}}, {{email}}, {{subject}}, {{message}}
      → note the Template ID (e.g. "template_xyz789")
   4. Go to Account → Public Key → copy it
   5. Replace the three placeholders below with your real values
-------------------------------------------------------- */
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // ← paste here
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // ← paste here
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // ← paste here

/* ===================== INIT EMAILJS ===================== */
if (typeof emailjs !== 'undefined') {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

/* ===================== MOBILE MENU ===================== */
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    const icon   = navToggle.querySelector('i');
    icon.classList.toggle('bx-menu',  !isOpen);
    icon.classList.toggle('bx-x',      isOpen);
  });
}

// Close on link click
document.querySelectorAll('.nav__link, .nav__cta').forEach(el => {
  el.addEventListener('click', () => {
    navMenu.classList.remove('open');
    const icon = navToggle?.querySelector('i');
    if (icon) { icon.classList.add('bx-menu'); icon.classList.remove('bx-x'); }
  });
});

/* ===================== HEADER SCROLL ===================== */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

/* ===================== ACTIVE NAV LINK ===================== */
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const y = window.scrollY + 100;
  sections.forEach(sec => {
    const link = document.querySelector(`.nav__link[href="#${sec.id}"]`);
    if (!link) return;
    const inView = y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight;
    link.classList.toggle('active-link', inView);
  });
}
window.addEventListener('scroll', updateActiveLink, { passive: true });

/* ===================== SKILL BARS ===================== */
const targetWidths = { '95': '95%', '85': '85%', '65': '65%', '85b': '85%' };

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
  const obs = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    document.querySelectorAll('.skill-bar').forEach(bar => {
      const key = bar.dataset.w;
      bar.style.width = targetWidths[key] || '0%';
    });
    obs.disconnect();
  }, { threshold: 0.3 });
  obs.observe(skillsSection);
}

/* ===================== SCROLL REVEAL ===================== */
if (typeof ScrollReveal !== 'undefined') {
  const sr = ScrollReveal({
    distance: '30px',
    duration: 700,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    reset: false,
  });
  sr.reveal('.home__data',          { origin: 'left',  delay: 100 });
  sr.reveal('.home__visual',        { origin: 'right', delay: 200 });
  sr.reveal('.about__img-container',{ origin: 'left',  delay: 100 });
  sr.reveal('.about__content',      { origin: 'right', delay: 200 });
  sr.reveal('.skill-item',          { origin: 'left',  interval: 80, delay: 100 });
  sr.reveal('.skills__img-wrap',    { origin: 'right', delay: 200 });
  sr.reveal('.work-card',           { origin: 'bottom',interval: 70, delay: 50  });
  sr.reveal('.contact__info',       { origin: 'left',  delay: 100 });
  sr.reveal('.contact__form-wrap',  { origin: 'right', delay: 200 });
  sr.reveal('.gallery-card',        { origin: 'bottom',interval: 40, delay: 30  });
}

/* ===================== TOAST ===================== */
function showToast(msg, type = 'success') {
  const toast   = document.getElementById('toast');
  const toastMsg  = document.getElementById('toast-msg');
  const toastIcon = document.getElementById('toast-icon');
  if (!toast) return;

  toast.className = `toast ${type}`;
  toastMsg.textContent = msg;
  toastIcon.className = `bx ${type === 'success' ? 'bx-check-circle' : 'bx-error-circle'}`;

  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ===================== CONTACT FORM ===================== */
const form       = document.getElementById('contact-form');
const submitBtn  = document.getElementById('submit-btn');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // If EmailJS keys aren't configured yet, fall back to mailto
    if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      const name    = document.getElementById('name')?.value    || '';
      const email   = document.getElementById('email')?.value   || '';
      const subject = document.getElementById('subject')?.value || 'Portfolio enquiry';
      const message = document.getElementById('message')?.value || '';
      const body    = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
      window.open(`mailto:shishiradh10@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`);
      showToast('Opening your mail app...', 'success');
      form.reset();
      return;
    }

    // EmailJS send
    const btn = submitBtn;
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Sending...';

    const templateParams = {
      name:    document.getElementById('name')?.value,
      email:   document.getElementById('email')?.value,
      subject: document.getElementById('subject')?.value || 'Portfolio enquiry',
      message: document.getElementById('message')?.value,
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
      showToast('Message sent! I\'ll reply within 24h.', 'success');
      form.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      showToast('Something went wrong. Try emailing me directly.', 'error');
    } finally {
      btn.disabled = false;
      btn.querySelector('span').textContent = 'Send message';
    }
  });
}
