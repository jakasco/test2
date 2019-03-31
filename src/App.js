import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {redirect,checkLogged, getAllMedia} from './utils/MediaAPI';
import Nav from './components/nav'
import Home from './views/Home';
import Profile from './views/Profile';
import Single from './views/Single';
import Login from './views/login.js';
import Logout from './views/logout';

class App extends Component {

    state = {
        picArray: [],
        logged: false,
    };

    loginCheck = () => {
        let loggedJson =  checkLogged(localStorage.getItem('token'));
        console.log("home:  "+loggedJson);
    }



    componentDidMount() {
        getAllMedia().then(pics => {
            this.setState({picArray: pics});
        });

        checkLogged(localStorage.getItem('token')).then(log => {
            this.setState({logged: log});
            console.log("app js logged: "+this.state.logged);
        });
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <Nav/>
                    <Route exact path="/" render={(props)=>(
                        <Login  {...props} logged={this.state.logged}/>
                    )}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/home" render={(props)=>(
                        <Home {...props} picArray={this.state.picArray} logged={this.state.logged}/> //...props history Router oma metodi
                    )}/>
                </div>
            </Router>
        );
    }
}

export default App;
