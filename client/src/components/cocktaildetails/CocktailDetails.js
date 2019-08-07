import React from 'react';
import '../../App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Details extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            Cocktail:{},
            ready:false,
        }
    }
    
    getCocktailDetails = (theID)=>{
        let info = {};
        axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='+theID)
        .then((CocktailOB)=>{
            console.log('0-0-0-0-0-', CocktailOB.data.drinks[0]);
            info.name = CocktailOB.data.drinks[0].strDrink;
            info.ingredients = [];
            info.measures = [];
            let i=1;
            let Ingredient,measure;
            let flag=true;
            while(flag){
                Ingredient = CocktailOB.data.drinks[0]['strIngredient'+i];
                measure = CocktailOB.data.drinks[0]['strMeasure'+i];
                if(Ingredient.length === 0){
                    flag=false;
                }else{
                    info.ingredients.push(Ingredient);
                    info.measures.push(measure);
                }
                i++;
            }
            info.instruction = CocktailOB.data.drinks[0].strInstructions;
            info.img = CocktailOB.data.drinks[0].strDrinkThumb;
            info.glass = CocktailOB.data.drinks[0].strGlass;
            this.setState({Cocktail: info, ready:true})
        })
    }


    goBack = ()=>{
        if(this.props.location.state){
            if(this.props.location.state.fromRefigerator){
                this.props.location.state.fromRefigerator = false;
                this.props.history.push({
                    pathname:"/refrigerator", 
                    state:{search:true} 
                });

            } else{
                this.props.history.goBack()
            }
        } else{
            this.props.history.goBack()
        }

    }


    showIngredients = ()=>{
        return this.state.Cocktail.ingredients.map((eachIngredient)=>{
            return(
                <li>{eachIngredient}</li>
            )
        })
    }

    showAmount = ()=>{
        return this.state.Cocktail.measures.map((eachMeasure)=>{
            return(
                <li>{eachMeasure}</li>
            )
        })
    }


    showCocktailDetails = ()=>{
        
        return(
            <div className="Details-page">
                <div className="Cocktail-details">
                    <img src={this.state.Cocktail.img}/>
                    <div className="Cocktail-info">
                        <h1>{this.state.Cocktail.name}</h1>
                        <h3>Ingredients</h3>
                        <div className="Amount">
                            <ul>{this.showIngredients()}</ul>
                            <ul>{this.showAmount()}</ul>
                        </div>
                        <h3>Description</h3>
                        <p>{this.state.Cocktail.instruction}</p>
                    </div>
                </div>
                    <button onClick={this.goBack} className="GoBack-btn">
                        <img src="/img/backarrow.png"/>
                    </button>
            </div>
        )
    }

    componentDidMount(){
        this.getCocktailDetails(this.props.match.params.id);
    }
    
    
    render(){
        
        if(this.state.ready){
            return(
                <div>
                    {this.showCocktailDetails()}
                </div>
            )
        }else{
            return(
                <h1>Loading...</h1>
            )
        }
    }
}

export default Details; 