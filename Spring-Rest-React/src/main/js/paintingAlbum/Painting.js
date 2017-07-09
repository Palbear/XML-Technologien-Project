const React = require('react');
const ReactStrap = require('reactstrap');
import { Card, Button, CardImg, CardTitle, CardText, CardColumns, CardSubtitle, CardBlock } from "reactstrap";
import ModalView from './ModalView';

class Painting extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
        	<Card>
                <CardImg top width="425" height="350" src={this.props.painting.image_link} alt="Card image cap" />
                <CardBlock>
                  <ModalView src={this.props.painting} />
                </CardBlock>
            </Card>
            
        );
    }
};

module.exports = Painting;
