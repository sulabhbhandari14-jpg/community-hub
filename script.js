// CommunityCare interactive prototype
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

// Service cards preselect the service in the enquiry form.
document.querySelectorAll('[data-service]').forEach(card => {
  card.addEventListener('click', () => {
    const interest = document.querySelector('#interest');
    if (interest) interest.value = card.dataset.service;
  });
});

// Event category filters.
const filterButtons = document.querySelectorAll('.filter');
const eventCards = document.querySelectorAll('.event-card');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const category = button.dataset.filter;
    eventCards.forEach(card => {
      card.classList.toggle('is-hidden', category !== 'all' && card.dataset.category !== category);
    });
  });
});

// Event links take the chosen event to the enquiry form.
document.querySelectorAll('[data-book-event]').forEach(link => {
  link.addEventListener('click', () => {
    const interest = document.querySelector('#interest');
    if (interest) interest.value = 'Upcoming events';
    const message = document.querySelector('#message');
    if (message) message.value = `I'm interested in: ${link.dataset.bookEvent}`;
  });
});

// Demonstration form: validates fields and displays a local confirmation only.
const bookingForm = document.querySelector('#bookingForm');
const formStatus = document.querySelector('#formStatus');
if (bookingForm) {
  bookingForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!bookingForm.reportValidity()) return;
    const firstName = document.querySelector('#fullName').value.trim().split(/\s+/)[0];
    formStatus.textContent = `Thank you, ${firstName}. Your demo enquiry is ready — no information has been sent.`;
    bookingForm.reset();
  });
}

// Gentle reveal effect, with a fallback for browsers without IntersectionObserver.
const revealTargets = document.querySelectorAll('.service-card, .featured-event, .event-card, .booking-form, .lower-section > *');
revealTargets.forEach(element => element.classList.add('reveal'));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(element => observer.observe(element));
} else {
  revealTargets.forEach(element => element.classList.add('visible'));
}
