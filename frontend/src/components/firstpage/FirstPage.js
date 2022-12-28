import React from 'react';
import '../../App.css';
import {Link} from 'react-router-dom';

function FirstPage(props){
  return(
    <div className="first-page">
      <Link exact to="/refrigerator">Refrigerator</Link>
      <Link exact to="/profile">My own Recipes</Link>
    </div>
  )
}

export default FirstPage; 