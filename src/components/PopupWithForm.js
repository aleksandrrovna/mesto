import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor (selector, submitForm) {
    super(selector);
    this._submit = submitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__type-field'));
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach ((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
      // this.close();
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
};
