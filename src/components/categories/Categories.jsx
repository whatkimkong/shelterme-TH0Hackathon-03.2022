import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import title from "./img/categoriesTitle.png";
import { Container, Row, Col } from "react-bootstrap";
//
import "./Categories.css";
//
import faceLogo from "./img/Face-icon.png";
import bodyLogo from "./img/Body-icon.png";
import houseLogo from "./img/House-icon.png";
import playLogo from "./img/Play-icon.png";
import foodLogo from "./img/Food-icon.png";
import drinkLogo from "./img/Drink-icon.png";

export class Categories extends Component {
  state = {
    categories: ["Facecare", "Bodycare", "Housecare", "Play", "Food", "Drink"],
  };

  render() {
    const { categories } = this.state;
    return (
      <div>
        <img src={title} alt="title" className="title" />
        <div className="list-container">
          <Container>
            <Row className="justify-content-md-center">
              {categories.map((eachCategory) => {
                return (
                  <Col xs lg="4" key={eachCategory}>
                    <NavLink className="category-btn"
                      to={`/${eachCategory.toLowerCase()}/howdiy`}
                    >
                      {eachCategory.toLowerCase() === "facecare" && (
                        <img
                          src={faceLogo}
                          alt="faceLogo"
                          className="icon-img-styles"
                        />
                      )}
                      {eachCategory.toLowerCase() === "bodycare" && (
                        <img
                          src={bodyLogo}
                          alt="bodyLogo"
                          className="icon-img-styles"
                        />
                      )}
                      {eachCategory.toLowerCase() === "housecare" && (
                        <img
                          src={houseLogo}
                          alt="houseLogo"
                          className="icon-img-styles"
                        />
                      )}
                      {eachCategory.toLowerCase() === "play" && (
                        <img
                          src={playLogo}
                          alt="playLogo"
                          className="icon-img-styles"
                        />
                      )}
                      {eachCategory.toLowerCase() === "food" && (
                        <img
                          src={foodLogo}
                          alt="foodLogo"
                          className="icon-img-styles"
                        />
                      )}
                      {eachCategory.toLowerCase() === "drink" && (
                        <img
                          src={drinkLogo}
                          alt="drinkLogo"
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


 /*
 TRIALS:
    componentDidMount() {
    recipeService.getCategories
      .then((response) => {
        this.setState({ categories: response.data, isLoading: false });
      })
      .catch((err) => {
        this.props.history.push("/500");
      });
  }  
  
  -- in the list display we would need after render -- const { category } = this.props.match.params; from the /:category/howdiy URL

  -- for each --> NavLink with the category to="/:category/howdiy" (this will be the list of that category)
  */

