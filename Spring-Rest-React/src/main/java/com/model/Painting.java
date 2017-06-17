/*
 * Copyright 2015 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

import lombok.Data;

/**
 * @author Greg Turnquist
 */
// tag::code[]
@Data
@Entity
public class Painting {

	private @Id @GeneratedValue Long id;
	private String recordID;
	
	@Lob
    @Column( length = 1000 )
	private String title;
	
	@Lob
    @Column( length = 1000 )
	private String artist;
	
	@Lob
    @Column( length = 1000 )
	private String date;
	
	@Lob
    @Column( length = 1000 )
	private String category;
	
	@Lob
    @Column( length = 1000 )
	private String inscription;
	
	@Lob
    @Column( length = 1000 )
	private String depicted_person;
	
	@Lob
    @Column( length = 1000 )
	private String technique_material;
	
	@Lob
    @Column( length = 1000 )
	private String measurements;
	
	@Lob
    @Column( length = 1000 )
	private String right_work;
	
	
	
	@SuppressWarnings("unused")
	public Painting() {}

	public Painting(String recordID, String title, String artist, String date, 
			String category, String inscription, String depicted_person, 
			String technique_material, String measurements , String right_work) {
		this.recordID = recordID;
		this.title = title;
		this.artist = artist;
		this.date = date;
		this.category = category;
		this.inscription = inscription;
		this.depicted_person = depicted_person;
		this.technique_material = technique_material;
		this.measurements = measurements;
		this.right_work = right_work;
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRecordID() {
		return recordID;
	}

	public void setRecordID(String recordID) {
		this.recordID = recordID;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getArtist() {
		return artist;
	}

	public void setArtist(String artist) {
		this.artist = artist;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getInscription() {
		return inscription;
	}

	public void setInscription(String inscription) {
		this.inscription = inscription;
	}

	public String getDepicted_person() {
		return depicted_person;
	}

	public void setDepicted_person(String depicted_person) {
		this.depicted_person = depicted_person;
	}

	public String getTechnique_material() {
		return technique_material;
	}

	public void setTechnique_material(String technique_material) {
		this.technique_material = technique_material;
	}

	public String getMeasurements() {
		return measurements;
	}

	public void setMeasurements(String measurements) {
		this.measurements = measurements;
	}

	public String getRight_work() {
		return right_work;
	}

	public void setRight_work(String right_work) {
		this.right_work = right_work;
	}

	@Override
	public String toString() {
		return "Painting [id=" + id + ", recordID=" + recordID + ", title=" + title + ", artist=" + artist + ", date="
				+ date + ", category=" + category + ", inscription=" + inscription + ", depicted_person="
				+ depicted_person + ", technique_material=" + technique_material + ", measurements=" + measurements
				+ ", right_work=" + right_work + "]";
	}
	
	
	
}
// end::code[]