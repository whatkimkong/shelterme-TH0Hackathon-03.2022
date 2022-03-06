import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
//
import "./Categories.css";
//
import mindLogo from "./img/mind.png";
import bodyLogo from "./img/body.png";

export class Categories extends Component {
  state = {
    categories: ["Body", "Mind"],
  };

  render() {
    const { categories } = this.state;
    return (
      <div>
        <h1 className="root-title">ShelterME</h1>
        <div className="list-container">
          <Container>
            <Row className="justify-content-md-center">
              {categories.map((eachCategory) => {
                return (
                  <Col xs lg="4" key={eachCategory}>
                    <NavLink className="category-btn"
                      to={`/facecare/howdiy`}
                    >
                      {eachCategory.toLowerCase() === "mind" && (
                        <img
                          src={mindLogo}
                          alt="faceLogo"
                          className="icon-img-styles"
                        />
                      )}
                      {eachCategory.toLowerCase() === "body" && (
                        <img
                          src={bodyLogo}
                          alt="bodyLogo"
                          className="icon-img-styles"
                        />
                      )}
                      {eachCategory}
                    </NavLink>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Categories;
