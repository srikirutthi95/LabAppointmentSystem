package com.kirutthi.Lab.Appointments.System.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kirutthi.Lab.Appointments.System.model.TestCategories;

public interface TestCategoriesRepository extends JpaRepository<TestCategories, Integer> {
	@Query(value = "SELECT * FROM test_categories WHERE deleted_at IS NULL", nativeQuery = true)
	public List<TestCategories> findByDeletedIsNull();
}
