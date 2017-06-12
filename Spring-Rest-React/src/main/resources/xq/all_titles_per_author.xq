declare namespace lido="http://www.lido-schema.org";
for $document in collection("sweden-clean") 
for $x in $document//lido:recordID/text()
for $event in $document//lido:event 
let $aut := $event//lido:eventActor//lido:actor/lido:nameActorSet/lido:appellationValue/text()
where $aut = "Helmer Osslund"
order by number($x)
return string-join((
    document-uri($document),
    ", RECORD ID ", 
    $x, 
    ", ", 
    $event//lido:eventType//lido:term,
    ": ", 
    $event//lido:eventActor//lido:actor/lido:nameActorSet/lido:appellationValue,  
    ", PAINTING TITLE --- ", 
    $document//lido:titleSet/lido:appellationValue
  ))