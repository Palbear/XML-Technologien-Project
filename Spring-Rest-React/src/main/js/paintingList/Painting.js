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
            <tr vocab="http://schema.org/" typeof="Painting">
                <td>{this.props.painting.recordID}</td>
                <td><span property="name">{this.props.painting.title}</span></td>
                <td>
                	<div property="creator" typeof="Person">
                		<span property="name">{this.props.painting.artist}</span>
                	</div>              	
                </td>
                <td>{this.props.painting.category}</td>
                <td>
                    <ToggleImg imgurl={this.props.painting.image_link} />
                </td>
            </tr>
        );
    }
};

module.exports = Painting;
