import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Link, Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';

export class Dashboard extends React.Component {
    constructor(props) {
        super();
        this.state = {
            tokenNotFound: false,
            list: [],
            loading: true,
        }
    }

    componentWillMount () {
        console.log("Here");
        var id = localStorage.getItem('userid');

        const self = this;
        fetch('/view/' + id, {
            headers: {
                'Authorization': this.getToken(),
                "Content-Type": "application/json"
            }
        }).then((res) => res.json())
            .then(function (data) {
                if (data.tokenNotFound == true) {
                    self.setState({ tokenNotFound: true })
                }
                console.log(data);
                self.setState({ list: data }, () => console.log(self.state.list))
                console.log(self.state.list);
                self.setState({ loading: false })

            }).catch((err) => console.log(err))
    }

    getToken () {
        return "Bearer " + localStorage.getItem('token');
    }

    render () {

        let load;
        let hobbyData;
        let loading = this.state.loading;


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

        if (this.state.tokenNotFound) {
            return <Redirect to='/' />
        }

        if ((this.state.list.length == 0) && (!this.state.loading)) {
            hobbyData = <p>No hobby yet</p>
        }
        else {

        }

        return <div>
            <div id='leftside'>
                <Link to={'/dashboard'} className="link">Home </Link>
                <Link to={'/addhobby'} className="link">Add Hobby </Link>
                <Link to={'/logout'} className="link">Log Out </Link>
            </div>

            <div id='rightside'>
                <h5 id="hobbyLabel">Here are your hobbies</h5>
                {load}
                {hobbyData}
                {this.state.list.map(e => (


                    <div className='hobbyContainer'>
                        <p className='hobby'>{e.hobby}</p>
                        <div className='buttons'>
                            <Link to={'/edit/' + e.id} className="edit">Edit </Link>
                            <Link to={'/delete/' + e.id} className="del">Delete </Link>
                        </div>
                    </div>
                ))}


                {/* {this.getHobbies()} */}
            </div>
        </div>
    }
}


