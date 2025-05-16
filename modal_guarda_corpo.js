// Modal para Guarda-Corpos

document.addEventListener('DOMContentLoaded', function() {
    var img = document.getElementById('guarda-corpo-img');
    var modal = document.getElementById('guarda-corpo-modal');
    var modalImg = document.getElementById('guarda-corpo-modal-img');
    var modalClose = document.getElementById('guarda-corpo-modal-close');

    if (img && modal && modalImg && modalClose) {
        img.addEventListener('click', function() {
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
