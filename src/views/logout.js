import React, {Component} from 'react';
import {checkLogged, getAllMedia, login5, redirect} from '../utils/MediaAPI';
import PropTypes from 'prop-types';



const Logout = (props) => {
    console.log("Before: "+localStorage.getItem('token'));
    localStorage.removeItem("token");
    console.log(localStorage.getItem('token'));
    return true;
};

export default Logout;