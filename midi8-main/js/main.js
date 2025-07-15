// ===== HEADER FUNCTIONALITY =====

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

if (menuToggle && mobileNav) {
    const hamburgers = menuToggle.querySelectorAll('.hamburger');

    menuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');

        // Animate hamburger menu
        hamburgers[0].style.transform = mobileNav.classList.contains('active')
            ? 'rotate(-45deg) translate(-7px, 7px)' : '';
        hamburgers[1].style.opacity = mobileNav.classList.contains('active') ? '0' : '1';
        hamburgers[2].style.transform = mobileNav.classList.contains('active')
            ? 'rotate(45deg) translate(-7px, -7px)' : '';
    });

    // Close mobile nav when clicking on links
    mobileNav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            mobileNav.classList.remove('active');
            hamburgers[0].style.transform = '';
            hamburgers[1].style.opacity = '1';
            hamburgers[2].style.transform = '';
        }
    });
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ACTIVE NAVIGATION HIGHLIGHTING =====
function updateActiveNavigation() {
    const sections = ['home', 'sobre', 'servicos', 'portfolio', 'depoimentos', 'contacto'];
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    let current = '';
    const scrollPosition = window.scrollY + 150; // Offset for header height

    // Check which section is currently in view
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = window.scrollY + rect.top;
            const elementBottom = elementTop + element.offsetHeight;

            if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
                current = section;
            }
        }
    });

    // If no section is detected, default to 'home' when at the top
    if (!current && window.scrollY < 100) {
        current = 'home';
    }

    // Update desktop navigation
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Update mobile navigation
    mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Atualizar underline para o link ativo
    const navList = document.querySelector('.nav-list');
    const underline = document.querySelector('.nav-underline');
    const active = document.querySelector('.nav-link.active, .nav-link[aria-current="page"]');
    if (navList && underline && active) {
        const listRect = navList.getBoundingClientRect();
        const linkRect = active.getBoundingClientRect();
        const left = linkRect.left - listRect.left + navList.scrollLeft;
        underline.style.transition = 'none';
        underline.style.width = '0px';
        underline.style.left = (left + linkRect.width/2) + 'px';
        underline.style.opacity = 1;
        void underline.offsetWidth;
        underline.style.transition = 'width 0.35s cubic-bezier(0.4,0,0.2,1), left 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s cubic-bezier(0.4,0,0.2,1)';
        underline.style.left = left + 'px';
        underline.style.width = linkRect.width + 'px';
    }
}

// NOVO: Ativar link ao clique (desktop e mobile)
document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    link.addEventListener('click', function() {
        // Remover ativo de todos os links do mesmo menu
        const isMobile = this.classList.contains('mobile-nav-link');
        const allLinks = document.querySelectorAll(isMobile ? '.mobile-nav-link' : '.nav-link');
        allLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Listen for scroll events to update active navigation
window.addEventListener('scroll', updateActiveNavigation);

// Initial check on page load
document.addEventListener('DOMContentLoaded', updateActiveNavigation);

// ===== HERO STATISTICS ANIMATION =====
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number');

    numbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-count'));
        const increment = target / 60;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            number.textContent = Math.floor(current);
        }, 50);
    });
}

// Trigger number animation when hero stats are visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('hero-stats')) {
            animateNumbers();
            observer.unobserve(entry.target);
        }
    });
});

// Observe hero stats section
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    observer.observe(heroStats);
}

// ===== UNDERLINE DESLIZANTE MENU PRINCIPAL =====
let underlineHasBeenShown = false;
let hasInteracted = false;

document.addEventListener('DOMContentLoaded', function() {
    const navList = document.querySelector('.nav-list');
    const underline = document.querySelector('.nav-underline');
    const links = document.querySelectorAll('.nav-link');
    if (!navList || !underline || !links.length) return;

    // Esconder underline e cor ativa no início
    underline.style.width = '0px';
    underline.style.opacity = 0;
    links.forEach(link => link.classList.remove('active'));

    function moveUnderlineTo(link) {
        const listRect = navList.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();
        const left = linkRect.left - listRect.left + navList.scrollLeft;
        underline.style.transition = 'none';
        underline.style.width = '0px';
        underline.style.left = (left + linkRect.width/2) + 'px';
        if (underlineHasBeenShown) {
            underline.style.opacity = 1;
        }
        void underline.offsetWidth;
        underline.style.transition = 'width 0.35s cubic-bezier(0.4,0,0.2,1), left 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s cubic-bezier(0.4,0,0.2,1)';
        underline.style.left = left + 'px';
        underline.style.width = linkRect.width + 'px';
    }
    function hideUnderline() {
        underline.style.opacity = 0;
        underline.style.width = '0px';
    }

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            underlineHasBeenShown = true;
            hasInteracted = true;
            requestAnimationFrame(() => moveUnderlineTo(link));
        });
        link.addEventListener('focus', () => {
            underlineHasBeenShown = true;
            hasInteracted = true;
            requestAnimationFrame(() => moveUnderlineTo(link));
        });
        link.addEventListener('mouseleave', () => {
            const active = document.querySelector('.nav-link.active, .nav-link[aria-current="page"]');
            if (active && hasInteracted) requestAnimationFrame(() => moveUnderlineTo(active)); else hideUnderline();
        });
        link.addEventListener('blur', () => {
            const active = document.querySelector('.nav-link.active, .nav-link[aria-current="page"]');
            if (active && hasInteracted) requestAnimationFrame(() => moveUnderlineTo(active)); else hideUnderline();
        });
    });

    function positionUnderlineOnActive() {
        const active = document.querySelector('.nav-link.active, .nav-link[aria-current="page"]');
        if (active && underlineHasBeenShown && hasInteracted) requestAnimationFrame(() => moveUnderlineTo(active));
        else hideUnderline();
    }
    window.addEventListener('resize', positionUnderlineOnActive);
    window.addEventListener('scroll', () => {
        underlineHasBeenShown = true;
        hasInteracted = true;
        positionUnderlineOnActive();
    });
    setTimeout(positionUnderlineOnActive, 200);
    positionUnderlineOnActive();

    // Atualizar underline ao clicar em links
    links.forEach(link => {
        link.addEventListener('click', () => {
            underlineHasBeenShown = true;
            hasInteracted = true;
            requestAnimationFrame(() => moveUnderlineTo(link));
        });
    });
});

// ===== ANIMAÇÃO DO 8 DA LOGO MIDI8 =====
document.addEventListener('DOMContentLoaded', function() {
    const logoEight = document.querySelector('.logo-eight');
    if (logoEight) {
        let rotating = false;
        logoEight.addEventListener('mouseenter', () => {
            if (!rotating) {
                logoEight.classList.add('rotate-360');
                rotating = true;
                setTimeout(() => {
                    logoEight.classList.remove('rotate-360');
                    rotating = false;
                }, 700);
            }
        });
    }

    // ===== HOVER NAV-LINK: AMARELO E LINHA =====
    const navLinks = document.querySelectorAll('.nav-link');
    const underline = document.querySelector('.nav-underline');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.classList.add('hover-yellow');
            if (underline) {
                const listRect = link.parentElement.parentElement.getBoundingClientRect();
                const linkRect = link.getBoundingClientRect();
                const left = linkRect.left - listRect.left + link.parentElement.parentElement.scrollLeft;
                underline.style.width = linkRect.width + 'px';
                underline.style.left = left + 'px';
                underline.style.opacity = 1;
            }
        });
        link.addEventListener('mouseleave', () => {
            link.classList.remove('hover-yellow');
            // underline já é reposicionado pelo código existente
        });
    });
});

// ===== HERO PARTICLES PREMIUM =====
document.addEventListener('DOMContentLoaded', function() {
  const particlesContainer = document.querySelector('.hero-particles');
  if (!particlesContainer) return;

  const colors = [
    'rgba(253,197,0,0.85)', // amarelo premium
    'rgba(0,63,136,0.22)',  // azul claro
    'rgba(0,41,107,0.18)',  // azul escuro
    'rgba(255,255,255,0.13)', // branco sutil
    'rgba(0,80,157,0.18)'   // azul médio
  ];
  const numParticles = window.innerWidth < 600 ? 14 : 28;
  const particles = [];

  for (let i = 0; i < numParticles; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 18 + 6;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.top = `${Math.random() * 90}%`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.opacity = 0.18 + Math.random() * 0.32;
    p.style.filter = `blur(${Math.random() * 2.5 + 1.5}px)`;
    particlesContainer.appendChild(p);
    particles.push({el: p, x: parseFloat(p.style.left), y: parseFloat(p.style.top), s: size, dx: (Math.random()-0.5)*0.08, dy: (Math.random()-0.5)*0.06});
  }

  function animateParticles() {
    for (let i = 0; i < particles.length; i++) {
      let pt = particles[i];
      pt.x += pt.dx;
      pt.y += pt.dy;
      if (pt.x < 0 || pt.x > 100) pt.dx *= -1;
      if (pt.y < 0 || pt.y > 95) pt.dy *= -1;
      pt.el.style.left = pt.x + '%';
      pt.el.style.top = pt.y + '%';
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
});

// ===== HERO BRILHOS PREMIUM =====
document.addEventListener('DOMContentLoaded', function() {
  const brilhosContainer = document.querySelector('.hero-brilhos');
  if (!brilhosContainer) return;
  const pontos = [
    {top: '18%', left: '22%', cor: ''},
    {top: '38%', left: '12%', cor: 'azul'},
    {top: '62%', left: '19%', cor: ''},
    {top: '14%', left: '78%', cor: 'azul'},
    {top: '44%', left: '88%', cor: ''},
    {top: '68%', left: '81%', cor: 'azul'},
    {top: '82%', left: '51%', cor: ''}
  ];
  pontos.forEach(pt => {
    const b = document.createElement('div');
    b.className = 'brilho' + (pt.cor ? ' ' + pt.cor : '');
    b.style.top = pt.top;
    b.style.left = pt.left;
    brilhosContainer.appendChild(b);
  });
});

// ===== PERFORMANCE OPTIMIZATIONS =====

// Throttle scroll events for better performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    // Header scroll effect
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Update active navigation
    updateActiveNavigation();
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Keyboard navigation for mobile menu
if (menuToggle) {
    menuToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            menuToggle.click();
        }
    });
}

// Focus management for mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        if (menuToggle) {
            const hamburgers = menuToggle.querySelectorAll('.hamburger');
            hamburgers[0].style.transform = '';
            hamburgers[1].style.opacity = '1';
            hamburgers[2].style.transform = '';
            menuToggle.focus();
        }
    }
});

// ===== CONSOLE BRANDING =====
console.log(`
🎨 MIDI8 - Presença Digital que Transforma
✨ Website desenvolvido com atenção aos detalhes
🚀 Performance otimizada e acessibilidade garantida
`);

// ===== LOAD PERFORMANCE MONITORING =====
window.addEventListener('load', () => {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`⚡ Página carregada em ${loadTime}ms`);
    }
});