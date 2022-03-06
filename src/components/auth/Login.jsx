import React, { Component } from "react";
import authService from "../services/auth-services";
//
import "../root.css";
//
class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    authService.login(email, password).then((response) => {
      this.setState({ email: "", password: "" });
      this.props.setUser(response.data, true);
      this.props.history.push(`/`)
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h1 className="root-title">ShelterME</h1>
        <div className="root-text">
          <form onSubmit={this.handleSubmit}>
            <label>Email:</label>
            <br />
            <input
              onChange={this.handleChange}
              type="text"
              name="email"
              value={email}
            />
            <br />
            <br />
            <label>Password:</label>
            <br />
            <input
              onChange={this.handleChange}
              type="password"
              name="password"
              value={password}
            />
            <br />
            <br />
            <button className="root-submit" type="submit">
              Log in
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
