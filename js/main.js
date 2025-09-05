// Navbar scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('header nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

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
    // Initialize intersection observer for .animate-on-scroll elements
    animateOnScroll();
    setupLogoSwitcher();
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

// (removed) optimizeVideo: no longer needed since hero video was replaced with canvas

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

// Hero Canvas Interactive Animation
(function initializeHeroCanvasAnimation() {
    const setupCanvas = () => {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return null;
        const context = canvas.getContext('2d');
        const devicePixelRatio = window.devicePixelRatio || 1;

        const resize = () => {
            const container = canvas.parentElement;
            const width = container.clientWidth;
            const height = container.clientHeight;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            canvas.width = Math.floor(width * devicePixelRatio);
            canvas.height = Math.floor(height * devicePixelRatio);
        };

        resize();
        window.addEventListener('resize', resize);

        return { canvas, context, devicePixelRatio };
    };

    function createParticleField(context, canvas, devicePixelRatio) {
        const particles = [];
        const pointer = { x: null, y: null, active: false };
        const isMobile = window.matchMedia('(max-width: 768px)').matches;

        // Slightly larger and fewer particles for clarity
        const baseDensity = isMobile ? 0.00005 : 0.00006;
        const area = (canvas.width * canvas.height) / (devicePixelRatio * devicePixelRatio);
        const targetCount = Math.min(120, Math.max(50, Math.floor(area * baseDensity)));

        const maxVelocity = isMobile ? 0.22 : 0.3;
        const connectDistance = (isMobile ? 110 : 160) * devicePixelRatio;
        const pointerInfluence = (isMobile ? 110 : 160) * devicePixelRatio;

        for (let i = 0; i < targetCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * maxVelocity * devicePixelRatio,
                vy: (Math.random() - 0.5) * maxVelocity * devicePixelRatio,
                r: (Math.random() * 1.4 + 0.9) * devicePixelRatio
            });
        }

        const handlePointerMove = (event) => {
            let clientX, clientY;
            if (event.touches && event.touches.length) {
                clientX = event.touches[0].clientX;
                clientY = event.touches[0].clientY;
            } else {
                clientX = event.clientX;
                clientY = event.clientY;
            }
            const rect = canvas.getBoundingClientRect();
            pointer.x = (clientX - rect.left) * devicePixelRatio;
            pointer.y = (clientY - rect.top) * devicePixelRatio;
            pointer.active = true;
        };

        const handlePointerLeave = () => {
            pointer.active = false;
        };

        window.addEventListener('mousemove', handlePointerMove, { passive: true });
        window.addEventListener('touchmove', handlePointerMove, { passive: true });
        window.addEventListener('mouseleave', handlePointerLeave);
        window.addEventListener('touchend', handlePointerLeave);

        const draw = () => {
            // Subtle gradient background wash
            const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, 'rgba(0,0,0,0.55)');
            gradient.addColorStop(1, 'rgba(0,0,0,0.35)');
            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);

            // Move and draw particles with soft glow
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Pointer attraction
                if (pointer.active && pointer.x != null) {
                    const dx = pointer.x - p.x;
                    const dy = pointer.y - p.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < pointerInfluence && dist > 0.0001) {
                        const force = (pointerInfluence - dist) / pointerInfluence;
                        p.vx += (dx / dist) * force * 0.016 * devicePixelRatio;
                        p.vy += (dy / dist) * force * 0.016 * devicePixelRatio;
                    }
                }

                p.x += p.vx;
                p.y += p.vy;

                // Soft bounds
                if (p.x <= 0 || p.x >= canvas.width) p.vx *= -1;
                if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1;

                context.beginPath();
                context.fillStyle = 'rgba(255,255,255,0.92)';
                context.shadowColor = 'rgba(255,255,255,0.45)';
                context.shadowBlur = 7 * devicePixelRatio;
                context.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                context.fill();
                context.shadowBlur = 0;
            }

            // Polished connections with thicker lines and alpha falloff
            context.lineCap = 'round';
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < connectDistance) {
                        const alpha = 1 - dist / connectDistance;
                        // Draw two-layer stroke for a refined look
                        context.beginPath();
                        context.strokeStyle = `rgba(255,255,255,${0.12 * alpha})`;
                        context.lineWidth = 2 * devicePixelRatio;
                        context.moveTo(particles[i].x, particles[i].y);
                        context.lineTo(particles[j].x, particles[j].y);
                        context.stroke();

                        context.beginPath();
                        context.strokeStyle = `rgba(255,255,255,${0.28 * alpha})`;
                        context.lineWidth = 1 * devicePixelRatio;
                        context.moveTo(particles[i].x, particles[i].y);
                        context.lineTo(particles[j].x, particles[j].y);
                        context.stroke();
                    }
                }
            }

            requestAnimationFrame(draw);
        };

        requestAnimationFrame(draw);
    }

    document.addEventListener('DOMContentLoaded', () => {
        const ctx = setupCanvas();
        if (ctx) {
            createParticleField(ctx.context, ctx.canvas, ctx.devicePixelRatio);
        }
    });
})();

// Logo switching shared setup
function setupLogoSwitcher() {
    const logo = document.querySelector('.logo-img');
    if (!logo) return;
    const darkLogo = logo.getAttribute('data-logo-dark') || logo.src;
    const lightLogo = logo.getAttribute('data-logo-light') || logo.src;
    const apply = () => {
        if (window.scrollY > 50) {
            logo.src = lightLogo;
        } else {
            logo.src = darkLogo;
        }
    };
    apply();
    window.addEventListener('scroll', apply, { passive: true });
}