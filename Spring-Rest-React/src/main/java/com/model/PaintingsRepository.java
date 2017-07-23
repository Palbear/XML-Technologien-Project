package com.model;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

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
