import React, { Component } from 'react';
import AuthService from '../../services/AuthService.js';
import '../../App.css';

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            usernameInput:'',
            passwordInput:'',
        }
        this.service = new AuthService();
    }

    handleChange = (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }

    trytoSignUp = (e)=>{
        e.preventDefault();
        const userName = this.state.usernameInput;
        const passWord = this.state.passwordInput;

        this.service.signup(userName,passWord)
        .then((response)=>{
            console.log('-----', response)
            this.props.toggleForm('signup');
            this.props.getUser();
        })
    }

    
    render(){
        return(
        <div className="form-sec">
            <form className='sign-form'onSubmit={this.trytoSignUp}>
                <h3>Sign Up Today</h3>
                
                <legend>Username</legend>
                <input value={this.state.usernameInput}
                        name="usernameInput"
                        onChange={this.handleChange}
                />

                <legend>Password</legend>
                <input  type="password"
                        value={this.state.passwordInput}
                        name="passwordInput"
                        onChange={this.handleChange}
                />

                <div className="btn-sec">
                    <button className="btn" onClick={this.props.cancelBtn}>Cancel</button>
                    <button className="btn">Submit</button>
                </div>

            </form>
        </div>
        )
    }
}

export default SignUp;