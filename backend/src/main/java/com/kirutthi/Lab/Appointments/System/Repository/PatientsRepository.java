package com.kirutthi.Lab.Appointments.System.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kirutthi.Lab.Appointments.System.model.Patients;

public interface PatientsRepository extends JpaRepository<Patients, Integer> {
	@Query(value = "SELECT * FROM patients WHERE deleted_at IS NULL", nativeQuery = true)
	public List<Patients> findByDeletedIsNull();
}
