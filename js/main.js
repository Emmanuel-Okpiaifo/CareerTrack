// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Create particles
function createParticles() {
    const particles = document.createElement('div');
    particles.className = 'particles';
    document.querySelector('#hero').appendChild(particles);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.opacity = Math.random();
        particles.appendChild(particle);
    }
}

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('nav ul');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Close mobile menu when window is resized above mobile breakpoint
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Scroll reveal functionality with IntersectionObserver
const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Stop observing once revealed
        }
    });
};

const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
});

function setupReveal() {
    document.querySelectorAll('.reveal').forEach(element => {
        revealObserver.observe(element);
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    setupReveal(); // Initialize reveal animations
});

// Podcast notification popup functionality
const podcastForm = document.getElementById('podcast-notify-form');
const popupOverlay = document.querySelector('.popup-overlay');

if (podcastForm) {
    podcastForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show the popup
        popupOverlay.classList.add('active');
        
        // Clear the form
        podcastForm.reset();
    });
}

// Close popup when clicking outside
if (popupOverlay) {
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.classList.remove('active');
        }
    });
}

// Guide Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    const guidePopup = document.querySelector('.guide-popup-overlay');
    const guidePopupClose = document.querySelector('.guide-popup-close');
    const guidePopupForm = document.querySelector('.guide-popup-form');

    // Show popup after a short delay
    setTimeout(() => {
        guidePopup.classList.add('active');
    }, 1000);

    // Close popup when clicking the close button
    guidePopupClose.addEventListener('click', () => {
        guidePopup.classList.remove('active');
    });

    // Close popup when clicking outside
    guidePopup.addEventListener('click', (e) => {
        if (e.target === guidePopup) {
            guidePopup.classList.remove('active');
        }
    });

    // Handle form submission
    guidePopupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = guidePopupForm.querySelector('input[type="email"]').value;
        
        // Here you can add your email collection logic
        console.log('Email collected:', email);
        
        // Show success message
        const content = guidePopup.querySelector('.guide-popup-content');
        content.innerHTML = `
            <h2 class="guide-popup-title">Thank You!</h2>
            <p class="guide-popup-message">Your guide is being sent to your email. Check your inbox!</p>
        `;
        
        // Close popup after 3 seconds
        setTimeout(() => {
            guidePopup.classList.remove('active');
        }, 3000);
    });
});