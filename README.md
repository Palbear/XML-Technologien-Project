# XML-Technologien-Project 2017

## Beschreibung

Kursseite: https://www.mi.fu-berlin.de/inf/groups/hcc/teaching/Sommersemester-2017/XML-Technologien.html

Datensatz: Gemälde - Nationalmuseum Schweden (https://github.com/NationalmuseumSWE/WikidataCollection). 
 
Datensatz auf Wikidata: http://tools.wmflabs.org/autolist/autolist1.html?props=217&q=CLAIM%5B195%3A842858%5D

Beispiel-Transformation eines Datensatz-Items mit XSLT: https://yj14.github.io/XML-Technologien-Project/

Der Datensatz ist ein Teil der Sammlung des Nationalmuseums in Stockholm. 
Das Nationalmuseum Schweden stellte LIDO-xml als Grundlage für die Importe zur Verfügung. 
Der Datensatz besteht aus etwa 13000 XML-Dateien mit Gemäldeinformationen.
Folgende Metadaten sind eingeschlossen: Künstler, Titel, Informationen zu den Medien und Dimensionen und öfters Informationen zu den abgebildeten Personen. 

## Initial Commit von Github-Desktop-Client

How to run BaseX:
1. Download BaseX from their Github repo : https://github.com/BaseXdb/basex.git
2. Go to {basex home}/basex-core/etc/
3. On Mac/Linux run the script basexserver / on Windows run basexserver.bat
4. Now BaseX is running on port 1984


# Projektdokumentation:

In diesem Projekt haben wir uns entschieden mit Spring und React.js zu arbeiten. Nach der Anleitung von Spring “¹” haben wir uns festgestellt, dass es möglich ist, eine React.js Webanwendung in einer Jar-Datei zu packen, so dass die JAR-Datei Backend und Frontend Technologien enthält.

## Backend:

1. Als erster Schritt haben wir uns für BaseX als XML-Datenbank-Verwaltungssystem entschieden. Mit BaseX konnten wir alle XML-Dateien importieren um eine Datenbank zu haben, und den Basex-Server auf port 1984 starten, so dass die JAR-Datei (unser Webanwendung) mit dem BaseX Server kommunizieren kann. 
Dafür wurde den BaseX-Java-Client benutzt und eine Xquery Geschrieben, die alle	
Gemälde und ihre Details extrahiert hat.

2. Das Backend Kern-technologie ist basiert auf Spring Boot, Spring JPA-Repositories und Spring Rest Framework. Mit der Xquery von Basex-Client haben wir alle Gemälde (Painting.java) gemappt und in einer JPA-Repository gespeichert. Diese Repository wurde eventuell als Basis für das Rest-Framework verwendet.

3.Für die Rest-Framework haben wir verschiedene Methoden geschrieben, die die Paintings Objekte filtern. Ein Beispiel ist die meiste verwendete Query, die die Paintings nach Namen filtert:
List<Painting> findByArtistLike(@Param("name") String artist, Pageable pageable);


## Frontend:

1. React (2 views)

2. DBpedia: Um Sparql-queries zu schreiben zu können, haben wir uns entschieden, dies direkt im 
Frontend zu benutzen (also nicht in Java sondern direkt in Javascript). Dafür haben wir 
ein npm Packet installiert und 6 verscheide Queries geschrieben, die uns von 
DBpedia, extra Informationen über die Paintings und ihre Künstlern liefern.
