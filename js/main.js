document.addEventListener('DOMContentLoaded', () => {
    // Loading animation
    const loading = document.querySelector('.loading');
    if(loading) {
        setTimeout(() => {
            loading.classList.add('hidden');
        }, 1000);
    }

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if(menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Header scroll effect
    const header = document.querySelector('header');
    if(header) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if(currentScroll <= 0) {
                header.classList.remove('scrolled');
                return;
            }
            
            if(currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
                header.classList.remove('scrolled');
                header.classList.add('scroll-down');
            } else if(currentScroll < lastScroll && header.classList.contains('scroll-down')) {
                header.classList.remove('scroll-down');
                header.classList.add('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if(!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if(navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    // Scroll to top button
    const scrollTop = document.querySelector('.scroll-top');
    if(scrollTop) {
        window.addEventListener('scroll', () => {
            if(window.pageYOffset > 300) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
        });

        scrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Form validation and submission
    const contactForm = document.querySelector('.contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', async(e) => {
            e.preventDefault();
            
            // Basic form validation
            const formData = new FormData(contactForm);
            let isValid = true;
            let errorMessage = '';

            for(let [key, value] of formData.entries()) {
                if(!value.trim()) {
                    isValid = false;
                    errorMessage = 'Por favor, preencha todos os campos.';
                    break;
                }
                if(key === 'email' && !isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Por favor, insira um email válido.';
                    break;
                }
            }

            if(!isValid) {
                alert(errorMessage);
                return;
            }

            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';

            try {
                // Simulate form submission (replace with actual API endpoint)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                contactForm.reset();
            } catch(error) {
                alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });
    }

    // Portfolio filter
    const portfolioFilter = document.querySelector('.portfolio-filter');
    if(portfolioFilter) {
        const filterButtons = portfolioFilter.querySelectorAll('button');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                portfolioItems.forEach(item => {
                    if(filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Testimonials slider
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    if(testimonialsSlider) {
        let currentSlide = 0;
        const slides = testimonialsSlider.querySelectorAll('.testimonial');
        const totalSlides = slides.length;
        
        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.style.transform = `translateX(${100 * (i - index)}%)`;
            });
        };
        
        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        };
        
        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        };
        
        // Auto slide every 5 seconds
        setInterval(nextSlide, 5000);
        
        // Add navigation buttons if there are multiple slides
        if(totalSlides > 1) {
            const prevButton = document.createElement('button');
            prevButton.className = 'slider-nav prev';
            prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevButton.addEventListener('click', prevSlide);
            
            const nextButton = document.createElement('button');
            nextButton.className = 'slider-nav next';
            nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextButton.addEventListener('click', nextSlide);
            
            testimonialsSlider.appendChild(prevButton);
            testimonialsSlider.appendChild(nextButton);
        }
        
        // Initialize slider
        showSlide(currentSlide);
    }

    // Helper functions
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
}); 