const aboutLink = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupCloseButton = popup.querySelector(".popup__close");
const formElement = popup.querySelector(".popup__form");
const nameInput = popup.querySelector(".popup__name");
const jobInput = popup.querySelector(".popup__bio");
const submit = popup.querySelector('.popup__save-button');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');


function open() {
  popup.classList.add("popup_opened");
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
