// this URL will be "/howdiy/:id/edit"
import axios from "axios";
import React, { Component } from "react";
import { Accordion } from "react-bootstrap";
import AddIngredients from "./AddIngredient/AddIngredients";
//
import "./Shelter.css";

class ShelterEdit extends Component {
  state = {
    categoryList: [
      "facecare",
      "bodycare",
      "housecare",
      "play",
      "food",
      "drink",
    ],
    category: "",
    funName: "",
    descriptiveName: "",
    ingredients: [
      {
        name: "",
        quantity: "",
      },
    ],
    preparation: [],
    productImg: "",
    galleryImg: "",
    isGiftable: false,
    gallery: [],
    timeOfPreparation: 0, // specify mins in form
    costRating: 0, // TIP on how to calculate in form
    difficultyRating: 0,
    isLoadingHowdiy: true,
    step: "",
    description: "",
  };

  handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    this.setState({ [name]: type === "checkbox" ? checked : value });
  };

  handlePartOneSubmit = (event) => {
    event.preventDefault();
    const {
      category,
      descriptiveName,
      ingredients,
      preparation,
      productImg,
      isGiftable,
      gallery,
      timeOfPreparation,
      costRating,
      difficultyRating,
    } = this.state;
    axios
      .patch(
        `${process.env.REACT_APP_API_HOST}/recipes/edit/${this.props.match.params.id}`,
        {
          category,
          descriptiveName,
          ingredients,
          preparation,
          productImg,
          isGiftable,
          gallery,
          timeOfPreparation,
          costRating,
          difficultyRating,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response, "this is the axios post in edit page");
        this.props.history.push("/");
      })
      .catch(() => this.props.history.push("/500"));
  }; // this.setState({ categories: response.data, isLoading: false });

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_API_HOST}/recipes/edit/${this.props.match.params.id}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data, "this is the axios get in the edit page");
        const {
          category,
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
        } = response.data;
        this.setState({
          category,
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
          isLoadingHowdiy: false,
        });
      })
      .catch((err) => {
        console.log("error in the edit - axios get");
      });
  }

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
          productImg: result.data.imagePath,
        });
      })
      .catch(() => this.props.history.push("/500"));
  };


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

  handleGallerySubmit = (event) => {
    event.preventDefault();
    const { gallery } = this.state;
    const galleryImg = event.body;
    const newGallery = [...gallery, galleryImg];
    this.setState({ gallery: newGallery });
  };

  render() {
    const {
      category, // does it go in the label maybe?
      descriptiveName,
      ingredients,
      preparation,
      productImg,
      galleryImg,
      isGiftable,
      gallery,
      timeOfPreparation,
      costRating,
      difficultyRating,
      description,
    } = this.state;

    return (
      <div className="accordion-bg">
        <Accordion defaultActiveKey="0">
          <Accordion.Item className="accordion-inside" eventKey="0">
            <Accordion.Header>Part One</Accordion.Header>
            <Accordion.Body className="accordion-inside">
              <form className="accordion-form" onSubmit={this.handlePartOneSubmit}>
                <label className="accordion-text" htmlFor="category">
                  Change to:{" "}
                </label>
                <select name="category" id="category-select">
                  <option value="facecare">Facecare</option>
                  <option value="bodycare">Bodycare</option>
                  <option value="housecare">Housecare</option>
                  <option value="play">Play</option>
                  <option value="food">Food</option>
                  <option value="drink">Drink</option>
                </select>
                <label className="accordion-text" htmlFor="category-previous">
                  Previously: {category}
                </label>
                <br />
                <label className="accordion-text" htmlFor="title">
                Choose a title, please describe your product as clearly as
                  possible:
                </label>
                <input
                  onChange={this.handleChange}
                  type="text"
                  name="descriptiveName"
                  value={descriptiveName}
                />
                <br />
                <br />
                <label className="accordion-text" htmlFor="imageUrl">
                  Display Image for your Product:
                </label>
                {productImg && (
                  <>
                    <img
                      className="accordion-img"
                      htmlFor="productImg"
                      src={productImg}
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
                <button className="accordion-submit" type="submit">Edit your Howdiy</button>
              </form>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item className="accordion-inside" eventKey="1">
            <Accordion.Header>
              Part Two
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
                        {eachStep.description}
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
              Part Three <p className="accordion-title-info">(optional)</p>
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

export default ShelterEdit;

// {`${category[0].toUpperCase()}${category.slice(1)}`}