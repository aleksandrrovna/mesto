import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor (selector) {
    super(selector);
    this._image = this._selector.querySelector('.popup__image');
    this._name = this._selector.querySelector('.popup__image-caption');
  }

  open({ link, alt, name }) {
    this._image.src = link;
    this._image.alt = alt ? alt : name;
    this._name.textContent = name;
    super.open();
  }
};
