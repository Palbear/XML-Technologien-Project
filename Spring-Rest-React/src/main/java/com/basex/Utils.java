package com.basex;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.FileUtils;

import com.basex.BaseXClient.Query;
import com.model.Painting;
import com.model.PaintingMapper;

import net.minidev.json.parser.ParseException;
public class Utils {
	
	public static List<Painting> getAllPainting() throws IOException, ParseException{
		
		List<Painting> paintings = new ArrayList<>();
		
		try (BaseXClient session = new BaseXClient("localhost", 1984, "admin", "admin")) {
			File file = new File("src/main/resources/xq/get_all_paintings_new.xq");
			final String input = FileUtils.readFileToString(file);
			
			try (Query query = session.query(input)) {
				// loop through all results
				while (query.more()) {
//					System.out.println(query.next());
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
