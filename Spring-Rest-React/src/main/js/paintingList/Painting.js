const React = require('react');
const Modal = require('react-modal');
import ToggleImg from './ToggleImg';
import ModalView from './ModalView';

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
                	<ModalView src={this.props.painting} />
                	{/* <ToggleImg imgurl={this.props.painting.image_link} /> */}
                </td>
            </tr>
        );
    }
};

module.exports = Painting;