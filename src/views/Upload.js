import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Button} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slider from '@material-ui/lab/Slider';

const previewStyle = {
  'width': '30%',
  'height': '20vh',
}
/**
const previewImgStyle = {
  'width': '100%',
    'filter': 'blur(20px)',
}*/

class Upload extends Component {
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/';
  state = {
    file: {
      title: '',
      description: '',
      filedata: null,
      filename: undefined,
    },
    loading: false,
    loadingStyle: {'display':'none'},
    imgSrc: null,
    contrast: '50%',
      brightness: '50%',
     sepia: 0,
  };

    previewImgStyle = {
        'width': this.state.value+'%',
        /* 'filter': 'blur('+this.state.value+'px)', */
    }


  previewImg = (file) => {
    const fileData = new FileReader();
    fileData.readAsDataURL(file);
    fileData.onloadend = function (e) {
      this.setState({
        imgSrc: [fileData.result]
    });
    }.bind(this);
  }

  handleFileChange = (evt) => {
    evt.persist();
    this.previewImg(evt.target.files[0]);
    console.log(evt.target.files[0]);
    this.setState((prevState) => ({
      file: {
        ...prevState.file,
        filedata: evt.target.files[0],
      },
    }));

  };

  handleInputChange = (evt) => {

    const target = evt.target;
    const value = target.value;
    const name = target.name;

    console.log(value, name);

    this.setState((prevState) => ({
      file: {
        ...prevState.file,
        [name]: value,

      },
    }));
  };



slideChange = (event, contrast) => {
  this.setState({ contrast });
};

brightnessChange = (event, brightness) => {
        this.setState({ brightness });
    };

    sepiaChange = (event, sepia) => {
        this.setState({ sepia });
    };


  handleFileSubmit = (evt) => {
  console.log(evt);
  this.setState({loading: true});
  this.setState({loadingStyle: {'display':'block'}});
  const fd = new FormData();
  fd.append('title', this.state.file.title);
  fd.append('description', this.state.file.description);
  fd.append('file', this.state.file.filedata);
    const options = {
      method: 'POST',
      body: fd,

       headers: {
          'x-access-token': localStorage.getItem('token'),
       }
    };

    fetch(this.mediaUrl + 'media', options).then(response => {
      return response.json();
    }).then(json => {
      console.log(json);
      setTimeout(() => {
        this.props.history.push('/home');
        this.props.getMedia();
        this.setState({loading: false});
        this.setState({loadingStyle: {'display':'none'}});
      }, 2000);

    });
  };

  render() {

    return (
        <React.Fragment>
          <h1>Upload</h1>
            <h2>Contrast: {this.state.contrast}</h2>
            <h2>Brightness: {this.state.brightness}</h2>
            <h2>Sepia: {this.state.sepia}</h2>
          <ValidatorForm onSubmit={this.handleFileSubmit}
                         onError={errors => console.log(errors)}
                         instantValidate={false}>
            <TextValidator name="title" label="Title" value={this.state.file.title}
                           onChange={this.handleInputChange}
                           validators={[
                             'required',
                             'minStringLength:3']}
                           errorMessages={[
                             'this field is required',
                             'minimum 3 charaters',
                             ]}
                           fullWidth
            />
            <TextValidator name="description" label="Description"
                           value={this.state.file.description}
                           onChange={this.handleInputChange}
                           validators={['required', 'minStringLength:3']}
                           errorMessages={[
                             'this field is required',
                             'minimum 3 charaters']}
                           fullWidth
                           multiline
                           rows={3}/>
            <TextValidator name="filedata" label="File" value={this.state.file.filename}
                           onChange={this.handleFileChange}
                           type="file"



                           fullWidth
            />
            <Button variant='contained' color='primary' type='submit'>Upload&nbsp;{this.state.loading && 'Loading...'}</Button>
          </ValidatorForm>
          <div style={this.state.loadingStyle}>
          <CircularProgress />
          </div>
            <div style={{'width':'40%'}} >
          <div style={previewStyle}>
            <img src={this.state.imgSrc} style={
                {'filter': 'brightness(' + this.state.brightness + '%) ' + 'contrast(' + this.state.contrast + ') ' + 'sepia(' + this.state.sepia + '%)',
                'WebkitTransition': 'all',
                'msTransition': 'all',
                'width': '100%',
                }

                /* {'width': '100%','filter': 'blur('+this.state.value+'px)'}*/} />
          </div>
              <div>
                  <h2>Contrast</h2>
            <Slider
                  value={this.state.contrast}
                  aria-labelledby="label"
                  onChange={this.slideChange}
              />
              </div>
            <div>
                <h2>Brightness</h2>
                  <Slider
                      value={this.state.brightness}
                      aria-labelledby="label"
                      onChange={this.brightnessChange}
                  />
            </div>
            <div>
                <h2>Sepia</h2>
                  <Slider
                      value={this.state.sepia}
                      aria-labelledby="label"
                      onChange={this.sepiaChange}
                  />
          </div>
            </div>
        </React.Fragment>
    );
  }
}

Upload.propTypes = {
  history: PropTypes.object,
  getMedia: PropTypes.func,
};

export default Upload;