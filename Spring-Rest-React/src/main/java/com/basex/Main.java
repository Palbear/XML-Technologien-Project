package com.basex;

import java.io.File;
import java.io.IOException;
//import javax.xml.xquery.XQConnection;
//import javax.xml.xquery.XQPreparedExpression;
//import javax.xml.xquery.XQSequence;
//import com.ddtek.xquery.xqj.DDXQDataSource
//import com.basex.BaseXClient.Query;
import java.io.PrintWriter;

import javax.xml.XMLConstants;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;

import org.apache.commons.io.FileUtils;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;

import com.basex.BaseXClient.Query;

/**
 * This class is merely for testing purposes, to quickly try out the results of the queries etc.
 */
public class Main {

	public static void main(final String... args) throws IOException {
		
		
		String pathXml = "src/main/resources/static/sampleItems/Item_Sample.xml";
		String pathSchema = "src/main/resources/static/sampleItems/lido-v1.0.xsd";
		//String pathSchemaRemote = "http://www.lido-schema.org/schema/v1.0/lido-v1.0.xsd";
		//String pathSchema = "src/main/resources/static/sampleItems/mini-lido-schema.xsd";
		
		//validateSchemaTest(pathXml, pathSchema);
		
		//testGetAllPaintings();
		testXslt();		
	}
	
	private static void testXslt() {
		String pathXml = "src/main/resources/static/sampleItems/xslt/data.xml";
		String pathXsl = "src/main/resources/static/sampleItems/xslt/languages.xsl";
	
	
		File stylesheet = new File(pathXsl);
        File datafile = new File(pathXml);

        DocumentBuilder builder;
		try {

	        // Use a Transformer for output	        
	        TransformerFactory factory = TransformerFactory.newInstance();
	        Source xslt = new StreamSource(stylesheet);
	        Transformer transformer = factory.newTransformer(xslt);

	        Source text = new StreamSource(datafile);
	        transformer.transform(text, new StreamResult(new File("src/main/resources/static/sampleItems/xslt/output.xml")));
	        
	        System.out.println("Finished xslt");       
						
		} catch (TransformerConfigurationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (TransformerException e) {		
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
        

	}
	
	private static void testGetAllPaintings() {
		// create session
				try (BaseXClient session = new BaseXClient("localhost", 1984, "admin", "admin")) {
					File file = new File("src/main/resources/xq/all_paintings_2.xq");
					//File file = new File("src/main/resources/xq/get_all_paintings_new.xq");
					final String input = FileUtils.readFileToString(file);

					try (Query query = session.query(input)) {
						// loop through all results
						while (query.more()) {	
							String res = query.next();
							System.out.println(res);
						}

						// print query info
						System.out.println(query.info());
						
						/*
						File file2 = new File("src/main/resources/xq/validate-schema.xq");
						final String input2 = FileUtils.readFileToString(file2);

						try (Query query = session.query(input2)) {
							// loop through all results
							while (query.more()) {	
								String res = query.next();
								System.out.println(res);
							}

							// print query info
							System.out.println(query.info());
							
						}
						*/
					} 
					
				} catch (Exception e) {
					e.printStackTrace();
				}
							
	}

	
	private static void validateSchemaTest(String localPathInstanceXml, 
											String localPathSchema) {
		try {
			// parse an XML document into a DOM tree
			DocumentBuilder parser = DocumentBuilderFactory.newInstance().newDocumentBuilder();
			Document document = parser.parse(new File(localPathInstanceXml));

			// create a SchemaFactory capable of understanding WXS schemas
			SchemaFactory factory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);

			// load a WXS schema, represented by a Schema instance
			Source schemaFile = new StreamSource(new File(localPathSchema));
			Schema schema = factory.newSchema(schemaFile);

			// create a Validator instance, which can be used to validate an instance document
			Validator validator = schema.newValidator();

			// validate the DOM tree
			try {
			    validator.validate(new DOMSource(document));
			} catch (SAXException e) {
			    // instance document is invalid!
				e.printStackTrace();
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
	}

}
