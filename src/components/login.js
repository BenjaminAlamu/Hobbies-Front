import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Dashboard} from './dashboard';


export class Login extends React.Component{

    
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      error: " ",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

    handleSubmit(e){
        e.preventDefault();
        let username = document.getElementById('username').value;
        let password = document.getElementById('pass-word').value;
        
        const self = this;
            fetch('/login', {
                
                method: 'POST',
                headers : new Headers(),
                body:JSON.stringify({
                    username:username,
                    password:password
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((res) => res.json())
            .then(function(data){
                if(data.success == true){
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("userid", data.id);
                    localStorage.setItem("username", data.username);
                    self.setState({ isLoggedIn: true });
                }
                else{
                    self.setState({ error: data.message });
                }
            } )
            .catch((err)=>console.log(err))
        }


    render(){
        if (this.state.isLoggedIn) {
            return <Redirect to='/dashboard' />
          }

       return <div>
                <form id = "login" onSubmit = {this.handleSubmit}>
                <h2 className = "title">Login</h2>
                <p>{this.state.error}</p>
                <input type = "text" id = "username" placeholder = "Enter your username here" />
                <input type = "password" id = "pass-word" placeholder = "Enter  your Password here" />
                <input type = "submit" value = "Login" />
                <p>Not registered? Sign Up <Link to = {'/register'}>here </Link></p>
            </form>
            </div>
    }

    }


