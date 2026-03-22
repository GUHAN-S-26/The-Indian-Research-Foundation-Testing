// Initialize AOS Animations
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 600,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // Testimonials section removed, Swiper initialization omitted

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const navbar = document.getElementById('navbar');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Change icon based on state
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('ph-list');
                icon.classList.add('ph-x');
            } else {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });

        // Close mobile menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('ph-x');
                    icon.classList.add('ph-list');
                }
            });
        });
    }

    // ── Scroll Progress Bar (Zeigarnik Effect) ──────────────────────────
    const progressBar = document.getElementById('scroll-progress');

    // ── Combined scroll handler ──────────────────────────────────────────
    const onScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Progress bar width
        if (progressBar) {
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = pct + '%';
        }


        // Navbar background on scroll
        if (navbar) {
            if (scrollTop > 50) {
                navbar.style.background = 'rgba(26, 26, 46, 0.98)';
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
                navbar.style.padding = '0';
            } else {
                navbar.style.background = 'rgba(26, 26, 46, 0.5)';
                navbar.style.boxShadow = 'none';
            }
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Initial state

    // ── Stats Counter Animation ──────────────────────────────────────────
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let current = 0;
            const increment = target / 60; // ~60 steps for smooth animation
            const tick = () => {
                current = Math.min(current + increment, target);
                counter.innerText = Math.ceil(current);
                if (current < target) {
                    requestAnimationFrame(tick);
                } else {
                    counter.innerText = target;
                }
            };
            requestAnimationFrame(tick);
        });
    }

    // Observe the stats-grid-section section (and hero trust-badge as fallback)
    const triggerSection = document.querySelector('.stats-grid-section') || document.querySelector('.trust-badge');
    if (triggerSection && counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && !hasCounted) {
                animateCounters();
                hasCounted = true;
            }
        }, { threshold: 0.3 });
        observer.observe(triggerSection);
    }
    
    // Form Submission Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn-submit');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Message Sent! <i class="ph ph-check"></i>';
            btn.style.background = '#4CAF50';
            setTimeout(() => {
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 3000);
        });
    }
});
