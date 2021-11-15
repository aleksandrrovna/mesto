console.log('loaded')

const aboutLink = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupCloseButton = popup.querySelector(".popup__close");
const popupOverlay = popup.querySelector(".popup__container");
const title = document.querySelector(".profile__name");

function open() {
    popup.classList.add("popup_opened");
}

function close() {
    title.textContent = "NEW CONTENT";
    popup.classList.remove("popup_opened");
}

if (aboutLink) {
    aboutLink.addEventListener('click', open);
}

popupCloseButton.addEventListener('click', close);
popupOverlay.addEventListener('click', close);
