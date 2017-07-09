/**
 * Created by tarix on 09.07.17.
 */
const React = require('react');
const axios = require('axios');
import { ReactRpg } from 'react-rpg';

class Gallery extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            paintings: [],
            images: [],
            url: "http://localhost:8080/api/paintings"
        };
    }
    loadPaintingsFromServer(url) {
        let path = url ? url : "http://localhost:8080/api/paintings";
        let self = this;

        axios.get(path)
            .then(function(response) {
                const paintings = response.data._embedded.paintings;
                const images = paintings.map((painting) => {
                    return {
                        url: painting.image_link,
                        clickHandler: (url, obj) => { console.log(url) }
                        }
                });
                self.setState({
                    paintings: response.data._embedded.paintings,
                    images: images
                });
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
        return (
            <div>
                <ReactRpg imagesArray={this.state.images} columns={[ 1, 2, 5 ]} padding={10} />
            </div>
        );
    }
};

module.exports = Gallery;







