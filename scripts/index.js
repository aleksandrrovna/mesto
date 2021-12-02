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
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popupSubmitButton = popup.querySelector('.popup__save-button');
const profilePopup = document.querySelector('#profile-popup');
const placePopup = document.querySelector('#place-popup');
const imagePopup = document.querySelector('#image-popup');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const openImage = document.querySelector('.card__image');

const profileCloseButton = document.querySelector('#profile-close');
const placeCloseButton = document.querySelector('#place-close');
const imageCloseButton = document.querySelector('#image-close');

const formElement = popup.querySelector('.popup__form');
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

    const popupImage = document.querySelector('.popup__image');
    popupImage.src = card.link;
    popupImage.alt = card.alt;

    const popupImageCaption = document.querySelector('.popup__image-caption');
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

/* Общее открытие попапов */
const openPopup = (popupContainer) => popupContainer.classList.add('popup_opened');

/* Общее закрытие попапов */
const closePopup = (popupContainer) => popupContainer.classList.remove('popup_opened');

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

editButton.addEventListener('click', () => {

  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;

  openPopup(profilePopup);

});

profileForm.addEventListener('submit', handleProfileFormSubmit);
placeForm.addEventListener('submit', handlePlaceFormSubmit);
profileCloseButton.addEventListener('click', () => closePopup(profilePopup));

addButton.addEventListener('click', () => openPopup(placePopup));
placeCloseButton.addEventListener('click', () => closePopup(placePopup));

imageCloseButton.addEventListener('click', () => closePopup(imagePopup));
