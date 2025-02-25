export class UserDataSave {
  id: number;
  login: string;
  photo: string | null;
  lastConnection: string;

  constructor(
    id: number,
    login: string,
    photo: string | null,
    lastConnection: string,
  ) {
    this.id = id;
    this.login = login;
    this.photo = photo;
    this.lastConnection = lastConnection;
  }

  setUser() {
    localStorage.setItem('id', this.id.toString());
    localStorage.setItem('login', this.login);
    localStorage.setItem('photo', this.photo || '');
    localStorage.setItem('lastConnection', this.lastConnection);
  }

  getUser() {
    return {
      id: parseInt(localStorage.getItem('id') || '0'),
      login: localStorage.getItem('login') || '',
      photo: localStorage.getItem('photo') || '',
      lastConnection: localStorage.getItem('lastConnection') || '',
    };
  }

  setLocation() {}

  getLocation() {}

  deleteLocation() {
    localStorage.removeItem('region');
    localStorage.removeItem('county');
    localStorage.removeItem('town');
  }
}
