document.addEventListener('DOMContentLoaded', () => {
    // Loading animation
    const loading = document.getElementById('loading');
    if (loading) {
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
            }, 300);
        }, 1000);
    }

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.classList.remove('scrolled');
                return;
            }
            
            if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
                header.classList.remove('scrolled');
                header.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
                header.classList.remove('scroll-down');
                header.classList.add('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menuToggle && navMenu && !menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (menuToggle) menuToggle.classList.remove('active');
                }
            }
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Scroll to top button
    const scrollTop = document.getElementById('scrollTop');
    if (scrollTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
        });

        scrollTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Basic form validation
            const formData = new FormData(contactForm);
            let isValid = true;
            let errorMessage = '';

            for (let [key, value] of formData.entries()) {
                if (!value.trim()) {
                    isValid = false;
                    errorMessage = 'Por favor, preencha todos os campos.';
                    break;
                }
                if (key === 'email' && !isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Por favor, insira um email válido.';
                    break;
                }
            }

            if (!isValid) {
                showMessage(errorMessage, 'error');
                return;
            }

            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

            try {
                // Simulate form submission (replace with actual API endpoint)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                showMessage('Mensagem enviada com sucesso! Entraremos em contacto em breve.', 'success');
                contactForm.reset();
            } catch (error) {
                showMessage('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.', 'error');
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }
        });
    }

    // Message display function
    function showMessage(message, type) {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 6px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        
        if (type === 'success') {
            messageEl.style.background = '#E63946';
        } else {
            messageEl.style.background = '#dc3545';
        }
        
        document.body.appendChild(messageEl);

        setTimeout(() => {
            messageEl.style.opacity = '0';
            messageEl.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.remove();
                }
            }, 300);
        }, 5000);
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Initialize animations on load
    setTimeout(() => {
        document.querySelectorAll('.animate-on-scroll').forEach((el, index) => {
            setTimeout(() => {
                el.style.transitionDelay = `${index * 100}ms`;
            }, 100);
        });
    }, 1200);
});