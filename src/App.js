import "./App.css";
import { Component } from "react";
import { Route, Switch } from "react-router-dom";
// auth
import Login from "./components/auth/Login";
import Profile from "./components/auth/Profile";
import Signup from "./components/auth/Signup";
import authService from "./components/services/auth-services";
//
import Home from "./components/Home";
import Donate from "./components/Donate";
import NavbarComponent from "./components/NavbarComponent";
//
import Categories from "./components/categories/Categories";
import CategoryList from "./components/categories/CategoryList";
//
import ShelterCreate from "./components/shelters/ShelterCreate";
import Shelter from "./components/shelters/Shelter";
import ShelterEdit from "./components/shelters/ShelterEdit";

import logo from "./rootimg/Shelter.png"


class App extends Component {
  state = {
    isLoggedIn: null,
    user: null,
  };

  setUser = (user, loggedInStatus) => {
    this.setState({
      user,
      isLoggedIn: loggedInStatus,
    });
  };

  getUser = () => {
    if (this.state.user === null) {
      authService
        .loggedin()
        .then((response) => {
          this.setState({
            user: response.data.user,
            isLoggedIn: true,
          });
        })
        .catch((error) => {
          this.setState({
            isLoggedIn: false,
          });
        });
    }
  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { user, isLoggedIn } = this.state;

    return (
      <div className="App">
        <header style={{backgroundColor:"#EADFCD", height: "12vh", marginTop: "-70px"}}>
          <img src={logo} alt="title" className="root-title" style={{width: "25vw", marginLeft: "15vw", paddingTop:"2vh"}}/>
        </header>
        <Switch>
        <Route
            exact path="/"
            render={(props) => <Home {...props} user={user}/>}
          />
          <Route
            exact path="/join"
            render={(props) => <Donate {...props} user={user}/>}
          />
          <Route
            path="/signup"
            render={(props) => <Signup {...props} setUser={this.setUser} />}
          />
          <Route
            path="/login"
            render={(props) => <Login {...props} setUser={this.setUser} />}
          />
          <Route
            path="/profile"
            render={(props) => (
              <Profile {...props} isLoggedIn={isLoggedIn} user={user} />
            )}
          />
          <Route
            path="/categories"
            render={(props) => (
              <Categories {...props} isLoggedIn={isLoggedIn} />
            )}
          />
          <Route
            path="/:category/howdiy" // where they are receiving the request to visit - are they trying to get to ...
            render={(props) => <CategoryList {...props} />}
          />
          <Route
            path="/howdiy/create"
            render={(props) => <ShelterCreate {...props} />}
          />
          <Route
            exact
            path="/howdiy/:id"
            render={(props) => <Shelter {...props} user={user}/>}
          />
          <Route
            path="/howdiy/edit/:id"
            render={(props) => <ShelterEdit {...props} />}
          />
        </Switch>
        <NavbarComponent isLoggedIn={isLoggedIn} user={user} setUser={this.setUser} />
      </div>
    );
  }
}

export default App;
