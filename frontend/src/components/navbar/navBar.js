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
            <Link exact to="/firstpage" >
                <img src="/images/homeSign.png" alt="home"/>
            </Link>
            <div>
                {!props.theUser && 
                    <span>
                        <button className="btn" onClick = {()=> props.toggleForm('signup')}>Sign Up</button>
                        <button className="btn" onClick = {()=> props.toggleForm('login')} > Login </button>
                    </span>
                }

                {props.theUser && 
                <span>

                <button className="btn" onClick = {doTheLogout} >Log Out </button>
                </span>
                }
            </div>

        </nav>
    )
}

export  default navBar;