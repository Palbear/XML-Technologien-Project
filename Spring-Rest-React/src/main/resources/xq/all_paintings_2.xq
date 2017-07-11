declare namespace lido="http://www.lido-schema.org";
for $doc in collection("sweden-clean")
let $recordId := $doc//lido:recordID/text()
let $credit := $doc//lido:rightsWorkSet/lido:creditLine/text()
for $event in $doc//lido:event[lido:eventType/lido:term='Creation']
let $authors := $event//lido:eventActor//lido:actor
let $m := $doc//lido:objectMeasurementsWrap
let $width := $m//lido:measurementsSet[lido:measurementType='Width']/lido:measurementValue
let $height := $m//lido:measurementsSet[lido:measurementType='Height']/lido:measurementValue
for $depicted in $doc//lido:objectRelationWrap//lido:subject
let $depictedPerson := $depicted//lido:appellationValue/text()
let $sep := "_SPRTR_"
order by ($recordId)
return string-join((
    $recordId,
    $sep,
    string-join($doc//lido:titleSet/lido:appellationValue[@xml:lang='sv'], ", "),
    $sep,
    string-join($authors//lido:nameActorSet/lido:appellationValue, ", "),
    $sep,
    $doc//lido:earliestDate/text(),
    $sep,
    $doc//lido:objectWorkType//lido:term/text(),
    $sep,
    string-join($doc//lido:inscriptions/lido:inscriptionTranscription/text(), ". "),
    $sep,
    string-join($depictedPerson, ", "),
    $sep,
    string-join($doc//lido:eventMaterialsTech/lido:displayMaterialsTech, ", "),
    $sep,
    string-join($width, " or ") || "-" ||  string-join($height, " or "),
   $sep,
   "preferredRightsType: "
      || $doc//lido:rightsResource/lido:rightsType/lido:term
      || ", rightsHolder: "
      || string-join($doc//lido:rightsResource/lido:rightsHolder//lido:appellationValue, ", "),
    $sep,
    $doc//lido:resourceRepresentation[@lido:type = 'image_thumb']/lido:linkResource
  ))
