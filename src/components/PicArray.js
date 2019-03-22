import React, {Component} from 'react';

class PicArray extends Component {
    render() {
        return this.props.picArray.map((picArr, i) => (

            <tr key={i}>
                <td>
                    <img src={picArr.thumbnail} alt={picArr.title} />
                </td>
                <td>
                    <h3>{picArr.title}</h3>
                    <p>{picArr.details}</p>
                </td>
                <td>
                    <a href={picArr.filename}>View</a>
                </td>
            </tr>

        ));
    }
}
export default PicArray;