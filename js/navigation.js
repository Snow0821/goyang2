const NAVIGATION_SELECTOR = 'a[href^="#"]';
const ACTIVE_CLASS = 'is-active';

function getSections(links) {
  return links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
}

function setActiveLink(links, activeId) {
  links.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${activeId}`;
    link.classList.toggle(ACTIVE_CLASS, isActive);
    link.toggleAttribute('aria-current', isActive);
  });
}

export function initializeNavigation(root = document) {
  const links = [...root.querySelectorAll(NAVIGATION_SELECTOR)];
  const sections = getSections(links);

  links.forEach((link) => {
    link.addEventListener('click', () => {
      const target = document.querySelector(link.getAttribute('href'));
      target?.focus({ preventScroll: true });
    });
  });

  if (!('IntersectionObserver' in window) || sections.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

      if (visibleSection) setActiveLink(links, visibleSection.target.id);
    },
    { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.25, 0.5] },
  );

  sections.forEach((section) => observer.observe(section));
}
