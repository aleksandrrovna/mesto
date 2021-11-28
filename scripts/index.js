const aboutLink = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupCloseButton = popup.querySelector(".popup__close");
const formElement = popup.querySelector(".popup__form");
const nameInput = popup.querySelector(".popup__type-field_input_name");
const jobInput = popup.querySelector(".popup__type-field_input_bio");
const submit = popup.querySelector('.popup__save-button');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');


function open() {
  popup.classList.add("popup_opened");

  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
}

function close() {
  popup.classList.remove("popup_opened")
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;

  close ();
}

aboutLink.addEventListener('click', open);
popupCloseButton.addEventListener('click', close);
formElement.addEventListener('submit', formSubmitHandler);

/* Проектная работа 5 */

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Горы Архыза с остатками талого снега'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Зимний пейзаж реки в Челябинской области'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Ряд многоэтажных домов в Иваново'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Флора у подножия гор на Камчатке'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Железная дорога в лесу Холмогорского района'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Снежные горы Байкала'
  }
];

const listContainerEl = document.querySelector('.photo-grid');
const templateEl = document.querySelector('.template');

function getItem(item) {
  const newItem = templateEl.content.cloneNode(true);

  const imageEl = newItem.querySelector('.card__image');
  imageEl.src = item.link;

  const imageAltEl = newItem.querySelector('.card__image');
  imageAltEl.alt = item.alt;

  const headerEl = newItem.querySelector('.card__title');
  headerEl.textContent = item.name;

  return newItem;
}

function render() {
  const html = initialCards.map((item) => {
    return getItem(item);
  });

  listContainerEl.append(...html);
}

render();


