import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._handleSubmit = handleSubmit;
    this._button = this._popup.querySelector('.popup__confirm-button');
  }

  open(item) {
    super.open();
    this._element = item;
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._element);
    });
  }
};
