const React = require('react');
import Toggle from 'react-toggle'

class ToggleImg extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showResults: false
        };

    }
    onClick() {
        let self = this;
        this.setState({
            showResults: !self.state.showResults
        });
    }
    render() {
        return (
            <div>
                <button className="btn btn-info" onClick={this.onClick}>view</button>
                <div className={'show-'+this.state.showResults}>
                    <img src={this.props.imgurl} width="175" height="250" />
                </div>
            </div>
        );
    }
}

module.exports = ToggleImg;
