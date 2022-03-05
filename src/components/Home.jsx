import React, { Component } from "react";
import { NavLink } from "react-router-dom";
//
import "./root.css";
//
import title from "./img/howdiyGreen.png";

export class Home extends Component {
  render() {
    const {user} = this.props;
    return (
      <div>
        <img src={title} alt="title" className="root-title" />

        <div className="root-text">
          <h3>Shelterme</h3>
          <h5>
            Helping you find the shelter that is needed and MORE!!
          </h5>
          
          { !user && (
            <div className="root-button-container">
            <NavLink className="root-submit" to="/signup">
              Sign me up!
            </NavLink>
          </div>
          )}
          <div className="root-button-container">
            <NavLink className="root-submit" to="/join">
              find out more...
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
