import React, { Component } from 'react';
import axios from 'axios';


class AddCocktail extends Component {
  constructor(props){
      super(props);
      this.state = { 
          newName: "", 
          newIngredients:[],
          newInstruction: "", 
          newImage: null,
          currentIngredient:"",
         }; 
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();

    let data = new FormData();
    data.append('theImage', this.state.newImage);
    data.append('theName', this.state.newName);
    data.append('theDescription', this.state.newInstruction);
    data.append('theIngredients',this.state.newIngredients);


    axios.post(`${process.env.REACT_APP_BASE}create-cocktail`, data, { headers: {
      'Content-Type': 'multipart/form-data',
    }, withCredentials: true })
    .then( () => {
        // this.props.getData();
        // this function updates the list in ProjectIndex.js
        this.setState({
            newName: "", 
            newIngredients:[],
            newInstruction: "", 
            newImage: null,
            currentIngredient:""});
    })
    .catch( error => console.log(error))
  }

  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  handleIngredients = () =>{
    let clone = [...this.state.newIngredients];
    let current = this.state.currentIngredient;
    clone.push(current);
    this.setState({
        newIngredients: clone,
        currentIngredient: "",
    })
  }

  showIngredientyouhave = () =>{
      return this.state.newIngredients.map((eachIngredient)=>{
        return(
            <p>{eachIngredient}</p>
        )
      })
  }
  

  updateFileInState = (e) =>{
    this.setState({newImage: e.target.files[0]})
  }

  render(){
    console.log(this.state)
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <legend style={{marginTop: '100px'}}>Choose a Picture</legend>
          <input type="file" onChange={this.updateFileInState} />
          
          <legend>Name:</legend>
          <input type="text" name="newName" value={this.state.newName} onChange={ e => this.handleChange(e)}/>
          
          <legend>Ingredients</legend>
          <input type="text" name="currentIngredient" value={this.state.currentIngredient} onChange={ e => this.handleChange(e)}/>
          <button onClick={this.handleIngredients}>+</button>
            {this.showIngredientyouhave()}
          <legend>Instruction:</legend>
          <textarea name="newDescription" value={this.state.newDescription} onChange={ e => this.handleChange(e)} />
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddCocktail;