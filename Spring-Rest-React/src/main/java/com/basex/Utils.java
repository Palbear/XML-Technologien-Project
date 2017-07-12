package com.basex;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.FileUtils;

import com.basex.BaseXClient.Query;
import com.model.Painting;
import com.model.PaintingMapper;
public class Utils {
	
	/**
	 * This methods fires on application start. It reads all the selected paintings infos from XML-Datenbank 
	 * and transforms them into list of {@link Painting} objects
	 * 
	 * @return list of Painting objects
	 * @throws IOException
	 */
	public static List<Painting> getAllPainting() throws IOException{
		
		List<Painting> paintings = new ArrayList<>();
		
		try (BaseXClient session = new BaseXClient("localhost", 1984, "admin", "admin")) {
			
			// Use prepared XQuery to get all relevant for us painting infos from the XML files.
			File file = new File("src/main/resources/xq/all_paintings_2.xq");
			//File file = new File("/home/tarix/XML/XML-Technologien-Project/Spring-Rest-React/src/main/resources/xq/all_paintings_2.xq");
			final String input = FileUtils.readFileToString(file);
			
			try (Query query = session.query(input)) {
				// loop through all results
				while (query.more()) {
					PaintingMapper mapper = new PaintingMapper();
					Painting painting = mapper.setPainting(query.next());
					painting = mapper.getPainting();
					paintings.add(painting);
				}

				// print query info
				System.out.println(query.info());
			}			
		}
		
		return paintings;
	}

}
