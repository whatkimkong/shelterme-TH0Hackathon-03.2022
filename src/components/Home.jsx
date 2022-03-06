import React, { Component } from "react";
import { NavLink } from "react-router-dom";
//
import "./root.css";
//
import title from "./img/Shelter.png";

export class Home extends Component {
  render() {
    const {user} = this.props;
    return (
      <div>
        <img src={title} alt="title" className="root-title" style={{width: "50vw", marginLeft: "20vw"}}/>

        <div className="root-text">
         
          <h5>For Body AND Mind</h5>
          <h5>Enabling the future</h5>
          <br/>
          
          { !user && (
            <div className="root-button-container">
            <NavLink className="root-submit" to="/signup">
              Sign me up!
            </NavLink>
          </div>
          )}
          <br/>
          <div className="root-button-container">
            <NavLink className="root-submit" to="/join">
              FAQ
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
