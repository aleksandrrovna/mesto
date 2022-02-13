export class Card {
  constructor({ data, selector, handleCardClick, userId, handleCardRemove, handleCardLike }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes.length;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._cardId = data._id;
    this._isLike = data.likes.some(item => item._id == this._userID);

    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleCardRemove = handleCardRemove;
    this._handleCardLike = handleCardLike;

    this._element = this._getTemplate();
    this._image = this._element.querySelector('.card__image');
    this._like = this._element.querySelector('.card__like-button');
    this._likeCounter = this._element.querySelector('.card__like-number');
    this._trash = this._element.querySelector('.card__trash-button');
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
    this._like.addEventListener('click', () => {
      this._handleCardLike();
    });
    this._trash.addEventListener('click', (evt) => {
      this._handleCardRemove();
    });
    this._image.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  generate() {
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._likeCounter.textContent = this._likes;
    if (this._ownerId != this._userId) {
      this._trash.classList.add('card__trash-button_hidden');
    }

    this._addEventListeners();

    return this._element;
  }

  removeCard() {
    this._element.remove();
  }

  getCardId() {
    return this._cardId;
  }

  getIsLike() {
    return this._isLike;
  }

  handleLike(item) {
    this._likeCounter.textContent = item.likes.length;
    this._isLike = !this._isLike
    if (this._isLike) {
      this._like.classList.add('card__like-button_active');
    } else {
      this._like.classList.remove('card__like-button_active');
    }
  }
};
