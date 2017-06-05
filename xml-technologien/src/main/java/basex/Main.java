package basex;

import java.io.IOException;

import basex.BaseXClient.Query;

public class Main {

	public static void main(final String... args) throws IOException {
	    // create session
	    try(BaseXClient session = new BaseXClient("localhost", 1984, "admin", "admin")) {
	      // create query instance
	      final String input = "for $i in 1 to 10 return <xml>Text { $i }</xml>";

	      try(Query query = session.query(input)) {
	        // loop through all results
	        while(query.more()) {
	          System.out.println(query.next());
	        }

	        // print query info
	        System.out.println(query.info());
	      }
	    }
	  }
}
