/* ========================================
   EIGEN DATA — Main JavaScript
======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ----- Mobile navigation -----
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  const setMenuState = (isOpen) => {
    if (!hamburger || !navMenu) return;

    hamburger.classList.toggle('active', isOpen);
    navMenu.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
  };

  if (hamburger && navMenu) {
    hamburger.setAttribute('aria-controls', 'nav-menu');
    hamburger.setAttribute('aria-expanded', 'false');

    hamburger.addEventListener('click', () => {
      setMenuState(!navMenu.classList.contains('active'));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuState(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenuState(false);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) setMenuState(false);
    });
  }

  // ----- Header scroll effect -----
  const header = document.getElementById('header');
  const updateHeaderState = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 20);
  };

  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });

  // ----- FAQ accordion -----
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.setAttribute('aria-expanded', String(item.classList.contains('active')));
    question.addEventListener('click', () => {
      const shouldOpen = !item.classList.contains('active');

      faqItems.forEach((faqItem) => {
        faqItem.classList.remove('active');
        faqItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      if (shouldOpen) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
});
