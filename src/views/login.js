import React, {Component} from 'react';
import {login2} from '../utils/MediaAPI';
import PropTypes from 'prop-types';

const url = 'http://media.mw.metropolia.fi/wbma/login/';
/*
const redirect = (bool,to) => {
    if(bool=="Logged in successfully"){
        console.log("jatkuu");
        this.props.history.push('/home');
    }
}

const login5 = (username,password) => {

   // let username = "kasperi";
   // let password = "asdasdass";
    console.log("u: '"+username+"' p: '"+password+"' "); // u: '"+username+"' p: '"+password+"'");
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password})
    }).then(response => response.json()).then(json=> {
        console.log(json);
        console.log(json.message);
        redirect(json.message,"asd");
    });
};
*/


const log = () => {
    const body2 = {
        username: "kasperi",
        password: "asdasdass",
        email: "kasperi.mutku@metropolia.fi",
        full_name: "kasperi mutku"
    }
    fetch(url, {
        mode: 'no-cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body2),
    }, console.log("body: ", JSON.stringify(body2))).then(response => {
       console.log(response.json());
    }).then(json=> {
        console.log("asd");
        console.log(json);
    });
}


class login extends Component {

    state = {
        username: '',
        password: '',
        email: '',
        full_name: '',
    };

    handleInputChange = (evt) => {
        const target = evt.target;
        const value = target.value;
        const name = target.name;

        console.log(value, name);

        this.setState({
            [name]: value,
        });
    };

    login = (evt) => {
        evt.preventDefault()
        this.login5(this.state.username, this.state.password);
      //  login2(this.state);
    };

    login5 = (username,password) => {

        // let username = "kasperi";
        // let password = "asdasdass";
        console.log("u: '"+username+"' p: '"+password+"' "); // u: '"+username+"' p: '"+password+"'");
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password})
        }).then(response => response.json()).then(json=> {
            console.log(json);
            console.log(json.message);
            console.log("history: "+this.props.history);
            this.redirect(json.message,"asd");
        });
    };

    redirect = (bool,to) => {
        if(bool=="Logged in successfully"){
            console.log("jatkuu");
            this.props.history.push('/home');
        }
    }

    render() {
        return (
           <div>
            <h1>Login Page</h1>

               <form onSubmit={this.login}>
                   <input type="text" name="username" placeholder="username"
                          value={this.state.username}
                          onChange={this.handleInputChange}/>

                   <input type="text" name="password" placeholder="password"
                          value={this.state.password}
                          onChange={this.handleInputChange}/>

                   <button type="submit">testi</button>

               </form>


           </div>
        );
    }
}

login.propTypes = {
    history: PropTypes.object
}

export default login;