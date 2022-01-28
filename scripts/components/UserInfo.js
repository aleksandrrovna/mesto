export class UserInfo {
  constructor({ profileNameSelector, profileBioSelector }) {
    this._name = profileNameSelector;
    this._bio = profileBioSelector;
  }

  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      job: this._bio.textContent,
    };

    return userData;
  }

  setUserInfo(newProfileName, newProfileBio) {
    this._name.textContent = newProfileName;
    this._bio.textContent = newProfileBio;
  }
};
