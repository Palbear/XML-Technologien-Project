package com.basex;

import java.io.File;
import java.io.IOException;
//import javax.xml.xquery.XQConnection;
//import javax.xml.xquery.XQPreparedExpression;
//import javax.xml.xquery.XQSequence;
//import com.ddtek.xquery.xqj.DDXQDataSource
//import com.basex.BaseXClient.Query;
import java.io.PrintWriter;

import org.apache.commons.io.FileUtils;

import com.basex.BaseXClient.Query;

public class Main {

	public static void main(final String... args) throws IOException {
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
				
			}
			
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
	}

}
