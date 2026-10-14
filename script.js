const viewport = document.querySelector('.gallery-scroll');
const track = document.querySelector('.gallery-track');
const cards = [...track.querySelectorAll('.photo-card')];
const modal = document.querySelector('.photo-modal');
const modalImage = modal.querySelector('img');
const modalCaption = modal.querySelector('p');
const previous = document.querySelector('.gallery-prev');
const next = document.querySelector('.gallery-next');
const count = document.querySelector('.gallery-count');
const dots = document.querySelector('.gallery-dots');
let current = 0;
let paused = false;
let touchStart = 0;
let suppressCardClick = false;

cards.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `查看第 ${index + 1} 张照片`);
  dot.addEventListener('click', () => showCard(index));
  dots.append(dot);
});

function showCard(index) {
  current = (index + cards.length) % cards.length;
  cards.forEach((card, cardIndex) => card.classList.toggle('is-active', cardIndex === current));
  [...dots.children].forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === current));
  count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
}

showCard(0);
setInterval(() => { if (!paused) showCard(current + 1); }, 5200);
previous.addEventListener('click', () => showCard(current - 1));
next.addEventListener('click', () => showCard(current + 1));
viewport.addEventListener('mouseenter', () => { paused = true; });
viewport.addEventListener('mouseleave', () => { paused = false; });
viewport.addEventListener('pointerdown', (event) => { touchStart = event.clientX; paused = true; });
viewport.addEventListener('pointerup', (event) => {
  const distance = event.clientX - touchStart;
  if (Math.abs(distance) > 36) {
    suppressCardClick = true;
    showCard(current + (distance < 0 ? 1 : -1));
    window.setTimeout(() => { suppressCardClick = false; }, 250);
  }
  setTimeout(() => { paused = false; }, 700);
});
track.addEventListener('click', (event) => {
  if (suppressCardClick) return;
  const card = event.target.closest('.photo-card');
  if (!card) return;
  const image = card.querySelector('img');
  modalImage.src = image.currentSrc || image.src;
  modalImage.alt = image.alt;
  modalCaption.textContent = card.querySelector('figcaption').innerText;
  modal.showModal();
});
modal.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => { if (event.target === modal) modal.close(); });

const navigationLinks = [...document.querySelectorAll('.side-nav nav a')];
const sections = navigationLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const setActiveNavigation = (section) => navigationLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`));
const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) setActiveNavigation(visible.target);
}, { threshold: [0.35, 0.55, 0.7], rootMargin: '-18% 0px -18% 0px' });
sections.forEach((section) => observer.observe(section));

const contactForm = document.querySelector('#contact-form');
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get('name').trim();
  const email = formData.get('email').trim();
  const subject = formData.get('subject').trim();
  const message = formData.get('message').trim();
  const body = `称呼：${name}\n邮箱：${email}\n\n${message}`;
  window.location.href = `mailto:tsinghuaveterans1996@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
