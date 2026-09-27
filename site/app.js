(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const form = document.getElementById('birth-form');
  const year = document.getElementById('birth-year');
  const month = document.getElementById('birth-month');
  const day = document.getElementById('birth-day');
  const error = document.getElementById('birth-error');
  const result = document.getElementById('reading-result');
  const fields = [year, month, day];
  const calculator = window.SasasaNumerology;
  function refreshDays() {
    const selected = day.value;
    const y = /^\d{4}$/.test(year.value) ? Number(year.value) : 2000;
    const m = Number(month.value);
    const max = m ? new Date(Date.UTC(y, m, 0)).getUTCDate() : 31;
    day.replaceChildren(new Option('―', ''));
    for (let i = 1; i <= max; i++) day.add(new Option(String(i), String(i)));
    if (Number(selected) <= max) day.value = selected;
  }
  refreshDays();
  function clearResult() {
    result.hidden = true;
    error.hidden = true;
    fields.forEach(field => field.removeAttribute('aria-invalid'));
  }
  year.addEventListener('input', () => { clearResult(); refreshDays(); });
  month.addEventListener('change', () => { clearResult(); refreshDays(); });
  day.addEventListener('change', clearResult);
  form.addEventListener('submit', event => {
    event.preventDefault();
    const normalizedYear = year.value.trim().replace(/[０-９]/g, char => String.fromCharCode(char.charCodeAt(0) - 0xfee0));
    year.value = normalizedYear;
    const y = Number(normalizedYear), m = Number(month.value), d = Number(day.value);
    const missing = fields.find(field => !field.value);
    const message = missing || !/^\d{4}$/.test(normalizedYear) ? '生年月日をすべて入力してください。年は西暦4桁でお願いします。' : calculator.validateDate(y, m, d);
    if (message) {
      result.hidden = true;
      error.textContent = message;
      error.hidden = false;
      const invalid = missing || year;
      invalid.setAttribute('aria-invalid', 'true');
      invalid.focus();
      return;
    }
    error.hidden = true;
    fields.forEach(field => field.removeAttribute('aria-invalid'));
    const number = calculator.birthNumber(y, m, d);
    const meaning = calculator.meanings[number];
    document.getElementById('result-number').textContent = String(number);
    document.getElementById('result-announcement').textContent = String(number);
    document.getElementById('result-keywords').textContent = meaning.keywords;
    document.getElementById('result-description').textContent = meaning.description;
    document.getElementById('result-question').textContent = meaning.question;
    result.classList.remove('is-new');
    result.hidden = false;
    requestAnimationFrame(() => {
      result.classList.add('is-new');
      document.getElementById('result-heading').focus({ preventScroll: true });
      result.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
    });
  });
  form.querySelector('fieldset').disabled = false;
  form.querySelector('[type="submit"]').disabled = false;

  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobile-menu');
  function closeMenu(restoreFocus = false) {
    menu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'メニューを開く');
    if (restoreFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !menu.hidden) closeMenu(true); });
  document.addEventListener('click', event => { if (!menu.hidden && !event.target.closest('.site-header')) closeMenu(); });
  window.matchMedia('(min-width: 781px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

  document.querySelectorAll('[data-dialog]').forEach(button => button.addEventListener('click', () => document.getElementById(button.dataset.dialog).showModal()));
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
    });
  });
  // Content remains visible if scripts are unavailable or motion is reduced.
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const sections = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('is-waiting');
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0, rootMargin: '0px 0px -32px 0px' });
    sections.forEach(section => {
      if (section.getBoundingClientRect().top > window.innerHeight) section.classList.add('is-waiting');
      observer.observe(section);
    });
    reducedMotion.addEventListener('change', event => {
      if (event.matches) { sections.forEach(section => section.classList.remove('is-waiting')); observer.disconnect(); }
    });
  }
})();
