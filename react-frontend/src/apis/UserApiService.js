import Axios from "axios";

const API_URL = "http://localhost:7777/user/v1"; //spring boot back-end url

class UserApiService {
  joinUser(user) {
    return Axios.post(API_URL + "/join", user);
  }
  loginOk(user) {
    return Axios.post(API_URL + "/login", user);
  }
  logoutOK() {
    return Axios.get(API_URL + "/logout");
  }
}

export default new UserApiService();
