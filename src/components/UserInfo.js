export class UserInfo {
  constructor({ profileNameSelector, profileBioSelector, profileAvatarSelector }) {
    this._name = document.querySelector(profileNameSelector);
    this._bio = document.querySelector(profileBioSelector);
    this._avatar = document.querySelector(profileAvatarSelector);
    this._id = 0;
  }

  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      job: this._bio.textContent,
    };

    return userData;
  }

  setUserInfo({ newProfileName, newProfileBio, newProfileAvatar }) {
    this._name.textContent = newProfileName;
    this._bio.textContent = newProfileBio;
    this._avatar.src = newProfileAvatar;
  }

  getId() {
    return this._id;
  }

  setId(id) {
    this._id = id;
  }
};
