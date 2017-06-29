declare namespace lido="http://www.lido-schema.org";
for $document in collection("sweden-clean") 
let $recordId := $document//lido:recordID/text()
let $credit := $document//lido:rightsWorkSet/lido:creditLine/text()
let $y := $document//lido:resourceRepresentation[@lido:type = 'image_thumb']
for $event in $document//lido:event[lido:eventType/lido:term='Creation']
let $authors := $event//lido:eventActor//lido:actor
let $m := $document//lido:objectMeasurementsWrap
let $width := $m//lido:measurementsSet[lido:measurementType='Width']
let $height := $m//lido:measurementsSet[lido:measurementType='Height']
order by ($recordId)
return string-join((
    $recordId, 
    ",", 
    $document//lido:titleSet/lido:appellationValue,
     ",", 
    $authors//lido:nameActorSet/lido:appellationValue,
    ",",
    $document//lido:earliestDate/text(),
    ",",
    $document//lido:objectWorkType//lido:term/text(),
    ",",
    $document//lido:inscriptions/lido:inscriptionTranscription/text(),
	",",
    $document//lido:objectRelationWrap/lido:subjectSet/lido:subject/lido:appellationValue/text(),
    ",",
    $document//lido:eventMaterialsTech/lido:displayMaterialsTech/text(),
    ",",
     $width/lido:measurementValue/text(),
     "-",
     $height/lido:measurementValue/text(),
   ",",
    ",",
    $y/lido:linkResource/text()
  ))
