// THIS url will be - howdiy/:id
import React, { Component, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import recipeService from '../services/recipe-services';
import axios from "axios";
import "./Shelter.css";
import "../root.css";
import howdiyHat from "../img/cowboyHat.png";

export class Shelter extends Component {
  state = {
    funName: null,
    descriptiveName: null,
    ingredients: [],
    preparation: [],
    productImg: null,
    isGiftable: false,
    gallery: [],
    timeOfPreparation: 0, // specify mins in form
    costRating: 0, // TIP on how to calculate in form
    difficultyRating: 0,
    createdBy: null,
    isLoadingHowdiy: true,
    isLoadingComments: true,
    input: "",
    commentList: null,
    name: "",
    quantity: "",
    measure: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleCommentSubmit = (event) => {
    event.preventDefault();
    const { input, commentList } = this.state;
    axios
      .post(
        `${process.env.REACT_APP_API_HOST}/comments/create/${this.props.match.params.id}`,
        { input },
        { withCredentials: true }
      )
      .then((response) => {
        const addedComment = { ...response.data };
        addedComment.createdBy = { ...this.props.user }; // this is replacing that key with another
        // replace the createdBy key with this.props.user within the response.data object
        console.log(addedComment);
        const newCommentList = [...commentList, addedComment];
        this.setState({ commentList: newCommentList });
      })
      .catch(() => this.props.history.push("/500"));
  };

  handleDeleteComment = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_HOST}/comments/delete/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        //find the element in the state manually and remove it
        const newCommentList = this.state.commentList.filter((eachComment) => {
          return eachComment._id !== id;
        });
        this.setState({ commentList: newCommentList });
      })
      .catch((err) => {
        console.log(err.response.status); // => the error message status code
        if (err.response.status === 403) {
          this.props.history.push("/login");
        }
      });
  };

  componentDidMount() {
    // how to destructure properly?
    axios
      .get(
        `${process.env.REACT_APP_API_HOST}/recipes/howdiy/${this.props.match.params.id}`,
        { withCredentials: true }
      )
      .then((response) => {
        const {
          funName,
          descriptiveName,
          ingredients,
          preparation,
          productImg,
          isGiftable,
          gallery,
          timeOfPreparation,
          costRating,
          difficultyRating,
          createdBy,
        } = response.data;
        this.setState({
          funName,
          descriptiveName,
          ingredients,
          preparation,
          productImg,
          isGiftable,
          gallery,
          timeOfPreparation,
          costRating,
          difficultyRating,
          createdBy,
          isLoadingHowdiy: false,
        });
      })
      .catch((err) => {
        this.props.history.push("/500");
      });
    axios
      .get(
        `${process.env.REACT_APP_API_HOST}/comments/all/${this.props.match.params.id}`,
        { withCredentials: true }
      )
      .then((response) => {
        this.setState({ commentList: response.data, isLoadingComments: false });
      })
      .catch((err) => {
        this.props.history.push("/500");
      });
  }

  render() {
    const {
      funName,
      descriptiveName,
      ingredients,
      preparation,
      productImg,
      isGiftable,
      gallery,
      timeOfPreparation,
      costRating,
      difficultyRating,
      createdBy,
      isLoadingHowdiy,
      isLoadingComments,
      input,
      commentList,
    } = this.state;
    const { user } = this.props;
    const emptyStar = "☆";
    const fullStar = "★";
    return (
      <>
        {isLoadingHowdiy && <h1>...isLoading!</h1>}
        {!isLoadingHowdiy && (
          <React.Fragment>
            <Container className="howdiy-container">
              <Row className="howdiy-view">
                {/* <Col sm={8}> */}
                <div className="howdiy-view-child">
                  <img
                    className="howdiy-view-img"
                    src={productImg}
                    alt="productImage"
                  />
                  <div className="howdiy-view-text">
                    <h4>{funName}</h4>
                    <h5>{descriptiveName}</h5>
                    <h5>
                      {" "}
                      is Giftable: {isGiftable ? "Yes!" : "Possibly Not"}
                    </h5>
                    <hr></hr>
                    <p>Created by: {createdBy.username}</p>
                  </div>
                </div>
                {/* </Col> */}
                <Col sm={4}>
                  <div className="howdiy-view-text">
                    <h6>
                      {" "}
                      Cost Rating:{" "}
                      {fullStar.repeat(Math.round(costRating)) +
                        emptyStar.repeat(3 - Math.round(costRating))}
                    </h6>
                    <h6>
                      {" "}
                      Difficulty Rating:{" "}
                      {fullStar.repeat(Math.round(difficultyRating)) +
                        emptyStar.repeat(3 - Math.round(difficultyRating))}
                    </h6>
                    <h6>
                      {" "}
                      Time Intensity:{" "}
                      {fullStar.repeat(Math.round(timeOfPreparation)) +
                        emptyStar.repeat(3 - Math.round(timeOfPreparation))}
                    </h6>
                  </div>
                </Col>
              </Row>
              <Row className="howdiy-view">
                <Col sm={4}>
                  <div className="howdiy-view-child">
                    <div>
                      <h5>Ingredients:</h5>
                      <ul className="accordion-list">
                        <br />
                        {ingredients.map((eachIngredient) => {
                          return (
                            <React.Fragment
                              key={
                                eachIngredient.name + eachIngredient.quantity
                              }
                            >
                              <li className="accordion-list-item">
                                {eachIngredient.name} &emsp;{" "}
                                {eachIngredient.quantity}
                                &emsp; {eachIngredient.measure} &emsp;
                              </li>
                            </React.Fragment>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </Col>
                <Col sm={8}>
                  <div className="howdiy-view-child">
                    <div className="howdiy-view-text">
                      <h5>Preparation:</h5>
                      <ul className="accordion-list">
                        <br />
                        {preparation.map((eachStep) => {
                          return (
                            <React.Fragment
                              key={eachStep.step + eachStep.description}
                            >
                              <li> Step {eachStep.step} </li>
                              <li>{eachStep.description}</li>
                              <br />
                            </React.Fragment>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </React.Fragment>
        )}
        <h2 className="profileSection">
          <img src={howdiyHat} alt="navbarimg" width="55" height="25" />
          <img src={howdiyHat} alt="navbarimg" width="70" height="35" />
        </h2>
        <div className="comment-section">
          <form onSubmit={this.handleCommentSubmit}>
            <input
              onChange={this.handleChange}
              placeholder="write here..."
              type="text"
              name="input"
              value={input}
            />
            <button className="accordion-submit" type="submit">
              Add a comment
            </button>
          </form>
        </div>

        {isLoadingComments && <h1>...isLoading!</h1>}
        {!isLoadingComments &&
          commentList.map((eachComment) => {
            return (
              <div className="comment-message comment-section">
                <p>
                  {eachComment.input} <br/>
                  Commented by: {eachComment.createdBy.username}
                  <br />
                  {eachComment.createdAt.slice(0,10)} at {eachComment.createdAt.slice(11,16)}
                </p>
                {user && eachComment.createdBy._id === user._id && (
                  <button
                    className="button-link"
                    onClick={() => {
                      this.handleDeleteComment(eachComment._id);
                    }}
                  >
                    Delete
                  </button>
                )}
                <hr></hr>
              </div>
            );
          })}
      </>
    );
  }
}

export default Shelter;

/* 

DRAWING BOARD:: 

  handleIngredientSubmit = (event) => {
    event.preventDefault();
    const { name, quantity, measure, ingredients } = this.state;
    const newIngredientAdded = [...ingredients, { name, quantity, measure }];

    // we need to see the changes both in the STATE and the BE

    // BE route needs id of the recipe/:id/addIngredient :id params .post
    // push req.body into ingredients array

    // FE - push those 3 things into the BE route
    axios
      .post(
        `${process.env.REACT_APP_API_HOST}/recipes/${this.props.match.params.id}/addIngredient`,
        { name, quantity, measure },
        { withCredentials: true }
      )
      .then(() => {
        this.setState({ ingredients: newIngredientAdded, name: "" , quantity: "", measure: ""})
      })
      .catch(() => this.props.history.push("/500"));
  }

  <form onSubmit={this.handleIngredientSubmit}>
              <input
                onChange={this.handleChange}
                placeholder="Your ingredient here"
                type="text"
                name="name"
                value={name}
              />
              <input
                onChange={this.handleChange}
                placeholder="Its quantity here"
                type="text"
                name="quantity"
                value={quantity}
              />
              <input
                onChange={this.handleChange}
                placeholder="Unit of measure"
                type="text"
                name="measure"
                value={measure}
              />
              <button type="submit">Add</button>
            </form>

COMMENTS:

will it have all the inputs and all the info in the commentList?
remember to use handleCommentSubmit in the form for comment creation
then in the render section below the create form:

*/
