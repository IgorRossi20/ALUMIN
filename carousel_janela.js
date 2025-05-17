// Carousel para Janelas

document.addEventListener('DOMContentLoaded', function() {
    // Reposiciona setas ao carregar
    (function() {
        var carouselImg = document.getElementById('janela-carousel-img');
        var prevBtn = document.getElementById('janela-carousel-prev');
        var nextBtn = document.getElementById('janela-carousel-next');
        if (prevBtn && nextBtn && carouselImg && carouselImg.parentNode) {
            // Remove estilos inline de posição
            [prevBtn, nextBtn].forEach(function(btn) {
                btn.style.position = '';
                btn.style.left = '';
                btn.style.right = '';
                btn.style.top = '';
                btn.style.transform = '';
                btn.style.zIndex = '';
                btn.style.margin = '';
            });
            if (!prevBtn.classList.contains('carousel-arrow')) {
                prevBtn.parentNode.removeChild(prevBtn);
                nextBtn.parentNode.removeChild(nextBtn);
                var arrowsDiv = document.createElement('div');
                arrowsDiv.className = 'carousel-arrows';
                prevBtn.classList.add('carousel-arrow');
                nextBtn.classList.add('carousel-arrow');
                arrowsDiv.appendChild(prevBtn);
                arrowsDiv.appendChild(nextBtn);
                var parent = carouselImg.parentNode;
                var maybeTitle = carouselImg.nextElementSibling;
                while (maybeTitle && maybeTitle.tagName !== 'H3') {
                    maybeTitle = maybeTitle.nextElementSibling;
                }
                if (maybeTitle) {
                    parent.insertBefore(arrowsDiv, maybeTitle);
                } else {
                    parent.appendChild(arrowsDiv);
                }
            }
        }
    })();
    var images = [
        'PHOTOS/JANELA2.jpg',
        'PHOTOS/JANELA3.jpg',
        'PHOTOS/JANELA4.jpg',
        'PHOTOS/JANELA5.jpg',
        'PHOTOS/JANELA6.jpg',
        'PHOTOS/JANELA7.jpg',
        'PHOTOS/JANELA8.jpg',
        'PHOTOS/JANELA9.jpg',
        'PHOTOS/JANELA10.jpg',
        'PHOTOS/JANELA11.jpg'
    ];
    var current = 0;
    var carouselImg = document.getElementById('janela-carousel-img');
    var carousel = document.getElementById('janela-carousel');
    // Use os botões já existentes no HTML
    // Cria container para as setas logo abaixo da imagem
    var prevBtn = document.getElementById('janela-carousel-prev');
    var nextBtn = document.getElementById('janela-carousel-next');
    if (prevBtn && nextBtn && carouselImg && carouselImg.parentNode) {
        // Remove do local antigo
        prevBtn.parentNode.removeChild(prevBtn);
        nextBtn.parentNode.removeChild(nextBtn);
        var arrowsDiv = document.createElement('div');
        arrowsDiv.className = 'carousel-arrows';
        prevBtn.classList.add('carousel-arrow');
        nextBtn.classList.add('carousel-arrow');
        arrowsDiv.appendChild(prevBtn);
        arrowsDiv.appendChild(nextBtn);
        // Insere entre a imagem e o título (h3)
        var parent = carouselImg.parentNode;
        var maybeTitle = carouselImg.nextElementSibling;
        while (maybeTitle && maybeTitle.tagName !== 'H3') {
            maybeTitle = maybeTitle.nextElementSibling;
        }
        if (maybeTitle) {
            parent.insertBefore(arrowsDiv, maybeTitle);
        } else {
            parent.appendChild(arrowsDiv);
        }
    }
    var modal = document.getElementById('janela-modal');
    var modalImg = document.getElementById('janela-modal-img');
    var modalClose = document.getElementById('janela-modal-close');

    function showImage(idx) {
        carouselImg.src = images[idx];
        carouselImg.setAttribute('data-idx', idx);
    }

    // Função para iniciar/garantir rotação automática
    var autoInterval = null;
    function startAutoInterval() {
        if (autoInterval) clearInterval(autoInterval);
        autoInterval = setInterval(function() {
            current = (current + 1) % images.length;
            showImage(current);
        }, 5000);
    }
    function resetAutoInterval() {
        startAutoInterval();
    }

    if (carouselImg && prevBtn && nextBtn) {
        showImage(current);
        startAutoInterval();
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            current = (current - 1 + images.length) % images.length;
            showImage(current);
            resetAutoInterval();
        });
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            current = (current + 1) % images.length;
            showImage(current);
            resetAutoInterval();
        });
    }
    // Abrir modal ao clicar na imagem
    if (carouselImg && modal && modalImg && modalClose) {
        function updateModal(idx) {
            modalImg.src = images[idx];
            modalImg.setAttribute('data-idx', idx);
        }
        carouselImg.addEventListener('click', function() {
            modal.style.display = 'flex';
            var idx = parseInt(carouselImg.getAttribute('data-idx'));
            updateModal(idx);
        });
        modalClose.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
        // Adiciona navegação por setas no modal (teclado e clique/touch)
        modalImg.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        modal.addEventListener('keydown', function(e) {
            var idx = parseInt(modalImg.getAttribute('data-idx'));
            if (e.key === 'ArrowLeft') {
                idx = (idx - 1 + images.length) % images.length;
                updateModal(idx);
            } else if (e.key === 'ArrowRight') {
                idx = (idx + 1) % images.length;
                updateModal(idx);
            } else if (e.key === 'Escape') {
                modal.style.display = 'none';
            }
        });
        // Foco para capturar teclado
        modal.addEventListener('transitionend', function() {
            if (modal.style.display !== 'none') modal.focus();
        });
        // Botões visuais (setas) - abaixo da foto, centralizados e fora da imagem
        var navContainer = document.createElement('div');
        navContainer.style.display = 'flex';
        navContainer.style.justifyContent = 'center';
        navContainer.style.alignItems = 'center';
        navContainer.style.gap = '32px';
        navContainer.style.marginTop = '18px';
        navContainer.style.width = '100%';
        navContainer.style.position = 'absolute';
        navContainer.style.left = '0';
        navContainer.style.right = '0';
        navContainer.style.bottom = '24px';
        navContainer.style.zIndex = '10002';
        var leftBtn = document.createElement('button');
        leftBtn.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:2.1rem;color:#344454;">&#8592;</span>';
        leftBtn.style.background = '#f2f2fa';
        leftBtn.style.border = 'none';
        leftBtn.style.borderRadius = '50%';
        leftBtn.style.boxShadow = '0 4px 16px #34445433';
        leftBtn.style.fontSize = '2rem';
        leftBtn.style.width = '48px';
        leftBtn.style.height = '48px';
        leftBtn.style.cursor = 'pointer';
        leftBtn.style.display = 'flex';
        leftBtn.style.alignItems = 'center';
        leftBtn.style.justifyContent = 'center';
        var rightBtn = document.createElement('button');
        rightBtn.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:2.1rem;color:#344454;">&#8594;</span>';
        rightBtn.style.background = '#f2f2fa';
        rightBtn.style.border = 'none';
        rightBtn.style.borderRadius = '50%';
        rightBtn.style.boxShadow = '0 4px 16px #34445433';
        rightBtn.style.fontSize = '2rem';
        rightBtn.style.width = '48px';
        rightBtn.style.height = '48px';
        rightBtn.style.cursor = 'pointer';
        rightBtn.style.display = 'flex';
        rightBtn.style.alignItems = 'center';
        rightBtn.style.justifyContent = 'center';
        leftBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            var idx = parseInt(modalImg.getAttribute('data-idx'));
            idx = (idx - 1 + images.length) % images.length;
            updateModal(idx);
        });
        rightBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            var idx = parseInt(modalImg.getAttribute('data-idx'));
            idx = (idx + 1) % images.length;
            updateModal(idx);
        });
        navContainer.appendChild(leftBtn);
        navContainer.appendChild(rightBtn);
        modal.appendChild(navContainer);
        // Permite foco para teclado
        modal.tabIndex = 0;
    }
});
