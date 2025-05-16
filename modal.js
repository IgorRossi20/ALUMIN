// Script para abrir imagem em modal ao clicar na imagem de Janelas

document.addEventListener('DOMContentLoaded', function() {
    var janelaImg = document.getElementById('janela-img');
    var modal = document.getElementById('janela-modal');
    var modalImg = document.getElementById('janela-modal-img');
    var modalClose = document.getElementById('janela-modal-close');

    if (janelaImg && modal && modalImg && modalClose) {
        janelaImg.addEventListener('click', function() {
            modal.style.display = 'flex';
            modalImg.src = this.src;
        });
        modalClose.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});
