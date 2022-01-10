import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

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

export const imagePopup = document.querySelector('#image-popup');
export const popupImage = document.querySelector('.popup__image');
export const popupImageCaption = document.querySelector('.popup__image-caption');

const popup = document.querySelector('.popup');
const profilePopup = document.querySelector('#profile-popup');
const placePopup = document.querySelector('#place-popup');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const profileCloseButton = document.querySelector('#profile-close');
const placeCloseButton = document.querySelector('#place-close');
const imageCloseButton = document.querySelector('#image-close');

const profileForm = document.querySelector('#profile-form');
const placeForm = document.querySelector('#place-form');

const nameInput = popup.querySelector('.popup__type-field_input_name');
const jobInput = popup.querySelector('.popup__type-field_input_bio');
const placeInput = document.querySelector('.popup__type-field_input_place');
const imageInput = document.querySelector('.popup__type-field_input_link');

const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');

const listContainer = document.querySelector('.photo-grid');

const profileOverlay = document.querySelector('#profile-overlay');
const placeOverlay = document.querySelector('#place-overlay');
const imageOverlay = document.querySelector('#image-overlay');

const submitProfileButton = profileForm.querySelector('.popup__save-button');
const submitPlaceButton = placeForm.querySelector('.popup__save-button');

const enableValidation = {
  formSelector: '.popup__form-set',
  inputSelector: '.popup__type-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__type-field_type_error',
  errorClass: 'popup__type-field-error_active',
};

const handleEscapeKey = (evt) => {
  if (evt.key === 'Escape') {
    const openCurrentPopup = document.querySelector('.popup_opened');
    closePopup(openCurrentPopup);
  };
};

// Общее открытие попапов
export const openPopup = (popupContainer) => {
  popupContainer.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscapeKey);
};

// Общее закрытие попапов
const closePopup = (popupContainer) => {
  popupContainer.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscapeKey);
};

// Добавление карточки
const addCard = (card, container) => container.prepend(card);

initialCards.reverse().forEach((card) => {
	const newCard = new Card(card, '.template');
	const newElement = newCard.generate();
  addCard(newElement, listContainer);
});

// Валидация форм
const editProfileFormValidator = new FormValidator (enableValidation, profileForm);
const addCardFormValidator = new FormValidator (enableValidation, placeForm);

addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();

// Обработчик сабмита формы редактирования профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  closePopup(profilePopup);
};

// Обработчик сабмита формы добавления места
const handlePlaceFormSubmit = (evt) => {
  evt.preventDefault();
  const newPlace = placeInput.value;
  const newImage = imageInput.value;
  const addedCard = new Card(
    {
    name: newPlace,
    link: newImage
    },
    '.template'
  );

  const submittedCard = addedCard.generate();
  addCard(submittedCard, listContainer);

  placeInput.value = '';
  imageInput.value = '';
  closePopup(placePopup);
};

// Деактивация кнопки сабмит
const deactivateButton = (button) => {
  button.setAttribute('disabled', true);
  button.classList.add('popup__save-button_inactive');
};

// Слушатели формы редактирования профиля
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
  deactivateButton(submitProfileButton);
  openPopup(profilePopup);
});

profileForm.addEventListener('submit', handleProfileFormSubmit);
profileCloseButton.addEventListener('click', () => closePopup(profilePopup));
profileOverlay.addEventListener('click', () => closePopup(profilePopup));

// Слушатели формы добавления карточки
addButton.addEventListener('click', () => {
  deactivateButton(submitPlaceButton);
  openPopup(placePopup);
});

placeForm.addEventListener('submit', handlePlaceFormSubmit);
placeCloseButton.addEventListener('click', () => closePopup(placePopup));
placeOverlay.addEventListener('click', () => closePopup(placePopup));

// Слушатели попапа с картинкой
imageCloseButton.addEventListener('click', () => closePopup(imagePopup));
imageOverlay.addEventListener('click', () => closePopup(imagePopup));
