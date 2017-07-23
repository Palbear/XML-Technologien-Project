### DBpedia Queries:


1. This Sparql Query retrieves the place of birth of the author:

```
prefix dbpedia: <http://dbpedia.org/resource/> 
prefix dbpedia-owl: <http://dbpedia.org/ontology/> 
select ?birthPlace ?place where { 
dbpedia:August_Strindberg dbpedia-owl:abstract ?abstract ; 
dbpedia-owl:birthPlace ?birthPlace . 
filter(langMatches(lang(?abstract),'en'))
?birthPlace rdfs:label ?place .
filter(langMatches(lang(?place),'en'))
}
```

2. This Sparql Query retrieves Info about the Depicted Person:

Birth Place :

```
PREFIX db: <http://dbpedia.org/resource/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/> 
PREFIX dbo: <http://dbpedia.org/ontology/> 

SELECT ?name ?place WHERE {
 ?author rdfs:label ?name .
 FILTER regex(?name, "Suzanne Roslin", "i")
 ?author dbo:birthPlace ?birthPlace .
 ?birthPlace rdfs:label ?place .
 filter(langMatches(lang(?place),'en'))

}
```

3. This Sparql Query retrieves Other Ten People born in the same place:

```
PREFIX db: <http://dbpedia.org/resource/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/> 
PREFIX dbo: <http://dbpedia.org/ontology/> 
prefix dbpedia: <http://dbpedia.org/resource/> 
prefix dbpedia-owl: <http://dbpedia.org/ontology/>
SELECT DISTINCT ?otherName
WHERE {      
dbpedia:Ferdinand_von_Wright dbpedia-owl:birthPlace ?birthPlace . 
?person dbo:birthPlace ?birthPlace . 
?person dbo:birthDate ?birth . 
?person foaf:name ?otherName .      
} 
LIMIT 10
```



4. This Sparql Query retrieves Movement of the Artist:

```
PREFIX db: <http://dbpedia.org/resource/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/> 
PREFIX dbo: <http://dbpedia.org/ontology/> 

SELECT ?name ?mov WHERE {
 dbpedia:Ferdinand_von_Wright rdfs:label ?name .
 FILTER regex(?name, "Pablo Picasso", "i")
 FILTER (LANG(?name) = "en")
 ?author dbo:movement ?movement .
 ?movement rdfs:label ?mov .
 FILTER (LANG(?mov) = "en")
}
```


5. This Sparql Query retrieves the description and the thumbnail of the author:

```
prefix dbpedia: <http://dbpedia.org/resource/> 
prefix dbpedia-owl: <http://dbpedia.org/ontology/> 
select ?abstract ?thumbnail where { 
dbpedia:Ferdinand_von_Wright dbpedia-owl:abstract ?abstract ; 
dbpedia-owl:thumbnail ?thumbnail . 
filter(langMatches(lang(?abstract),'en'))
}
```



6. This Sparql Query retrieves ten People who were born in Berlin on a date before the date of the painting

```
PREFIX db: <http://dbpedia.org/resource/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/> 
PREFIX dbo: <http://dbpedia.org/ontology/> 
SELECT ?name ?person
WHERE
{      
 ?person dbo:birthPlace db:Berlin .
 ?person dbo:birthDate ?birth .   
 ?person foaf:name ?name .      
 FILTER (?birth < "1900"^^xsd:date) . 
} 
LIMIT 10
```
