import AbstractSmartComponent from "./abstract-smart-component";
import {ProfileLevel} from "../const";

const getFilmsWatched = (films) => {
  return films.reduce((accumulator, current) => {
    return accumulator + current.alreadyWatched;
  }, 0);
};

const createProfileTemplate = (profileRating) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${profileRating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Profile extends AbstractSmartComponent {
  constructor(filmsModel) {
    super();
    this._filmsModel = filmsModel;

    this._currentProfileRating = ``;
    this.changeRating = this.changeRating.bind(this);
    this.getRating = this.getRating.bind(this);
  }

  getTemplate() {
    this._currentProfileRating = this.getRating();
    return createProfileTemplate(this._currentProfileRating);
  }

  getRating() {
    const numberWatched = getFilmsWatched(this._filmsModel.getFilmsAll());
    let profileRating;

    switch (true) {
      case numberWatched <= ProfileLevel.NOTHING_MAX:
        profileRating = ``;
        break;
      case numberWatched <= ProfileLevel.NOVICE_MAX:
        profileRating = `Novice`;
        break;
      case numberWatched <= ProfileLevel.FAN_MAX:
        profileRating = `Fan`;
        break;
      case numberWatched >= ProfileLevel.MOVIE_BUF_MIN:
        profileRating = `Movie Buff`;
        break;
    }
    return profileRating;
  }

  recoveryListeners() {

  }

  rerender() {
    super.rerender();
  }

  changeRating() {
    const newRating = this.getRating();
    if (newRating !== this._currentProfileRating) {
      this.rerender();
    }
  }

}
