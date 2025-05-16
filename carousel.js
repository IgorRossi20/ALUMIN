// Carousel para Portas

document.addEventListener('DOMContentLoaded', function() {
    var images = [
        'PHOTOS/PORTA.jpg',
        'PHOTOS/PORTA1.jpg',
        'PHOTOS/PORTA2.jpg',
        'PHOTOS/PORTA3.jpg',
        'PHOTOS/PORTA4.jpg',
        'PHOTOS/PORTA5.jpg',
        'PHOTOS/PORTA6.jpg',
        'PHOTOS/PORTA7.jpg',
        'PHOTOS/PORTA8.jpg'
    ];
    var current = 0;
    var carouselImg = document.getElementById('porta-carousel-img');
    var prevBtn = document.getElementById('porta-carousel-prev');
    var nextBtn = document.getElementById('porta-carousel-next');
    var modal = document.getElementById('porta-modal');
    var modalImg = document.getElementById('porta-modal-img');
    var modalClose = document.getElementById('porta-modal-close');

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
