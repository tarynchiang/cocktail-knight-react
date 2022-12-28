import React from 'react';
import '../../App.css';

class RecipeDetail extends React.Component{
  

  constructor(props){
    super(props);
    this.state = {
      name:"",
      ingredients:[],
      instruction:"",
      image:null,
      ready:false
    }
  }
  
  getTheCocktail = ()=>{
    let theID = this.props.match.params.id;
    let theCocktail = this.props.thecocktails.find((eachC)=>{
        console.log("eachCId",eachC._id)
        return eachC._id === theID;
    })


    console.log("theCocktail",theCocktail)
    this.setState({
      name:theCocktail.name,
      ingredients:theCocktail.ingredients,
      instruction:theCocktail.instruction,
      image:theCocktail.img,
      ready:true,
    })
  }

  showIngredients = ()=>{
    return this.state.ingredients.map((eachIngredient)=>{
      return(
          <li>{eachIngredient}</li>
      )
  })
  }

  goBack = ()=>{

  }
  showCocktailDetail = ()=>{
    return(
      <div className="Details-page">
                <div className="Cocktail-details">
                    <img src={this.state.image} alt="cocktail-img"/>
                    <div className="Cocktail-info">
                        <h1>{this.state.name}</h1>
                        <h3>Ingredients</h3>
                        <div className="Amount">
                            <ul>{this.showIngredients()}</ul>
                        </div>
                        <h3>Instruction</h3>
                        <p>{this.state.instruction}</p>
                    </div>
                </div>
                    <button onClick={()=>{this.props.history.goBack()}} className="GoBack-btn">
                        <img src="/images/backarrow.png" alt="goback-btn"/>
                    </button>
            </div>
    )
  }


  componentDidMount(){
    this.getTheCocktail();
  }


  render(){
    if(this.state.ready){
      return(
        <div>
          {this.showCocktailDetail()}
        </div>
      )
    }
    else{
      return(
        <h1>Loading...</h1>
      )
    }
  }
}

export default RecipeDetail; 