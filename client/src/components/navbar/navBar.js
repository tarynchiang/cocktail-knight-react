import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import '../../App.css';
function navBar(props){
        
    const doTheLogout = () =>{
        props.pleaseLogOut()
        .then(()=>{
            props.getUser();
        })

    }
    return(
        <nav>

            {!props.theUser && 
                <span>
                    <button className="btn" onClick = {()=> props.toggleForm('signup')}>Sign Up</button>
                    <button className="btn" onClick = {()=> props.toggleForm('login')} > Login </button>
                </span>
            }

            {props.theUser && 
            <span>

            <button className="btn" onClick = {doTheLogout} >Log Out </button>

                {/* <span>Hello, {props.theUser.username}</span> */}
            </span>
            }

        </nav>
    )
}

export  default navBar;