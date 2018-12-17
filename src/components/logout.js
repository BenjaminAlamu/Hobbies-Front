import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Link, Redirect} from 'react-router-dom';


export class Logout extends React.Component{


    componentWillMount(){
        localStorage.clear();
                return <Redirect to='/' />
    }


    render(){
        return(
        <div>
            localStorage.clear();
                return <Redirect to='/' />
        </div>

        )}
}


