const carouselSlide = document.querySelector('.portada');
const images = [
    'url(../imagenes/imagenM1.png)',
    'url(../imagenes/imagenM7.png)',
    'url(../imagenes/imagenM8.png)' // Añade la ruta completa de la imagen
];

let currentImageIndex = 0;

function changeSlide() {
    carouselSlide.style.backgroundImage = images[currentImageIndex];
    currentImageIndex = (currentImageIndex + 1) % images.length;
}

setInterval(changeSlide, 2500);
