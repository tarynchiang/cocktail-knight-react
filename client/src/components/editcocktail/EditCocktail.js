import React, { Component } from 'react';
import axios from 'axios';

class EditCocktail extends Component {
  constructor(props){
    super(props);
    this.state = {
        name: "", 
        ingredients:[],
        instruction: "", 
        image: null,
        currentIngredient:"",
        ready:false,
    }
  }

  getTheCocktail = ()=>{
    let theID = this.props.match.params.id;
    let theCocktail = this.props.thecocktails.find((eachC)=>{
        console.log("eachCId",eachC._id)
        return eachC._id === theID;
    })

    console.log("found",theCocktail)

    this.setState({
      name:theCocktail.name,
      ingredients:theCocktail.ingredients,
      instruction:theCocktail.instruction,
      image:theCocktail.image,
      ready:true
    })
  }


  updateFileInState = (e) =>{
    this.setState({image: e.target.files[0]})
  }

    
  handleFormSubmit = (event) => {
    event.preventDefault();

    let theRequest = new FormData();
    theRequest.append('theImage', this.state.image);
    theRequest.append('theName', this.state.name);
    theRequest.append('theInstruction', this.state.instruction);

    this.state.ingredients.forEach((ing)=>{
      theRequest.append('theIngredients',ing);
    })

    axios.post(`http://localhost:5000/update-cocktail/${this.props.match.params.id}`,
     theRequest)
    .then( () => {
        this.props.getAllTheCocktailInAppJS();
        this.props.resetEditingSituation();
        this.props.history.push('/profile');
    })
    .catch( error => console.log(error) )
  }


  handleChange = (event) => {  
    this.setState({
      [event.target.name]:event.target.value
    })
  }


  deleteIngredient = (Ing)=>{
    axios.post(`http://localhost:5000/delete-ingredient/${this.props.match.params.id}/${Ing}`)
    .then(()=>{
      this.showIngredientyouhave();
    })
    .catch((err)=>{
      console.log(err);
    })
  }


  showIngredientyouhave = () =>{
    return this.state.ingredients.map((eachIngredient)=>{
      // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~',eachIngredient);
      // console.log(this.state.ingredients)
      return(
          <div>
            <p>{eachIngredient}</p>
            <button onClick={()=>{this.deleteIngredient(eachIngredient)}}>delete</button>
          </div>
      )
    })
}

  handleIngredients = () =>{
    let clone = [...this.state.ingredients];
    let current = this.state.currentIngredient;
    clone.push(current);
    this.setState({
        ingredients: clone,
        currentIngredient: "",
    })
  }

  componentDidMount(){
    this.getTheCocktail();
  }

  render(){
    // console.log('=====', this.state)
    console.log("parameter",this.props.match.params.id)
    console.log("state",this.state);
    
    if(this.state.ready){
      return(
        <div>
          <form onSubmit={this.handleFormSubmit}>
          <div>
            <input type="text" name="name" value={this.state.name} onChange={ e => this.handleChange(e)}/>
          </div>
        
            <input type="text" name="Ingredients" value={this.state.currentIngredient} onChange={ e => this.handleChange(e)}/>
            <button type="button" onClick={this.handleIngredients}>+</button>
            {this.showIngredientyouhave()}

            <input name="instruction" value={this.state.instruction} onChange={ e => this.handleChange(e)} />

            <input type="file" onChange={this.updateFileInState} />

            <input type="submit" value="Submit" />
          </form>
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

export default EditCocktail;