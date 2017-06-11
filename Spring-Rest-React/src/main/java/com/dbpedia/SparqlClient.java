package com.dbpedia;

import java.util.ArrayList;

import com.hp.hpl.jena.query.ParameterizedSparqlString;
import com.hp.hpl.jena.query.QueryExecution;
import com.hp.hpl.jena.query.QueryExecutionFactory;
import com.hp.hpl.jena.query.ResultSet;
import com.hp.hpl.jena.query.ResultSetFactory;
import com.hp.hpl.jena.rdf.model.RDFNode;

/**
 * Not finished yet...
 *
 */


public class SparqlClient {

    public static ArrayList<String> getResolvedEntity(String label) {
        ParameterizedSparqlString qs = new ParameterizedSparqlString(""
                + "PREFIX dcterms: <http://purl.org/dc/terms/>\n"
                + "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n"
                + "SELECT ?categoryUri ?categoryName\n"
                + "WHERE {\n"
                + "  <http://dbpedia.org/resource/" + label + "> dcterms:subject ?categoryUri.\n"
                + "  ?categoryUri rdfs:label ?categoryName.\n"
                + "  FILTER (lang(?categoryName) = \"en\")\n"
                + "}");

        //System.out.println(qs);
        QueryExecution exec = QueryExecutionFactory.sparqlService("http://dbpedia.org/sparql", qs.asQuery());
        ResultSet results = ResultSetFactory.copyResults(exec.execSelect());
        ArrayList<String> KeywordsList = new ArrayList<>();
        try {
            while (results.hasNext()) {

                //System.out.println(results.next().get("categoryUri"));
                RDFNode cat = results.next().get("categoryUri");
                RDFNode name_en = results.next().get("categoryName");
                
                //System.out.println("Cat: " + cat);
                //System.out.println("Name: " + name_en.toString().replace("@en", ""));
                String name = name_en.toString().replace("@en", "");
                System.out.println("Category    : " + name);

                KeywordsList.add(name);

                //secondQuery(uri);
                ResultSet res = extractSubCategories(cat);
                try {
                    while (res.hasNext()) {
                        //System.out.println("Subcategory = " + res.next().get("label"));
                        String label_en = res.next().get("label").toString();
                        String name_label = label_en.replace("@en", "");
                                        System.out.println("Sub-Category: " + name_label);

                        KeywordsList.add(name_label);
                        //System.out.println(results.next().get("label"));

                    }
                } catch (Exception e) {
                }
                System.out.println("=========================================== ");

            }

        } catch (Exception e) {
        }
        //System.out.println("Keywords: " + KeywordsList);

        //ResultSetFormatter.out(results);
        return KeywordsList;
    }

    public static ResultSet extractSubCategories(RDFNode node) {
        
       ParameterizedSparqlString qs = new ParameterizedSparqlString(""
                + "prefix category:<http://dbpedia.org/resource/Category:>\n"
                + "prefix skos:<http://www.w3.org/2004/02/skos/core#>\n"
                + "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n"
                + "select ?value ?label\n"
                + "where {\n"
                + "<" + node + "> skos:broader ?value.\n"
                + "  ?value rdfs:label ?label.\n"
                + "  FILTER (lang(?label) = \"en\")\n"
                + "}");

        //System.out.println(qs);
        QueryExecution exec = QueryExecutionFactory.sparqlService("http://dbpedia.org/sparql", qs.asQuery());
        ResultSet results = ResultSetFactory.copyResults(exec.execSelect());

        //ResultSetFormatter.out(results);
        return results;
    }

    public static void main(String[] args) {
//        ArrayList<String> list = getResolvedEntity("Barack_Obama");

        ArrayList<String> list = getResolvedEntity("Sheffield_Wednesday_F.C.");
        System.out.println(list);
    }

}
