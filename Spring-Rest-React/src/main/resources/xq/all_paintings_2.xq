declare namespace lido="http://www.lido-schema.org";
for $doc in collection("sweden-clean") 
let $recordId := $doc//lido:recordID/text()
let $credit := $doc//lido:rightsWorkSet/lido:creditLine/text()
let $y := $doc//lido:resourceRepresentation[@lido:type = 'image_thumb']
for $event in $doc//lido:event[lido:eventType/lido:term='Creation']
let $authors := $event//lido:eventActor//lido:actor
let $m := $doc//lido:objectMeasurementsWrap
let $width := $m//lido:measurementsSet[lido:measurementType='Width']
let $height := $m//lido:measurementsSet[lido:measurementType='Height']
let $sep := "_SPRTR_"
order by ($recordId)
return string-join((
    $recordId, 
    $sep, 
    $doc//lido:titleSet/lido:appellationValue,
     $sep, 
    $authors//lido:nameActorSet/lido:appellationValue,
    $sep,
    $doc//lido:earliestDate/text(),
    $sep,
    $doc//lido:objectWorkType//lido:term/text(),
    $sep,
    $doc//lido:inscriptions/lido:inscriptionTranscription/text(),
	$sep,
    $doc//lido:objectRelationWrap/lido:subjectSet/lido:subject/lido:appellationValue/text(),
    $sep,
    $doc//lido:eventMaterialsTech/lido:displayMaterialsTech/text(),
    $sep,
    string-join($height/lido:measurementValue, " or ") || "-" ||  string-join($height/lido:measurementValue, " or "),
   $sep,
   "preferredRightsType: " 
      || $doc//lido:rightsResource/lido:rightsType/lido:term 
      || ", rightsHolder: " 
      || string-join($doc//lido:rightsResource/lido:rightsHolder//lido:appellationValue, ", "),
    $sep,
    $y/lido:linkResource/text()
  ))
