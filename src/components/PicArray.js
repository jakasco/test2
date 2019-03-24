import React, {Component} from 'react';

const url = 'http://media.mw.metropolia.fi/wbma/uploads/';

class PicArray extends Component {
    render() {
        return this.props.picArray.map((picArr, i) => (
            <tr key={i}>
                <td>
                    <img src={url + picArr.thumbnails.w160} alt={picArr.title} />
                </td>
                <td>
                    <h4>{picArr.title}</h4>
                    <p>{picArr.description}</p>
                </td>
                <td>
                    <a href={url + picArr.filename}>View</a>
                </td>
            </tr>

        ));
    }
}
export default PicArray;