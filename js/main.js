// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                // Play Hero Animations
                if (heroTl) heroTl.play();
            }, 500);
        }, 2500); // Wait for progress bar animation
    }
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, button, .card, .domain-card');

if (cursor && follower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 50);
    });

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            follower.classList.add('cursor-hover');
        });
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            follower.classList.remove('cursor-hover');
        });
    });
}

// Navigation
// Smooth scroll for Explore the Future button
document.addEventListener('DOMContentLoaded', function() {
    var exploreBtn = document.querySelector('.btn-explore');
    if (exploreBtn && exploreBtn.getAttribute('href') === '#domains') {
        exploreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.getElementById('domains');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('toggle');
    });
}

// Particles.js Config
if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#00f3ff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": false },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#00f3ff", "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 4, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "window",
            "events": {
                "onhover": { "enable": true, "mode": "repulse" },
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            },
            "modes": {
                "repulse": { "distance": 200, "duration": 0.4 },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });
}

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

let heroTl;

function initHeroAnimations() {
    if (!document.querySelector('.hero')) return; // Exit if no hero section

    heroTl = gsap.timeline({ paused: true });
    heroTl.from(".hero h1", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    })
    .from(".hero h2", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: -0.5
    })
    .from(".btn-explore", {
        y: 20,
        autoAlpha: 0,
        duration: 0.5,
        clearProps: "all"
    }, "+=0.7"); // Add 0.7s delay after h2
}

// Initialize animations immediately to set starting states
initHeroAnimations();

// Scroll Animations
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1
    });
});

if (document.querySelector('.about-text')) {
    gsap.from(".about-text", {
        scrollTrigger: {
            trigger: ".about",
            start: "top 70%"
        },
        x: -50,
        opacity: 0,
        duration: 1
    });
}

if (document.querySelector('.card')) {
    gsap.from(".card", {
        scrollTrigger: {
            trigger: ".mission-vision-cards",
            start: "top 80%"
        },
        y: 50,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.2,
        clearProps: "all"
    });
}

if (document.querySelector('.domain-card')) {
    gsap.from(".domain-card", {
        scrollTrigger: {
            trigger: ".domains",
            start: "top 70%"
        },
        y: 100,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        clearProps: "all" // Ensure CSS hover effects work after animation
    });
}

// Tilt.js Initialization
if (document.querySelectorAll(".card").length > 0) {
    VanillaTilt.init(document.querySelectorAll(".card"), {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
    });
}

if (document.querySelectorAll(".domain-card").length > 0) {
    VanillaTilt.init(document.querySelectorAll(".domain-card"), {
        max: 15,
        speed: 400,
    });
}

// Modal Logic
const modal = document.getElementById('reg-modal');
const closeModal = document.querySelector('.close-modal');
const modalTitle = document.getElementById('modal-event-title');

if (modal) {
    window.openModal = function(eventName) {
        modal.style.display = "block";
        modalTitle.innerText = "Register for " + eventName;
    }

    closeModal.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// Form Submission (Mock)
const regForm = document.getElementById('registration-form');
if (regForm) {
    regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = "Registering...";
        
        setTimeout(() => {
            btn.innerText = "Success! 🎉";
            btn.style.background = "#00ff00";
            
            setTimeout(() => {
                modal.style.display = "none";
                btn.innerText = originalText;
                btn.style.background = "var(--primary-color)";
                e.target.reset();
            }, 1500);
        }, 1500);
    });
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = "Sending...";
        
        setTimeout(() => {
            btn.innerText = "Message Sent! 🚀";
            
            setTimeout(() => {
                btn.innerText = originalText;
                e.target.reset();
            }, 2000);
        }, 1500);
    });
}

// Back to Top
const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    window.scrollToTop = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Counter Animation
const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
    counters.forEach(counter => {
        counter.innerText = '0';
        
        const updateCounter = () => {
            const target = +counter.getAttribute('data-target');
            const c = +counter.innerText;
            
            const increment = target / 200;
            
            if (c < target) {
                counter.innerText = `${Math.ceil(c + increment)}`;
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target;
            }
        };
        
        // Trigger animation when in view
        ScrollTrigger.create({
            trigger: counter,
            start: "top 80%",
            onEnter: () => updateCounter(),
            once: true
        });
    });
}
