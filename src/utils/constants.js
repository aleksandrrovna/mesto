const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const updateButton = document.querySelector('.profile__overlay');

const profileButton = document.querySelector('#profile-button');
const placeButton = document.querySelector('#place-button');
const avatarButton = document.querySelector('#avatar-button');

const profileForm = document.querySelector('#profile-form');
const placeForm = document.querySelector('#place-form');
const AvatarForm = document.querySelector('#avatar-form');

const nameInput = document.querySelector('.popup__type-field_input_name');
const jobInput = document.querySelector('.popup__type-field_input_bio');
const placeInput = document.querySelector('.popup__type-field_input_place');
const imageInput = document.querySelector('.popup__type-field_input_link');

const enableValidation = {
  formSelector: '.popup__form-set',
  inputSelector: '.popup__type-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__type-field_type_error',
  errorClass: 'popup__type-field-error_active',
};

export {
  editButton,
  addButton,
  updateButton,
  profileButton,
  placeButton,
  avatarButton,
  profileForm,
  placeForm,
  AvatarForm,
  nameInput,
  jobInput,
  placeInput,
  imageInput,
  enableValidation
};
