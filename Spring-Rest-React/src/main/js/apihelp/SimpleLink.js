/**
 * Created by tarix on 09.07.17.
 */
const React = require('react');

class SimpleLink extends React.Component{
    constructor(props) {
        super(props);
    }
 
    render() {
        return (
            <div>
                <p className="api-link"><a href={this.props.url}>{this.props.url}</a></p>             
            </div>
        );
    }
};

module.exports = SimpleLink;







