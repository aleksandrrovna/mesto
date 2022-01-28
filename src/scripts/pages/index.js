import '../../pages/index.css'; // добавьте импорт главного файла стилей

import {
  imagePopup,
  profilePopup,
  placePopup,
  editButton,
  addButton,
  profileCloseButton,
  placeCloseButton,
  imageCloseButton,
  profileForm,
  placeForm,
  nameInput,
  jobInput,
  placeInput,
  imageInput,
  profileName,
  profileBio,
  listContainer,
  profileOverlay,
  placeOverlay,
  imageOverlay
} from '../utils/constants.js';
import { initialCards } from '../utils/initialCards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const enableValidation = {
  formSelector: '.popup__form-set',
  inputSelector: '.popup__type-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__type-field_type_error',
  errorClass: 'popup__type-field-error_active',
};

// Обработчик сабмита формы добавления места
const handlePlaceFormSubmit = () => {
  const newPlace = placeInput.value;
  const newImage = imageInput.value;

  const addedCard = new Section({
    items: [{
      name: newPlace,
      link: newImage
    }],
    renderer: renderCard,
  },
    listContainer
  );

  addedCard.renderItems();
  addCardFormValidator.deactivateButton();
  placeForm.reset();
  popupWithPlaceForm.close();
  popupWithPlaceForm.removeEventListener();
};

// Обработчик сабмита формы редактирования профиля
const userInfo = new UserInfo({
  profileNameSelector: profileName,
  profileBioSelector: profileBio
});

const handleProfileFormSubmit = () => {
  const name = nameInput.value;
  const job = jobInput.value;
  userInfo.setUserInfo(name, job);
  popupWithProfileForm.close();
};

// Попапы
const popupWithImage = new PopupWithImage(imagePopup);
const popupWithProfileForm = new PopupWithForm(profilePopup, () => {
  handleProfileFormSubmit;
});
const popupWithPlaceForm = new PopupWithForm(placePopup, () => {
  handlePlaceFormSubmit;
});

// Добавление карточки
const renderCard = (item) => {
  const newCard = new Card({
    data: item,
    selector: '.template',
    handleCardClick: () => popupWithImage.open(item)
  });
  const initializeCard = newCard.generate();
  return initializeCard;
  cardList.addItem(initializeCard);
};

const cardList = new Section({
  items: initialCards.reverse(),
  renderer: renderCard,
},
  listContainer
);

cardList.renderItems();

// Валидация форм
const editProfileFormValidator = new FormValidator(enableValidation, profileForm);
const addCardFormValidator = new FormValidator(enableValidation, placeForm);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// Слушатели формы редактирования профиля
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
  editProfileFormValidator.activateButton();
  editProfileFormValidator.resetErrors();
  popupWithProfileForm.open();
});

profileForm.addEventListener('submit', handleProfileFormSubmit);
profileCloseButton.addEventListener('click', () => popupWithProfileForm.close());
profileOverlay.addEventListener('click', () => popupWithProfileForm.close());

// Слушатели формы добавления карточки
addButton.addEventListener('click', () => {
  addCardFormValidator.resetErrors();
  popupWithPlaceForm.open();
});

placeForm.addEventListener('submit', handlePlaceFormSubmit);
placeCloseButton.addEventListener('click', () => popupWithPlaceForm.close());
placeOverlay.addEventListener('click', () => popupWithPlaceForm.close());

// Слушатели попапа с картинкой
imageCloseButton.addEventListener('click', () => popupWithImage.close());
imageOverlay.addEventListener('click', () => popupWithImage.close());
