import React, { Component, Fragment } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
//
import "../root.css";
import title from "../img/Shelter.png";


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
    const emptyStar = "♡";
    const fullStar = "♥";
    return (
      <div>
        {user && (
          <>
            <div className="profile-section">
              <h1>Welcome {user.username}!</h1>
              <div className="profile-child"></div>
              <div className="profile-text">
              <img src={title} alt="title" className="root-title" style={{width: "20vw"}}/>
              </div>
            </div>
            <br />
            
            <h2 className="profile-section"> Your Offered Shelters:</h2>
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
                      
                      <h5>{eachHowdiy.descriptiveName}</h5>
                      <NavLink
                        className="button-link"
                        key={eachHowdiy._id}
                        to={`/howdiy/${eachHowdiy._id}`}
                      >
                        View
                      </NavLink>
                      <br></br>
                        <div style={{marginTop: "10vh", display: "flex"}}>
                        <img
                          className="profile-howdiy-list-img"
                          src={eachHowdiy.productImg}
                          alt="productImage"
                        /><p style={{paddingLeft: "1vw"}}>by:<h6> me</h6></p>
                        </div>
                    </div>
                    <div className="profile-howdiy-list-ratings">
                    <h6> Shelter Rate: {fullStar.repeat(Math.round(eachHowdiy.costRating)) + emptyStar.repeat(3 - Math.round(eachHowdiy.costRating))}</h6>
                    <h6> Languages: {fullStar.repeat(Math.round(eachHowdiy.difficultyRating)) + emptyStar.repeat(3 - Math.round(eachHowdiy.difficultyRating))}</h6>
                    
                    <NavLink
                        className="button-link"
                        to={`/howdiy/edit/${eachHowdiy._id}`}
                      >
                        Edit
                      </NavLink>
                      
                      <button style={{marginTop: "2vw"}}
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
