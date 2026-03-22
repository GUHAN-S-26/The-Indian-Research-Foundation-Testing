// 2026 Core Protocols - Initialization + Premium Animations

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Advanced AOS Animations
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // 2. Cyber Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('ph-list', 'ph-x');
            } else {
                icon.classList.replace('ph-x', 'ph-list');
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.classList.replace('ph-x', 'ph-list');
            });
        });
    }

    // 3. Glass Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // 4. Typing Text Effect
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const text = typingElement.getAttribute('data-text') || '';
        let index = 0;
        typingElement.textContent = '';

        function typeCharacter() {
            if (index < text.length) {
                typingElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeCharacter, 70 + Math.random() * 50);
            }
        }

        // Start typing after a short delay for the title entrance animation
        setTimeout(typeCharacter, 1200);
    }

    // 5. Counter Animation (Fixed - now observes hero stat cards)
    const counters = document.querySelectorAll('.counter');
    let counted = false;

    function countUp() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const increment = target / 60;
            let current = 0;

            const update = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(update);
                } else {
                    counter.innerText = target;
                }
            };
            update();
        });
    }

    // Observe the first stat card instead of missing #metrics
    const statSection = document.querySelector('.bento-hero-stat1');
    if (statSection && counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !counted) {
                countUp();
                counted = true;
            }
        }, { threshold: 0.3 });
        observer.observe(statSection);
    }

    // 6. Active Nav Highlight on Scroll (Intersection Observer)
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a[href^="#"]');

    if (sections.length > 0 && navLinksAll.length > 0) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinksAll.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        });

        sections.forEach(section => sectionObserver.observe(section));
    }

    // 7. Neo-card Tilt Effect (3D Perspective on Hover)
    const tiltCards = document.querySelectorAll('[data-tilt]');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // 8. Parallax Blob Movement on Mouse
    const blobs = document.querySelectorAll('.blob-bg');
    
    if (blobs.length > 0 && window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            blobs.forEach((blob, index) => {
                const speed = (index + 1) * 12;
                const offsetX = x * speed;
                const offsetY = y * speed;
                blob.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
        }, { passive: true });
    }

    // 9. Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 10. Terminal Feedback on Form Submit
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;
            
            // Success State (Matrix green)
            btn.innerHTML = 'Data Transmitted <i class="ph-bold ph-check-circle"></i>';
            btn.style.background = 'var(--green-cyber)';
            btn.style.color = '#050B14';
            btn.style.boxShadow = '0 0 20px rgba(0, 230, 118, 0.4)';
            
            setTimeout(() => {
                form.reset();
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                btn.style.color = '';
                btn.style.boxShadow = '';
            }, 3000);
        });
    }

    // 11. Card Glow Follow Mouse Effect (Service cards)
    const glowCards = document.querySelectorAll('.neo-card');
    glowCards.forEach(card => {
        const glow = card.querySelector('.card-glow');
        if (glow) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(42, 117, 255, 0.15) 0%, transparent 60%)`;
                glow.style.opacity = '1';
            });
            card.addEventListener('mouseleave', () => {
                glow.style.opacity = '0';
            });
        }
    });
});
