/**
 * Created by tarix on 02.07.17.
 */
const React = require('react');
import ToggleImg from './ToggleImg';

class Painting extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <tr>
                <td>{this.props.painting.recordID}</td>
                <td>{this.props.painting.title}</td>
                <td>{this.props.painting.artist}</td>
                <td>{this.props.painting.category}</td>
                <td>
                    <ToggleImg imgurl={this.props.painting.image_link} />
                </td>
            </tr>
        );
    }
};

module.exports = Painting;
