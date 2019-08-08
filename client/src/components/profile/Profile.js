import React from 'react';
import '../../App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import EditCocktail from '../editcocktail/EditCocktail.js';
class Profile extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            editing: false,
        }
    }

    changeEditing = (whichNumber) => {
        this.setState({editing: whichNumber})
    } 

    resetEdit = () =>{
        this.setState({editing: false})
    }

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
        const myCocktails = this.props.AlltheCocktails.filter((eachP)=>{
            return eachP.owner._id === this.props.theUser._id;
        })

        return myCocktails.map((eachCocktail,index)=>{
            if(this.state.editing !== index){
                return(
                    <div className="eachRecipe">
                        <Link exact to={`/recipedetails/${eachCocktail._id}`}>
                            <img src={eachCocktail.img} alt="cocktail-img"/>
                            <h1>{eachCocktail.name}</h1>
                        </Link>
                        {/* <button onClick={()=>{this.changeEditing(index)}} >Edit</button> */}
                        <Link exact to={`/editCocktail/${eachCocktail._id}`}>
                            edit
                        </Link>
                        <button onClick={()=>this.deleteCocktail(eachCocktail._id)}>delete</button>
                    </div>
                )
            }else{
                return(
                    <EditCocktail 
                    resetEditingSituation = {this.resetEdit} 
                    theCocktail = {eachCocktail}
                    getAllTheCocktailInAppJS = {this.props.getMyCocktail}
                 />
                )
            }
        })
    }

    render(){
        console.log("-=-=-=--=",this.props.AlltheCocktails)

        if(this.props.myCocktailReady){
            return(
                <div className="recipe-page">
                    {this.showMyCocktail()}
                    <Link exact to = "/createCocktail" className="add-pic">
                        < img src="/images/add.png" alt="add-sign" />
                    </Link>
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