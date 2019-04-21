import React, {Component} from 'react';
// import Table from '../components/Table';
import PropTypes from 'prop-types';
import ImageGrid from '../components/ImageGrid';
import {getUserMedia, deleteImg} from '../util/MediaAPI';

class MyFiles extends Component {

    state = {
        picArray: [],
    };

    deleteFile = (id) => {
        console.log('delete', id);
        // delete file
        deleteImg(id).then(response => {
            console.log("File deleted!");
        })
        this.updateImages();
    };

    updateImages = () => {
        getUserMedia(localStorage.getItem('token')).then((pics) => {
            console.log(pics);
            this.setState({picArray: pics});
        });
    };

    componentDidMount() {
        this.updateImages();
    }

    render() {
        return (
            <React.Fragment>
                {/* <Table picArray={picArray}/> */}
                <ImageGrid picArray={this.state.picArray} edit={true} deleteFile={this.deleteFile}/>
            </React.Fragment>
        );
    }
}

MyFiles.propTypes = {
    picArray: PropTypes.array,
};

export default MyFiles;




