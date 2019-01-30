import uuidv4 from 'uuid/v4';

import {User as UserModel} from 'tbrtc-common/model/User';
import {Roles} from '../../roles';

class User extends UserModel {
    constructor(id, name, surname, email, avatar, token, role, address, company, departments, availability, validUntil) {
        super(id, name, surname, email, avatar);
        this._name = name;
        this._surname = surname;
        this._email = email;
        this._avatar = avatar;
        this._token = token;
        this._role = role;
        this._address = address;
        this._company = company;
        this._departments = departments;
        this._availability = availability;
        this._validUntil = validUntil;
        this._exposedFields = ['id', 'name', 'surname', 'email', 'avatar', 'token', 'role', 'address', 'company', 'departments', 'availability', 'validUntil', 'connectionId'];
        this._securedFields = ['token'];
    }

    get name() {
        return this._name;
    }

    get surname() {
        return this._surname;
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

    get address() {
        return this._address;
    }

    get company() {
        return this._company;
    }

    get departments() {
        return this._departments;
    }

    get availability() {
        return this._availability;
    }

    get validUntil() {
        return this._validUntil;
    }

    isValid() {
        return this.validUntil === null || (new Date(this.validUntil)).getTime() > (new Date()).getTime();
    }

    static createGuest() {
        return new User(uuidv4(), 'Gość', null, null, null, null, Roles.GUEST, null, null, [], [], null);
    }

    static _createEmpty() {
        return User.createGuest();
    }
}

export default User;
