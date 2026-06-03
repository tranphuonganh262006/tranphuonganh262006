document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. MOBILE NAVIGATION TOGGLE
    // ==========================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // ==========================================
    // 2. NAVBAR SCROLL EFFECT
    // ==========================================
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==========================================
    // 3. SMOOTH SCROLL & ACTIVE LINK TRACKING
    // ==========================================
    const sections = document.querySelectorAll('section');
    
    // Highlight active section in navigation
    const activeSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3, // Highlight when 30% of section is visible
        rootMargin: "-10% 0px -40% 0px"
    });

    sections.forEach(section => {
        activeSectionObserver.observe(section);
    });

    // ==========================================
    // 4. INTERSECTION OBSERVER FOR FADE-IN
    // ==========================================
    const fadeInElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Once it appears, stop observing it
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    fadeInElements.forEach(el => {
        fadeInObserver.observe(el);
    });

    // ==========================================
    // 5. TYPEWRITER EFFECT
    // ==========================================
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const words = JSON.parse(typewriterElement.getAttribute('data-words'));
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentText = '';
        let typingSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                // Delete characters
                currentText = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50; // faster deleting
            } else {
                // Add characters
                currentText = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 120; // normal typing
            }

            typewriterElement.textContent = currentText;

            // Handle word boundary cases
            if (!isDeleting && currentText === currentWord) {
                // Complete typing, pause before deleting
                typingSpeed = 2000; 
                isDeleting = true;
            } else if (isDeleting && currentText === '') {
                // Done deleting, move to next word
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500; // brief pause before typing next word
            }

            setTimeout(type, typingSpeed);
        }

        // Start typing
        setTimeout(type, 1000);
    }

    // ==========================================
    // 6. CUSTOM PASTEL TRAIL CURSOR (LAGGING POINTER)
    // ==========================================
    const cursor = document.getElementById('cursor-trail');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    const speed = 0.15; // Interpolation factor (0 to 1) for lagging lag-effect

    if (cursor) {
        // Track true mouse coordinates
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Linear interpolation animate function
        function animateCursor() {
            // Lerp logic
            cursorX += (mouseX - cursorX) * speed;
            cursorY += (mouseY - cursorY) * speed;

            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover expand classes for interactive items
        const interactiveElements = document.querySelectorAll(
            'a, button, input, textarea, .glass-card, .about-card, .skills-card, .activity-card, .timeline-content'
        );

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hovered');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovered');
            });
        });
    }

    // ==========================================
    // 7. CONTACT FORM LOGIC (MOCK SUBMISSION)
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop default browser submit
            
            // Collect fields (for demonstration)
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const message = document.getElementById('form-message').value;

            // Trigger sending state on the button
            const submitBtn = document.getElementById('form-submit-btn');
            const submitBtnText = submitBtn.querySelector('span');
            
            submitBtn.style.pointerEvents = 'none';
            submitBtn.style.opacity = '0.7';
            submitBtnText.textContent = 'Sending...';

            // Simulate API request
            setTimeout(() => {
                // Show success screen
                formFeedback.classList.remove('hidden');
                
                // Clear the form fields
                contactForm.reset();
                
                // Restore button
                submitBtn.style.pointerEvents = 'auto';
                submitBtn.style.opacity = '1';
                submitBtnText.textContent = 'Send Message';
                
                // Auto hide feedback screen after 5 seconds
                setTimeout(() => {
                    formFeedback.classList.add('hidden');
                }, 5000);

            }, 1200);
        });
    }
});
