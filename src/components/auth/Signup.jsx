import React, { Component } from "react";
import authService from "../services/auth-services";
//
import '../root.css';
//
//no axios needed here as Services/Auth-services is the master and does all the work

class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { firstName, lastName, email, username, password } = this.state;

    authService
      .signup(firstName, lastName, email, username, password)
      .then((response) => {
        this.setState({
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          password: "",
        });
        this.props.setUser(response.data, true);
        this.props.history.push(`/profile`)
      });
  };

  render() {
    const { firstName, lastName, email, username, password } = this.state;
    return (
      <div>
        <h1 className="root-title">ShelterME</h1>
        <div className="root-text">
        <form onSubmit={this.handleSubmit}>
          <label>First Name:</label>
          <br/>
          <input
            onChange={this.handleChange}
            type="text"
            name="firstName"
            value={firstName}
          />
          <label>Last Name</label>
          <br/>
          <input
            onChange={this.handleChange}
            type="text"
            name="lastName"
            value={lastName}
          />
          <label>Email</label>
          <br/>
          <input
            onChange={this.handleChange}
            type="text"
            name="email"
            value={email}
          />
          <label>Username</label>
          <br/>
          <input
            onChange={this.handleChange}
            type="text"
            name="username"
            value={username}
          />
          <label>Password</label>
          <br/>
          <input
            onChange={this.handleChange}
            type="text"
            name="password"
            value={password}
          /><br/><br/>
          <button className="root-submit" type="submit">Sign Up</button>
        </form>
        </div>
      </div>
    );
  }
}
export default Signup;
