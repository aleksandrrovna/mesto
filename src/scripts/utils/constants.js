const imagePopup = document.querySelector('#image-popup');
const profilePopup = document.querySelector('#profile-popup');
const placePopup = document.querySelector('#place-popup');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const profileCloseButton = document.querySelector('#profile-close');
const placeCloseButton = document.querySelector('#place-close');
const imageCloseButton = document.querySelector('#image-close');

const profileForm = document.querySelector('#profile-form');
const placeForm = document.querySelector('#place-form');

const nameInput = document.querySelector('.popup__type-field_input_name');
const jobInput = document.querySelector('.popup__type-field_input_bio');
const placeInput = document.querySelector('.popup__type-field_input_place');
const imageInput = document.querySelector('.popup__type-field_input_link');

const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');

const listContainer = document.querySelector('.photo-grid');

const profileOverlay = document.querySelector('#profile-overlay');
const placeOverlay = document.querySelector('#place-overlay');
const imageOverlay = document.querySelector('#image-overlay');

export {
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
};
