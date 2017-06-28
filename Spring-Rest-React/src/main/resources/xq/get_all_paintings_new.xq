declare namespace lido="http://www.lido-schema.org";
for $document in collection("sweden-clean") 
let $recordId := $document//lido:recordID/text()
let $credit := $document//lido:rightsWorkSet/lido:creditLine/text()
let $thumb := $document//lido:resourceRepresentation[@lido:type = 'image_thumb']
for $event in $document//lido:event[lido:eventType/lido:term='Creation']
let $authors := $event//lido:eventActor//lido:actor
let $m := $document//lido:objectMeasurementsWrap
let $width := $m//lido:measurementsSet[lido:measurementType='Width']
let $height := $m//lido:measurementsSet[lido:measurementType='Height']
order by ($recordId)
return string-join((
  
  '{ "recordId": ', 
    $recordId,  
    ', "title": "', 
    $document//lido:titleSet/lido:appellationValue,
    '", "artist": "', 
    $authors//lido:nameActorSet/lido:appellationValue,
    '", "earliestDate": "',
    $document//lido:earliestDate/text(),
    '", "category": "',
    $document//lido:objectWorkType//lido:term/text(),
    '", "inscriptions": "',
    $document//lido:inscriptions/lido:inscriptionTranscription/text(),
    '", "depictedPersons": "',
    $document//lido:objectRelationWrap/lido:subjectSet/lido:subject/lido:appellationValue/text(),
    '", "materials": "',
    $document//lido:eventMaterialsTech/lido:displayMaterialsTech/text(),
    '", "width": "', 
    $width/lido:measurementValue/text(),
    '", "height": "',
    $width/lido:measurementValue/text(),
    '", "linkResourceThumb": "',
    $thumb/lido:linkResource/text(), 
    '" }'
  ))