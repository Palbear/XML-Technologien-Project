/**
 * Created by tarix on 09.07.17.
 */
const React = require('react');
import SimpleLink from './SimpleLink';

class ApiHelp extends React.Component{
    constructor(props) {
        super(props);
    }
 
    render() {
        return (
            <div>
                <div className="padded-container">
                		<h2>API Help</h2>

                		<p>This Rest Api is built on Spring Rest Framework.</p>
                		
                		<p>As soon as the database is loaded to the Spring Repository and to Rest Api, 
                		it is then saved into a persistence layer that can be easily queried with the URL of the Rest Api this way:</p>

                		<p>Number of Paintings per Page:</p>
                		
                		<SimpleLink url="http://localhost:8080/api/paintings?size=100" />

                		<p>Request Page Number:</p>

                		<SimpleLink url="http://localhost:8080/api/paintings?page=100" />

                		<p>Or both, go to page number and show number of Paintings:</p>

                		<SimpleLink url="http://localhost:8080/api/paintings?size=100&page=2" />


                		<h3>Search Queries:</h3>
                			
                		<p>In order to find Info about the possible search queries, please go to this Url:</p>

                		<SimpleLink url="http://localhost:8080/api/paintings/search/" />

                		<p>Example of search queries combined with the ‚size‘ and ‚page‘ parameters:</p>
 
                		<SimpleLink url="http://localhost:8080/api/paintings/search/findByCategoryLike?category=M%C3%A5lningar%20(M%C3%A5leri)&size=10&page=4" />

                		<p>Find Paintings by Measurements:</p>

                		<SimpleLink url="http://localhost:8080/api/paintings/search/findByMeasurementsLike?measurements=257-283" />

                		<p>Find all Paintings by Category:</p>

                		<SimpleLink url="http://localhost:8080/api/paintings/search/findByCategoryLike?category=M%C3%A5lningar%20(M%C3%A5leri)&size=10&page=4" />
                		
                		<p>Find all Paintings by Artist Name:</p>

                		<SimpleLink url="http://localhost:8080/api/paintings/search/findByArtistLike?name=Allaert%20van%20Everdingen" />
                		
                		<SimpleLink url="http://localhost:8080/api/paintings/search/findByArtistLike?name=David%20Kl%C3%B6cker%20Ehrenstrahl" />

                		<SimpleLink url="http://localhost:8080/api/paintings/search/findByArtistLike?name=Nicolas%20Lancret"/>
                		
                		<p>Find all Painting by Date:</p>

                		<SimpleLink url="http://localhost:8080/api/paintings/search/findByDateLike?date=1684"/>

                		<p>Find a specific Painting by recordID:</p>

                		<SimpleLink url="http://localhost:8080/api/paintings/search/findByRecordIDLike?recordid=100529" />
                		<SimpleLink url="http://localhost:8080/api/paintings/search/findByRecordIDLike?recordid=100358"/>
                 
                </div>              
            </div>
        );
    }
};

module.exports = ApiHelp;







