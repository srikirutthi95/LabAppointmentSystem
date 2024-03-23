package com.kirutthi.Lab.Appointments.System.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kirutthi.Lab.Appointments.System.model.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
	@Query(value = "SELECT * FROM doctors WHERE deleted_at IS NULL", nativeQuery = true)
	public List<Doctor> findByDeletedIsNull();
}
