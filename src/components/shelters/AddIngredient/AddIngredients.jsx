import React, { Component } from "react";
//
import '../Shelter.css';

class AddIngredients extends Component {
  state = {
    name: "",
    quantity: 0,
    measure: "",
  };

  handleChange = ({ target: { name, value } }) => {
    //   console.log(name, value);
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, quantity, measure } = this.state;
    const ingredientObj = {
      name,
      quantity,
      measure,
    };
    this.props.handleAddIngredient(ingredientObj);

    this.setState({
      name: "",
      quantity: 0,
      measure: "",
    });
  };

  render() {
    const { name, quantity, measure } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input className="ingredients-item"
            onChange={this.handleChange}
            type="text"
            name="name"
            value={name}
          ></input>
          <br />

          <label htmlFor="quantity">Quantity</label>
          <input className="ingredients-item"
            onChange={this.handleChange}
            type="number"
            name="quantity"
            value={quantity}
          ></input>
          <br />

          <label htmlFor="measure">Details</label>
          <input className="ingredients-item"
            onChange={this.handleChange}
            type="text"
            name="measure"
            value={measure}
          ></input>
          <br />
          <button className="accordion-submit"> Add Extra Offer</button>
        </form>
      </div>
    );
  }
}
export default AddIngredients;
