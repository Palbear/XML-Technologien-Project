package com.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.model.*;

public class PaintingMapper {
		
	Painting painting = new Painting();
	private String items;
	
	private static final int POS_RECORD_ID = 0;
	private static final int POS_TITLE = 1;
	private static final int POS_ARTIST = 2;
	private static final int POS_DATE = 3;
	private static final int POS_CATEGORY = 4;
	private static final int POS_INSCRIPTIONS = 5;
	private static final int POS_DEPICTED_PERSONS = 6;
	private static final int POS_TECHNIQUE_MATERIAL = 7;
	private static final int POS_MEASUREMENTS = 8;
	private static final int POS_RIGHTS = 9;
	private static final int POS_IMAGE_LINK = 10;
	
	public PaintingMapper(){
	}
	
	public Painting setPainting(String items){		
		List<String> descriptives = Arrays.asList(items.split("\\s*_SPRTR_\\s*"));
		for(int i=0; i<descriptives.size(); i++){
           painting.setRecordID(descriptives.get(POS_RECORD_ID));
           painting.setTitle(descriptives.get(POS_TITLE));
           painting.setArtist(descriptives.get(POS_ARTIST));
           painting.setDate(descriptives.get(POS_DATE));
           painting.setCategory(descriptives.get(POS_CATEGORY));
           painting.setInscription(descriptives.get(POS_INSCRIPTIONS));
           painting.setDepicted_person(descriptives.get(POS_DEPICTED_PERSONS));
           painting.setTechnique_material(descriptives.get(POS_TECHNIQUE_MATERIAL));
           painting.setMeasurements(descriptives.get(POS_MEASUREMENTS));
           painting.setRight_work(descriptives.get(POS_RIGHTS));
           painting.setImage_link(descriptives.get(POS_IMAGE_LINK));
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
		painting.getImage_link();
	
		return painting;	
	}
}
