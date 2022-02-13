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
import { Api } from '../components/Api.js';
import { initialCards } from '../utils/initialCards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';

// API
const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-35',
  headers: {
    authorization: '4232a76a-b492-41bd-8079-c0b570c3fc12',
    'Content-Type': 'application/json'
  }
});

// Загрузка информации о пользователе с сервера
const getServerUserInfo = api.getUserInfo()
  .then((ServerUserInfo) => {
    return ServerUserInfo
  })
  .catch((error) => {
    console.log(`Ошибка загрузки информации о пользователе с сервера ${error}`)
  });

// Загрузка карточек с сервера
const getServerInitialCards = api.getInitialCards()
  .then((ServerInitialCards) => {
    return ServerInitialCards
  })
  .catch((error) => {
    console.log(`Ошибка загрузки карточек с сервера ${error}`)
  });

// Информация о пользователе на странице
const userInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profileBioSelector: '.profile__bio',
  /*profileAvatarSelector: '.profile__avatar'*/
});

// Обработчик сабмита формы редактирования профиля
const handleProfileFormSubmit = (newProfileData) => {
  api.editProfile(newProfileData)
    .then((response) => {
      userInfo.setUserInfo({
        newProfileName: response.name,
        newProfileBio: response.about
      });
      popupWithProfileForm.close();
    })
    .catch((error) => {
      console.log(`Ошибка редактирования профиля ${error}`)
    })
};

// Добавление карточки
const renderCard = (item) => {
  const newCard = new Card({
    data: item,
    selector: '.template',
    handleCardClick: () => {
      popupWithImage.open(item);
    },
    userId: () => {
      userInfo.getId();
    },
    handleCardRemove: (item) => {
      removeCardWindow(item);
    },
    handleCardLike: (item) => {
      likeCard(item);
    }
  });
  return newCard.generate();
};

const cardList = new Section({
  items: [],
  renderer: renderCard,
},
  '.photo-grid'
);

// Обработчик сабмита формы добавления места
const handlePlaceFormSubmit = (newCardData) => {
  api.addCard(newCardData)
    .then((response) => {
      const addedCard = renderCard({
        name: response.name,
        link: response.link
      });
      cardList.addItem(addedCard);
      addCardFormValidator.deactivateButton();
      popupWithPlaceForm.close();
    })
    .catch((error) => {
      console.log(`Ошибка добавления новой карточки ${error}`)
    })
};

const handleAvatarFormSubmit = (newAvatar) => {

};

const removeCardWindow = (item) => {
  popupWithConfirmation.open(item);
}

const handleConfirmRemoval = (item) => {
  api.removeCard(item.getCardId())
    .then(() => {
      item.removeCard();
      popupWithConfirmation.close();
    })
    .catch((error) => {
      console.log(`Ошибка удаления карточки ${error}`);
    })
};

// Попапы
const popupWithImage = new PopupWithImage('#image-popup');
const popupWithProfileForm = new PopupWithForm('#profile-popup', handleProfileFormSubmit);
const popupWithPlaceForm = new PopupWithForm('#place-popup', handlePlaceFormSubmit);
const popupWithAvatarForm = new PopupWithForm('#avatar-popup', handleAvatarFormSubmit);
const popupWithConfirmation = new PopupWithConfirmation('#confirm-popup', handleConfirmRemoval);

Promise.all([getServerUserInfo, getServerInitialCards])
  .then(([ServerUserInfo, ServerInitialCards]) => {
    userInfo.setUserInfo({
      newProfileName: ServerUserInfo.name,
      newProfileBio: ServerUserInfo.about,
      // newProfileAvatar: ServerUserInfo.avatar
    });
    cardList.renderItems(ServerInitialCards);
  })
  .catch((error) => {
    console.log(`Ошибка загрузки данных с сервера ${error}`);
  });

// поставить/убрать лайк
const likeCard = (card) => {
  if (!card.getIsLike()) {
    api.putLike(card.getCardId())
      .then((response) => {
        card.handleLike(response);
      })
      .catch((error) => {
        console.log(`Ошибка выставления лайка ${error}`);
      });
  } else {
    api.removeLike(card.getCardId())
      .then((response) => {
        card.handleLike(response);
      })
      .catch((error) => {
        console.log(`Ошибка снятия лайка ${error}`);
      });
  }
}

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

// Слушатели попапа с подтверждением удаления карточки
popupWithConfirmation.setEventListeners();

// Слушатели попапа с обновлением аватара
popupWithAvatarForm.setEventListeners();
