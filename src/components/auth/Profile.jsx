import React, { Component, Fragment } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
//
import "../root.css";

class Profile extends Component {
  state = {
    myHowdiys: null,
    isLoadingHowdiy: true,
  };

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/profile/recipes`, {
        withCredentials: true,
      })
      .then((response) => {
        this.setState({ myHowdiys: response.data, isLoadingHowdiy: false });
      })
      .catch((err) => {
        console.log(err.response.status); // => the error message status code
        if (err.response.status === 403) {
          this.props.history.push("/login");
        }
      });
  }

  deleteHowdiy = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_HOST}/recipes/delete/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        //find the element in the state manually and remove it
        const newHowdiys = this.state.myHowdiys.filter((eachHowdiy) => {
          return eachHowdiy._id !== id;
        });

        this.setState({ myHowdiys: newHowdiys });
      })
      .catch((err) => {
        console.log(err.response.status); // => the error message status code
        if (err.response.status === 403) {
          this.props.history.push("/login");
        }
      });
  };

  render() {
    const { myHowdiys, isLoadingHowdiy } = this.state;
    const { user } = this.props;
    const emptyStar = "☆";
    const fullStar = "★";
    return (
      <div>
        {user && (
          <>
            <div className="profile-section">
              <h1>Howdiy {user.username}!</h1>
              <div className="profile-child"></div>
              <div className="profile-text">
                <h6> First Name: {user.firstName}</h6>
                <h6> Last Name: {user.lastName}</h6>
                <h6> Username: {user.username}</h6>
                <h6> Logging in with: {user.email}</h6>
              </div>
            </div>
            <br />
            <hr></hr>
            <h2 className="profile-section"> Your Howdiys:</h2>
          </>
        )}
        {isLoadingHowdiy && <h1>...isLoading!</h1>}
        {!isLoadingHowdiy &&
          myHowdiys.map((eachHowdiy) => {
            return (
              <>
                <div>
                  <div className="profile-howdiy-list-child">
                    <div>
                    <img
                      className="profile-howdiy-list-img"
                      src={eachHowdiy.productImg}
                      alt="productImage"
                    />
                    </div>
                    <div>
                      <h4>{eachHowdiy.funName}</h4>
                      <h5>{eachHowdiy.descriptiveName}</h5>
                      <NavLink
                        className="button-link"
                        key={eachHowdiy._id}
                        to={`/howdiy/${eachHowdiy._id}`}
                      >
                        View
                      </NavLink>
                    </div>
                    <div className="profile-howdiy-list-ratings">
                    <h6> Cost Rating: {fullStar.repeat(Math.round(eachHowdiy.costRating)) + emptyStar.repeat(3 - Math.round(eachHowdiy.costRating))}</h6>
                    <h6> Difficulty Rating: {fullStar.repeat(Math.round(eachHowdiy.difficultyRating)) + emptyStar.repeat(3 - Math.round(eachHowdiy.difficultyRating))}</h6>
                    <h6> Time Intensity: {fullStar.repeat(Math.round(eachHowdiy.timeOfPreparation)) + emptyStar.repeat(3 - Math.round(eachHowdiy.timeOfPreparation))}</h6>
                    <NavLink
                        className="button-link"
                        to={`/howdiy/edit/${eachHowdiy._id}`}
                      >
                        Edit
                      </NavLink>
                      <br></br>
                      <button
                        className="button-link"
                        onClick={() => {
                          this.deleteHowdiy(eachHowdiy._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    );
  }
}

export default Profile;


/* 


<Container>
  <Row>
    <Col sm={8}>sm=8</Col>
    <Col sm={4}>sm=4</Col>
  </Row>
</Container>

PROFILE PLANNING WILL BE :
like CategoryList = howdiyList, filteredList (filtered by user creation)
get info of all "MY" Howdiys and Info of User's Account

NOTES
- you can have multiple isLoadings in one class!! spinners in different sections
- you can have multiple axios.bla's
- use axios to fetch the DATA! -- credentials gives BE access to this request session. Authorization!

*/