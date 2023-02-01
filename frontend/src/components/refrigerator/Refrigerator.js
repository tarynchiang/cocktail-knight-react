import React, { Component } from "react";
import "../../App.scss";
import axios from "axios";
import { Link } from "react-router-dom";

class Refrigerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cocktailsID: [],
      cocktailYouCanMake: [],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.props.location.state) {
        if (this.props.location.state.search) {
          this.props.location.state.search = false;
          this.handleSearchInput();
        }
      }
    }, 500);
  }

  addNewItem = (e) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/create-item`,
        { name: e.target.name },
        { withCredentials: true }
      )
      .then(() => {
        console.log("success create");
        this.props.getMyIngredients();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteItem = (theID) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/delete-item/` + theID)
      .then(() => {
        console.log("success delete");
        this.props.getMyIngredients();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  CompareTwoLists = (arr1, arr2) => {
    return arr1.filter((value) => -1 !== arr2.indexOf(value));
  };

  getCocktailName = (Ingredient) => {
    return axios
      .get(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" +
          Ingredient.name
      )
      .then((Cocktails) => {
        console.log("Cocktails", Cocktails);
        let result = Cocktails.data.drinks.map((eachdrinkOB) => {
          return eachdrinkOB.idDrink;
        });
        return result;
      });
  };

  SearchByIngredients = async (IngredientsList) => {
    let result, Arr;
    console.log("IngredientsList", IngredientsList);

    result = await this.getCocktailName(IngredientsList[0]);

    if (IngredientsList.length === 1) {
      console.log("result>>>>", result);
      return result;
    }

    for (let i = 1; i < IngredientsList.length; i++) {
      Arr = await this.getCocktailName(IngredientsList[i]);
      result = await this.CompareTwoLists(Arr, result);
    }

    console.log("result>>>>", result);
    return result;
  };

  handleSearchInput = async () => {
    let searchList = await this.SearchByIngredients(this.props.MyIngredients);
    this.setState({
      cocktailsID: searchList,
    });
    this.fetchCocktailYouCanMake();
  };

  fetchCocktailYouCanMake = () => {
    let info = [];
    let final = [];

    this.state.cocktailsID.forEach((eachCoctailID, i) => {
      info.push(
        axios.get(
          "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" +
            eachCoctailID
        )
      );
    });

    axios.all(info).then((results) => {
      // console.log('info----------',results);

      results.forEach((eachThing) => {
        final.push(eachThing.data.drinks[0]);
      });

      this.setState({ cocktailYouCanMake: final });
    });
  };

  showCocktailYouCanMake = () => {
    if (this.state.cocktailYouCanMake.length === 0) {
      return <h1>Sorry No Cocktail found :(</h1>;
    }

    return this.state.cocktailYouCanMake.map((eachCoctail, i) => {
      return (
        <Link
          exact
          to={{
            pathname: "/details/" + eachCoctail.idDrink,
            state: { fromRefigerator: true },
          }}
          className="eachCocktail"
        >
          <img src={eachCoctail.strDrinkThumb} />
          <h3>{eachCoctail.strDrink}</h3>
        </Link>
      );
    });
  };

  showAllIngredients = () => {
    return this.props.allTheIngredients.map((eachIngredient) => {
      return (
        <li>
          <button
            className="eachIngredient"
            onClick={this.addNewItem}
            name={eachIngredient}
          >
            {eachIngredient}
          </button>
        </li>
      );
    });
  };

  showMyIngredients = () => {
    return this.props.MyIngredients.map((eachIngredient) => {
      return (
        <li className="eachMyIngredient">
          <span>{eachIngredient.name}</span>
          <button
            className="delete-btn"
            onClick={() => {
              this.deleteItem(eachIngredient._id);
            }}
          >
            <img src="/images/delete-button.png" alt="delete-button" />
          </button>
        </li>
      );
    });
  };

  render() {
    console.log("my state", this.state);
    if (this.props.ready && this.props.mylistShowing) {
      return (
        <div className="Ingredient-page">
          <div className="list-part">
            <div className="list-sec">
              <ul className="IngredientsList">{this.showAllIngredients()}</ul>
              <div className="MyIngredientsList">
                <h1>My Ingredients</h1>
                {this.showMyIngredients()}
              </div>
            </div>

            <button className="search-btn" onClick={this.handleSearchInput}>
              Search
            </button>
          </div>
          <div className="myCocktailList">{this.showCocktailYouCanMake()}</div>
        </div>
      );
    } else if (this.props.ready) {
      return (
        <div>
          <ul className="IngredientsList">{this.showAllIngredients()}</ul>
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}

export default Refrigerator;
