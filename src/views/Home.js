import React from 'react';
import PropTypes from 'prop-types';
import Table from './table.js';
import {checkLogged} from '../utils/MediaAPI';
import Login from './login';
import Logout from './logout';

const Home = (props) => {

   const log = () => {
       console.log("check:" +props.logged);
    //   if (props.logged == null) {
       if(localStorage.getItem('token') == null){
           console.log("redsirect to login");
           props.history.push('/login');
       }
   }

   log();

   const logout = () => {
       localStorage.removeItem("token");
       props.history.push('/');
   }

        return (
            <React.Fragment>
                <h1>Home</h1>
                <h2>Hello {props.logged}</h2>
                <button onClick={logout}>Logout</button>
                <Table picArray={props.picArray}/>
            </React.Fragment>
        );

};
Home.propTypes = {
  picArray: PropTypes.array,
};
export default Home;