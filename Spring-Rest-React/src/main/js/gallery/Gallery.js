/**
 * Created by tarix on 09.07.17.
 */
const React = require('react');
const axios = require('axios');
import { ReactRpg } from 'react-rpg';
import PaintingModal from './PaintingModal';
import {Pagination, ButtonToolbar, DropdownButton, MenuItem} from "react-bootstrap";
import Select from 'react-select';
//import 'react-select/dist/react-select.css';

class Gallery extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            paintings: [],
            images: [],
            selectedUrl:'',
            showModal: false,
            url: "http://localhost:8080/api/paintings",
            activePage: 1,
            pages: 1,
            authors: [],
            filterAuthor: []
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.setFilter = this.setFilter.bind(this);
    }
    componentWillMount() {
        this.initialiseFilter();
        this.loadPaintingsFromServer();
    }
    showModal(url, obj) {
        this.setState({
            showModal: true,
            selectedUrl: url,
        });
    }
    closeModal() {
        this.setState({
            showModal: false,
        });
    }
    handleSelect(page) {
        this.loadPaintingsFromServer('http://localhost:8080/api/paintings?page=' + page + '&size=20', page);
    }
    loadPaintingsFromServer(url, page) {
        let path = url ? url : "http://localhost:8080/api/paintings";
        let currentPage = page ? page : 1;
        let self = this;

        axios.get(path)
            .then(function(response) {
                let paintings = response.data._embedded.paintings;
                paintings = paintings.map((painting) => {
                   let newPainting = painting;
                   let arr = newPainting.image_link.split('&');
                   let resultString = arr[0];
                   for(let i = 1; i<arr.length; i++) {
                       if (arr[i].indexOf('objectId') > -1) {
                           resultString = resultString.concat('&').concat(arr[i]);
                           break;
                       }
                       resultString = resultString.concat('&').concat(arr[i]);
                   }
                    newPainting.smallImage = resultString;
                   return newPainting
                });
                const images = paintings.map((painting) => {
                    return {
                        url: painting.smallImage,
                        clickHandler: (url, obj) => { self.showModal(url, obj) }
                        }
                });
                self.setState({
                    paintings: response.data._embedded.paintings,
                    pages: response.data.page.totalPages,
                    images: images,
                    activePage: currentPage,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    setFilter(obj) {
        if (!obj) {
            this.loadPaintingsFromServer();
        } else {
            this.loadPaintingsFromServer('http://localhost:8080/api/paintings/search/findByArtistLike?name=' + obj.label);
        } //Allaert%20van%20Everdingen
    }
    render() {
        return (
            <div>
                <div className="section">
                    <Select
                        name="form-field-name"
                        value="one"
                        options={this.state.filterAuthor}
                        onChange={this.setFilter}
                    />
                </div>
                <div>
                    <ReactRpg imagesArray={this.state.images} columns={[ 1, 2, 5 ]} padding={10} />
                </div>

                <div className="content-centered">
                    <Pagination
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        items={this.state.pages}
                        maxButtons={5}
                        activePage={this.state.activePage}
                        onSelect={this.handleSelect}/>
                </div>
                
                <PaintingModal showModal={this.state.showModal} selectedUrl={this.state.selectedUrl} paintings={this.state.paintings}/>
            </div>
        );
    }

    initialiseFilter() {
        let authors = ['Abraham Bloemaert',
            'Abraham Bruegel',
            'Abraham Hendricksz van Beyeren',
            'Abraham Jansz Begeyn',
            'Abraham Lambertsz van den Tempel',
            'Abraham Schöpfer',
            'Abraham van Diepenbeeck',
            'Abraham van Diepenbeeck (Attributed to)',
            'Abraham van Diepenbeeck (Earlier attributed to)',
            'Abraham van Dijck',
            'Abraham Wuchters',
            'Abraham Wuchters (Attributed to)',
            'Acke Hallgren'
            ];
        this.setState({
            filterAuthor: authors.map((author) => { return {value: author.toLowerCase(), label: author}; }),
            authors: authors
        })
    }
};

module.exports = Gallery;
