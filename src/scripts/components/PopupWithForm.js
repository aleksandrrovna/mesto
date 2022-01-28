import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor (selector, submitForm) {
    super(selector);
    this._submit = submitForm;
    this._form = this._selector.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = Array.from(this._form.querySelectorAll('.popup__type-field'));
    this._formValues = {};
    this._inputList.forEach ((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListener() {
    super.setEventListener();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
      this.close();
    });
  }

  removeEventListener() {
    super.removeEventListener();
    this._form.removeEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
      this.close();
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
};
