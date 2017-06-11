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
			File file = new File("src/main/resources/xq/query_von_lidia.xq");
			final String input = FileUtils.readFileToString(file);

			try (Query query = session.query(input)) {
				// loop through all results
				while (query.more()) {
					System.out.println(query.next());
				}

				// print query info
				System.out.println(query.info());
			}
		}
	}

}
