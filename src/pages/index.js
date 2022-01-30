import './index.css';

import {
  editButton,
  addButton,
  profileForm,
  placeForm,
  nameInput,
  jobInput,
  placeInput,
  imageInput,
  enableValidation
} from '../utils/constants.js';
import { initialCards } from '../utils/initialCards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

// Обработчик сабмита формы добавления места
const handlePlaceFormSubmit = ({ place, link }) => {

  const addedCard = renderCard({
    name: place,
    link: link
  });

  cardList.addItem(addedCard);

  addCardFormValidator.deactivateButton();
  popupWithPlaceForm.close();
};

// Информация о пользователе на странице
const userInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profileBioSelector: '.profile__bio'
});

// Обработчик сабмита формы редактирования профиля
const handleProfileFormSubmit = ({ name, bio }) => {
  userInfo.setUserInfo(name, bio);
  popupWithProfileForm.close();
};

// Попапы
const popupWithImage = new PopupWithImage('#image-popup');
const popupWithProfileForm = new PopupWithForm('#profile-popup', handleProfileFormSubmit);
const popupWithPlaceForm = new PopupWithForm('#place-popup', handlePlaceFormSubmit);

// Добавление карточки
const renderCard = (item) => {
  const newCard = new Card({
    data: item,
    selector: '.template',
    handleCardClick: () => popupWithImage.open(item)
  });
  const initializeCard = newCard.generate();
  return initializeCard;
};

const cardList = new Section({
  items: initialCards.reverse(),
  renderer: renderCard,
},
  '.photo-grid'
);

cardList.renderItems();

// Валидация форм
const editProfileFormValidator = new FormValidator(enableValidation, profileForm);
const addCardFormValidator = new FormValidator(enableValidation, placeForm);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// Слушатели формы редактирования профиля
editButton.addEventListener('click', () => {
  const updatedUserInfo = userInfo.getUserInfo();
  nameInput.value = updatedUserInfo.name;
  jobInput.value = updatedUserInfo.job;
  editProfileFormValidator.activateButton();
  editProfileFormValidator.resetErrors();
  popupWithProfileForm.open();
});

popupWithProfileForm.setEventListeners();

// Слушатели формы добавления карточки
addButton.addEventListener('click', () => {
  addCardFormValidator.resetErrors();
  popupWithPlaceForm.open();
});

popupWithPlaceForm.setEventListeners();

// Слушатели попапа с картинкой
popupWithImage.setEventListeners();
