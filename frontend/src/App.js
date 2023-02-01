import React, { Component } from "react";
import "./App.scss";
import { Route, Switch } from "react-router-dom";
import Refrigerator from "./components/refrigerator/Refrigerator.js";
import CocktailDetails from "./components/cocktaildetails/CocktailDetails.js";
import Profile from "./components/profile/Profile.js";
import AddCocktail from "./components/addcocktail/AddCocktail.js";
import EditCocktail from "./components/editcocktail/EditCocktail.js";
import RecipeDetail from "./components/recipedetail/RecipeDetail.js";
import Homepage from "./components/homepage/Homepage.jsx";
import AuthService from "./services/AuthService.js";
import FirstPage from "./components/firstpage/FirstPage.js";
import NavBar from "./components/navBar/NavBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfAllIngredients: [],
      myListOfIngredients: [],
      ListOfCocktails: [],
      currentUser: null,
      signupShowing: false,
      loginShowing: false,
      ready: false,
      mylistShowing: false,
      myCocktailReady: false,
    };

    this.service = new AuthService();
  }

  // getAllIngredients = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/ingredients-list`)
  //     .then((ingredients) => {
  //       this.setState({ listOfAllIngredients: ingredients.data, ready: true });
  //     });
  // };

  // getMyIngredients = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/ingredient-you-have`, {
  //       withCredentials: true,
  //     })
  //     .then((ingredients) => {
  //       this.setState({
  //         myListOfIngredients: ingredients.data,
  //         mylistShowing: true,
  //       });
  //     });
  // };

  // getMyCocktails = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/yourowncocktail`, {
  //       withCredentials: true,
  //     })
  //     .then((cocktails) => {
  //       console.log("my cocktails<<<<<<", cocktails);
  //       this.setState({
  //         ListOfCocktails: cocktails.data,
  //         myCocktailReady: true,
  //       });
  //     });
  // };

  // getCurrentlyLoggedInUser = () => {
  //   this.service
  //     .currentUser()
  //     .then((theUser) => {
  //       this.setState({ currentUser: theUser });
  //     })
  //     .catch(() => {
  //       this.setState({ currentUser: null });
  //     });
  // };

  componentDidMount() {
    // this.getMyIngredients();
    // this.getCurrentlyLoggedInUser();
    // this.getAllIngredients();
    // this.getMyCocktails();
  }

  // render function for display App component
  render() {
    return (
      <div className="app">
        <NavBar />

        <Switch>
          <Route exact path="/" render={(props) => <Homepage {...props} />} />
          <Route
            exact
            path="/refrigerator"
            render={(props) => (
              <Refrigerator
                {...props}
                allTheIngredients={this.state.listOfAllIngredients}
                MyIngredients={this.state.myListOfIngredients}
                getMyIngredients={this.getMyIngredients}
                ready={this.state.ready}
                mylistShowing={this.state.mylistShowing}
                getData={this.getAllIngredients}
                theUser={this.state.currentUser}
              />
            )}
          />

          <Route
            exact
            path="/details/:id"
            render={(props) => (
              <CocktailDetails
                {...props}
                allTheIngredients={this.state.listOfAllIngredients}
                MyIngredients={this.state.myListOfIngredients}
                getMyIngredients={this.getMyIngredients}
                ready={this.state.ready}
                mylistShowing={this.state.mylistShowing}
                getData={this.getAllIngredients}
                theUser={this.state.currentUser}
              />
            )}
          />

          <Route
            exact
            path="/profile"
            render={(props) => (
              <Profile
                {...props}
                getMyCocktail={this.getMyCocktails}
                AlltheCocktails={this.state.ListOfCocktails}
                myCocktailReady={this.state.myCocktailReady}
                theUser={this.state.currentUser}
              />
            )}
          />

          <Route
            exact
            path="/createCocktail"
            render={(props) => (
              <AddCocktail
                {...props}
                getMyCocktail={this.getMyCocktails}
                theUser={this.state.currentUser}
              />
            )}
          />

          <Route
            exact
            path="/editCocktail/:id"
            render={(props) => (
              <EditCocktail
                {...props}
                thecocktails={this.state.ListOfCocktails}
                getMyCocktail={this.getMyCocktails}
                theUser={this.state.currentUser}
              />
            )}
          />

          <Route
            exact
            path="/firstpage"
            render={(props) => <FirstPage {...props} />}
          />

          <Route
            exact
            path="/recipedetails/:id"
            render={(props) => (
              <RecipeDetail
                {...props}
                thecocktails={this.state.ListOfCocktails}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
