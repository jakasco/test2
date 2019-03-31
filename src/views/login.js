import React, {Component} from 'react';
import {checkLogged, getAllMedia, login5, redirect} from '../utils/MediaAPI';
import PropTypes from 'prop-types';




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
        login5(this.state.username, this.state.password, this);
    };

    //jos joku on kirjautunut
/*
    componentDidMount() {

        console.log("login.js props: " + this.props.logged);
        if (this.props.logged != null) {
            this.props.history.push('/home');
        }else if( this.props.logged == false){
            this.props.history.push('/');
        }
    }*/


        log = () => {
            console.log("check:" + this.props.logged);
            if (this.props.logged != null) {
                this.props.history.push('/home');
            }else{

            }
        };


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