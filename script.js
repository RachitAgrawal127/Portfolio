/* ============================================
   PORTFOLIO JAVASCRIPT - Rachit Agrawal
   Particles, Animations, Interactivity
============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Detect if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

    // Initialize all features with mobile awareness
    initParticles(isMobile);
    initCustomCursor();
    initTypedEffect();
    if (!isMobile) {
        initVanillaTilt(); // Disable tilt on mobile for performance
    }
    initScrollAnimations();
    initCounterAnimation();
    if (!isMobile) {
        initMagneticButtons(); // Disable magnetic effect on mobile
    }
    initSmoothScroll();
    initMobileMenu(); // Initialize mobile menu
});

/* ============================================
   PARTICLES BACKGROUND
============================================ */
function initParticles(isMobile = false) {
    tsParticles.load("tsparticles", {
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: isMobile ? 30 : 60, // Lower FPS on mobile
        interactivity: {
            events: {
                onHover: {
                    enable: !isMobile, // Disable on mobile for performance
                    mode: "grab"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 150,
                    links: {
                        opacity: 0.5,
                        color: "#00d4ff"
                    }
                }
            }
        },
        particles: {
            color: { value: ["#00d4ff", "#8b5cf6", "#22c55e"] },
            links: {
                color: "#ffffff",
                distance: 150,
                enable: !isMobile, // Disable particle links on mobile
                opacity: 0.1,
                width: 1
            },
            move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: true,
                speed: isMobile ? 0.3 : 0.8, // Slower on mobile
                straight: false
            },
            number: {
                density: { enable: true, area: 1000 },
                value: isMobile ? 15 : 60 // Much fewer particles on mobile
            },
            opacity: {
                value: { min: 0.1, max: 0.5 },
                animation: {
                    enable: !isMobile, // Disable opacity animation on mobile
                    speed: 1,
                    minimumValue: 0.1
                }
            },
            shape: { type: "circle" },
            size: {
                value: { min: 1, max: 3 },
                animation: {
                    enable: !isMobile, // Disable size animation on mobile
                    speed: 2,
                    minimumValue: 0.5
                }
            }
        },
        detectRetina: true
    });
}

/* ============================================
   CUSTOM CURSOR
============================================ */
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (!cursor || !follower) return;

    // Check if it's a touch device
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        follower.style.display = 'none';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Cursor follows immediately
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Follower has more lag
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .magnetic, .project-card, .stat-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });
}

/* ============================================
   TYPED EFFECT FOR BADGE
============================================ */
function initTypedEffect() {
    const typedElement = document.getElementById('typed-badge');
    if (!typedElement) return;

    new Typed('#typed-badge', {
        strings: ['Incoming Summer 2026 SWE Intern'],
        typeSpeed: 50,
        backSpeed: 0,
        loop: false,
        showCursor: true,
        cursorChar: '|',
        onComplete: (self) => {
            // Hide cursor after typing completes
            setTimeout(() => {
                if (self.cursor) {
                    self.cursor.style.display = 'none';
                }
            }, 1500);
        }
    });
}

/* ============================================
   VANILLA TILT 3D EFFECT
============================================ */
function initVanillaTilt() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    if (tiltElements.length === 0) return;

    VanillaTilt.init(tiltElements, {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
        scale: 1.02
    });
}

/* ============================================
   SCROLL ANIMATIONS (IntersectionObserver)
============================================ */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay if specified
                const delay = entry.target.dataset.aosDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
}

/* ============================================
   COUNTER ANIMATION
============================================ */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    // Define thresholds for party effects
    const thresholds = {
        1607: { threshold: 1600, label: 'Expert' },   // Codeforces
        1721: { threshold: 1600, label: '3-Star' },   // CodeChef
        1929: { threshold: 1800, label: 'Knight' }    // LeetCode
    };

    let partyTriggered = false;
    const thresholdInfo = thresholds[target];

    // Find the label element (sibling of counter)
    const statValue = element.closest('.stat-value');
    const labelElement = statValue ? statValue.querySelector('.stat-label, .stat-badge') : null;

    // Hide label initially if there's a threshold
    if (labelElement && thresholdInfo) {
        labelElement.style.opacity = '0';
        labelElement.style.transform = 'scale(0.5)';
    }

    const updateCounter = () => {
        current += increment;

        // Check if we hit the threshold
        if (thresholdInfo && !partyTriggered && current >= thresholdInfo.threshold) {
            partyTriggered = true;
            triggerPartyEffect(element, labelElement, thresholdInfo.label);
        }

        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
            // Ensure label is visible at the end
            if (labelElement) {
                labelElement.style.opacity = '1';
                labelElement.style.transform = 'scale(1)';
            }
        }
    };

    updateCounter();
}

// Party effect function
function triggerPartyEffect(counterElement, labelElement, labelText) {
    const statCard = counterElement.closest('.stat-card');
    if (!statCard) return;

    // Show label with animation
    if (labelElement) {
        labelElement.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        labelElement.style.opacity = '1';
        labelElement.style.transform = 'scale(1.2)';

        // Bounce back
        setTimeout(() => {
            labelElement.style.transform = 'scale(1)';
        }, 300);
    }

    // Create confetti particles
    createConfetti(statCard);

    // Add glow effect to card
    statCard.style.transition = 'box-shadow 0.3s ease';
    statCard.style.boxShadow = '0 0 40px rgba(0, 212, 255, 0.6), 0 0 80px rgba(139, 92, 246, 0.4)';

    // Remove glow after animation
    setTimeout(() => {
        statCard.style.boxShadow = '';
    }, 1500);
}

// Confetti particles
function createConfetti(container) {
    const colors = ['#00d4ff', '#8b5cf6', '#22c55e', '#ffa116', '#ff6b6b', '#ffd93d'];
    const rect = container.getBoundingClientRect();

    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-particle';
        confetti.style.cssText = `
            position: fixed;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            pointer-events: none;
            z-index: 9999;
            opacity: 1;
        `;
        document.body.appendChild(confetti);

        // Animate confetti
        const angle = (Math.PI * 2 * i) / 30;
        const velocity = 150 + Math.random() * 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 100; // Upward bias

        let posX = rect.left + rect.width / 2;
        let posY = rect.top + rect.height / 2;
        let opacity = 1;
        let rotation = 0;

        const animateConfetti = () => {
            posX += vx * 0.016;
            posY += vy * 0.016 + 2; // Gravity
            opacity -= 0.02;
            rotation += 10;

            confetti.style.left = posX + 'px';
            confetti.style.top = posY + 'px';
            confetti.style.opacity = opacity;
            confetti.style.transform = `rotate(${rotation}deg)`;

            if (opacity > 0) {
                requestAnimationFrame(animateConfetti);
            } else {
                confetti.remove();
            }
        };

        requestAnimationFrame(animateConfetti);
    }
}

/* ============================================
   MAGNETIC BUTTONS
============================================ */
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - centerX) * 0.3;
            const deltaY = (e.clientY - centerY) * 0.3;

            btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

/* ============================================
   SMOOTH SCROLL
============================================ */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   NAVBAR SCROLL EFFECT
============================================ */
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '1rem 5%';
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
        navbar.style.padding = '1.5rem 5%';
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
    }
});

/* ============================================
   KINETIC TYPOGRAPHY (Section Headers)
============================================ */
// Only run on desktop for performance
if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const sectionTitles = document.querySelectorAll('.section-title');

        sectionTitles.forEach(title => {
            const rect = title.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                const translateX = (scrollPercent - 0.5) * 20; // Max 10px movement
                title.style.transform = `translateX(${translateX}px)`;
            }
        });
    });
}

/* ============================================
   MOBILE MENU
============================================ */
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinkItems = document.querySelectorAll('.nav-links a');

    if (!navToggle || !navLinks) return;

    // Toggle menu - use click for reliability
    const toggleHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        if (navOverlay) navOverlay.classList.toggle('active');

        // Prevent body scroll when menu is open
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    };

    navToggle.addEventListener('click', toggleHandler);

    // Close menu function
    const closeMenu = () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Close menu when clicking overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent ghost clicks
            closeMenu();
        });
    }

    // Close menu when clicking a link
    navLinkItems.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Take full control of the click

            const href = link.getAttribute('href');

            // Close menu first
            closeMenu();

            // Handle navigation manually
            if (href && href.startsWith('#')) {
                // Internal link - scroll smoothly
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    // Small delay to allow menu close animation to start/body overflow to reset
                    setTimeout(() => {
                        const headerOffset = 80;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }, 100); // 100ms delay for smoothness
                }
            } else if (href) {
                // External link - navigate immediately
                window.location.href = href;
            }
        });
    });
}
