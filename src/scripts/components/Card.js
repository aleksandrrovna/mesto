export class Card {
  constructor({ data, selector, handleCardClick }) {
    this._link = data.link;
    this._alt = data.alt;
    this._name = data.name;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _addEventListeners() {
    this._like.addEventListener('click', (evt) => evt.target.classList.toggle('card__like-button_active'));
    this._trash.addEventListener('click', (evt) => {
      this._element.remove();
      this._element = null;
    });
    this._image.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  generate() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector('.card__image');
    this._like = this._element.querySelector('.card__like-button');
    this._trash = this._element.querySelector('.card__trash-button');

    this._image.src = this._link;
    this._image.alt = this._alt ? this._alt : this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._addEventListeners();

    return this._element;
  }
};
