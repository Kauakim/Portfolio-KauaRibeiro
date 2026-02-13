// ==================== DOM Elements ====================
const header = document.getElementById('header');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');

// ==================== Header Scroll Effect ====================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    // Add/remove scrolled class
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Show/hide back to top button
    if (currentScroll > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
    
    lastScroll = currentScroll;
});

// ==================== Mobile Menu ====================
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==================== Active Navigation Link ====================
const sections = document.querySelectorAll('section');

function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ==================== Back to Top ====================
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== Stats Counter Animation ====================
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCounter();
    });
    statsAnimated = true;
}

// Trigger stats animation when section is visible
const statsSection = document.querySelector('.stats');

if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                animateStats();
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// ==================== Typing Effect ====================
const typingText = document.querySelector('.typing-text');
const texts = ['FullStack Developer', 'Técnico em Telecom', 'Freelancer'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500; // Pause before next word
    }
    
    setTimeout(typeEffect, typeSpeed);
}

// Start typing effect
if (typingText) {
    setTimeout(typeEffect, 1000);
}

// ==================== Scroll Reveal Animation ====================
const revealElements = document.querySelectorAll('.project-card, .skill-card, .service-card, .timeline-item, .tech-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// ==================== Contact Form ====================
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Create WhatsApp message
        const whatsappMessage = `Olá! Meu nome é ${name}.%0A%0AEmail: ${email}${phone ? `%0ATelefone: ${phone}` : ''}%0A%0AMensagem: ${message}`;
        
        // Open WhatsApp with the message
        const whatsappNumber = '359998260834';
        window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
        
        // Reset form
        contactForm.reset();
        
        // Show success message
        alert('Redirecionando para o WhatsApp...');
    });
}

// ==================== Load More Projects ====================
const loadMoreBtn = document.getElementById('loadMoreBtn');
const projectsGrid = document.getElementById('projectsGrid');

if (loadMoreBtn && projectsGrid) {
    let currentGroup = 2;
    
    loadMoreBtn.addEventListener('click', () => {
        // Get all hidden project cards in the current group
        const hiddenProjects = document.querySelectorAll(`.project-card.hidden[data-group="${currentGroup}"]`);
        
        // Show and animate them
        hiddenProjects.forEach(project => {
            project.classList.remove('hidden');
            project.classList.add('slide-up');
        });
        
        // Move to next group
        currentGroup++;
        
        // Check if there are more projects
        const nextGroupProjects = document.querySelectorAll(`.project-card.hidden[data-group="${currentGroup}"]`);
        
        // If no more projects, hide the button
        if (nextGroupProjects.length === 0) {
            loadMoreBtn.style.opacity = '0';
            loadMoreBtn.style.pointerEvents = 'none';
            loadMoreBtn.style.transition = 'opacity 0.3s ease-out';
        }
    });
}

// ==================== Smooth Scroll for Anchor Links ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== Parallax Effect for Hero ====================
const heroSection = document.querySelector('.hero');
const heroBg = document.querySelector('.hero-bg');

if (heroSection && heroBg) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
    });
}

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', () => {
    updateActiveLink();
    document.body.classList.add('loaded');
});