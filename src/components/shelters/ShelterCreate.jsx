// this URL will be "/howdiy/create"
import axios from "axios";
import React, { Component, Fragment } from "react";
import AddIngredients from "./AddIngredient/AddIngredients";
import generateName from "sillyname";
import { Accordion } from "react-bootstrap";
//
import "./Shelter.css";

class ShelterCreate extends Component {
  state = {
    funName: "",
    categoryList: [
      "facecare",
      "bodycare",
      "housecare",
      "play",
      "food",
      "drink",
    ],
    category: "",
    descriptiveName: "",
    ingredients: [],
    preparation: [],
    step: 0,
    description: "",
    productImg: "",
    isGiftable: true,
    gallery: [],
    galleryImg: "",
    timeOfPreparation: 0, // specify mins in form
    costRating: 0, // TIP on how to calculate in form
    difficultyRating: 0,
    imageUrl: "",
  };

  componentDidMount() {
    let funName = generateName();
    this.setState({ funName });
  }

  handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    this.setState({ [name]: type === "checkbox" ? checked : value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      category,
      descriptiveName,
      ingredients,
      preparation,
      imageUrl,
      isGiftable,
      gallery,
      timeOfPreparation,
      costRating,
      difficultyRating,
      createdBy,
    } = this.state;
    const funName = generateName();
    axios
      .post(
        `${process.env.REACT_APP_API_HOST}/recipes/create`,
        {
          category,
          funName,
          descriptiveName,
          ingredients,
          preparation,
          productImg: imageUrl,
          isGiftable,
          gallery,
          timeOfPreparation,
          costRating,
          difficultyRating,
          createdBy,
        },
        { withCredentials: true }
      )
      .then(() => this.props.history.push("/"))
      .catch(() => this.props.history.push("/500"));
  }; // this.setState({ categories: response.data, isLoading: false });

  handleAddIngredient = (ingredientObj) => {
    const { ingredients } = this.state;
    const newIngredients = [...ingredients, ingredientObj];
    this.setState({ ingredients: newIngredients });
  };

  handleDeleteIngredient = (id) => {
    axios
      .delete(
        `${process.env.REACT_APP_API_HOST}/recipes/ingredients/delete/${id}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        //find the element in the state manually and remove it
        const newIngredients = this.state.commentList.filter(
          (eachIngredient) => {
            return eachIngredient._id !== id;
          }
        );
        this.setState({ ingredients: newIngredients });
      })
      .catch((err) => {
        // => the error message status code
        if (err.response.status === 403) {
          this.props.history.push("/login");
        }
      });
  };

  handlePreparationSubmit = (event) => {
    event.preventDefault();
    const { description, preparation } = this.state;
    const newStep = preparation.length + 1;
    this.setState({ step: newStep });
    const newPreparationAdded = [
      ...preparation,
      { step: newStep, description },
    ];
    this.setState({ preparation: newPreparationAdded });
    this.setState({
      description: "",
    });
  };

  handleDeletePreparation = (id) => {
    axios
      .delete(
        `${process.env.REACT_APP_API_HOST}/recipes/preparation/delete/${id}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        //find the element in the state manually and remove it
        const newPreparation = this.state.preparation.filter((eachStep) => {
          return eachStep._id !== id;
        });
        this.setState({ preparation: newPreparation });
      })
      .catch((err) => {
        // => the error message status code
        if (err.response.status === 403) {
          this.props.history.push("/login");
        }
      });
  };

  handleImageUpload = (event) => {
    // console.log(event.target.files[0]);
    this.setState({ imageIsUploading: true });

    const uploadData = new FormData();
    uploadData.append("imageUrl", event.target.files[0]); // only one that has to be imageUrl

    axios
      .post(`${process.env.REACT_APP_API_HOST}/upload`, uploadData)
      .then((result) => {
        // console.log(result.data);
        this.setState({
          imageUrl: result.data.imagePath,
        });
      })
      .catch(() => this.props.history.push("/500"));
  };

  handleGallerySubmit = (event) => {
    event.preventDefault();
    const { gallery } = this.state;
    const galleryImg = event.body;
    const newGallery = [...gallery, galleryImg];
    this.setState({ gallery: newGallery });
  };

  render() {
    const {
      funName,
      descriptiveName,
      preparation,
      isGiftable,
      gallery,
      galleryImg,
      timeOfPreparation,
      costRating,
      difficultyRating,
      description,
      ingredients,
      imageUrl,
    } = this.state;

    return (
      <div className="accordion-bg">
        <Accordion defaultActiveKey="0">
          <Accordion.Item className="accordion-inside" eventKey="0">
            <Accordion.Header>Part One</Accordion.Header>
            <Accordion.Body className="accordion-inside">
              <form className="accordion-form" onSubmit={this.handleSubmit}>
                <label className="accordion-text" htmlFor="category">
                  Category
                </label>
                <select
                  onChange={this.handleChange}
                  name="category"
                  id="category-select"
                  required
                >
                  <option value="">
                    Please select the category of your product
                  </option>
                  <option value="facecare">Facecare</option>
                  <option value="bodycare">Bodycare</option>
                  <option value="housecare">Housecare</option>
                  <option value="play">Play</option>
                  <option value="food">Food</option>
                  <option value="drink">Drink</option>
                </select>
                <br />
                <label className="accordion-text" htmlFor="descriptiveName">
                  Choose a title, please describe your product as clearly as
                  possible:
                </label>
                <input
                  onChange={this.handleChange}
                  placeholder="6 words maximum"
                  type="text"
                  name="descriptiveName"
                  value={descriptiveName}
                />
                <br />
                <br />
                <label className="accordion-link" htmlFor="funName">
                  Fun Name
                </label>
                <input value={funName} readonly />
                <br />
                <label className="accordion-text" htmlFor="imageUrl">
                  Display Image for your Product:
                </label>
                {imageUrl && (
                  <>
                    <img
                      className="accordion-img"
                      htmlFor="imageUrl"
                      src={imageUrl}
                      alt="productImg"
                    />
                    <br />
                  </>
                )}
                <input
                  className="accordion-link"
                  onChange={this.handleImageUpload}
                  type="file"
                />

                <label htmlFor="isGiftable">
                  Is it Giftable?
                  <input
                    onChange={this.handleChange}
                    type="checkbox"
                    name="isGiftable"
                    checked={isGiftable}
                  />
                </label>
                <br />
                <br />
                <p className="accordion-link">
                  For the below, please choose a number between 1-3, 1 being
                  lowest, 3 being highest
                </p>
                <label htmlFor="timeOfPreparation">
                  Rate how time consuming the Howdiy is:
                </label>
                <input
                  onChange={this.handleChange}
                  type="number"
                  max={3}
                  min={1}
                  name="timeOfPreparation"
                  value={timeOfPreparation}
                />
                <label htmlFor="costRating">
                  Rate how cost intense the Howdiy is
                </label>
                <input
                  onChange={this.handleChange}
                  type="number"
                  max={3}
                  min={1}
                  name="costRating"
                  value={costRating}
                />
                <label htmlFor="difficultyRating">
                  Rate how difficult the Howdiy is
                </label>
                <input
                  onChange={this.handleChange}
                  max={3}
                  min={1}
                  type="number"
                  name="difficultyRating"
                  value={difficultyRating}
                />
                <br />
                <br />
                <label className="accordion-link" htmlFor="create-info">
                  If you would like to add Part Two and/or Three please do that
                  before Submitting here:
                </label>
                <button className="accordion-submit" type="submit">
                  Create your Howdiy
                </button>
              </form>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item className="accordion-inside" eventKey="1">
            <Accordion.Header>
              Part Two <p className="accordion-title-info">(now or later)</p>
            </Accordion.Header>
            <Accordion.Body className="accordion-inside">
              <label htmlFor="ingredientsTable">
                Here are your ingredients:
              </label>
              <ul className="accordion-list">
                <br />
                {ingredients.map((eachIngredient) => {
                  return (
                    <React.Fragment
                      key={eachIngredient.name + eachIngredient.quantity}
                    >
                      <li className="accordion-list-item">
                        {eachIngredient.name} &emsp; {eachIngredient.quantity}
                        &emsp; {eachIngredient.measure} &emsp;
                        {
                          <button
                            className="accordion-link"
                            onClick={() => {
                              this.handleDeleteIngredient(eachIngredient._id);
                            }}
                          >
                            Delete
                          </button>
                        }
                      </li>
                    </React.Fragment>
                  );
                })}
              </ul>
              <AddIngredients handleAddIngredient={this.handleAddIngredient} />
              <br />
              <label htmlFor="preparationTable">
                Here are your Preparation Steps:
              </label>
              <ul className="accordion-list">
                <br />
                {preparation.map((eachStep) => {
                  return (
                    <React.Fragment key={eachStep.step + eachStep.description}>
                      <li> Step {eachStep.step} </li>
                      <li>
                        {eachStep.description}{" "}
                        <button
                          className="accordion-link"
                          onClick={() => {
                            this.handleDeletePreparation(eachStep._id);
                          }}
                        >
                          Delete
                        </button>
                      </li>
                      <br />
                    </React.Fragment>
                  );
                })}
              </ul>
              <form onSubmit={this.handlePreparationSubmit}>
                <textarea
                  onChange={this.handleChange}
                  placeholder="Please explain this step here ... "
                  type="text"
                  name="description"
                  value={description}
                />
                <br />
                <button className="accordion-submit" type="submit">
                  Add a Preparation Step
                </button>
              </form>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item className="accordion-inside" eventKey="2">
            <Accordion.Header>
              Part Three <p className="accordion-title-info">(now or later)</p>
            </Accordion.Header>
            <Accordion.Body className="accordion-inside">
              <label htmlFor="galleryTable">Here is your Gallery:</label>
              <ul>
                {gallery.length >= 1 &&
                  gallery.map((eachImg) => {
                    return (
                      <>
                        <li key={eachImg}>
                          <img
                            className="accordion-img"
                            src={eachImg}
                            alt="galleryImg"
                          />
                        </li>
                      </>
                    );
                  })}
              </ul>
              <form onSubmit={this.handleGallerySubmit}>
                <input
                  className="accordion-link"
                  onChange={this.handleImageUpload}
                  type="file"
                  name={galleryImg}
                />
                <button className="accordion-submit" type="submit">
                  Add a Photo to your Gallery
                </button>
              </form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    );
  }
}

// hardcoded is okay but otherwise loop with a map

/* 
updateUser = (user) => { 
    recipeService
      .getUser(user)
      .then((response) => {
        this.setState({ createdBy: response.data, isLoading: false });
      })
      .catch((err) => {
        this.props.history.push("/500");
      });

 // in recipeService - contacting the BE uses the route recipe.routes.js
  getUser = (user) => {
    return this.service.get('/user');
  };

  TRIED BUT DID NOT NEED:
// import recipeService from "../services/recipe-services";
// let generateName = require("sillyname");
} */

export default ShelterCreate;
