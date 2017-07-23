# Nationalmuseum Sweden Paintings

DATASET EVALUATION

**Dataset:** [https://github.com/NationalmuseumSWE/WikidataCollection](https://github.com/NationalmuseumSWE/WikidataCollection)

**Wikidata link:** [http://tools.wmflabs.org/autolist/autolist1.html?props=217&q=CLAIM%5B195%3A842858%5D](http://tools.wmflabs.org/autolist/autolist1.html?props=217&q=CLAIM%5B195%3A842858%5D)


## Content description

The dataset prepared by the Nationalmuseum Sweden in Stockholm provides information about a part of the paintings collection of the museum. 
The dataset consists of a number of XML files in LIDO-xml format. Each file contains metadata for a single painting, 
including title, creator, media and dimensions, often information on the depicted persons and more. Most of the descriptions are provided in Swedish language.
At the moment of writing the dataset included 13865 XML files concerning 5334 paintings.

The following image gives an example of selected metadata contained in a single painting item file:

![Painting item metadata]()

## XML files

The dataset consists of 13865 XML files. 
The file naming pattern is `Item_7011108`. 
The files are packed into 3 folders named by creation date: 

| Folder name | Files count | File item ids |
| ------------- | ------------- | ------------- |
| `16-09-07_14/46/28` | 5309 files | ids 7011108-7016452 |
| `16-09-29_23/16/57` | 5309 files | ids 7201049-7206393 |
| `16-12-16_18/34/55` | 3247 files | ids 7358521-7361767 |

After analysing the content of the files we found out, that every XML file contains a reference to a painting record (recordID). 
This record id comes from the internal database of the Nationalmuseum. This record id has been proved most useful for our data filtering, since it is unique for every painting. Having a look at the paintings files with the same record ids helped us realize that there can be up to 3 files for the same painting, each of them coming from a different folder. The file coming from the latest folder contains issue fixes for the files in the previous folders, or an updated information. For this reason we have left out all the older files and created a filtered dataset consisting of 5334 files, where all the described paintings are unique. It is worth noting, that the first folder contains only outdated files and could be completely ignored. So our 5334 files come only from the second and the third folders.

## Issues

- Issue with painting measurements data

Some paintings have more than 1 entry for painting measurements and measurements display info. 
In this case it is sometimes not clear, which measurements unit belong to which measurements display data.

Consider the following piece of data illustrating this issue:

```xml
<lido:objectMeasurementsWrap xmlns:lido="http://www.lido-schema.org" xmlns:gml="http://www.opengis.net/gml" xmlns:xalan="http://xml.apache.org/xalan">
  <lido:objectMeasurementsSet>
    <lido:displayObjectMeasurements>Mått 33 x 48 cm</lido:displayObjectMeasurements>
    <lido:displayObjectMeasurements>Ram 47 x 55 x 6 cm</lido:displayObjectMeasurements>
    <lido:objectMeasurements>

      <lido:measurementsSet>
        <lido:measurementType>Height</lido:measurementType>
        <lido:measurementUnit>cm</lido:measurementUnit>
        <lido:measurementValue>47</lido:measurementValue>
      </lido:measurementsSet>

      <lido:measurementsSet>
        <lido:measurementType>Depth</lido:measurementType>
        <lido:measurementUnit>cm</lido:measurementUnit>
        <lido:measurementValue>6</lido:measurementValue>
      </lido:measurementsSet>

      <lido:measurementsSet>
        <lido:measurementType>Width</lido:measurementType>
        <lido:measurementUnit>cm</lido:measurementUnit>
        <lido:measurementValue>55</lido:measurementValue>
      </lido:measurementsSet>

      <lido:measurementsSet>
        <lido:measurementType>Width</lido:measurementType>
        <lido:measurementUnit>cm</lido:measurementUnit>
        <lido:measurementValue>48</lido:measurementValue>
      </lido:measurementsSet>

      <lido:measurementsSet>
        <lido:measurementType>Height</lido:measurementType>
        <lido:measurementUnit>cm</lido:measurementUnit>
        <lido:measurementValue>33</lido:measurementValue>
      </lido:measurementsSet>

    </lido:objectMeasurements>
  </lido:objectMeasurementsSet>
</lido:objectMeasurementsWrap>

```

We can see, that the order of the entries for the `lido:displayObjectMeasurements` and for width / height infos presented in the `lido:objectMeasurements` element is reversed. Syntactically it is allowed by the lido xml schema, but it would have been better to either provide those infos in the correct order, or to wrap two different display infos into a separate `lido:objectMeasurementsSet` elements.

Problematic paintings e.g. with the following record ids:
100530, 100529, 101033, 101574, 101585

- Issue with author names

For some author names we could not find the information in the DBpedia by simply parsing the provided author name, even though the entry for this author exists. 

## Recommenations summary

- Since the dataset is available on Github and the Github project page already contains a brief description of the dataset contents, it might be useful to add there a couple of lines about the structure of the folders (that they may contain duplicated information for paintings with the same record ids, and in this case it is better to use the most recently updated one available in the most recent folder). 

- Use more links to global URIs, e.g. DBpedia page for an Author, because even if that contains local author id that is understandable for the Nationalmuseum database, it is easier to find out more additional information this way. (In accordance with Linked Data principles)

- Provide Author names in standardized format.

- When providing multiple dimensions and dimension display information, either order them coherently, or use separate wrapper for each dimensions unit.
