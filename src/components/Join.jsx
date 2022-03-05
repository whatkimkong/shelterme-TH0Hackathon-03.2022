import React, { Component } from "react";
import { NavLink } from "react-router-dom";
//
import "./root.css";
//
import title from "./img/Join.png";

export class Join extends Component {
  render() {
    const {user} = this.props;
    return (
      <div>
        <img src={title} alt="title" className="root-title" />

        <div className="root-text">
          <div>
            <h5>
              Help us help each other :) 
            </h5>
          </div>
          { !user && (
          <div className="root-button-container">
            <NavLink className="root-submit" to="/signup">
              Sign me up!
            </NavLink>
          </div>
          )}
        </div>
      </div>
    );
  }
}

export default Join;
