import axios from "axios";

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_HOST}/auth`,
      withCredentials: true,
    });
  }

  signup = (firstName, lastName, email, username, password) => {
    return this.service.post("/signup", {
      firstName,
      lastName,
      email,
      username,
      password,
    });
  };

  login = (email, password) => {
    return this.service.post("/login", { email, password });
  };

  logout = () => {
    return this.service.post("/logout");
  };

  loggedin = () => {
    return this.service.get("/loggedin");
  };
}

const authService = new AuthService();
export default authService;
