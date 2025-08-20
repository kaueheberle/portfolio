document.addEventListener('DOMContentLoaded', function() {
    
    initNavigation();
    initCardAnimations();
    initCTAButton();
    initParallaxEffect();
    
});

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover classe active de todos os itens
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Adicionar classe active ao item clicado
            this.classList.add('active');
            
            // Efeito visual de clique
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Navegação entre páginas
            const navLabel = this.querySelector('.nav-label').textContent;
            
            switch(navLabel) {
                case 'Início':
                    if (window.location.pathname !== '/index.html' && !window.location.pathname.endsWith('/')) {
                        window.location.href = 'index.html';
                    }
                    break;
                case 'Projetos':
                    window.location.href = 'projetos.html';
                    break;
                case 'Contato':
                    window.location.href = 'contato.html';
                    break;
            }
        });
    });
}

function initCardAnimations() {
    const cards = document.querySelectorAll('.header-card, .section');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animation = 'fadeInUp 0.6s ease forwards';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    cards.forEach(card => observer.observe(card));
}

function initCTAButton() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {

            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = 'translateY(-2px)';
            }, 150);
            
            showContactMessage();
            
        });
    }
}

function initParallaxEffect() {
    const header = document.querySelector('.header-card');
    
    if (header) {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.2;
            
            header.style.transform = `translateY(${rate}px)`;
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }
}

function showContactMessage() {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #48CAE4, #0077B6);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-weight: bold;
        z-index: 1000;
        animation: slideDown 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 119, 182, 0.3);
    `;
    
    toast.textContent = 'Carregando...';
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
        
        @keyframes slideUp {
            from {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            to {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
        }
    `;
    document.head.appendChild(style);
}

addDynamicStyles();

document.addEventListener('DOMContentLoaded', function() {
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--animation-duration', '0s');
        
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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
    
    if ('vibrate' in navigator) {
        const interactiveElements = document.querySelectorAll('.nav-item, .cta-button, .social-icon');
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                navigator.vibrate(50);
            });
        });
    }
});