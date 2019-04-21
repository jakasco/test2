import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getSingleMedia} from '../util/MediaAPI';



class Single extends Component {
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  state = {
    file: 'http://placekitten.com/200/200',
    filters: {
      brightness: 100,
      contrast: 100,
      warmth: 0,
      saturation: 100,
    },
  };

  getDescription = (text) => {
    const pattern = '\\[d\\]((.|[\\r\\n])*?)\\[\\/d\\]';
    const re = new RegExp(pattern);
    console.log(re.exec(text));
    try {
      return re.exec(text)[1];
    } catch (e) {
      return text;
    }
  };

  getFilters = (text) => {
    const pattern = '\\[f\\](.*?)\\[\\/f\\]';
    const re = new RegExp(pattern);
    console.log("text: "+text);
    try {
      return JSON.parse(re.exec(text)[1]);
    } catch (e) {
       console.log(e);
      return this.state.filters;
    }
  };

  componentDidMount() {
    const {id} = this.props.match.params;
    getSingleMedia(id).then(pic => {
      console.log(pic);
      this.setState({file: pic});
      console.log("File: ",this.state.file);
      const desc = this.getDescription(this.state.file.description);
      console.log("desc: ",desc);
    });
  }



  render() {
    return (
        <div>
          <video width="320" height="240" controls >
            <source src={this.state.file.filename} type={"video/mp4"} />
                Your browser does not support the video tag.
          </video>
          <img src={this.mediaUrl + this.state.file.filename} alt={this.state.file.title}/>
        </div>
    );
  }

}

Single.propTypes = {
  match: PropTypes.object,
};

export default Single;