declare namespace lido="http://www.lido-schema.org";
for $doc in collection("sweden-clean") 
let $recordId := $doc//lido:recordID/text()
where $recordId = 100530
return $doc