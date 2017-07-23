package com.model;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
//@RestController
@RequestMapping("/")
public class HomeController {

	@RequestMapping(value = "/")
	public String index() {
		return "index";
	}
	
	@RequestMapping(value = "/react")
	public String reacttest() {
		return "reacttest";
	}
	
	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public String test() {
	    return "test";
	}
	@RequestMapping(value = "/sparql", method = RequestMethod.GET)
	public String sparql() {
	    return "sparql";
	}
	@RequestMapping(value = "/sparqlx", method = RequestMethod.GET)
	public String sparqlx() {
	    return "sparqlx";
	}

}
