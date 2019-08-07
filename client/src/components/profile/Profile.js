import React from 'react';
import '../../App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import AddCocktail from "../addcocktail/AddCocktail.js";

class Profile extends React.Component{
    render(){
        return(
            <div>
                hi
                <AddCocktail/>
            </div>
        )
    }
}

export default Profile;