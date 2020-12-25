// ++ Создание и рендер разметки по массиву данных и предоставленному шаблону.
// ++ Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// ++ Открытие модального окна по клику на элементе галереи.
// ++ Подмена значения атрибута src элемента img.lightbox__image.
// ++ Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// ++ Очистка значения атрибута src элемента img.lightbox__image. 
// Это необходимо для того, чтобы при следующем открытии модального окна, 
// пока грузится изображение, мы не видели предыдущее.

// Дополнительно
// Следующий функционал не обязателен при сдаче задания, 
// но будет хорошей практикой по работе с событиями.

// ++ Закрытие модального окна по клику на div.lightbox__overlay.
// ++ Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".


import galleryItems from './gallery-items.js';
import images from './gallery-items.js';
//console.log(images);
const galleryRef = document.querySelector('ul.gallery.js-gallery');
const nav = document.querySelector(".js-gallery");
const modalRef = document.querySelector('.lightbox.js-lightbox');
const modalImageRef = modalRef.querySelector('.lightbox__image');
const modalCloseBtnRef =modalRef.querySelector('button[data-action="close-lightbox"]');
//console.log(galleryRef);
const galleryItemsRef = images.map(image=>`<li class="gallery__item"><a class="gallery__link" href="${image.original}" >
<img class="gallery__image" src="${image.preview}" data-source="${image.original}" alt="${image.description}"/></a></li>`).reduce((acc,part)=>acc+=part, ``);
// console.log(galleryItemsRef);
galleryRef.insertAdjacentHTML('beforeend',galleryItemsRef); // html for gallery items added
//  task #2
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.

let galleryCurrentItemRef;
// ++ Реализация делегирования на галерее ul.js-gallery
galleryRef.addEventListener("click", handleImageClick);

function handleImageClick(event) {
  event.preventDefault();
  
  galleryCurrentItemRef = event.target; //получаем ссылку на источник события (элемент галлереи)
  // console.log("event target: ", target); 
  // Подмена значения атрибута src элемента img.lightbox__image.
  modalImageChange(galleryCurrentItemRef, modalImageRef);
  //   Открытие модального окна по клику на элементе галереи.
  if (!modalRef.classList.contains('is-open')){
      modalRef.classList.add('is-open');
  }
}
// Подмена значения атрибута src элемента img.lightbox__image.
function modalImageChange(galleryItemRef, modalImageRef){
// Проверяем наличие атрибута "data-source", в котором хранится ссылка на большое изображение. 
// Если отсутствует, выходим из функции.  
    if (!galleryItemRef.hasAttribute('data-source')) return;
    modalImageRef.setAttribute('src', getImageLink(galleryItemRef));
};
function getImageLink(target){
    return target.dataset.source;
};
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
modalCloseBtnRef.addEventListener('click', hndlCloseModal);

function hndlCloseModal(event){
    event.preventDefault();
    if (!modalRef.classList.contains('is-open')) return;
    modalRef.classList.remove('is-open');    
    modalImageSrcClear(modalImageRef);
};
// Очистка значения атрибута src элемента img.lightbox__image.
function modalImageSrcClear(imageRef){
    imageRef.setAttribute('src', '');
};

// Доп
// Закрытие модального окна по клику на div.lightbox__overlay.
const modalOverlayRef = modalRef.querySelector('.lightbox__overlay');
modalOverlayRef.addEventListener('click', hndlCloseModal);


window.addEventListener("keydown", hndlKeyPress);
function hndlKeyPress(e){
    // e.preventDefault(e);
    // Закрытие модального окна по нажатию клавиши ESC
    if(e.key==="Escape"){
        hndlEscPress(e);
    };
    // Пролистывание изображений галереи
    if(e.key==="ArrowRight"){
        hndlArrowRightPress(e);
    };
    if(e.key==="ArrowLeft"){
        hndlArrowLeftPress(e);
    };
};

function hndlEscPress(e){
    if(e.key!=="Escape") return;
    console.log('Esc key pressed');
    hndlCloseModal(e);    
};
function hndlArrowRightPress(e){
    if(e.key!=="ArrowRight") return;
    // console.log('ArrowRight key pressed');
    scrollNext(e);
};
function hndlArrowLeftPress(e){
    if(e.key!=="ArrowLeft") return;
    // console.log('ArrowLeft key pressed');
    scrollPrev(e);
};
// Пролистывание изображений галереи в открытом модальном окне клавишами "вправо".
function scrollNext(e){
    // console.log('Scroll right');
    if (!modalRef.classList.contains('is-open')) {console.log("!!!!!" ); return;};
    console.log('Next-->');
    galleryCurrentItemRef = galleryCurrentItemRef.parentNode.parentNode.nextElementSibling!==null?galleryCurrentItemRef.parentNode.parentNode.nextElementSibling.querySelector('img'):galleryCurrentItemRef;
    modalImageChange(galleryCurrentItemRef, modalImageRef);

    // key: "ArrowRight"

};
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево".
function scrollPrev(e){
    // console.log(modalRef.classList);
    if (!modalRef.classList.contains('is-open')) {console.log("!!!!!" ); return;};
    console.log('<--Prev');
    galleryCurrentItemRef = galleryCurrentItemRef.parentNode.parentNode.previousElementSibling !==null?galleryCurrentItemRef.parentNode.parentNode.previousElementSibling.querySelector('img'):galleryCurrentItemRef;
    modalImageChange(galleryCurrentItemRef, modalImageRef);
    // key: "ArrowLeft"
};