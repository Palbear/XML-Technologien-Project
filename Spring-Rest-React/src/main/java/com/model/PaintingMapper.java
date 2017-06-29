package com.model;


import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
public class PaintingMapper {
		
	Painting painting = new Painting();
	public PaintingMapper(){
	}
	
	public Painting setPainting(String items) throws net.minidev.json.parser.ParseException{

		@SuppressWarnings("deprecation")
		JSONParser parser = new JSONParser();
		JSONObject jsonObject =  (JSONObject) parser.parse(items);
		
		String recordid = (String) jsonObject.get("recordId");
		painting.setRecordID(recordid);

		
		
		String title = (String) jsonObject.get("title");
		if (title.isEmpty() || title.equals(null)){
			painting.setTitle("");
		} else{
			painting.setTitle(JSONObject.escape(title));
		}
		
		
		String artist = (String) jsonObject.get("artist");
		if (artist.isEmpty() ||  artist.equals(null)){
			painting.setArtist("");
		} else {
			painting.setArtist(JSONObject.escape(artist));
		}
		
		
		String earliestDate = (String) jsonObject.get("earliestDate");
		painting.setDate(earliestDate);
		
		
		String category = (String) jsonObject.get("category");
		if (category.isEmpty() || category.equals(null)){
			painting.setCategory("");
		} else {
			painting.setCategory(JSONObject.escape(category));
		}
		
		
		String inscriptions = (String) jsonObject.get("inscriptions");
		if (inscriptions.isEmpty() || inscriptions.equals(null)){
			painting.setInscription("");
		} else {
			painting.setInscription(JSONObject.escape(inscriptions));
		}
		
		
		String depictedPersons = (String) jsonObject.get("depictedPersons");  
		if (depictedPersons.isEmpty() || depictedPersons.equals(null)){
			painting.setDepicted_person("");
		} else {
			
			painting.setDepicted_person(JSONObject.escape(depictedPersons));

		}
		
		
		String materials = (String) jsonObject.get("materials");   
		if (materials.isEmpty() || materials.equals(null)){
			painting.setTechnique_material("");
		} else {
			painting.setTechnique_material(JSONObject.escape(materials));
		}
		
		
		String width = (String) jsonObject.get("width");   
		painting.setWidth(width);
		
		String height = (String) jsonObject.get("height");   
		painting.setHeight(height);
		
		String linkResourceThumb = (String) jsonObject.get("linkResourceThumb");   
		painting.setImage_link(linkResourceThumb);

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
		painting.getWidth();
		painting.getHeight();
		painting.getImage_link();
	
		return painting;
		
	}
	
	
	
	
	
	

}
