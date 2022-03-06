import React, { Component } from "react";
import { NavLink } from "react-router-dom";
//
import "./root.css";
//

export class Donate extends Component {
  state = {
    nameOnCard: "",
    holder: "",
    identificationDocument: "",
    shelfLife: "",
    CVV: "",
    value: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    /* const { firstName, lastName, email, username, password } = this.state;

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
      */
      this.props.history.push(`/`) // wont be working yet
    
  };

  render() {
    const {user} = this.props;
    const {nameOnCard, holder, identificationDocument, shelfLife, CVV, value} = this.state;
    return (
      <div>
        <div className="root-text">
          <div>
            <h1 style={{marginTop: "-15px"}} className="root-title">ShelterME</h1>
            <form>
            <label>Name on card</label>
            <br />
            <input
              onChange={this.handleChange}
              type="text"
              name="nameOnCard"
              value={nameOnCard}
            />
             <label>Holder</label>
            <br />
            <input
              onChange={this.handleChange}
              type="text"
              name="holder"
              value={holder}
            />
             <label>Identification document</label>
            <br />
            <input
              onChange={this.handleChange}
              type="text"
              name="identificationDocument"
              value={identificationDocument}
            />
             <label>Shelf Life</label>
            <br />
            <input
              onChange={this.handleChange}
              type="text"
              name="shelfLife"
              value={shelfLife}
            />
             <label>CVV</label>
            <br />
            <input
              onChange={this.handleChange}
              type="text"
              name="CVV"
              value={CVV}
            />
             <label>Value</label>
            <br />
            <input
              onChange={this.handleChange}
              type="text"
              name="value"
              value={value}
              /><br/>
              <button className="root-submit" style={{marginTop: "20px", marginBottom: "-40vh"}}>Donate!</button>
             </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Donate;
