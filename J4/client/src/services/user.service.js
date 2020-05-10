import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8800/user/';

class UserService {

  // getUserBoard() {
  //   return axios.get(API_URL + 'user', { headers: authHeader() });
  // }

  getAllUsers() {
    return axios.get(API_URL);
  }

  getUserLogin(login) {
    return axios.get(API_URL + login);
  }
}

export default new UserService();