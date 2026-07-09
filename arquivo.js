// ========================
// ANIMAÇÃO DE SCROLL
// ========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar cards de projetos
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Observar items de habilidades
document.querySelectorAll('.skill-category').forEach((skill, index) => {
    skill.style.opacity = '0';
    skill.style.animationDelay = `${index * 0.1}s`;
    observer.observe(skill);
});

// ========================
// SMOOTH SCROLL PERSONALIZADO
// ========================

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

// ========================
// ANIMAÇÃO DAS BARRAS DE PROGRESSO
// ========================

const skillsSection = document.querySelector('.skills');
let hasAnimated = false;

const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
};

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            animateProgressBars();
            hasAnimated = true;
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ========================
// VALIDAÇÃO DO FORMULÁRIO
// ========================

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validações
        const inputs = this.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff6b35';
            } else {
                input.style.borderColor = 'rgba(0, 212, 255, 0.2)';
            }
        });

        if (isValid) {
            // Aqui você pode enviar os dados para um servidor
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            this.reset();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
}

// ========================
// EFEITO PARALLAX
// ========================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroShapes = document.querySelector('.hero-shapes');
    if (heroShapes) {
        heroShapes.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ========================
// CONTADOR DE ESTATÍSTICAS
// ========================

const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
};

// Animação dos números quando a seção "Sobre" fica visível
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = document.querySelectorAll('.stat-item h3');
            stats.forEach(stat => {
                const targetValue = parseInt(stat.textContent);
                if (!stat.hasBeenAnimated) {
                    animateCounter(stat, targetValue);
                    stat.hasBeenAnimated = true;
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// ========================
// EFEITO HOVER NOS CARDS
// ========================

document.querySelectorAll('.project-card, .skill-category, .contact-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ========================
// NAVBAR DINÂMICA
// ========================

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 102, 255, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ========================
// MENU RESPONSIVO
// ========================

// Adicionar funcionalidade de menu hamburger para mobile (opcional)
const addMobileMenu = () => {
    const navbar = document.querySelector('.navbar .container');
    const navLinks = document.querySelector('.nav-links');

    if (window.innerWidth <= 768) {
        // Adicionar menu hamburger
        if (!document.querySelector('.hamburger')) {
            const hamburger = document.createElement('div');
            hamburger.className = 'hamburger';
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            hamburger.style.cursor = 'pointer';
            hamburger.style.fontSize = '1.5rem';
            hamburger.style.display = 'block';

            navbar.appendChild(hamburger);

            hamburger.addEventListener('click', () => {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '60px';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.flexDirection = 'column';
                navLinks.style.background = 'rgba(10, 14, 39, 0.95)';
                navLinks.style.padding = '1rem';
                navLinks.style.gap = '1rem';
            });
        }
    }
};

window.addEventListener('resize', addMobileMenu);
addMobileMenu();

// ========================
// TIPAGEM DINÂMICA
// ========================

const typeText = (element, text, speed = 50) => {
    let index = 0;
    element.textContent = '';

    const type = () => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    };

    type();
};

// Aplicar efeito de tipagem no título hero quando a página carrega
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeText(heroTitle, originalText, 50);
    }
});

// ========================
// LOG INICIAL
// ========================

console.log('%c🚀 Portfólio de Analista de Dados Carregado!', 
    'color: #0066ff; font-size: 16px; font-weight: bold;');
console.log('%cDesenvolvido com ❤️ usando HTML, CSS e JavaScript', 
    'color: #00d4ff; font-size: 12px;');
