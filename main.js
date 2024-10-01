// JavaScript for image slider
let currentIndex = 0;
const images = document.querySelectorAll('.slider-image');
const totalImages = images.length;

function showNextImage() {
  images[currentIndex].style.opacity = '0';
  currentIndex = (currentIndex + 1) % totalImages;
  images[currentIndex].style.opacity = '1';
}

setInterval(showNextImage, 3000); // Change image every 3 seconds
