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
    data.append('theInstruction', this.state.newInstruction);

    this.state.newIngredients.forEach((ing)=>{
      data.append('theIngredients',ing);
    })

    axios.post(`${process.env.REACT_APP_API_URL}/create-cocktail`, data, { headers: {
      'Content-Type': 'multipart/form-data',
    }, withCredentials: true })
    .then( () => {
        this.props.getMyCocktail();
        this.setState({
            newName: "", 
            newIngredients:[],
            newInstruction: "", 
            newImage: null,
            currentIngredient:""});
        this.props.history.push('/profile');
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
    console.log(this.state);
    return(
      <div className="add-cocktail">
        <form onSubmit={this.handleFormSubmit} className="add-box">
          
          <div className="first-box">
            <div>
              <label>Name:</label>
              <input type="text" name="newName" value={this.state.newName} onChange={ e => this.handleChange(e)}/>
            </div>
            
            <input type="file" onChange={this.updateFileInState} />
          </div>
          
          <div className="second-box">
            <div className="sec-box1">
              <legend>Ingredients</legend>
              <input type="text" name="currentIngredient" value={this.state.currentIngredient} onChange={ e => this.handleChange(e)}/>
              <button type="button" onClick={this.handleIngredients}>+</button>
                {this.showIngredientyouhave()}
            </div>
            
            <div className="sec-box2">
              <legend>Instruction</legend>
              <textarea rows="20" cols="50" name="newInstruction" value={this.state.newInstruction} onChange={ e => this.handleChange(e)} />
            </div>
          
          </div>
          
          <input type="submit" value="Submit" className="submit-btn" />
       
        </form>
      </div>
    )
  }
}

export default AddCocktail;