import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Link, Redirect} from 'react-router-dom';


export class Edit extends React.Component{

    constructor(props){
        super();
        this.state = {
            updated: false,
            error: "  ",
            tokenNotFound : false, 
            hobby: " ",
            id :this.routeParam,
          }
          this.routeParam = props.match.params.id;
          this.updateHobby = this.updateHobby.bind(this);
          this.handleChange = this.handleChange.bind(this);
    }

    
    componentWillMount(){

        // alert("Here");
        console.log("Here");
        var id = this.routeParam;
        console.log(id);

        const self = this;
        fetch('/edit/' + id, {
            headers: {
                'Authorization': this.getToken(),
                "Content-Type": "application/json"
            }}).then((res) => res.json())
        .then(function(data){
            if(data.tokenNotFound == true){
                self.setState({tokenNotFound :true})
            }
            console.log(data);
            self.setState({hobby : data.hobby})
            console.log(data.hobby);
            
        }).catch((err)=>console.log(err))
    }

    getToken(){
        return "Bearer " + localStorage.getItem('token');
    }

    updateHobby(e){
        e.preventDefault();
        let hobby = document.getElementById('hobby').value;

        const self = this;
            fetch('/update', {
                
                method: 'POST',
                body:JSON.stringify({
                    id : this.routeParam,
                    hobby: hobby,

                }),
                headers: {
                    'Authorization': this.getToken(),"Content-Type": "application/json"
                }
            }).then((res) => res.json())
            .then(function(data){
                if(data.tokenNotFound == true){
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

        handleChange(event) {
            this.setState({hobby: event.target.value});
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
                <form id = "login" onSubmit = {this.updateHobby}>
                <h2 className = "title">Edit Hobby</h2>
                <p>{this.state.error}</p>
                <label>Tell us what you like to to: </label>
                <input type = "text" id = "hobby" value = {this.state.hobby} onChange={this.handleChange} required />
                <input type = "submit" value = "Update Hobby" />
                </form>
                </div>
            </div>
            
    }
}


