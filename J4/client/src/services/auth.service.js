import axios from "axios";

const API_URL = "http://localhost:8800/auth/";

class AuthService {
  login(login, password) {
    return axios
      .post(API_URL + "login", {
        login,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(login, email, password, confirmpw) {
    return axios.post(API_URL + "register", {
      login,
      email,
      password,
      confirmpw
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();