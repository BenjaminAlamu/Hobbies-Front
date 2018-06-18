import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Link, Redirect} from 'react-router-dom';


export class AddHobby extends React.Component{
    constructor(props){
        super();
        this.state = {
            added: false,
            tokenNotFound : false, 
            error: "  ",
          }
          this.addHobby = this.addHobby.bind(this);
    }

    componentWillMount(){
        console.log("Here");
        var id = localStorage.getItem('userid');

        const self = this;
        fetch('/view/' + id, {
            headers: {
                'Authorization': this.getToken(),
                "Content-Type": "application/json"
            }}).then((res) => res.json())
        .then(function(data){
            if(data.tokenNotFound == true){
                self.setState({tokenNotFound :true})
            }            
        }).catch((err)=>console.log(err))
    }

    addHobby(e){
        e.preventDefault();
        let hobby = document.getElementById('hobby').value;
        let username = localStorage.getItem('username');
        let userid = localStorage.getItem('userid');


        const self = this;
            fetch('/add', {
                
                method: 'POST',
                headers : new Headers(),
                body:JSON.stringify({
                    username: username,
                    userid: userid,
                    hobby:hobby
                }),
                headers: { 'Authorization': this.getToken(),
                "Content-Type": "application/json"
            }
            }).then((res) => res.json())
            .then(function(data){
                if(data.tokenNotFound == true){
                    console.log("add funtion here");
                    self.setState({tokenNotFound :true})
                }
                if(data.success == true){
                    self.setState({ added: true });
                }
                else{
                    self.setState({ error: data.message });
                }
            } )
            .catch((err)=>console.log(err))
        }

        getToken(){
            return "Bearer " + localStorage.getItem('token');
        }

    render(){
        if (this.state.tokenNotFound) {
            return <Redirect to='/' />
          }

        if (this.state.added) {
            return <Redirect to='/dashboard' />
          }
       return <div>
                <div id = 'leftside'>
                <Link to = {'/dashboard'} className = "link">Home </Link>
                <Link to = {'/addhobby'} className = "link">Add Hobby </Link>
                <Link to = {'/logout'} className = "link">Log Out </Link>
                </div>

                <div id = 'rightside'>
                <form id = "login" onSubmit = {this.addHobby}>
                <h2 className = "title">Add Hobby</h2>
                <p>{this.state.error}</p>
                <label>Tell us what you like to to: </label>
                <input type = "text" id = "hobby" placeholder = "Enter hobby here" required />
                <input type = "submit" value = "Add Hobby" />
                </form>
                </div>
            </div>
    }
}


