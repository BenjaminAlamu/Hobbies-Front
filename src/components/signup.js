import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Link, Redirect} from 'react-router-dom';
import {Dashboard} from './dashboard';


export class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          signup: false,
          error: "  ",
        }
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister(e){
        e.preventDefault();
        let firstname = document.getElementById('firstname').value;
        let lastname = document.getElementById('lastname').value;
        let phonenumber = document.getElementById('phonenumber').value;
        let email = document.getElementById('email').value;
        let username = document.getElementById('username').value;
        let password = document.getElementById('pass-word').value;
        
        const self = this;
            fetch('/register', {
                
                method: 'POST',
                headers : new Headers(),
                body:JSON.stringify({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    phonenumber: phonenumber,
                    username:username,
                    password:password
                }),
                headers: {"Content-Type": "application/json"}
            }).then((res) => res.json())
            .then(function(data){
                if(data.success == true){
                    self.setState({ signup: true });
                    alert("Here");
                }
                else{
                    self.setState({ error: data.message });
                }
            } )
            .catch((err)=>console.log(err))
        }

    render(){
        if (this.state.signup) {
            return <Redirect to='/' />
          }
       return <div>
                <form id = "login" onSubmit = {this.handleRegister}>
                <h2 className = "title">Register</h2>
                <legend>Personal Information</legend>
                <p>{this.state.error}</p>
                
                <input type = "text" id = "firstname" placeholder = "Enter your firstname here" required />
                <input type = "text" id = "lastname" placeholder = "Enter  your lastname here" required />
                <input type = "number" id = "phonenumber" placeholder = "Enter your phonenumber here" required />
                <input type = "email" id = "email" placeholder = "Enter  your email here" required />


                <legend>Login Information</legend>
                <input type = "text" id = "username" placeholder = "Enter your username here" required />
                <input type = "password" id = "pass-word" placeholder = "Enter  your Password here" required />
                {/* <input type = "password" id = "confirm-password" placeholder = "Confirm Password here" required /> */}
                <input type = "submit" value = "Sign Up" />
                <p>Already registered? Sign In <Link to = {'/'}>here </Link></p>
            </form>
            </div>
    }
}


