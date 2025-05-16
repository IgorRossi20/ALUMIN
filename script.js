// Menu mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Scroll smooth para links internos e fechar menu mobile ao clicar
const navLinksList = document.querySelectorAll('.nav-links a');
navLinksList.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
            // Fecha o menu mobile se estiver aberto
            if(window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        }
        // Se não começa com #, deixa o comportamento padrão (navegar para outra página)
    });
});

// Formulário de orçamento
const form = document.getElementById('orcamento-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Aqui você pode adicionar a lógica para enviar o formulário
    // Por exemplo, usando fetch para enviar para um endpoint
    
    // Para demonstração, apenas mostraremos um alerta
    alert('Obrigado pelo seu interesse! Entraremos em contato em breve.');
    form.reset();
});

// Efeito de scroll suave para o botão de WhatsApp
window.addEventListener('scroll', function() {
    const whatsappButton = document.querySelector('.whatsapp-float');
    if (window.scrollY > 200) {
        whatsappButton.style.opacity = '1';
        whatsappButton.style.transform = 'translateY(0)';
    } else {
        whatsappButton.style.opacity = '0';
        whatsappButton.style.transform = 'translateY(20px)';
    }
});

// Animação de entrada para cards quando rolar
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.product-card, .service-card').forEach((card) => {
    card.classList.add('animate-hidden');
    observer.observe(card);
});

// Função para adicionar classes de animação
document.querySelectorAll('.animate-hidden').forEach((el) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                entry.target.classList.remove('animate-hidden');
                observer.unobserve(entry.target);
            }
        });
    });
    observer.observe(el);
});
