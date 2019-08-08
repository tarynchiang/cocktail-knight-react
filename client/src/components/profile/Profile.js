import React from 'react';
import '../../App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import AddCocktail from "../addcocktail/AddCocktail.js";

class Profile extends React.Component{

    deleteCocktail = (idOfCocktail) =>{
    
        axios.post(`${process.env.REACT_APP_API_URL}/delete-cocktail/`+idOfCocktail)
        .then(()=>{
            this.props.getMyCocktail();
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    showMyCocktail = () =>{
        console.log("-=-=-=--=",this.props.AlltheCocktails)
        const myCocktails = this.props.AlltheCocktails.filter((eachP)=>{
            return eachP.owner._id === this.props.theUser._id;
        })

        return myCocktails.map((eachCocktail)=>{
            return(
                <div>
                    <img src={eachCocktail.img} alt="cocktail-img"/>
                    <h1>{eachCocktail.name}</h1>
                    <button onClick={this.deleteCocktail(eachCocktail._id)}>delete</button>
                </div>

            )
        })
    }

    render(){
        if(this.props.myCocktailReady){
            return(
                <div>
                    {this.showMyCocktail()}
                    <Link exact to = "/createCocktail">add</Link>
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

export default Profile;