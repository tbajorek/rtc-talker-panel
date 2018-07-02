import uuidv4 from 'uuid';

import { Roles } from '../../routes';

class UserModel {
  constructor(id, username, email, avatar, token, role) {
    this._id = id;
    this._username = username;
    this._email = email;
    this._avatar = avatar;
    this._token = token;
    this._role = role;
  }

  get id() {
    return this._id;
  }

  get username() {
    return this._username;
  }

  get email() {
    return this._email;
  }

  get avatar() {
    return this._avatar;
  }

  get token() {
    return this._token;
  }

  get role() {
    return this._role;
  }

  static createGuest() {
    return new UserModel(uuidv4(), 'Guest', null, null, null, Roles.GUEST);
  }
}

export default UserModel;
