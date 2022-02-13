import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor (selector, handleSubmit) {
    super(selector);
    this._handleSubmit = handleSubmit;
    this._button = this._popup.querySelector('.popup__save-button');
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
      this.close();
    });
  }
};
