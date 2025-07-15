/**
 * ANIMATIONS FUNCTIONALITY
 * Gerencia animações, parallax e efeitos visuais
 */

class AnimationsManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupButtonAnimations();
        this.setupParallaxEffects();
        this.setupScrollAnimations();
        this.setupHoverEffects();

        console.log('Animations Manager initialized');
    }

    setupButtonAnimations() {
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-3px) scale(1.05)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
            });

            button.addEventListener('mousedown', () => {
                button.style.transform = 'translateY(-1px) scale(1.02)';
            });

            button.addEventListener('mouseup', () => {
                button.style.transform = 'translateY(-3px) scale(1.05)';
            });
        });
    }

    setupParallaxEffects() {
        // Ativar parallax apenas em desktop para melhor performance
        if (window.innerWidth <= 1024) return;

        const waves = document.querySelectorAll('.wave-1, .wave-2, .wave-3, .wave-4');
        const miniWaves = document.querySelectorAll('.mini-wave');

        let ticking = false;

        const parallaxWaves = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;

                    waves.forEach((wave, index) => {
                        const speed = 0.3 + (index * 0.1);
                        wave.style.transform = `translateY(${scrolled * speed}px)`;
                    });

                    miniWaves.forEach((wave, index) => {
                        const speed = 0.1 + (index * 0.05);
                        wave.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
                    });

                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', parallaxWaves, { passive: true });
    }

    setupScrollAnimations() {
        // Intersection Observer para animações na entrada
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observar elementos que devem animar
        const animateElements = document.querySelectorAll('.sobre-card, .servico-card, .content-section');
        animateElements.forEach(el => {
            observer.observe(el);
        });

        // CSS para as animações
        const style = document.createElement('style');
        style.textContent = `
            .sobre-card, .servico-card, .content-section {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease-out;
            }
            
            .sobre-card.animate-in, .servico-card.animate-in, .content-section.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .sobre-card {
                transition-delay: 0.1s;
            }
            
            .sobre-card:nth-child(2) {
                transition-delay: 0.2s;
            }
            
            .sobre-card:nth-child(3) {
                transition-delay: 0.3s;
            }
        `;
        document.head.appendChild(style);
    }

    setupHoverEffects() {
        // Efeito hover nas cards de serviço
        const servicoCards = document.querySelectorAll('.servico-card');

        servicoCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = 'var(--shadow-xl)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '';
            });
        });

        // Efeito hover nas cards sobre
        const sobreCards = document.querySelectorAll('.sobre-card');

        sobreCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });

        // Efeito hover nos ícones sociais
        const socialIcons = document.querySelectorAll('.social-icons a, .footer-social a');

        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.transform = 'translateY(-3px) scale(1.1)';
            });

            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Método para adicionar animação de loading
    showLoading(element) {
        element.style.opacity = '0.7';
        element.style.pointerEvents = 'none';
        element.classList.add('loading');
    }

    hideLoading(element) {
        element.style.opacity = '1';
        element.style.pointerEvents = '';
        element.classList.remove('loading');
    }

    // Método para animação suave de scroll para elemento
    scrollToElement(element, offset = 0) {
        const elementPosition = element.offsetTop - offset;

        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.animationsManager = new AnimationsManager();
});

// Exportar para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationsManager;
}