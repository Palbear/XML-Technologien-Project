This Rest Api is built on Spring Rest Framework.
As soon as the database is loaded to the Spring Repository and to Rest Api, it is then saved into a persistence layer that can be easily queried with the URL of the Rest Api this way:

Number of Paintings per Page:
http://localhost:8080/api/paintings?size=100

Request Page Number:
http://localhost:8080/api/paintings?page=100

Or both, go to page number and show number of Paintings:
http://localhost:8080/api/paintings?size=100&page=2


Search Queries:
In order to find Info about the possible search queries, please go to this Url: http://localhost:8080/api/paintings/search/

Example of search queries combined with the ‚size‘ and ‚page‘ parameters:
http://localhost:8080/api/paintings/search/findByCategoryLike?category=M%C3%A5lningar%20(M%C3%A5leri)&size=10&page=4

Find Paintings by Measurements:
http://localhost:8080/api/paintings/search/findByMeasurementsLike?measurements=257-283

Find all Paintings by Category:
http://localhost:8080/api/paintings/search/findByCategoryLike?category=M%C3%A5lningar%20(M%C3%A5leri)&size=10&page=4

Find all Paintings by Author Name:
http://localhost:8080/api/paintings/search/findByArtistLike?name=Allaert%20van%20Everdingen
http://localhost:8080/api/paintings/search/findByArtistLike?name=David%20Kl%C3%B6cker%20Ehrenstrahl
http://localhost:8080/api/paintings/search/findByArtistLike?name=Nicolas%20Lancret

Find all Painting by Date:
http://localhost:8080/api/paintings/search/findByDateLike?date=1684

