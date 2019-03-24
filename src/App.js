import React, {Component} from 'react';
import './App.css';
import PicArray from './components/PicArray';

const url = 'http://media.mw.metropolia.fi/wbma/media/';

class App extends Component {

    state = {
        picArray: [ ],
    };

componentDidMount() {
    fetch( url).then((response) => {
        return response.json();
    }).then( (json) => {
        json.map(item => {
            return fetch(url + item.file_id).then(response => {
                return response.json();
            }).then(items => {
                console.log(items);
                this.setState({
                    picArray: [...this.state.picArray, items]
                })
            });
        });
    });
}




render() {
    return (
        <table>
            <tbody>
            <PicArray picArray={this.state.picArray}/>
            </tbody>
        </table>
    );
    }
}
export default App;