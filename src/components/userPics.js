import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';


const imgStyle = {
    'width': '40%',
}

const changeProfilePic = (id) => {
    console.log("asd "+id);
    addTag(id, 'Profile').then(
        tag => {
            console.log("Added ",tag);
        });
}

const Img2 = (props) => {

    const {thumbnails, screenshot, title, file_id} = props.pic;
    if (thumbnails !== null) {
        return <img src={mediaUrl + props.pic.filename} style={imgStyle} alt={title} onClick={() => props.handleChange(file_id)} />;
    } else {
        return <img src={mediaUrl + props.pic.filename} style={imgStyle} alt={title}/>;
    }
};



const UserPics = (props) => {

    const rows = props.picArray.map((item, i) => {
        return <Img2 key={i} pic={item} handleChange={props.handleChange}/>;
    });
    return (
        <Grid container>
            {rows}
        </Grid>
    );
};

UserPics.propTypes = {
    pics: PropTypes.array,
};

export default UserPics;