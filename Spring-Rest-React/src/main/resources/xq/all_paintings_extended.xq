declare namespace lido="http://www.lido-schema.org";
for $doc in collection("sweden-clean") 
let $recordId := $doc//lido:recordID/text()
let $credit := $doc//lido:rightsWorkSet/lido:creditLine/text()
let $thumb := $doc//lido:resourceRepresentation[@lido:type = 'image_thumb']
for $creationEvent in $doc//lido:event[lido:eventType/lido:term='Creation']
let $authors := $creationEvent//lido:eventActor//lido:actor
let $m := $doc//lido:objectMeasurementsWrap
let $width := $m//lido:measurementsSet[lido:measurementType='Width']
let $height := $m//lido:measurementsSet[lido:measurementType='Height']
let $title := $doc//lido:titleSet/lido:appellationValue[@xml:lang = 'sv']
order by ($recordId)
return string-join((
  
  '{ "recordId": ', 
    $recordId,  
    ', "title": "', 
      replace($title, '"', '\\"'), 
    '", "artist": "', 
      $authors//lido:nameActorSet/lido:appellationValue,
    '", "earliestDate": "',
      $creationEvent//lido:earliestDate,
    '", "displayDate": "',
      $creationEvent//lido:eventDate/lido:displayDate[@xml:lang = 'en'],
    '", "category": "',
      $doc//lido:objectWorkType//lido:term,
    '", "objectWorkType": "',
      $doc//lido:objectWorkType//lido:term,
    '", "classification": "',
      string-join($doc//lido:classification//lido:term, ", "),
    '", "inscriptions": "',
      string-join($doc//lido:inscriptions/lido:inscriptionTranscription, " "),
    '", "depictedPersons": "',
      $doc//lido:objectRelationWrap/lido:subjectSet/lido:subject/lido:appellationValue,
    '", "materials": "',
      $doc//lido:eventMaterialsTech/lido:displayMaterialsTech[@xml:lang = 'sv'],
    '", "width": "', 
      string-join($width/lido:measurementValue, " or "),
    '", "height": "',
      string-join($height/lido:measurementValue, " or "),
    '", "linkResourceThumb": "',
      $thumb/lido:linkResource, 
    '", "recordInfoLink": "',
      $doc//lido:recordInfoLink, 
    '", "recordRights": "',
      $doc//lido:recordRights/lido:rightsType/lido:term, 
    '", "rightsResource": "',
      "preferredRightsType: " 
      || $doc//lido:rightsResource/lido:rightsType/lido:term 
      || ", rightsHolder: " 
      || string-join($doc//lido:rightsResource/lido:rightsHolder//lido:appellationValue, ", "),  
    '" }'
  ))