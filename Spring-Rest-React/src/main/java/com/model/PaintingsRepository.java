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

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

/**
 * @author Greg Turnquist
 */
// tag::code[]
public interface PaintingsRepository extends JpaRepository<Painting, Long> {
	List<Painting> findByArtistLike(@Param("name") String artist, Pageable pageable);
	List<Painting> findByCategoryLike(@Param("category") String category, Pageable pageable);
	//List<Painting> findByDepicted_PersonLike(@Param("depicted_person") String depicted_person, Pageable pageable);
	List<Painting> findByMeasurementsLike(@Param("measurements") String measurements, Pageable pageable);
	List<Painting> findByDateLike(@Param("date") String date, Pageable pageable);
	//List<Painting> findByRightWorkLike(@Param("right_work") String right_work, Pageable pageable);
	//List<Painting> findByTechnique_MaterialLike(@Param("technique_material") String technique_material, Pageable pageable);
	Painting findByRecordIDLike(@Param("recordid") String date);
}
// end::code[]
