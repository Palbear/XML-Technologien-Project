/**
 * Created by tarix on 02.07.17.
 *
 * Olf filter component. Delete?
 *
 */

// tag::filter[]
class Filter extends React.Component{
    render() {
        return (
            <div>
                <h3>Filter (only templates)</h3>
                <SelectCountry />
                <SelectCategory />
                <SelectArtist />
                <SelectTest/>
            </div>
        )
    }
}
// end::filter[]

// tag::selectCountry[]
class SelectCountry extends React.Component {
    constructor(props) {
        super(props);

        this.state = { value: 'select'};
    }
    onChange(e) {
        this.setState({
            value: e.target.value
        })
    }
    render() {
        return (
            <div className="form-group">
                <label htmlFor="selectCountry">Country</label>
                <br />
                <select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
                    <option value="select">Select an option</option>
                    <option value="sweden">Schweden</option>
                    <option value="germany">Deutschland</option>
                </select>
            </div>
        )
    }
}
// end::selectCountry[]

//tag::selectCategory[]
class SelectCategory extends React.Component {
    constructor(props) {
        super(props);

        this.state = { value: 'select'};
    }
    onChange(e) {
        this.setState({
            value: e.target.value
        })
    }
    render() {
        return (
            <div className="form-group">
                <label htmlFor="selectCategory">Category</label>
                <br />
                <select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
                    <option value="select">Select an option</option>
                    <option value="painting">Gemälde</option>
                    <option value="ceramics">Keramik</option>
                    <option value="portrait">Portrait</option>
                </select>
            </div>
        )
    }
}
//end::selectCategory[]

//tag::selectArtist[]
class SelectArtist extends React.Component {
    constructor(props) {
        super(props);

        this.state = { value: 'select'};
    }
    onChange(e) {
        this.setState({
            value: e.target.value
        })
    }
    render() {
        return (
            <div className="form-group">
                <label htmlFor="selectArtist">Artist</label>
                <br />
                <select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
                    <option value="select">Select an option</option>
                    <option value="a-f">A-F</option>
                    <option value="h-m">H-M</option>
                    <option value="n-t">N-T</option>
                    <option value="u-z">U-Z</option>
                </select>
            </div>
        )
    }
}

class SelectTest extends React.Component {
    constructor(props) {
        super(props);

        this.state = { value: 'select'};
    }
    onChange(e) {
        this.setState({
            value: e.target.value
        })
    }
    render() {
        return (
            <div className="form-group">
                <p>
                    <br/>
                </p>
                <select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
                    <option value="select">Select</option>
                    <option value="allaert">Allaert</option>
                    <option value="david">Daiv</option>
                    <option value="Niclas">Niclas</option>
                </select>
            </div>
        )
    }
}
//end::selectArtist[]
module.exports = Filter;
