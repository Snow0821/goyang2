const REVEAL_SELECTOR = '.hero-copy, .visual-wrap, .feature-card, .testimonial, .result-box, .cta-shell';

export function initializeReveal(root = document) {
  const elements = [...root.querySelectorAll(REVEAL_SELECTOR)];

  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  elements.forEach((element, index) => {
    element.style.setProperty('--reveal-delay', `${Math.min(index * 60, 360)}ms`);
    observer.observe(element);
  });
}
