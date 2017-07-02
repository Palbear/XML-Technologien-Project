/**
 * Created by tarix on 02.07.17.
 */
const React = require('react');
const axios = require('axios');
import Painting from './Painting';
import {Button} from "react-bootstrap";

class PaintingList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            paintings: [],
            url: "http://localhost:8080/api/paintings"
        };
    }
    loadPaintingsFromServer(url) {
        let path = url ? url : "http://localhost:8080/api/paintings";
        let self = this;

        axios.get(path)
            .then(function(response) {
                self.setState({
                    paintings: response.data._embedded.paintings
                });
                console.log(paintings);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentWillMount() {
        this.loadPaintingsFromServer();
    }
    setFilter(word) {
        if (word === 'All') {
            this.loadPaintingsFromServer();
        } else if (word === 'Allaert') {
            this.loadPaintingsFromServer('http://localhost:8080/api/paintings/search/findByArtistLike?name=Allaert%20van%20Everdingen');
        } else if (word === 'David') {
            this.loadPaintingsFromServer('http://localhost:8080/api/paintings/search/findByArtistLike?name=David%20Kl%C3%B6cker%20Ehrenstrahl');
        } else if (word === 'Nicolas') {
            this.loadPaintingsFromServer('http://localhost:8080/api/paintings/search/findByArtistLike?name=Nicolas%20Lancret');
        }
    }
    render() {
        let rows = [];
        this.state.paintings.forEach(function(painting) {
            rows.push(
                <Painting painting={painting} key={painting.recordID} />);
        });
        return (
            <div>
                <Button onClick={() => this.setFilter('All')}>Home</Button>
                <Button onClick={() => this.setFilter('Allaert')}>Allaert</Button>
                <Button onClick={() => this.setFilter('David')}>David</Button>
                <Button onClick={() => this.setFilter('Nicolas')}>Nicolas</Button>
                {/*<div id='left-box' className='left-box'>
                    <div id='country' className='country'>
                        <span style="color:whitesmoke">COUNTRY</span>
                        <div id='selectCountry'></div>
                    </div>
                    <div id='category' className='category'>
                        <span style="color:whitesmoke">CATEGORY</span>
                        <div id='selectCategory'></div>
                    </div>
                    <div id='artist' className='artist'>
                        <span style="color:whitesmoke">ARTIST</span>
                        <div id='selectArtist'></div>
                    </div>
                    <div id='test' className='test'>
                        <span style="color:whitesmoke">
                        TEST : painting by <br/>
                        </span>
                        <div id='selectTest'></div>
                    </div>
                </div>*/}


                <table className="table table-striped right-box">
                    <thead>
                    <tr>
                        <th>RecordID</th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Category</th>
                        <th>View</th>
                    </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
};

module.exports = PaintingList;







