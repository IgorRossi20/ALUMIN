// Carousel para Janelas

document.addEventListener('DOMContentLoaded', function() {
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
    var prevBtn = document.getElementById('janela-carousel-prev');
    var nextBtn = document.getElementById('janela-carousel-next');
    var modal = document.getElementById('janela-modal');
    var modalImg = document.getElementById('janela-modal-img');
    var modalClose = document.getElementById('janela-modal-close');

    function showImage(idx) {
        carouselImg.src = images[idx];
        carouselImg.setAttribute('data-idx', idx);
    }

    if (carouselImg && prevBtn && nextBtn) {
        showImage(current);
        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            current = (current - 1 + images.length) % images.length;
            showImage(current);
        });
        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            current = (current + 1) % images.length;
            showImage(current);
        });
        // Avanço automático
        setInterval(function() {
            current = (current + 1) % images.length;
            showImage(current);
        }, 5000);
    }
    // Abrir modal ao clicar na imagem
    if (carouselImg && modal && modalImg && modalClose) {
        carouselImg.addEventListener('click', function() {
            modal.style.display = 'flex';
            modalImg.src = images[parseInt(carouselImg.getAttribute('data-idx'))];
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
