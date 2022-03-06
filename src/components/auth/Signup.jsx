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
          <input
            onChange={this.handleChange}
            type="text"
            name="firstName"
            placeholder="First Name"
            value={firstName}
          /><br/><br/>
          <input
            onChange={this.handleChange}
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
          /><br/><br/>
          <input
            onChange={this.handleChange}
            type="text"
            name="email"
            placeholder="Email"
            value={email}
          /><br/><br/>
          <input
            onChange={this.handleChange}
            type="text"
            name="username"
            placeholder="Username"
            value={username}
          /><br/><br/>
          <input
            onChange={this.handleChange}
            type="text"
            name="password"
            placeholder="Password"
            value={password}
          /><br/><br/>
          <button className="root-submit" type="submit">Submit</button>
        </form>
        </div>
      </div>
    );
  }
}
export default Signup;
