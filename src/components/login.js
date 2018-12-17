import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { Dashboard } from './dashboard';


export class Login extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            error: " ",
            loading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit (e) {
        e.preventDefault();
        let username = document.getElementById('username').value;
        let password = document.getElementById('pass-word').value;
        this.setState({ loading: true });

        const self = this;
        fetch('/login', {

            method: 'POST',
            headers: new Headers(),
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => res.json())
            .then(function (data) {

                if (data.success == true) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("userid", data.id);
                    localStorage.setItem("username", data.username);
                    self.setState({ isLoggedIn: true });
                    self.setState({ loading: false });

                }
                else {
                    self.setState({ error: data.message });
                    self.setState({ loading: false });
                }
            })
            .catch((err) => console.log(err))
    }


    render () {
        let load;
        let loading = this.state.loading;
        if (this.state.isLoggedIn) {
            return <Redirect to='/dashboard' />
        }

        if (loading) {
            load = <Loader
                type="ThreeDots"
                color="#00BFFF"
                height="50"
                width="50"
            />;
        }
        else {
            load = "";
        }

        return <div>
            <form id="login" onSubmit={this.handleSubmit}>
                <h2 className="title">Login</h2>
                <p className="error">{this.state.error}</p>
                <input type="text" id="username" placeholder="Enter your username here" />
                <input type="password" id="pass-word" placeholder="Enter  your Password here" />
                {load}
                <input type="submit" value="Login" />
                <p>Not registered? Sign Up <Link to={'/register'}>here </Link></p>
            </form>
        </div>
    }

}


