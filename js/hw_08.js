import galleryItems from './gallery-items.js';
import images from './gallery-items.js';
//console.log(images);
const galleryRef = document.querySelector('ul.gallery.js-gallery');
//console.log(galleryRef);
const galleryItemsRef = images.map(image=>`<li class="gallery__item"><a class="gallery__link" href="${image.original}" >
<img class="gallery__image" src="${image.preview}" data-source="${image.original}" alt="${image.description}"/></a></li>`).reduce((acc,part)=>acc+=part, ``);
// console.log(galleryItemsRef);
galleryRef.insertAdjacentHTML('beforeend',galleryItemsRef); // html for gallery items added



