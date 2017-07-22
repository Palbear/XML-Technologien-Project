# Projektdokumentation:


## Beschreibung

Kursseite: https://www.mi.fu-berlin.de/inf/groups/hcc/teaching/Sommersemester-2017/XML-Technologien.html

Datensatz: Gemälde - Nationalmuseum Schweden (https://github.com/NationalmuseumSWE/WikidataCollection). 
 
Datensatz auf Wikidata: http://tools.wmflabs.org/autolist/autolist1.html?props=217&q=CLAIM%5B195%3A842858%5D

Beispiel-Transformation eines Datensatz-Items mit XSLT: https://yj14.github.io/XML-Technologien-Project/

Der Datensatz ist ein Teil der Sammlung des Nationalmuseums in Stockholm. 
Das Nationalmuseum Schweden stellte LIDO-xml als Grundlage für die Importe zur Verfügung. 
Der Datensatz besteht aus etwa 13000 XML-Dateien mit Gemäldeinformationen.
Folgende Metadaten sind eingeschlossen: Künstler, Titel, Informationen zu den Medien und Dimensionen und öfters Informationen zu den abgebildeten Personen. 

In diesem Projekt haben wir uns entschieden mit Spring und React.js zu arbeiten. Nach der Anleitung von Spring “¹” haben wir uns festgestellt, dass es möglich ist, eine React.js Webanwendung in einer Jar-Datei zu packen, so dass die JAR-Datei Backend und Frontend Technologien enthält.

## Backend:

1. Als erster Schritt haben wir uns für BaseX als XML-Datenbank-Verwaltungssystem entschieden. Mit BaseX konnten wir alle XML-Dateien importieren um eine Datenbank zu haben, und den Basex-Server auf port 1984 starten, so dass die JAR-Datei (unser Webanwendung) mit dem BaseX Server kommunizieren kann. 
Dafür wurde den BaseX-Java-Client benutzt und eine Xquery Geschrieben, die alle	
Gemälde und ihre Details extrahiert hat.


#### How to run BaseX:

    a. Download BaseX from their Github repo : https://github.com/BaseXdb/basex.git
    b. Go to {basex home}/basex-core/etc/
    c. On Mac/Linux run the script basexserver / on Windows run basexserver.bat
    d. Now BaseX is running on port 1984

2. Das Backend Kern-technologie ist basiert auf Spring Boot, Spring JPA-Repositories und Spring Rest Framework. Mit der Xquery von Basex-Client haben wir alle Gemälde (Painting.java) gemappt und in einer JPA-Repository gespeichert. Diese Repository wurde eventuell als Basis für das Rest-Framework verwendet.

3. Für die Rest-Framework haben wir verschiedene Methoden geschrieben, die die Paintings Objekte filtern. Ein Beispiel ist die meiste verwendete Query, die die Paintings nach Namen filtert:

    List<Painting> findByArtistLike(@Param("name") String artist, Pageable pageable);


## Frontend:

1. React (2 views)
Das Frontend besteht aus zwei Views(Image Gallery, Painnting inforamtion) und verschiedennen Komponennten(**Pagination, Modalwindows, Filter, Routing...**). Die Komponennten und Views wurden gutem Aussehen zufolge mit dem CSS gestylet.

**Image Gallery**
Bei diesem View werden die Thumbnails gleich verteilt in dem Grid 4x5 angezeigt. Die bekommenen Urls vom Server werden entsprechend bearbeitet(geparst), um die Thubnails yu hollen. Hier wird auch Pagination und Filter benutzt.

**Painnting inforamtion**
Diess View wird nach der Interaktion im ersten View angezeigt. Nach dem du das Bild auswählst wird automatisch die Painting Inforamtion angezeigt. Der Teil von Daten wird vom Server bekommen. Der andere Teil wird mit der Hilfe vom SPARQL-Anfragen an dbpedia.org geholt. 
Vom dpbedia.org bekommen wir Solche Info als Author-Beschreibung, Autors Foto, andere Autoren, die an gleichem Ort geboren wurde usw.
Einen Beispiel vom SPARQL-Anfrage:
```html
        let query = 'prefix dbpedia: <http://dbpedia.org/resource/> prefix dbpedia-owl: <http://dbpedia.org/ontology/> select ?mov where { dbpedia:' + author.split(' ').join('_') + ' dbpedia-owl:abstract ?abstract ; dbpedia-owl:movement ?movement . filter(langMatches(lang(?abstract),"en"))?movement rdfs:label ?mov .filter(langMatches(lang(?mov),"en"))}';
        let self = this;
        dps.client()
            .query(query)
            .timeout(15000) 
            .asJson() // or asXml()
            .then(function (r) {
                console.log(r);
                self.setState({
                    movement: r.results.bindings
                });
            }).catch(function (e) {
            console.log(e)
        });
 ```
        

**Pagination, Modalwindows, Filter, Routing...**
Die meisten Komponennten wurde vom react-bootstrap importiert. Dabei sind Pagination, Modalwindows, Filter, Routing, ModalWindow, ReactRpg und die andere. Die gehloten Daten vom unserem Backend-Server bzw vom Server dbpedia.org sind  entsprechend für die jede Komnponente bei dem Frontend vorbereitet. Zum Beispiel Verarbeitung von Url's für die Thumbnails:

```html
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
```
Der Filter ist nur nach Autoren implementirert. Der Filter hat auch Autocomplete. Für den benutzen wir unseren API-Enpoint mit der Suche nach Author:
```
'http://localhost:8080/api/paintings/search/findByArtistLike?name=' + obj.label
```

2. DBpedia: Um Sparql-queries zu schreiben zu können, haben wir uns entschieden, dies direkt im 
Frontend zu benutzen (also nicht in Java sondern direkt in Javascript). Dafür haben wir 
ein npm Packet installiert und 6 verscheide Queries geschrieben, die uns von 
DBpedia, extra Informationen über die Paintings und ihre Künstlern liefern.

3. Einbettung der **Metadaten** in die Web-Seite

Für die Einbettung der Metadaten haben wir URIs von http://schema.org/ benutzt. 

Gemäldeinfo-Popup wurde mit Metadaten-Markierung mittels **Microdata** ausgestattet. 

(Vgl. `XML-Technologien-Project/Spring-Rest-React/src/main/js/gallery/PaintingModal.js`)

Der Gemäldebereich wird als Painting markiert und die dazugehörigen Informationen erhalten solche Markierungen wie image, title, creator (Person, name), dateCreated, material, licence, url). Im Endeffekt sehen relevante Seitenteile etwa wie folgt aus:

```html
<div class="modal-dialog" itemscope itemtype="http://schema.org/Painting">
    <img itemprop="image" src="http://emp-web-22.zetcom.ch/eMuseumPlus?service=ImageAsset&module=collection&objectId=101028&viewType=detailView&resolution=superImageResolution" width="100%">
    ...
    <span itemprop="name">Sofia Magdalena 1746-1813, prinsessa av Danmark, drottning av Sverige, gift med Gustav III</span>
    ...
    <span itemprop="creator" itemscope itemtype="http://schema.org/Person">
        <span itemprop="name">Alexander Roslin</span></span>
    ...
    <span itemprop="dateCreated">1774</span>
    ...
    <a itemprop="url" href="http://collection.nationalmuseum.se/eMuseumPlus?service=ExternalInterface&module=collection&objectId=101028&viewType=detailView" class="button">Nationalmuseum Sweden page: Record 101028</a>
    ...
```

Filtered-Paintings-Seite wurde mit Metadaten mittels **RDFa** markiert.

(vgl. `XML-Technologien-Project/Spring-Rest-React/src/main/js/paintingList/Painting.js`)

Relevante HTML-Teile für das gleiche Beispiel-Gemälde sehen dann wie folgt aus:

```html
<tr vocab="http://schema.org/" typeof="Painting">
    ...
    <span property="name">Sofia Magdalena 1746-1813, prinsessa av Danmark, drottning av Sverige, gift med Gustav III</span>
    ...
    <div property="creator" typeof="Person">
        <span property="name">Alexander Roslin</span></div>
    ...
```
