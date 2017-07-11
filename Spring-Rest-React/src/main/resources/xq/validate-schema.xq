declare namespace lido="http://www.lido-schema.org";
for $doc in collection("sweden-clean")
let $rec := $doc//lido:recordID/text()
where $rec < 14677
return validate:xsd-report($doc, "http://www.lido-schema.org/schema/v1.0/lido-v1.0.xsd")