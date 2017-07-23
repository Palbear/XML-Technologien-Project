# Projektdokumentation:

Datensatz: Gemälde - Nationalmuseum Schweden (https://github.com/NationalmuseumSWE/WikidataCollection). 

Datensatzbewertung: https://github.com/YJ14/XML-Technologien-Project/blob/master/doc/Dataset.md

Vorlesungsseite: http://www.mi.fu-berlin.de/en/inf/groups/hcc/teaching/Summer-Term-2017/XML-Technologien.html

Autoren: Hyekyeong Han, Lidia Krus, Severina Virovska, Suzana Puscasu, Taras Kolba, Yamen Jeries

## Abstract

In diesem Projekt haben wir uns mit den Daten befasst, die einen Teil der Sammlung des Nationalmuseums in Stockholm beschreiben. Der Datensatz bestand aus 13865 XML-Dateien mit Gemäldeinformationen im Format LIDO-xml.
Wir haben Duplikate ausgefiltert und im Endeffekt mit 5334 XML-Dateien gearbeitet (1 Datei pro Gemälde).<br />
Die Daten haben wir benutzt, um eine Art der Online-Galerie zu erstellen, wo man sich die Sammlung anschauen kann, und erweiterte Informationen für einzelne Gemälde zu sehen bekommen kann. Die Gemäldeinformationen kommen dabei aus zwei Quellen: 
zum einen aus den XML-Dateien selbst, zum anderen aus DBpedia. Die Links auf entsprechende Seiten des Nationalmuseums sind auch vorhanden. Die entstandene Anwendung wurde mittels Spring und React.js, unter Benutzung von BaseX und den in der Vorlesung gelernten XML-Technologien implementiert.

## Anwendung

In diesem Projekt haben wir uns entschieden, mit Spring und React.js zu arbeiten. Nach der Anleitung von Spring haben wir festgestellt, dass es möglich ist, eine React.js Webanwendung in einer JAR-Datei zu packen, so dass die JAR-Datei Backend- und Frontend-Technologien enthält.

## Architektur:

![Architektur-Diagramm](https://github.com/YJ14/XML-Technologien-Project/blob/master/doc/Architecture.jpg)

## Backend:

1. BaseX ist ein XML-Datenbankmanagementsystem, das eine tabellarische Abbildung von Baumstrukturen für die Speicherung von XML-Dokumenten verwendet. Mit der GUI von BaseX konnten wir alle XML-Dateien importieren, um eine Datenbank zu haben. Diese Datenbank konnte man mit Xquery und Xpath anfragen.  
Der Basex-Server ist dann auf port 1984 gestartet, so dass die JAR-Datei (unsere Webanwendung) mit dem BaseX Server kommunizieren kann. 

Dafür wurde den BaseX-Java-Client benutzt und eine XQuery geschrieben, die alle
Gemälde und ihre Details extrahiert hat. ([XQuery hier](https://github.com/YJ14/XML-Technologien-Project/blob/master/Spring-Rest-React/src/main/resources/xq/all_paintings_2.xq))


#### BaseX:

    a. Download BaseX from the Github repo : https://github.com/BaseXdb/basex.git
    b. Go to {basex home}/basex-core/etc/
    c. On Mac/Linux run the script basexserver / on Windows run basexserver.bat
    d. Now BaseX is running on port 1984

2. Das Backend Kern-technologie ist basiert auf Spring Boot, Spring JPA-Repositories und Spring Rest Framework. Mit der XQuery von Basex-Client haben wir alle Gemälde (Painting.java) gemappt (siehe [PaintingMapper](https://github.com/YJ14/XML-Technologien-Project/blob/master/Spring-Rest-React/src/main/java/com/model/PaintingMapper.java)) und in einer JPA-Repository gespeichert (siehe hier die Klasse [DatabaseLoader.java](https://github.com/YJ14/XML-Technologien-Project/blob/master/Spring-Rest-React/src/main/java/com/model/DatabaseLoader.java)). Diese Repository wurde eventuell als Basis für das Rest-Framework verwendet.

3. Für das REST-Framework haben wir verschiedene Methoden geschrieben, die die Paintings Objekte filtern. Ein Beispiel ist die meiste verwendete Query, die die eine Liste von Paintings nach den Autorennamen filtert:


```
 List<Painting> findByArtistLike(@Param("name") String artist, Pageable pageable);
```

und um ein Painting-Objekt nach recordID zu bekommen: 

```
 Painting findByRecordIDLike(@Param("recordid") String date);
```

Siehe die [Implementierungsdetails](https://github.com/YJ14/XML-Technologien-Project/blob/master/Spring-Rest-React/src/main/java/com/model/PaintingsRepository.java) zum Filtern von Painting-Objekte in der PaintingsRepository Klasse.

## Frontend:

1. React
Das Frontend besteht aus zwei Views(Image Gallery, Painting information) und verschiedenen Komponenten(**Pagination, Modalwindows, Filter, Routing...**). 

**Image Gallery**
Bei diesem View werden die Thumbnails gleich verteilt in dem Grid 4x5 angezeigt. Die vom Server erhaltenen Urls werden entsprechend bearbeitet(geparst), um die Thubnails zu hollen. Hier wird auch Pagination und Filter benutzt.

**Painting information**
Dieses View wird nach der Interaktion im ersten View angezeigt. Nachdem man ein Bild durch Anklicken auswählt, wird automatisch die Painting-Information angezeigt. Ein Teil von Daten kommt vom Server. Der andere Teil wird mit der Hilfe vom SPARQL-Anfragen an dbpedia.org geholt. 
Vom dpbedia.org bekommen wir solche Info wie Author-Beschreibung, Foto des Autors, andere Autoren mit dem gleichen Geburtsort usw.
        
**Pagination, Modalwindows, Filter, Routing...**
Die meisten Komponennten wurde vom react-bootstrap importiert. Dazu gehören Pagination, Modalwindows, Filter, Routing, ModalWindow, ReactRpg u.a. Die gehloten Daten von unserem Backend-Server bzw. vom Server dbpedia.org sind entsprechend für jede Komnponente bei dem Frontend vorbereitet. (Z.B. Urls für die Image-Thumbnails werden angepasst)

Der Filter ist nur nach Autoren implementirert. Der Filter hat auch Autocomplete-Feature. Dafür benutzen wir unseren API-Enpoint mit der Suche nach dem Author:
```
'http://localhost:8080/api/paintings/search/findByArtistLike?name=' + obj.label
```

2. DBpedia: Um SPARQL-Queries schreiben zu können, haben wir uns entschieden, dies direkt im 
Frontend zu benutzen (also nicht in Java sondern direkt in Javascript). Dafür haben wir 
ein npm Packet installiert und 6 verscheide Queries geschrieben, die uns von 
DBpedia, extra Informationen über die Paintings und ihre Künstlern liefern.

3. Einbettung der **Metadaten** in die Web-Seite

Für die Einbettung der Metadaten haben wir URIs von http://schema.org/ benutzt. 
Der Gemäldebereich wird als Painting markiert und die dazugehörigen Informationen erhalten Markierungen wie image, title, creator (Person, name), dateCreated, material, licence, url). 

Gemäldeinfo-Popup wurde mit Metadaten-Markierung mittels **Microdata** ausgestattet. 
(Code [hier](https://github.com/YJ14/XML-Technologien-Project/blob/master/Spring-Rest-React/src/main/js/gallery/PaintingModal.js)). 
Filtered-Paintings-Seite wurde mit Metadaten mittels **RDFa** markiert. 
(Code [hier](https://github.com/YJ14/XML-Technologien-Project/blob/master/Spring-Rest-React/src/main/js/paintingList/Painting.js)).

## Implementierungsdetails:

#### XML-Technologien im Backend

- **XPath/XQuery**: verwendet im Backend, um die Gemäldeliste im Backend zu initialisieren. 
([XQuery hier](https://github.com/YJ14/XML-Technologien-Project/blob/master/Spring-Rest-React/src/main/resources/xq/all_paintings_2.xq)). Auch während der Projekt-Anfangsphase wurde für die Analyse des Datensatzes verwendet.

- **XSLT** Findet Verwendung in der Projektdarstellungsseite. Beispiel-Transformation eines Datensatz-Items mit XSLT: https://yj14.github.io/XML-Technologien-Project/. 

- **XML-Schema** wurde während der Erstellung der Datenbank für die Validierung der XML-Dateien des Datensatzes verwendet. 

#### SPARQL

Beispiel einer SPARQL-Anfrage:

```
let query = 'prefix dbpedia: <http://dbpedia.org/resource/> 
             prefix dbpedia-owl: <http://dbpedia.org/ontology/> 
             select ?mov where { 
               dbpedia:' + author.split(' ').join('_') + ' dbpedia-owl:abstract ?abstract ; dbpedia-owl:movement ?movement . 
               filter(langMatches(lang(?abstract),"en"))?movement rdfs:label ?mov .
               filter(langMatches(lang(?mov),"en"))
               }';
```
 
Weitere SPARQL-Queries [hier](https://github.com/YJ14/XML-Technologien-Project/blob/master/Spring-Rest-React/src/main/js/gallery/PaintingModal.js). 

#### Einbettung der Metadaten

- Gemäldeinfo-Popup mit **Microdata**. 

(Vgl. [`XML-Technologien-Project/Spring-Rest-React/src/main/js/gallery/PaintingModal.js`](https://github.com/YJ14/XML-Technologien-Project/blob/master/Spring-Rest-React/src/main/js/gallery/PaintingModal.js))

Im Endeffekt sehen relevante Seitenteile etwa wie folgt aus:

```html
<div class="modal-dialog" itemscope itemtype="http://schema.org/Painting">
    <img itemprop="image" src="http://emp-web-22.zetcom.ch/eMuseumPlus?service=ImageAsset&module=collection&objectId=101028&viewType=detailView&resolution=superImageResolution" width="100%">
    ...
    <span itemprop="name">Sofia Magdalena 1746-1813, prinsessa av Danmark, drottning av Sverige, gift med Gustav III</span>
    ...
    <span itemprop="creator" itemscope itemtype="http://schema.org/Person">
        <span itemprop="name">Alexander Roslin</span></span>
    ...
```

- Filtered-Paintings-Seite mit **RDFa**.

(vgl. [`XML-Technologien-Project/Spring-Rest-React/src/main/js/paintingList/Painting.js`](https://github.com/YJ14/XML-Technologien-Project/blob/master/Spring-Rest-React/src/main/js/paintingList/Painting.js))

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
