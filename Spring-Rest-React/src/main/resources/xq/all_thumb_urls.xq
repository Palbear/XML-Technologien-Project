declare namespace lido="http://www.lido-schema.org";
for $document in collection("sweden-clean") 
let $rec := $document//lido:recordID/text()
let $thumb := $document//lido:resourceRepresentation[@lido:type = 'image_thumb']
order by number($rec) 
return string-join((
    $rec, 
    ", ", 
    $thumb/lido:linkResource/text()
  ))