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

const popup = document.querySelector('.popup');
const profilePopup = document.querySelector('#profile-popup');
const placePopup = document.querySelector('#place-popup');
const imagePopup = document.querySelector('#image-popup');

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
const templateElement = document.querySelector('.template');

const profileOverlay = document.querySelector('#profile-overlay');
const placeOverlay = document.querySelector('#place-overlay');
const imageOverlay = document.querySelector('#image-overlay');

const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__image-caption');

const submitProfileButton = profileForm.querySelector('.popup__save-button');
const submitPlaceButton = placeForm.querySelector('.popup__save-button');

/* Удаление карточек */
const handleTrash = (evt) => {

  const targetElement = evt.target;
  const card = targetElement.closest('.card');
  card.remove();
}

/* Добавление атрибутов новых карточек и их возвращение */
const getCard = (card) => {

  const newCard = templateElement.content.cloneNode(true);

  const imageNewCard = newCard.querySelector('.card__image');
  imageNewCard.src = card.link;
  imageNewCard.alt = card.alt;

  const headerNewCard = newCard.querySelector('.card__title');
  headerNewCard.textContent = card.name;

  const likeButton = newCard.querySelector('.card__like-button');
  likeButton.addEventListener('click', (evt) => evt.target.classList.toggle('card__like-button_active'));

  const trashButton = newCard.querySelector('.card__trash-button');
  trashButton.addEventListener('click', handleTrash);

  /* Попап с увеличением картинок */
  imageNewCard.addEventListener('click', (evt) => {

    evt.preventDefault();

    popupImage.src = card.link;
    popupImage.alt = card.alt;

    popupImageCaption.textContent = card.name;

    openPopup(imagePopup);

  });

  return newCard;

}

/* Добавление новых карточек в index.html */
const renderCard = () => {

  const html = initialCards.map((card) => {
    return getCard(card);
  });

  listContainer.append(...html);

}

renderCard();

const handleEscapeKey = (evt) => {
  if (evt.key === 'Escape') {
    const openCurrentPopup = document.querySelector('.popup_opened');
    closePopup(openCurrentPopup);
  };
};

/* Общее открытие попапов */
const openPopup = (popupContainer) => {
  popupContainer.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscapeKey);
};

/* Общее закрытие попапов */
const closePopup = (popupContainer) => {
  popupContainer.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscapeKey);
};

/* Обработчик сабмита формы редактирования профиля */
const handleProfileFormSubmit = (evt) => {

  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;

  closePopup(profilePopup);

}

/* Обработчик сабмита формы добавления места */
const handlePlaceFormSubmit = (evt) => {

  evt.preventDefault();

  const newPlace = placeInput.value;
  const newImage = imageInput.value;

  const card = {
    name: newPlace,
    link: newImage
  }

  const templateElement = getCard(card);

  listContainer.prepend(templateElement);

  placeInput.value = '';
  imageInput.value = '';

  closePopup(placePopup);

}

/* Деактивация кнопки сабмит */
const deactivateButton = (button) => {

  button.setAttribute('disabled', true);
  button.classList.add('popup__save-button_inactive');

};

/* Слушатели формы редактирования профиля */
editButton.addEventListener('click', () => {

  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;

  deactivateButton(submitProfileButton);

  openPopup(profilePopup);

});

profileForm.addEventListener('submit', handleProfileFormSubmit);
profileCloseButton.addEventListener('click', () => closePopup(profilePopup));
profileOverlay.addEventListener('click', () => closePopup(profilePopup));

/* Слушатели формы добавления карточки */
addButton.addEventListener('click', () => {

  deactivateButton(submitPlaceButton);

  openPopup(placePopup);
});

placeForm.addEventListener('submit', handlePlaceFormSubmit);
placeCloseButton.addEventListener('click', () => closePopup(placePopup));
placeOverlay.addEventListener('click', () => closePopup(placePopup));

/* Слушатели попапа с картинкой */
imageCloseButton.addEventListener('click', () => closePopup(imagePopup));
imageOverlay.addEventListener('click', () => closePopup(imagePopup));
