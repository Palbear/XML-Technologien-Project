package com.model;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.basex.*;

@Component
public class DatabaseLoader implements CommandLineRunner {

	private final PaintingsRepository repository;
	private List<Painting> paintings = Utils.getAllPainting();
	
	@Autowired
	public DatabaseLoader(PaintingsRepository repository) throws IOException {
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception {
		
		this.repository.save(paintings);
		
	}
}
