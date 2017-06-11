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

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

/**
 * @author Greg Turnquist
 */
// tag::code[]
@Data
@Entity
public class Painting {

	private @Id @GeneratedValue Long id;
	private String title;
	private String artist;
	private String date;
	private String category;
	private String inscription;
	private String depicted_person;
	private String technique_material;
	private String measurements;
	private String right_work;
	
	
	
	private Painting() {}

	public Painting(String title, String artist, String date, 
			String category, String inscription, String depicted_person, 
			String technique_material, String measurements , String right_work) {
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
}
// end::code[]