// Modal para Guarda-Corpos

document.addEventListener('DOMContentLoaded', function() {
    var img = document.getElementById('guarda-corpo-img');
    var modal = document.getElementById('guarda-corpo-modal');
    var modalImg = document.getElementById('guarda-corpo-modal-img');
    var modalClose = document.getElementById('guarda-corpo-modal-close');

    if (img && modal && modalImg && modalClose) {
        // Lista de imagens do guarda-corpo
        var images = [
            'PHOTOS/GUARDACORPO1.jpg',
            'PHOTOS/GUARDACORPO2.jpg',
            'PHOTOS/GUARDACORPO3.jpg',
            'PHOTOS/GUARDACORPO4.jpg',
            'PHOTOS/GUARDACORPO5.jpg'
        ];
        var current = 0;
        function updateModal(idx) {
            modalImg.src = images[idx];
            modalImg.setAttribute('data-idx', idx);
        }
        img.addEventListener('click', function() {
            modal.style.display = 'flex';
            updateModal(current);
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
        // Botões visuais (setas) - abaixo da foto
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
        navContainer.style.bottom = '32px';
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
