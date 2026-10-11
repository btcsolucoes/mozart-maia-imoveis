'use strict';

document.documentElement.classList.add('js');

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionToggle = document.getElementById('motion-toggle');
let motionReduced = motionPreference.matches;

function applyMotionPreference() {
  document.documentElement.classList.toggle('motion-off', motionReduced);
  motionToggle.setAttribute('aria-pressed', String(motionReduced));
  document.dispatchEvent(new CustomEvent('mozart:motionchange', {
    detail: { reduced: motionReduced }
  }));
}

motionToggle.addEventListener('click', () => {
  motionReduced = !motionReduced;
  applyMotionPreference();
});
motionPreference.addEventListener('change', event => {
  motionReduced = event.matches;
  applyMotionPreference();
});
applyMotionPreference();

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('site-nav');
const mobileViewport = window.matchMedia('(max-width: 760px)');

function closeMenu({ returnFocus = false } = {}) {
  navigation.removeAttribute('data-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  menuButton.textContent = 'Menu';
  if (returnFocus) menuButton.focus();
}

menuButton.addEventListener('click', () => {
  if (menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    return;
  }
  navigation.dataset.open = 'true';
  menuButton.setAttribute('aria-expanded', 'true');
  menuButton.setAttribute('aria-label', 'Fechar menu');
  menuButton.textContent = 'Fechar';
});
navigation.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => closeMenu());
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu({ returnFocus: true });
  }
});
document.addEventListener('click', event => {
  if (mobileViewport.matches && !event.target.closest('.site-header')) closeMenu();
});
mobileViewport.addEventListener('change', () => closeMenu());

const intentLabels = {
  comprar: 'comprar um imóvel',
  vender: 'vender meu imóvel',
  avaliar: 'solicitar uma avaliação imobiliária',
  pericia: 'conversar sobre perícia imobiliária'
};
const initialIntent = new URL(window.location.href).searchParams.get('objetivo');
if (Object.hasOwn(intentLabels, initialIntent)) {
  const selected = document.querySelector(`input[name="objetivo"][value="${initialIntent}"]`);
  if (selected) selected.checked = true;
}

const form = document.getElementById('contact-form');
const nameInput = document.getElementById('nome');
const nameError = document.getElementById('nome-error');
const formStatus = document.getElementById('form-status');

nameInput.addEventListener('input', () => {
  nameInput.removeAttribute('aria-invalid');
  nameError.textContent = '';
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const name = nameInput.value.trim();
  if (!name) {
    nameInput.setAttribute('aria-invalid', 'true');
    nameError.textContent = 'Digite seu nome para preparar a mensagem.';
    formStatus.textContent = '';
    nameInput.focus();
    return;
  }
  const intent = new FormData(form).get('objetivo');
  const extra = document.getElementById('mensagem').value.trim();
  const message = `Olá, Mozart! Meu nome é ${name}. Gostaria de ${intentLabels[intent] || intentLabels.comprar}.${extra ? '\n\n' + extra : ''}`;
  const url = 'https://wa.me/5581999712940?text=' + encodeURIComponent(message);
  window.open(url, '_blank', 'noopener,noreferrer');
  const recoveryLink = document.createElement('a');
  recoveryLink.href = url;
  recoveryLink.target = '_blank';
  recoveryLink.rel = 'noopener noreferrer';
  recoveryLink.textContent = 'abra por este link';
  formStatus.replaceChildren(
    document.createTextNode('Sua mensagem está pronta. Se o WhatsApp não abriu, '),
    recoveryLink,
    document.createTextNode('.')
  );
});

form.querySelector('button[type="submit"]').disabled = false;
document.getElementById('year').textContent = new Date().getFullYear();