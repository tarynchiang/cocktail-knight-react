import axios from "axios";

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true,
    });

    this.service = service;
  }

  signup = (username, password) =>
    this.service.post("/signup", { username: username, password: password });

  login = (username, password) =>
    this.service.post("/login", { username, password });

  currentUser = () => {
    return this.service
      .get("/getcurrentuser")
      .then((response) => response.data);
  };

  logout = () => {
    return this.service.post("/logout", {}).then((response) => response.data);
  };
}

export default AuthService;
