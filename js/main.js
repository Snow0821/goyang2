import { initializeNavigation } from './navigation.js';
import { initializeReveal } from './reveal.js';

function initializeApp() {
  initializeNavigation();
  initializeReveal();
}

document.addEventListener('DOMContentLoaded', initializeApp, { once: true });
