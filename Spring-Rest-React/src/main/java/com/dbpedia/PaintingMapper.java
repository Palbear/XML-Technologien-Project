package com.dbpedia;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.model.*;

public class PaintingMapper {
		
	Painting painting = new Painting();
	private String items;
	
	public PaintingMapper(){
	}
	
	public Painting setPainting(String items){
		List<String> descriptives = Arrays.asList(items.split("\\s*,\\s*"));
		for(int i=0; i<descriptives.size(); i++){
           painting.setRecordID(descriptives.get(0));
           painting.setTitle(descriptives.get(1));
           painting.setArtist(descriptives.get(2));
           painting.setDate(descriptives.get(3));
           painting.setCategory(descriptives.get(4));
           painting.setInscription(descriptives.get(5));
           painting.setDepicted_person(descriptives.get(6));
           painting.setTechnique_material(descriptives.get(7));
           painting.setMeasurements(descriptives.get(8));
           painting.setRight_work(descriptives.get(9));
		}
		return painting;
				
	}
	
	public Painting getPainting(){
		
		painting.getRecordID();
		painting.getTitle();
		painting.getArtist();
		painting.getDate();
		painting.getCategory();
		painting.getInscription();
		painting.getDepicted_person();
		painting.getTechnique_material();
		painting.getMeasurements();
		painting.getRight_work();
	
		return painting;
		
	}
	
	
	
	
	
	

}
