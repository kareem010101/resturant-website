/**
 * ============================================================
 * GOLDEN FORK — RESTAURANT WEBSITE
 * main.js | Clean, Organized, Feature-Rich JavaScript
 * ============================================================
 *
 * TABLE OF CONTENTS:
 * 1.  DOM Selectors
 * 2.  Mobile Navigation (Hamburger Menu)
 * 3.  Sticky Header Shadow on Scroll
 * 4.  Active Nav Link on Scroll (Intersection Observer)
 * 5.  ScrollReveal Animations
 * 6.  Count-Up Animation for Stats
 * 7.  Back to Top Button
 * 8.  Reservation Form Validation & Submit
 * 9.  Contact Form Validation & Submit
 * 10. Newsletter Form
 * 11. Auto Copyright Year
 * 12. Gallery Lightbox (simple expand hint)
 * 13. Init
 * ============================================================
 */

'use strict';

/* ============================================================
   1. DOM SELECTORS
   ============================================================ */
const header       = document.getElementById('header');
const hamburger    = document.getElementById('menu-bar');
const navbar       = document.getElementById('navbar');
const navLinks     = document.querySelectorAll('.nav-link');
const backToTop    = document.getElementById('back-to-top');
const sections     = document.querySelectorAll('section[id], div[id]');
const statCards    = document.querySelectorAll('.stat-card');
const resForm      = document.getElementById('reservation-form');
const contactForm  = document.getElementById('contact-form');
const newsletterForm = document.getElementById('newsletter-form');
const copyrightYear  = document.getElementById('copyright-year');


/* ============================================================
   2. MOBILE NAVIGATION (HAMBURGER MENU)
   ============================================================ */
function initMobileNav() {
  if (!hamburger || !navbar) return;

  hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    navbar.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', String(isActive));
    // Prevent body scroll when menu is open
    document.body.style.overflow = isActive ? 'hidden' : '';
  });

  // Close menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navbar.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove('active');
      navbar.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}


/* ============================================================
   3. STICKY HEADER SHADOW ON SCROLL
   ============================================================ */
function initHeaderScroll() {
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}


/* ============================================================
   4. ACTIVE NAV LINK ON SCROLL (INTERSECTION OBSERVER)
   ============================================================ */
function initActiveNav() {
  if (!navLinks.length) return;

  const sectionEls = [];
  navLinks.forEach(link => {
    const id = link.getAttribute('href').replace('#', '');
    const section = document.getElementById(id);
    if (section) sectionEls.push(section);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    {
      rootMargin: '-30% 0px -60% 0px',
      threshold:  0,
    }
  );

  sectionEls.forEach(section => observer.observe(section));
}


/* ============================================================
   5. SCROLLREVEAL ANIMATIONS
   ============================================================ */
function initScrollReveal() {
  // Guard: only run if ScrollReveal is loaded
  if (typeof ScrollReveal === 'undefined') return;

  const sr = ScrollReveal({
    distance: '40px',
    duration: 800,
    easing:   'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    reset:    false, // animate once for better performance
  });

  // Hero
  sr.reveal('.home-text-content', { origin: 'left',   delay: 100 });
  sr.reveal('.home-image',        { origin: 'right',  delay: 250 });

  // Stats
  sr.reveal('.stat-card',         { origin: 'bottom', delay: 100, interval: 120 });

  // About
  sr.reveal('.about-image',       { origin: 'left',   delay: 100 });
  sr.reveal('.about-text-content',{ origin: 'right',  delay: 250 });

  // Quality
  sr.reveal('.quality-content',   { origin: 'left',   delay: 100 });
  sr.reveal('.quality-image',     { origin: 'right',  delay: 250 });

  // Gallery
  sr.reveal('.gallery-item',      { origin: 'bottom', delay: 80,  interval: 100 });

  // Enjoy food
  sr.reveal('.food-main-content', { origin: 'bottom', delay: 150 });

  // Menu
  sr.reveal('.menu-card',         { origin: 'bottom', delay: 100, interval: 150 });

  // Breakfast
  sr.reveal('.breakfast-card',    { origin: 'bottom', delay: 100, interval: 120 });

  // Testimonials
  sr.reveal('.testimonial-card',  { origin: 'bottom', delay: 100, interval: 150 });

  // Reservation
  sr.reveal('.reservation-info',  { origin: 'left',   delay: 100 });
  sr.reveal('.reservation-form',  { origin: 'right',  delay: 200 });

  // Contact
  sr.reveal('.contact-card',      { origin: 'bottom', delay: 80,  interval: 100 });
  sr.reveal('.contact-form',      { origin: 'right',  delay: 200 });

  // Section headers
  sr.reveal('.section-header',    { origin: 'top',    delay: 100 });
}


/* ============================================================
   6. COUNT-UP ANIMATION FOR STATS
   ============================================================ */
function animateCounter(el, target, duration = 1800) {
  let start     = 0;
  const step    = 16; // ~60fps
  const increments = Math.ceil(target / (duration / step));

  const timer = setInterval(() => {
    start += increments;
    if (start >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      el.textContent = start.toLocaleString();
    }
  }, step);
}

function initCounters() {
  if (!statCards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card   = entry.target;
          const target = parseInt(card.getAttribute('data-target'), 10);
          const counter = card.querySelector('.counter');
          if (counter && !card.dataset.counted) {
            card.dataset.counted = 'true';
            animateCounter(counter, target);
          }
          observer.unobserve(card);
        }
      });
    },
    { threshold: 0.3 }
  );

  statCards.forEach(card => observer.observe(card));
}


/* ============================================================
   7. BACK TO TOP BUTTON
   ============================================================ */
function initBackToTop() {
  if (!backToTop) return;

  const handleScroll = () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ============================================================
   8. TOAST NOTIFICATION SYSTEM
   ============================================================ */
let toastTimer = null;

function showToast(title = 'Reservation Confirmed!', message = "We'll send the details to your email shortly.") {
  const toast     = document.getElementById('toast-notification');
  const closeBtn  = document.getElementById('toast-close');
  const titleEl   = toast ? toast.querySelector('.toast-title') : null;
  const messageEl = toast ? toast.querySelector('.toast-message') : null;
  if (!toast) return;

  if (titleEl) titleEl.textContent = title;
  if (messageEl) messageEl.textContent = message;

  // Clear any existing timer
  if (toastTimer) {
    clearTimeout(toastTimer);
    toastTimer = null;
  }

  // Reset animation state
  toast.classList.remove('toast-hide');
  void toast.offsetWidth; // force reflow to restart animation
  toast.classList.add('toast-show');

  // Close button
  if (closeBtn) {
    closeBtn.onclick = () => dismissToast(toast);
  }

  // Auto-dismiss after 4.5 seconds (matches progress bar)
  toastTimer = setTimeout(() => dismissToast(toast), 4500);
}

function dismissToast(toast) {
  if (!toast) return;
  if (toastTimer) { clearTimeout(toastTimer); toastTimer = null; }
  toast.classList.remove('toast-show');
  toast.classList.add('toast-hide');

  // After slide-out animation, fully hide
  setTimeout(() => {
    toast.classList.remove('toast-hide');
  }, 400);
}


/* ============================================================
   9. RESERVATION FORM VALIDATION & SUBMIT
   ============================================================ */
function validateField(inputId, errorId, validationFn) {
  const input  = document.getElementById(inputId);
  const errEl  = document.getElementById(errorId);
  if (!input || !errEl) return true;

  const { valid, message } = validationFn(input.value.trim());
  const group = input.closest('.form-group');

  if (!valid) {
    errEl.textContent = message;
    errEl.classList.add('visible');
    group.classList.add('error');
    return false;
  }

  errEl.textContent = '';
  errEl.classList.remove('visible');
  group.classList.remove('error');
  return true;
}

function initReservationForm() {
  if (!resForm) return;

  // Set min date to today
  const dateInput = document.getElementById('res-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  resForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const validName   = validateField('res-name',   'res-name-error',   v => ({ valid: v.length >= 2, message: 'Please enter your full name (min. 2 characters).' }));
    const validDate   = validateField('res-date',   'res-date-error',   v => ({ valid: Boolean(v), message: 'Please select a date.' }));
    const validTime   = validateField('res-time',   'res-time-error',   v => ({ valid: Boolean(v), message: 'Please select a time.' }));
    const validGuests = validateField('res-guests', 'res-guests-error', v => ({ valid: Boolean(v), message: 'Please select number of guests.' }));
    const validEmail  = validateField('res-email',  'res-email-error',  v => ({ valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), message: 'Please enter a valid email address.' }));

    if (!(validName && validDate && validTime && validGuests && validEmail)) return;

    // Show loading state on button
    const btnText   = resForm.querySelector('.btn-text');
    const btnLoader = resForm.querySelector('.btn-loader');
    const submitBtn = document.getElementById('res-submit');

    submitBtn.disabled = true;
    if (btnText)   btnText.hidden   = true;
    if (btnLoader) btnLoader.hidden = false;

    // Simulate async submission (1.8 seconds)
    setTimeout(() => {
      // Restore button
      submitBtn.disabled = false;
      if (btnText)   btnText.hidden   = false;
      if (btnLoader) btnLoader.hidden = true;

      // Reset form fields
      resForm.reset();

      // ✅ Show the toast notification
      showToast();
    }, 1800);
  });

  // Clear field errors on user input
  resForm.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => {
      const group = field.closest('.form-group');
      if (group) group.classList.remove('error');
    });
  });
}


/* ============================================================
   9. CONTACT FORM VALIDATION & SUBMIT
   ============================================================ */
function initContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('c-name');
    const email   = document.getElementById('c-email');
    const subject = document.getElementById('c-subject');
    const message = document.getElementById('c-message');

    let isValid = true;

    [name, email, subject, message].forEach(field => {
      if (!field) return;
      const group = field.closest('.form-group');
      if (!field.value.trim()) {
        group.classList.add('error');
        isValid = false;
      } else {
        group.classList.remove('error');
      }
    });

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      email.closest('.form-group').classList.add('error');
      isValid = false;
    }

    if (!isValid) return;

    // Simulate submit
    const submitBtn  = document.getElementById('contact-submit');

    submitBtn.disabled   = true;
    submitBtn.innerHTML  = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    setTimeout(() => {
      submitBtn.disabled  = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      contactForm.reset();

      showToast('Message Sent!', "We'll get back to you within 24 hours.");
    }, 1600);
  });

  // Clear error on input
  contactForm.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.closest('.form-group').classList.remove('error');
    });
  });
}


/* ============================================================
   10. NEWSLETTER FORM
   ============================================================ */
function initNewsletter() {
  if (!newsletterForm) return;

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    const msgEl      = document.getElementById('newsletter-msg');

    if (!emailInput || !msgEl) return;

    const email = emailInput.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msgEl.textContent = '⚠ Please enter a valid email address.';
      msgEl.style.color = '#ff6b6b';
      return;
    }

    msgEl.textContent = '✓ Subscribed! Check your inbox for a welcome email.';
    msgEl.style.color = '#81c784';
    emailInput.value  = '';

    setTimeout(() => { msgEl.textContent = ''; }, 5000);
  });
}


/* ============================================================
   11. AUTO COPYRIGHT YEAR
   ============================================================ */
function initCopyrightYear() {
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
}


/* ============================================================
   12. GALLERY — KEYBOARD ACCESSIBILITY
   ============================================================ */
function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });
}


/* ============================================================
   13. INIT — Run all features on DOMContentLoaded
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeaderScroll();
  initActiveNav();
  initScrollReveal();
  initCounters();
  initBackToTop();
  initReservationForm();
  initContactForm();
  initNewsletter();
  initCopyrightYear();
  initGallery();
});