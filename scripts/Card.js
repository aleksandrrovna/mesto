import { imagePopup, popupImage, popupImageCaption, openPopup } from './index.js';

class Card {
  constructor(data, selector) {
    this._link = data.link;
    this._alt = data.alt;
    this._name = data.name;
    this._selector = selector;

    this._element = document
    .querySelector(this._selector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    this._image = this._element.querySelector('.card__image');
    this._like = this._element.querySelector('.card__like-button');
    this._trash = this._element.querySelector('.card__trash-button');
  }

  _addEventListeners() {
    this._like.addEventListener('click', (evt) => evt.target.classList.toggle('card__like-button_active'));
    this._trash.addEventListener('click', (evt) => evt.target.closest('.card').remove());
    this._image.addEventListener('click', () => {
      popupImage.src = this._link;
      popupImage.alt = this._alt;
      popupImageCaption.textContent = this._name;
      openPopup(imagePopup);
    });
  }

  generate() {
    this._image.src = this._link;
    this._image.alt = this._alt;
    this._element.querySelector('.card__title').textContent = this._name;
    this._addEventListeners();

    return this._element;
  }
};

export { Card };
