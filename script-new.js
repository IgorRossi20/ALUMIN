/**
 * ALUMIN - Script principal
 * Script responsável pelas funcionalidades principais do site
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes
    initNavbar();
    initSmoothScroll();
    initMobileMenu();
    initDropdowns();
    initModals();
    initAnimations();
    initWhatsAppButton();
    initCarousels();
    initProjetosFiltro();
    initProjetosModals();
});

/**
 * Inicializa o comportamento da navbar
 */
function initNavbar() {
    const navbar = document.querySelector('nav');
    const scrollThreshold = 50;

    // Função para verificar a posição do scroll e atualizar a navbar
    function checkScroll() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    }

    // Verificar no carregamento da página
    checkScroll();

    // Adicionar evento de scroll
    window.addEventListener('scroll', checkScroll);

    // Destacar link ativo no menu
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a'); // Seleciona todos os links de navegação

    function highlightActiveLink() {
        const scrollPosition = window.scrollY + 100;
        let foundActive = false;

        // Lógica para links internos (âncoras)
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                        foundActive = true;
                    }
                });
            }
        });

        // Lógica para links de páginas externas
        if (!foundActive) {
            const currentPath = window.location.pathname.split('/').pop();
            navLinks.forEach(link => {
                link.classList.remove('active');
                const linkPath = link.getAttribute('href').split('/').pop();
                if (currentPath === linkPath) {
                    link.classList.add('active');
                }
            });
        }
    }

    window.addEventListener('scroll', highlightActiveLink);
    // Chamar highlightActiveLink no carregamento da página para links de páginas externas
    highlightActiveLink();
}

/**
 * Inicializa o scroll suave para links internos
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorar links de dropdown ou âncoras vazias
            if (href !== '#' && href !== '#redes' && !this.closest('.socials-dropdown')) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Fechar menu mobile se estiver aberto
                    const navLinks = document.querySelector('.nav-links');
                    const hamburger = document.querySelector('.hamburger');
                    if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                }
            }
        });
    });
}

/**
 * Inicializa o menu mobile
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

/**
 * Inicializa os dropdowns
 */
function initDropdowns() {
    const socialsDropdown = document.querySelector('.socials-dropdown');
    const socialsToggle = document.getElementById('socials-toggle');

    if (socialsToggle && socialsDropdown) {
        socialsToggle.addEventListener('click', function(e) {
            e.preventDefault();
            socialsDropdown.classList.toggle('open');
            e.stopPropagation();
        });

        // Fechar dropdown ao clicar fora
        document.addEventListener('click', function(e) {
            if (socialsDropdown.classList.contains('open') && !socialsDropdown.contains(e.target)) {
                socialsDropdown.classList.remove('open');
            }
        });

        // Fechar dropdown ao pressionar ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && socialsDropdown.classList.contains('open')) {
                socialsDropdown.classList.remove('open');
            }
        });
    }
}

/**
 * Inicializa o filtro de projetos
 */
function initProjetosFiltro() {
    const filtroButtons = document.querySelectorAll('.filtro-btn');
    const projetoCards = document.querySelectorAll('.projeto-card');

    if (filtroButtons.length && projetoCards.length) {
        // Ativar o filtro 'todos' por padrão
        const todosButton = document.querySelector('.filtro-btn[data-filter="todos"]');
        if (todosButton) {
            todosButton.classList.add('active');
        }

        filtroButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filtroButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filtro = button.getAttribute('data-filter');

                projetoCards.forEach(card => {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';

                    setTimeout(() => {
                        if (filtro === 'todos' || card.getAttribute('data-categoria') === filtro) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            card.style.display = 'none';
                        }
                    }, 300);
                });
            });
        });
    }
            });
        });
    }
}

/**
 * Inicializa os modais dos projetos
 */
function initProjetosModals() {
    const projetoBtns = document.querySelectorAll('.ver-projeto-btn');
    const modal = document.getElementById('projeto-modal');
    const modalContent = modal.querySelector('.modal-body');
    const closeBtn = modal.querySelector('.close-modal');

    const projetosDetalhes = {
        projeto1: {
            titulo: 'Residência Moderna',
            descricao: 'Projeto residencial com janelas panorâmicas em alumínio preto, proporcionando vista privilegiada e integração com o ambiente externo.',
            caracteristicas: [
                'Perfil em alumínio preto',
                'Vidro duplo para isolamento térmico e acústico',
                'Sistema de abertura maxim-ar',
                'Tela mosquiteira integrada'
            ],
            imagens: ['PHOTOS/Janela.jpeg', 'PHOTOS/JANELA2.jpg', 'PHOTOS/JANELA3.jpg']
        },
        projeto2: {
            titulo: 'Centro Empresarial',
            descricao: 'Fachada moderna em vidro temperado com estrutura em alumínio, garantindo elegância e funcionalidade para o ambiente corporativo.',
            caracteristicas: [
                'Pele de vidro estrutural',
                'Perfis em alumínio anodizado',
                'Vidro laminado de segurança',
                'Sistema de ventilação integrado'
            ],
            imagens: ['PHOTOS/PORTA.jpg', 'PHOTOS/PORTA1.jpg', 'PHOTOS/PORTA2.jpg']
        },
        projeto3: {
            titulo: 'Residência Alto Padrão',
            descricao: 'Guarda-corpo em vidro temperado com fixação em alumínio, combinando segurança e estética moderna.',
            caracteristicas: [
                'Vidro temperado 10mm',
                'Sistema de fixação em alumínio',
                'Acabamento polido',
                'Design minimalista'
            ],
            imagens: ['PHOTOS/GUARDACORPO1.jpg', 'PHOTOS/FACHADAALUMIN.jpg', 'PHOTOS/PORTA3.jpg']
        },
        projeto4: {
            titulo: 'Galpão Industrial',
            descricao: 'Esquadrias especiais desenvolvidas para ambiente industrial, com foco em durabilidade e eficiência energética.',
            caracteristicas: [
                'Isolamento térmico reforçado',
                'Perfis de alta resistência',
                'Sistema de ventilação natural',
                'Tratamento anticorrosivo'
            ],
            imagens: ['PHOTOS/JANELA4.jpg', 'PHOTOS/JANELA5.jpg', 'PHOTOS/JANELA6.jpg']
        },
        projeto5: {
            titulo: 'Shopping Center',
            descricao: 'Portas automáticas com sensor de presença, ideal para ambientes comerciais de alto fluxo.',
            caracteristicas: [
                'Sistema automatizado',
                'Sensor de presença',
                'Vidro temperado de segurança',
                'Perfis reforçados'
            ],
            imagens: ['PHOTOS/PORTA4.jpg', 'PHOTOS/PORTA5.jpg', 'PHOTOS/PORTA6.jpg']
        },
        projeto6: {
            titulo: 'Condomínio Fechado',
            descricao: 'Fechamento de área gourmet com vidro temperado e perfis de alumínio, criando um ambiente protegido e sofisticado.',
            caracteristicas: [
                'Sistema de correr',
                'Vidro temperado 8mm',
                'Perfis em alumínio',
                'Fechadura de segurança'
            ],
            imagens: ['PHOTOS/PORTA7.jpg', 'PHOTOS/PORTA8.jpg', 'PHOTOS/PORTA9.jpg']
        }
    };

    projetoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projetoId = btn.getAttribute('data-projeto');
            const projeto = projetosDetalhes[projetoId];

            if (projeto) {
                let html = `
                    <h2>${projeto.titulo}</h2>
                    <div class="projeto-modal-content">
                        <div class="projeto-modal-gallery">
                            ${projeto.imagens.map(img => `<img src="${img}" alt="${projeto.titulo}">`).join('')}
                        </div>
                        <div class="projeto-modal-info">
                            <p class="projeto-descricao">${projeto.descricao}</p>
                            <h3>Características:</h3>
                            <ul>
                                ${projeto.caracteristicas.map(carac => `<li>${carac}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `;

                modalContent.innerHTML = html;
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';

                setTimeout(() => {
                    modal.classList.add('show');
                }, 50);
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
}

/**
 * Inicializa os modais
 */
function initModals() {
    // Configuração de modal genérica
    function setupModal(imgId, modalId, modalImgId, modalCloseId) {
        const img = document.getElementById(imgId);
        const modal = document.getElementById(modalId);
        const modalImg = document.getElementById(modalImgId);
        const modalClose = document.getElementById(modalCloseId);

        if (img && modal && modalImg && modalClose) {
            // Abrir modal ao clicar na imagem
            img.addEventListener('click', function() {
                document.body.style.overflow = 'hidden'; // Impedir scroll do body
                modal.classList.add('show');
                modalImg.src = this.src;
            });

            // Fechar modal ao clicar no X
            modalClose.addEventListener('click', function() {
                closeModal();
            });

            // Fechar modal ao clicar fora da imagem
            modal.addEventListener('click', function(event) {
                if (event.target === modal) {
                    closeModal();
                }
            });

            // Fechar modal ao pressionar ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.classList.contains('show')) {
                    closeModal();
                }
            });

            function closeModal() {
                modal.classList.remove('show');
                setTimeout(() => {
                    document.body.style.overflow = ''; // Restaurar scroll do body
                }, 300);
            }
        }
    }

    // Configurar modais para cada tipo de produto
    setupModal('janela-carousel-img', 'janela-modal', 'janela-modal-img', 'janela-modal-close');
    setupModal('porta-carousel-img', 'porta-modal', 'porta-modal-img', 'porta-modal-close');
    setupModal('guarda-corpo-img', 'guarda-corpo-modal', 'guarda-corpo-modal-img', 'guarda-corpo-modal-close');
}

/**
 * Inicializa as animações
 */
function initAnimations() {
    // Verificar se a biblioteca AOS está disponível
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100
        });
    } else {
        // Fallback para animações básicas se AOS não estiver disponível
        const animateElements = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animateElements.forEach(el => {
            el.classList.add('animate-hidden');
            observer.observe(el);
        });
    }
}

/**
 * Inicializa o botão flutuante do WhatsApp
 */
function initWhatsAppButton() {
    const whatsappButton = document.querySelector('.whatsapp-float');
    
    if (whatsappButton) {
        // Inicialmente oculto
        whatsappButton.style.opacity = '0';
        whatsappButton.style.transform = 'translateY(20px)';
        
        // Mostrar após rolagem
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                whatsappButton.style.opacity = '1';
                whatsappButton.style.transform = 'translateY(0)';
            } else {
                whatsappButton.style.opacity = '0';
                whatsappButton.style.transform = 'translateY(20px)';
            }
        });

        // Verificar posição inicial
        if (window.scrollY > 300) {
            whatsappButton.style.opacity = '1';
            whatsappButton.style.transform = 'translateY(0)';
        }
    }
}

/**
 * Inicializa os carrosséis
 */
function initCarousels() {
    // Função para criar carrossel
    function createCarousel(imgId, prevBtnId, nextBtnId, images) {
        const img = document.getElementById(imgId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        
        if (!img || !prevBtn || !nextBtn || !images || images.length === 0) return;
        
        let currentIndex = 0;
        
        // Atualizar imagem
        function updateImage() {
            img.src = images[currentIndex];
            img.setAttribute('data-idx', currentIndex);
            
            // Efeito de fade
            img.style.opacity = '0';
            setTimeout(() => {
                img.style.opacity = '1';
            }, 50);
        }
        
        // Botão anterior
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateImage();
        });
        
        // Botão próximo
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % images.length;
            updateImage();
        });
        
        // Trocar imagem automaticamente a cada 5 segundos
        let interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            updateImage();
        }, 5000);
        
        // Pausar troca automática ao passar o mouse
        img.parentElement.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });
        
        // Retomar troca automática ao remover o mouse
        img.parentElement.addEventListener('mouseleave', () => {
            interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                updateImage();
            }, 5000);
        });
    }
    
    // Imagens para os carrosséis
    const janelasImages = [
        'PHOTOS/JANELA2.jpg',
        'PHOTOS/JANELA3.jpg',
        'PHOTOS/JANELA4.jpg',
        'PHOTOS/JANELA5.jpg',
        'PHOTOS/JANELA6.jpg',
        'PHOTOS/JANELA7.jpg',
        'PHOTOS/JANELA8.jpg',
        'PHOTOS/JANELA9.jpg',
        'PHOTOS/JANELA10.jpg',
        'PHOTOS/JANELA11.jpg',
        'PHOTOS/Janela.jpeg'
    ];
    
    const portasImages = [
        'PHOTOS/PORTA.jpg',
        'PHOTOS/PORTA1.jpg',
        'PHOTOS/PORTA2.jpg',
        'PHOTOS/PORTA3.jpg',
        'PHOTOS/PORTA4.jpg',
        'PHOTOS/PORTA5.jpg',
        'PHOTOS/PORTA6.jpg',
        'PHOTOS/PORTA7.jpg',
        'PHOTOS/PORTA8.jpg',
        'PHOTOS/PORTA9.jpg',
        'PHOTOS/PORTA10.jpg',
        'PHOTOS/PORTA11.jpg',
        'PHOTOS/PORTA12.jpg'
    ];
    
    // Inicializar carrosséis
    createCarousel('janela-carousel-img', 'janela-carousel-prev', 'janela-carousel-next', janelasImages);
    createCarousel('porta-carousel-img', 'porta-carousel-prev', 'porta-carousel-next', portasImages);
}
/**
 * Inicializa o menu mobile
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

/**
 * Inicializa os dropdowns
 */
function initDropdowns() {
    const socialsDropdown = document.querySelector('.socials-dropdown');
    const socialsToggle = document.getElementById('socials-toggle');

    if (socialsToggle && socialsDropdown) {
        socialsToggle.addEventListener('click', function(e) {
            e.preventDefault();
            socialsDropdown.classList.toggle('open');
            e.stopPropagation();
        });

        // Fechar dropdown ao clicar fora
        document.addEventListener('click', function(e) {
            if (socialsDropdown.classList.contains('open') && !socialsDropdown.contains(e.target)) {
                socialsDropdown.classList.remove('open');
            }
        });

        // Fechar dropdown ao pressionar ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && socialsDropdown.classList.contains('open')) {
                socialsDropdown.classList.remove('open');
            }
        });
    }
}

/**
 * Inicializa os modais
 */
function initModals() {
    // Configuração de modal genérica
    function setupModal(imgId, modalId, modalImgId, modalCloseId) {
        const img = document.getElementById(imgId);
        const modal = document.getElementById(modalId);
        const modalImg = document.getElementById(modalImgId);
        const modalClose = document.getElementById(modalCloseId);

        if (img && modal && modalImg && modalClose) {
            // Abrir modal ao clicar na imagem
            img.addEventListener('click', function() {
                document.body.style.overflow = 'hidden'; // Impedir scroll do body
                modal.classList.add('show');
                modalImg.src = this.src;
            });

            // Fechar modal ao clicar no X
            modalClose.addEventListener('click', function() {
                closeModal();
            });

            // Fechar modal ao clicar fora da imagem
            modal.addEventListener('click', function(event) {
                if (event.target === modal) {
                    closeModal();
                }
            });

            // Fechar modal ao pressionar ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.classList.contains('show')) {
                    closeModal();
                }
            });

            function closeModal() {
                modal.classList.remove('show');
                setTimeout(() => {
                    document.body.style.overflow = ''; // Restaurar scroll do body
                }, 300);
            }
        }
    }

    // Configurar modais para cada tipo de produto
    setupModal('janela-carousel-img', 'janela-modal', 'janela-modal-img', 'janela-modal-close');
    setupModal('porta-carousel-img', 'porta-modal', 'porta-modal-img', 'porta-modal-close');
    setupModal('guarda-corpo-img', 'guarda-corpo-modal', 'guarda-corpo-modal-img', 'guarda-corpo-modal-close');
}

/**
 * Inicializa as animações
 */
function initAnimations() {
    // Verificar se a biblioteca AOS está disponível
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100
        });
    } else {
        // Fallback para animações básicas se AOS não estiver disponível
        const animateElements = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animateElements.forEach(el => {
            el.classList.add('animate-hidden');
            observer.observe(el);
        });
    }
}

/**
 * Inicializa o botão flutuante do WhatsApp
 */
function initWhatsAppButton() {
    const whatsappButton = document.querySelector('.whatsapp-float');
    
    if (whatsappButton) {
        // Inicialmente oculto
        whatsappButton.style.opacity = '0';
        whatsappButton.style.transform = 'translateY(20px)';
        
        // Mostrar após rolagem
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                whatsappButton.style.opacity = '1';
                whatsappButton.style.transform = 'translateY(0)';
            } else {
                whatsappButton.style.opacity = '0';
                whatsappButton.style.transform = 'translateY(20px)';
            }
        });

        // Verificar posição inicial
        if (window.scrollY > 300) {
            whatsappButton.style.opacity = '1';
            whatsappButton.style.transform = 'translateY(0)';
        }
    }
}

/**
 * Inicializa os carrosséis
 */
function initCarousels() {
    // Função para criar carrossel
    function createCarousel(imgId, prevBtnId, nextBtnId, images) {
        const img = document.getElementById(imgId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        
        if (!img || !prevBtn || !nextBtn || !images || images.length === 0) return;
        
        let currentIndex = 0;
        
        // Atualizar imagem
        function updateImage() {
            img.src = images[currentIndex];
            img.setAttribute('data-idx', currentIndex);
            
            // Efeito de fade
            img.style.opacity = '0';
            setTimeout(() => {
                img.style.opacity = '1';
            }, 50);
        }
        
        // Botão anterior
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateImage();
        });
        
        // Botão próximo
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % images.length;
            updateImage();
        });
        
        // Trocar imagem automaticamente a cada 5 segundos
        let interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            updateImage();
        }, 5000);
        
        // Pausar troca automática ao passar o mouse
        img.parentElement.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });
        
        // Retomar troca automática ao remover o mouse
        img.parentElement.addEventListener('mouseleave', () => {
            interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                updateImage();
            }, 5000);
        });
    }
    
    // Imagens para os carrosséis
    const janelasImages = [
        'PHOTOS/JANELA2.jpg',
        'PHOTOS/JANELA3.jpg',
        'PHOTOS/JANELA4.jpg',
        'PHOTOS/JANELA5.jpg',
        'PHOTOS/JANELA6.jpg',
        'PHOTOS/JANELA7.jpg',
        'PHOTOS/JANELA8.jpg',
        'PHOTOS/JANELA9.jpg',
        'PHOTOS/JANELA10.jpg',
        'PHOTOS/JANELA11.jpg',
        'PHOTOS/Janela.jpeg'
    ];
    
    const portasImages = [
        'PHOTOS/PORTA.jpg',
        'PHOTOS/PORTA1.jpg',
        'PHOTOS/PORTA2.jpg',
        'PHOTOS/PORTA3.jpg',
        'PHOTOS/PORTA4.jpg',
        'PHOTOS/PORTA5.jpg',
        'PHOTOS/PORTA6.jpg',
        'PHOTOS/PORTA7.jpg',
        'PHOTOS/PORTA8.jpg',
        'PHOTOS/PORTA9.jpg',
        'PHOTOS/PORTA10.jpg',
        'PHOTOS/PORTA11.jpg',
        'PHOTOS/PORTA12.jpg'
    ];
    
    // Inicializar carrosséis
    createCarousel('janela-carousel-img', 'janela-carousel-prev', 'janela-carousel-next', janelasImages);
    createCarousel('porta-carousel-img', 'porta-carousel-prev', 'porta-carousel-next', portasImages);
}
/**
 * Inicializa o menu mobile
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

/**
 * Inicializa os dropdowns
 */
function initDropdowns() {
    const socialsDropdown = document.querySelector('.socials-dropdown');
    const socialsToggle = document.getElementById('socials-toggle');

    if (socialsToggle && socialsDropdown) {
        socialsToggle.addEventListener('click', function(e) {
            e.preventDefault();
            socialsDropdown.classList.toggle('open');
            e.stopPropagation();
        });

        // Fechar dropdown ao clicar fora
        document.addEventListener('click', function(e) {
            if (socialsDropdown.classList.contains('open') && !socialsDropdown.contains(e.target)) {
                socialsDropdown.classList.remove('open');
            }
        });

        // Fechar dropdown ao pressionar ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && socialsDropdown.classList.contains('open')) {
                socialsDropdown.classList.remove('open');
            }
        });
    }
}

/**
 * Inicializa os modais
 */
function initModals() {
    // Configuração de modal genérica
    function setupModal(imgId, modalId, modalImgId, modalCloseId) {
        const img = document.getElementById(imgId);
        const modal = document.getElementById(modalId);
        const modalImg = document.getElementById(modalImgId);
        const modalClose = document.getElementById(modalCloseId);

        if (img && modal && modalImg && modalClose) {
            // Abrir modal ao clicar na imagem
            img.addEventListener('click', function() {
                document.body.style.overflow = 'hidden'; // Impedir scroll do body
                modal.classList.add('show');
                modalImg.src = this.src;
            });

            // Fechar modal ao clicar no X
            modalClose.addEventListener('click', function() {
                closeModal();
            });

            // Fechar modal ao clicar fora da imagem
            modal.addEventListener('click', function(event) {
                if (event.target === modal) {
                    closeModal();
                }
            });

            // Fechar modal ao pressionar ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.classList.contains('show')) {
                    closeModal();
                }
            });

            function closeModal() {
                modal.classList.remove('show');
                setTimeout(() => {
                    document.body.style.overflow = ''; // Restaurar scroll do body
                }, 300);
            }
        }
    }

    // Configurar modais para cada tipo de produto
    setupModal('janela-carousel-img', 'janela-modal', 'janela-modal-img', 'janela-modal-close');
    setupModal('porta-carousel-img', 'porta-modal', 'porta-modal-img', 'porta-modal-close');
    setupModal('guarda-corpo-img', 'guarda-corpo-modal', 'guarda-corpo-modal-img', 'guarda-corpo-modal-close');
}

/**
 * Inicializa as animações
 */
function initAnimations() {
    // Verificar se a biblioteca AOS está disponível
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100
        });
    } else {
        // Fallback para animações básicas se AOS não estiver disponível
        const animateElements = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animateElements.forEach(el => {
            el.classList.add('animate-hidden');
            observer.observe(el);
        });
    }
}

/**
 * Inicializa o botão flutuante do WhatsApp
 */
function initWhatsAppButton() {
    const whatsappButton = document.querySelector('.whatsapp-float');
    
    if (whatsappButton) {
        // Inicialmente oculto
        whatsappButton.style.opacity = '0';
        whatsappButton.style.transform = 'translateY(20px)';
        
        // Mostrar após rolagem
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                whatsappButton.style.opacity = '1';
                whatsappButton.style.transform = 'translateY(0)';
            } else {
                whatsappButton.style.opacity = '0';
                whatsappButton.style.transform = 'translateY(20px)';
            }
        });

        // Verificar posição inicial
        if (window.scrollY > 300) {
            whatsappButton.style.opacity = '1';
            whatsappButton.style.transform = 'translateY(0)';
        }
    }
}

/**
 * Inicializa os carrosséis
 */
function initCarousels() {
    // Função para criar carrossel
    function createCarousel(imgId, prevBtnId, nextBtnId, images) {
        const img = document.getElementById(imgId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        
        if (!img || !prevBtn || !nextBtn || !images || images.length === 0) return;
        
        let currentIndex = 0;
        
        // Atualizar imagem
        function updateImage() {
            img.src = images[currentIndex];
            img.setAttribute('data-idx', currentIndex);
            
            // Efeito de fade
            img.style.opacity = '0';
            setTimeout(() => {
                img.style.opacity = '1';
            }, 50);
        }
        
        // Botão anterior
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateImage();
        });
        
        // Botão próximo
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % images.length;
            updateImage();
        });
        
        // Trocar imagem automaticamente a cada 5 segundos
        let interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            updateImage();
        }, 5000);
        
        // Pausar troca automática ao passar o mouse
        img.parentElement.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });
        
        // Retomar troca automática ao remover o mouse
        img.parentElement.addEventListener('mouseleave', () => {
            interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                updateImage();
            }, 5000);
        });
    }
    
    // Imagens para os carrosséis
    const janelasImages = [
        'PHOTOS/JANELA2.jpg',
        'PHOTOS/JANELA3.jpg',
        'PHOTOS/JANELA4.jpg',
        'PHOTOS/JANELA5.jpg',
        'PHOTOS/JANELA6.jpg',
        'PHOTOS/JANELA7.jpg',
        'PHOTOS/JANELA8.jpg',
        'PHOTOS/JANELA9.jpg',
        'PHOTOS/JANELA10.jpg',
        'PHOTOS/JANELA11.jpg',
        'PHOTOS/Janela.jpeg'
    ];
    
    const portasImages = [
        'PHOTOS/PORTA.jpg',
        'PHOTOS/PORTA1.jpg',
        'PHOTOS/PORTA2.jpg',
        'PHOTOS/PORTA3.jpg',
        'PHOTOS/PORTA4.jpg',
        'PHOTOS/PORTA5.jpg',
        'PHOTOS/PORTA6.jpg',
        'PHOTOS/PORTA7.jpg',
        'PHOTOS/PORTA8.jpg',
        'PHOTOS/PORTA9.jpg',
        'PHOTOS/PORTA10.jpg',
        'PHOTOS/PORTA11.jpg',
        'PHOTOS/PORTA12.jpg'
    ];
    
    // Inicializar carrosséis
    createCarousel('janela-carousel-img', 'janela-carousel-prev', 'janela-carousel-next', janelasImages);
    createCarousel('porta-carousel-img', 'porta-carousel-prev', 'porta-carousel-next', portasImages);
}
/**
 * Inicializa o menu mobile
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

/**
 * Inicializa os dropdowns
 */
function initDropdowns() {
    const socialsDropdown = document.querySelector('.socials-dropdown');
    const socialsToggle = document.getElementById('socials-toggle');

    if (socialsToggle && socialsDropdown) {
        socialsToggle.addEventListener('click', function(e) {
            e.preventDefault();
            socialsDropdown.classList.toggle('open');
            e.stopPropagation();
        });

        // Fechar dropdown ao clicar fora
        document.addEventListener('click', function(e) {
            if (socialsDropdown.classList.contains('open') && !socialsDropdown.contains(e.target)) {
                socialsDropdown.classList.remove('open');
            }
        });

        // Fechar dropdown ao pressionar ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && socialsDropdown.classList.contains('open')) {
                socialsDropdown.classList.remove('open');
            }
        });
    }
}

/**
 * Inicializa os modais
 */
function initModals() {
    // Configuração de modal genérica
    function setupModal(imgId, modalId, modalImgId, modalCloseId) {
        const img = document.getElementById(imgId);
        const modal = document.getElementById(modalId);
        const modalImg = document.getElementById(modalImgId);
        const modalClose = document.getElementById(modalCloseId);

        if (img && modal && modalImg && modalClose) {
            // Abrir modal ao clicar na imagem
            img.addEventListener('click', function() {
                document.body.style.overflow = 'hidden'; // Impedir scroll do body
                modal.classList.add('show');
                modalImg.src = this.src;
            });

            // Fechar modal ao clicar no X
            modalClose.addEventListener('click', function() {
                closeModal();
            });

            // Fechar modal ao clicar fora da imagem
            modal.addEventListener('click', function(event) {
                if (event.target === modal) {
                    closeModal();
                }
            });

            // Fechar modal ao pressionar ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.classList.contains('show')) {
                    closeModal();
                }
            });

            function closeModal() {
                modal.classList.remove('show');
                setTimeout(() => {
                    document.body.style.overflow = ''; // Restaurar scroll do body
                }, 300);
            }
        }
    }

    // Configurar modais para cada tipo de produto
    setupModal('janela-carousel-img', 'janela-modal', 'janela-modal-img', 'janela-modal-close');
    setupModal('porta-carousel-img', 'porta-modal', 'porta-modal-img', 'porta-modal-close');
    setupModal('guarda-corpo-img', 'guarda-corpo-modal', 'guarda-corpo-modal-img', 'guarda-corpo-modal-close');
}

/**
 * Inicializa as animações
 */
function initAnimations() {
    // Verificar se a biblioteca AOS está disponível
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100
        });
    } else {
        // Fallback para animações básicas se AOS não estiver disponível
        const animateElements = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animateElements.forEach(el => {
            el.classList.add('animate-hidden');
            observer.observe(el);
        });
    }
}

/**
 * Inicializa o botão flutuante do WhatsApp
 */
function initWhatsAppButton() {
    const whatsappButton = document.querySelector('.whatsapp-float');
    
    if (whatsappButton) {
        // Inicialmente oculto
        whatsappButton.style.opacity = '0';
        whatsappButton.style.transform = 'translateY(20px)';
        
        // Mostrar após rolagem
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                whatsappButton.style.opacity = '1';
                whatsappButton.style.transform = 'translateY(0)';
            } else {
                whatsappButton.style.opacity = '0';
                whatsappButton.style.transform = 'translateY(20px)';
            }
        });

        // Verificar posição inicial
        if (window.scrollY > 300) {
            whatsappButton.style.opacity = '1';
            whatsappButton.style.transform = 'translateY(0)';
        }
    }
}

/**
 * Inicializa os carrosséis
 */
function initCarousels() {
    // Função para criar carrossel
    function createCarousel(imgId, prevBtnId, nextBtnId, images) {
        const img = document.getElementById(imgId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        
        if (!img || !prevBtn || !nextBtn || !images || images.length === 0) return;
        
        let currentIndex = 0;
        
        // Atualizar imagem
        function updateImage() {
            img.src = images[currentIndex];
            img.setAttribute('data-idx', currentIndex);
            
            // Efeito de fade
            img.style.opacity = '0';
            setTimeout(() => {
                img.style.opacity = '1';
            }, 50);
        }
        
        // Botão anterior
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateImage();
        });
        
        // Botão próximo
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % images.length;
            updateImage();
        });
        
        // Trocar imagem automaticamente a cada 5 segundos
        let interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            updateImage();
        }, 5000);
        
        // Pausar troca automática ao passar o mouse
        img.parentElement.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });
        
        // Retomar troca automática ao remover o mouse
        img.parentElement.addEventListener('mouseleave', () => {
            interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                updateImage();
            }, 5000);
        });
    }
    
    // Imagens para os carrosséis
    const janelasImages = [
        'PHOTOS/JANELA2.jpg',
        'PHOTOS/JANELA3.jpg',
        'PHOTOS/JANELA4.jpg',
        'PHOTOS/JANELA5.jpg',
        'PHOTOS/JANELA6.jpg',
        'PHOTOS/JANELA7.jpg',
        'PHOTOS/JANELA8.jpg',
        'PHOTOS/JANELA9.jpg',
        'PHOTOS/JANELA10.jpg',
        'PHOTOS/JANELA11.jpg',
        'PHOTOS/Janela.jpeg'
    ];
    
    const portasImages = [
        'PHOTOS/PORTA.jpg',
        'PHOTOS/PORTA1.jpg',
        'PHOTOS/PORTA2.jpg',
        'PHOTOS/PORTA3.jpg',
        'PHOTOS/PORTA4.jpg',
        'PHOTOS/PORTA5.jpg',
        'PHOTOS/PORTA6.jpg',
        'PHOTOS/PORTA7.jpg',
        'PHOTOS/PORTA8.jpg',
        'PHOTOS/PORTA9.jpg',
        'PHOTOS/PORTA10.jpg',
        'PHOTOS/PORTA11.jpg',
        'PHOTOS/PORTA12.jpg'
    ];
    
    // Inicializar carrosséis
    createCarousel('janela-carousel-img', 'janela-carousel-prev', 'janela-carousel-next', janelasImages);
    createCarousel('porta-carousel-img', 'porta-carousel-prev', 'porta-carousel-next', portasImages);
}
/**
 * Inicializa o menu mobile
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

/**
 * Inicializa os dropdowns
 */
function initDropdowns() {
    const socialsDropdown = document.querySelector('.socials-dropdown');
    const socialsToggle = document.getElementById('socials-toggle');

    if (socialsToggle && socialsDropdown) {
        socialsToggle.addEventListener('click', function(e) {
            e.preventDefault();
            socialsDropdown.classList.toggle('open');
            e.stopPropagation();
        });

        // Fechar dropdown ao clicar fora
        document.addEventListener('click', function(e) {
            if (socialsDropdown.classList.contains('open') && !socialsDropdown.contains(e.target)) {
                socialsDropdown.classList.remove('open');
            }
        });

        // Fechar dropdown ao pressionar ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && socialsDropdown.classList.contains('open')) {
                socialsDropdown.classList.remove('open');
            }
        });
    }
}

/**
 * Inicializa os modais
 */
function initModals() {
    // Configuração de modal genérica
    function setupModal(imgId, modalId, modalImgId, modalCloseId) {
        const img = document.getElementById(imgId);
        const modal = document.getElementById(modalId);
        const modalImg = document.getElementById(modalImgId);
        const modalClose = document.getElementById(modalCloseId);

        if (img && modal && modalImg && modalClose) {
            // Abrir modal ao clicar na imagem
            img.addEventListener('click', function() {
                document.body.style.overflow = 'hidden'; // Impedir scroll do body
                modal.classList.add('show');
                modalImg.src = this.src;
            });

            // Fechar modal ao clicar no X
            modalClose.addEventListener('click', function() {
                closeModal();
            });

            // Fechar modal ao clicar fora da imagem
            modal.addEventListener('click', function(event) {
                if (event.target === modal) {
                    closeModal();
                }
            });

            // Fechar modal ao pressionar ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.classList.contains('show')) {
                    closeModal();
                }
            });

            function closeModal() {
                modal.classList.remove('show');
                setTimeout(() => {
                    document.body.style.overflow = ''; // Restaurar scroll do body
                }, 300);
            }
        }
    }

    // Configurar modais para cada tipo de produto
    setupModal('janela-carousel-img', 'janela-modal', 'janela-modal-img', 'janela-modal-close');
    setupModal('porta-carousel-img', 'porta-modal', 'porta-modal-img', 'porta-modal-close');
    setupModal('guarda-corpo-img', 'guarda-corpo-modal', 'guarda-corpo-modal-img', 'guarda-corpo-modal-close');
}

/**
 * Inicializa as animações
 */
function initAnimations() {
    // Verificar se a biblioteca AOS está disponível
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100
        });
    } else {
        // Fallback para animações básicas se AOS não estiver disponível
        const animateElements = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animateElements.forEach(el => {
            el.classList.add('animate-hidden');
            observer.observe(el);
        });
    }
}

/**
 * Inicializa o botão flutuante do WhatsApp
 */
function initWhatsAppButton() {
    const whatsappButton = document.querySelector('.whatsapp-float');
    
    if (whatsappButton) {
        // Inicialmente oculto
        whatsappButton.style.opacity = '0';
        whatsappButton.style.transform = 'translateY(20px)';
        
        // Mostrar após rolagem
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                whatsappButton.style.opacity = '1';
                whatsappButton.style.transform = 'translateY(0)';
            } else {
                whatsappButton.style.opacity = '0';
                whatsappButton.style.transform = 'translateY(20px)';
            }
        });

        // Verificar posição inicial
        if (window.scrollY > 300) {
            whatsappButton.style.opacity = '1';
            whatsappButton.style.transform = 'translateY(0)';
        }
    }
}

/**
 * Inicializa os carrosséis
 */
function initCarousels() {
    // Função para criar carrossel
    function createCarousel(imgId, prevBtnId, nextBtnId, images) {
        const img = document.getElementById(imgId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        
        if (!img || !prevBtn || !nextBtn || !images || images.length === 0) return;
        
        let currentIndex = 0;
        
        // Atualizar imagem
        function updateImage() {
            img.src = images[currentIndex];
            img.setAttribute('data-idx', currentIndex);
            
            // Efeito de fade
            img.style.opacity = '0';
            setTimeout(() => {
                img.style.opacity = '1';
            }, 50);
        }
        
        // Botão anterior
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateImage();
        });
        
        // Botão próximo
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % images.length;
            updateImage();
        });
        
        // Trocar imagem automaticamente a cada 5 segundos
        let interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            updateImage();
        }, 5000);
        
        // Pausar troca automática ao passar o mouse
        img.parentElement.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });
        
        // Retomar troca automática ao remover o mouse
        img.parentElement.addEventListener('mouseleave', () => {
            interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                updateImage();
            }, 5000);
        });
    }
    
    // Imagens para os carrosséis
    const janelasImages = [
        'PHOTOS/JANELA2.jpg',
        'PHOTOS/JANELA3.jpg',
        'PHOTOS/JANELA4.jpg',
        'PHOTOS/JANELA5.jpg',
        'PHOTOS/JANELA6.jpg',
        'PHOTOS/JANELA7.jpg',
        'PHOTOS/JANELA8.jpg',
        'PHOTOS/JANELA9.jpg',
        'PHOTOS/JANELA10.jpg',
        'PHOTOS/JANELA11.jpg',
        'PHOTOS/Janela.jpeg'
    ];
    
    const portasImages = [
        'PHOTOS/PORTA.jpg',
        'PHOTOS/PORTA1.jpg',
        'PHOTOS/PORTA2.jpg',
        'PHOTOS/PORTA3.jpg',
        'PHOTOS/PORTA4.jpg',
        'PHOTOS/PORTA5.jpg',
        'PHOTOS/PORTA6.jpg',
        'PHOTOS/PORTA7.jpg',
        'PHOTOS/PORTA8.jpg',
        'PHOTOS/PORTA9.jpg',
        'PHOTOS/PORTA10.jpg',
        'PHOTOS/PORTA11.jpg',
        'PHOTOS/PORTA12.jpg'
    ];
    
    // Inicializar carrosséis
    createCarousel('janela-carousel-img', 'janela-carousel-prev', 'janela-carousel-next', janelasImages);
    createCarousel('porta-carousel-img', 'porta-carousel-prev', 'porta-carousel-next', portasImages);
}
/**
 * Inicializa o menu mobile
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

/**
 * Inicializa os dropdowns
 */
function initDropdowns() {
    const socialsDropdown = document.querySelector('.socials-dropdown');
    const socialsToggle = document.getElementById('socials-toggle');

    if (socialsToggle && socialsDropdown) {
        socialsToggle.addEventListener('click', function(e) {
            e.preventDefault();
            socialsDropdown.classList.toggle('open');
            e.stopPropagation();
        });

        // Fechar dropdown ao clicar fora
        document.addEventListener('click', function(e) {
            if (socialsDropdown.classList.contains('open') && !socialsDropdown.contains(e.target)) {
                socialsDropdown.classList.remove('open');
            }
        });

        // Fechar dropdown ao pressionar ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && socialsDropdown.classList.contains('open')) {
                socialsDropdown.classList.remove('open');
            }
        });
    }
}

/**
 * Inicializa os modais
 */
function initModals() {
    // Configuração de modal genérica
    function setupModal(imgId, modalId, modalImgId, modalCloseId) {
        const img = document.getElementById(imgId);
        const modal = document.getElementById(modalId);
        const modalImg = document.getElementById(modalImgId);
        const modalClose = document.getElementById(modalCloseId);

        if (img && modal && modalImg && modalClose) {
            // Abrir modal ao clicar na imagem
            img.addEventListener('click', function() {
                document.body.style.overflow = 'hidden'; // Impedir scroll do body
                modal.classList.add('show');
                modalImg.src = this.src;
            });

            // Fechar modal ao clicar no X
            modalClose.addEventListener('click', function() {
                closeModal();
            });

            // Fechar modal ao clicar fora da imagem
            modal.addEventListener('click', function(event) {
                if (event.target === modal) {
                    closeModal();
                }
            });

            // Fechar modal ao pressionar ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.classList.contains('show')) {
                    closeModal();
                }
            });

            function closeModal() {
                modal.classList.remove('show');
                setTimeout(() => {
                    document.body.style.overflow = ''; // Restaurar scroll do body
                }, 300);
            }
        }
    }

    // Configurar modais para cada tipo de produto
    setupModal('janela-carousel-img', 'janela-modal', 'janela-modal-img', 'janela-modal-close');
    setupModal('porta-carousel-img', 'porta-modal', 'porta-modal-img', 'porta-modal-close');
    setupModal('guarda-corpo-img', 'guarda-corpo-modal', 'guarda-corpo-modal-img', 'guarda-corpo-modal-close');
}

/**
 * Inicializa as animações
 */
function initAnimations() {
    // Verificar se a biblioteca AOS está disponível
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100
        });
    } else {
        // Fallback para animações básicas se AOS não estiver disponível
        const animateElements = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animateElements.forEach(el => {
            el.classList.add('animate-hidden');
            observer.observe(el);
        });
    }
}

/**
 * Inicializa o botão flutuante do WhatsApp
 */
function initWhatsAppButton() {
    const whatsappButton = document.querySelector('.whatsapp-float');
    
    if (whatsappButton) {
        // Inicialmente oculto
        whatsappButton.style.opacity = '0';
        whatsappButton.style.transform = 'translateY(20px)';
        
        // Mostrar após rolagem
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                whatsappButton.style.opacity = '1';
                whatsappButton.style.transform = 'translateY(0)';
            } else {
                whatsappButton.style.opacity = '0';
                whatsappButton.style.transform = 'translateY(20px)';
            }
        });

        // Verificar posição inicial
        if (window.scrollY > 300) {
            whatsappButton.style.opacity = '1';
            whatsappButton.style.transform = 'translateY(0)';
        }
    }
}

/**
 * Inicializa os carrosséis
 */
function initCarousels() {
    // Função para criar carrossel
    function createCarousel(imgId, prevBtnId, nextBtnId, images) {
        const img = document.getElementById(imgId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        
        if (!img || !prevBtn || !nextBtn || !images || images.length === 0) return;
        
        let currentIndex = 0;
        
        // Atualizar imagem
        function updateImage() {
            img.src = images[currentIndex];
            img.setAttribute('data-idx', currentIndex);
            
            // Efeito de fade
            img.style.opacity = '0';
            setTimeout(() => {
                img.style.opacity = '1';
            }, 50);
        }
        
        // Botão anterior
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateImage();
        });
        
        // Botão próximo
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % images.length;
            updateImage();
        });
        
        // Trocar imagem automaticamente a cada 5 segundos
        let interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            updateImage();
        }, 5000);
        
        // Pausar troca automática ao passar o mouse
        img.parentElement.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });
        
        // Retomar troca automática ao remover o mouse
        img.parentElement.addEventListener('mouseleave', () => {
            interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                updateImage();
            }, 5000);
        });
    }
    
    // Imagens para os carrosséis
    const janelasImages = [
        'PHOTOS/JANELA2.jpg',
        'PHOTOS/JANELA3.jpg',
        'PHOTOS/JANELA4.jpg',
        'PHOTOS/JANELA5.jpg',
        'PHOTOS/JANELA6.jpg',
        'PHOTOS/JANELA7.jpg',
        'PHOTOS/JANELA8.jpg',
        'PHOTOS/JANELA9.jpg',
        'PHOTOS/JANELA10.jpg',
        'PHOTOS/JANELA11.jpg',
        'PHOTOS/Janela.jpeg'
    ];
    
    const portasImages = [
        'PHOTOS/PORTA.jpg',
        'PHOTOS/PORTA1.jpg',
        'PHOTOS/PORTA2.jpg',
        'PHOTOS/PORTA3.jpg',
        'PHOTOS/PORTA4.jpg',
        'PHOTOS/PORTA5.jpg',
        'PHOTOS/PORTA6.jpg',
        'PHOTOS/PORTA7.jpg',
        'PHOTOS/PORTA8.jpg',
        'PHOTOS/PORTA9.jpg',
        'PHOTOS/PORTA10.jpg',
        'PHOTOS/PORTA11.jpg',
        'PHOTOS/PORTA12.jpg'
    ];
    
    // Inicializar carrosséis
    createCarousel('janela-carousel-img', 'janela-carousel-prev', 'janela-carousel-next', janelasImages);
    createCarousel('porta-carousel-img', 'porta-carousel-prev', 'porta-carousel-next', portasImages);
}
/**
 * Inicializa o menu mobile
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

/**
 * Inicializa os dropdowns
 */
function initDropdowns() {
    const socialsDropdown = document.querySelector('.socials-dropdown');
    const socialsToggle = document.getElementById('socials-toggle');

    if (socialsToggle && socialsDropdown) {
        socialsToggle.addEventListener('click', function(e) {
            e.preventDefault();
            socialsDropdown.classList.toggle('open');
            e.stopPropagation();
        });

        // Fechar dropdown ao clicar fora
        document.addEventListener('click', function(e) {
            if (socialsDropdown.classList.contains('open') && !socialsDropdown.contains(e.target)) {
                socialsDropdown.classList.remove('open');
            }
        });

        // Fechar dropdown ao pressionar ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && socialsDropdown.classList.contains('open')) {
                socialsDropdown.classList.remove('open');
            }
        });
    }
}

/**
 * Inicializa os modais
 */
function initModals() {
    // Configuração de modal genérica
    function setupModal(imgId, modalId, modalImgId, modalCloseId) {
        const img = document.getElementById(imgId);
        const modal = document.getElementById(modalId);
        const modalImg = document.getElementById(modalImgId);
        const modalClose = document.getElementById(modalCloseId);

        if (img && modal && modalImg && modalClose) {
            // Abrir modal ao clicar na imagem
            img.addEventListener('click', function() {
                document.body.style.overflow = 'hidden'; // Impedir scroll do body
                modal.classList.add('show');
                modalImg.src = this.src;
            });

            // Fechar modal ao clicar no X
            modalClose.addEventListener('click', function() {
                closeModal();
            });

            // Fechar modal ao clicar fora da imagem
            modal.addEventListener('click', function(event) {
                if (event.target === modal) {
                    closeModal();
                }
            });

            // Fechar modal ao pressionar ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.classList.contains('show')) {
                    closeModal();
                }
            });

            function closeModal() {
                modal.classList.remove('show');
                setTimeout(() => {
                    document.body.style.overflow = ''; // Restaurar scroll do body
                }, 300);
            }
        }
    }

    // Configurar modais para cada tipo de produto
    setupModal('janela-carousel-img', 'janela-modal', 'janela-modal-img', 'janela-modal-close');
    setupModal('porta-carousel-img', 'porta-modal', 'porta-modal-img', 'porta-modal-close');
    setupModal('guarda-corpo-img', 'guarda-corpo-modal', 'guarda-corpo-modal-img', 'guarda-corpo-modal-close');
}

/**
 * Inicializa as animações
 */
function initAnimations() {
    // Verificar se a biblioteca AOS está disponível
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100
        });
    } else {
        // Fallback para animações básicas se AOS não estiver disponível
        const animateElements = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animateElements.forEach(el => {
            el.classList.add('animate-hidden');
            observer.observe(el);
        });
    }
}

/**
 * Inicializa o botão flutuante do WhatsApp
 */
function initWhatsAppButton() {
    const whatsappButton = document.querySelector('.whatsapp-float');
    
    if (whatsappButton) {
        // Inicialmente oculto
        whatsappButton.style.opacity = '0';
        whatsappButton.style.transform = 'translateY(20px)';
        
        // Mostrar após rolagem
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                whatsappButton.style.opacity = '1';
                whatsappButton.style.transform = 'translateY(0)';
            } else {
                whatsappButton.style.opacity = '0';
                whatsappButton.style.transform = 'translateY(20px)';
            }
        });

        // Verificar posição inicial
        if (window.scrollY > 300) {
            whatsappButton.style.opacity = '1';
            whatsappButton.style.transform = 'translateY(0)';
        }
    }
}

/**
 * Inicializa os carrosséis
 */
function initCarousels() {
    // Função para criar carrossel
    function createCarousel(imgId, prevBtnId, nextBtnId, images) {
        const img = document.getElementById(imgId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        
        if (!img || !prevBtn || !nextBtn || !images || images.length === 0) return;
        
        let currentIndex = 0;
        
        // Atualizar imagem
        function updateImage() {
            img.src = images[currentIndex];
            img.setAttribute('data-idx', currentIndex);
            
            // Efeito de fade
            img.style.opacity = '0';
            setTimeout(() => {
                img.style.opacity = '1';
            }, 50);
        }
        
        // Botão anterior
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateImage();
        });
        
        // Botão próximo
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % images.length;
            updateImage();
        });
        
        // Trocar imagem automaticamente a cada 5 segundos
        let interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            updateImage();
        }, 5000);
        
        // Pausar troca automática ao passar o mouse
        img.parentElement.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });
        
        // Retomar troca automática ao remover o mouse
        img.parentElement.addEventListener('mouseleave', () => {
            interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                updateImage();
            }, 5000);
        });
    }
    
    // Imagens para os carrosséis
    const janelasImages = [
        'PHOTOS/JANELA2.jpg',
        'PHOTOS/JANELA3.jpg',
        'PHOTOS/JANELA4.jpg',
        'PHOTOS/JANELA5.jpg',
        'PHOTOS/JANELA6.jpg',
        'PHOTOS/JANELA7.jpg',
        'PHOTOS/JANELA8.jpg',
        'PHOTOS/JANELA9.jpg',
        'PHOTOS/JANELA10.jpg',
        'PHOTOS/JANELA11.jpg',
        'PHOTOS/Janela.jpeg'
    ];
    
    const portasImages = [
        'PHOTOS/PORTA.jpg',
        'PHOTOS/PORTA1.jpg',
        'PHOTOS/PORTA2.jpg',
        'PHOTOS/PORTA3.jpg',
        'PHOTOS/PORTA4.jpg',
        'PHOTOS/PORTA5.jpg',
        'PHOTOS/PORTA6.jpg',
        'PHOTOS/PORTA7.jpg',
        'PHOTOS/PORTA8.jpg',
        'PHOTOS/PORTA9.jpg',
        'PHOTOS/PORTA10.jpg',
        'PHOTOS/PORTA11.jpg',
        'PHOTOS/PORTA12.jpg'
    ];
    
    // Inicializar carrosséis
    createCarousel('janela-carousel-img', 'janela-carousel-prev', 'janela-carousel-next', janelasImages);
    createCarousel('porta-carousel-img', 'porta-carousel-prev', 'porta-carousel-next', portasImages);
}
/**
 * Inicializa o menu mobile
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !hamburger.contains(e.target)) {
                navLinks.classList.remove('