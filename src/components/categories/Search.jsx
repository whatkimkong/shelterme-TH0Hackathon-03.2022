import React, { Component } from "react";

class Search extends Component {
  state = {
    search: "",
  };
  handleChange = ({ target: { name, value } }) => {
    console.log(name)
    this.setState({ [name]: value });
    this.props.handleFilter(value);
  };
  
  render() {
    const { search } = this.state;

    return (
      <div>
          <label htmlFor="search">
          <input
            type="text"
            name="search"
            id="search-form"
            className="search-input"
            placeholder="Search for..."
            value={search}
            onChange={this.handleChange}
            />  
          </label>
      </div>
    );
  }
}
export default Search;


/* <input
          onChange={this.handleChange}
          type="text"
          name="search"
          value={search}
        /> */
