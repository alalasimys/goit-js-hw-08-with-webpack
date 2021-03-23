import cards from '../data/gallery-items';

const listRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const imgModalRef = document.querySelector('.lightbox__image');
const closeBtnRef = document.querySelector('.lightbox__button');
const backDropRef = document.querySelector('.lightbox__overlay');
let activeIndex = 0;

const markUp = cards.map(({ preview, original, description }) => {
  return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
});

listRef.insertAdjacentHTML('beforeend', markUp.join(''));

listRef.addEventListener('click', onOpenModal);
window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModal();
  }
});
backDropRef.addEventListener('click', closeModal);
window.addEventListener('keydown', onPressKeyLeftRight);

function onOpenModal(event) {
  event.preventDefault();
  if (event.target.nodeName === 'IMG') {
    modalRef.classList.add('is-open');
    imgModalRef.src = event.target.dataset.source;
    imgModalRef.alt = event.target.alt;
    for (const elem of markUp) {
      if (elem.includes(event.target.src)) {
        activeIndex = markUp.indexOf(elem);
      }
    }
  }
}

closeBtnRef.onclick = closeModal;

function closeModal() {
  modalRef.classList.remove('is-open');
  imgModalRef.removeAttribute('src');
  imgModalRef.removeAttribute('alt');
}

function onPressKeyLeftRight(event) {
  if (event.key === 'ArrowLeft') {
    activeIndex === 0 ? (activeIndex = cards.length - 1) : (activeIndex -= 1);
  }
  if (event.key === 'ArrowRight') {
    activeIndex === cards.length - 1 ? (activeIndex = 0) : (activeIndex += 1);
  }
  imgModalRef.src = cards[activeIndex].original;
  imgModalRef.alt = cards[activeIndex].description;
}
