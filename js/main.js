// Navbar scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('header nav');
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
const setupMobileMenu = () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('header nav ul');
    const body = document.body;

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !e.target.closest('nav') && 
                !e.target.closest('.nav-toggle')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        // Close mobile menu when clicking a link
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });

        // Close mobile menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
};

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
    setupMobileMenu();
    setupReveal();
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

// Program cards will now display normally in mobile view without carousel functionality

// Typewriter effect for hero heading
const heroHeading = document.querySelector('#hero h1');
const text = heroHeading.textContent;
const phrases = [
    "10X Your Life.",
    "10X Your Income.",
    "10X Your Business.",
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 150;
let deletingDelay = 75;
let pauseDelay = 3000;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        // Deleting text
        heroHeading.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = deletingDelay;
    } else {
        // Typing text
        heroHeading.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 150;
    }

    // If word is complete
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingDelay = pauseDelay;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingDelay = 1000;
    }

    setTimeout(typeWriter, typingDelay);
}

// Start the typewriter effect when DOM is ready for faster perceived load
document.addEventListener('DOMContentLoaded', () => {
    heroHeading.textContent = '';
    typeWriter();

    const video = document.querySelector('#hero video');
    if (video) {
        // Ensure the browser aggressively loads the video and starts playback
        video.preload = 'auto';
        video.load();
        const tryPlay = () => video.play().catch(() => {});
        if (video.readyState >= 2) {
            tryPlay();
        } else {
            video.addEventListener('loadeddata', tryPlay, { once: true });
        }
    }
});

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });
};

// Optimize video loading
const optimizeVideo = () => {
    const video = document.querySelector('video');
    if (video) {
        // Pause video when not in viewport
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });

        videoObserver.observe(video);
    }
};

// Handle form submission
const setupForm = () => {
    const form = document.getElementById('waitlist-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            console.log('Form submitted');
        });
    }
};

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reinitialize animations if needed
        animateOnScroll();
    }, 250);
});

// Handle scroll performance
let scrollTimer;
window.addEventListener('scroll', () => {
    if (!scrollTimer) {
        scrollTimer = setTimeout(() => {
            scrollTimer = null;
            // Add any scroll-based animations here
        }, 100);
    }
}, { passive: true });