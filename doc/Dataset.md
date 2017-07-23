# Nationalmuseum Sweden Paintings

DATASET EVALUATION

**Dataset:** [https://github.com/NationalmuseumSWE/WikidataCollection](https://github.com/NationalmuseumSWE/WikidataCollection)

**Wikidata link:** [http://tools.wmflabs.org/autolist/autolist1.html?props=217&q=CLAIM%5B195%3A842858%5D](http://tools.wmflabs.org/autolist/autolist1.html?props=217&q=CLAIM%5B195%3A842858%5D)


## Content description

The dataset prepared by the Nationalmuseum Sweden in Stockholm provides information about a part of the paintings collection of the museum. 
The dataset consists of a number of XML files in LIDO-xml format. Each file contains metadata for a single painting, 
including title, creator, media and dimensions, often information on the depicted persons and more. 
At the moment of writing the dataset included 13865 XML files concerning 5334 paintings.

## XML files

The dataset consists of 13865 XML files. 
The file naming pattern is `Item_7011108`. 
The files are packed into 3 folders named by creation date: 

| Folder name | Files count | File item ids |
| ------------- | ------------- | ------------- |
| `16-09-07_14/46/28` | 5309 files | ids 7011108-7016452 |
| `16-09-29_23/16/57` | 5309 files | ids 7201049-7206393 |
| `16-12-16_18/34/55` | 3247 files | ids 7358521-7361767 |

After analysing the content of the files we found out, that every XML file contains a reference to a painting record id. 
This record id comes from the internal database of the Nationalmuseum. This record id has been proved most useful for our data filtering, since it is unique for every painting. Having a look at the paintings files with the same record ids helped us realize that there can be up to 3 files for the same painting, each of them coming from a different folder. The file coming from the latest folder contains issue fixes for the files in the previous folders, or an updated information. For this reason we have left out all the older files and created a filtered dataset consisting of 5334 files, where all described paintings are unique.
