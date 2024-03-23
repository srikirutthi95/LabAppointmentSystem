package com.kirutthi.Lab.Appointments.System.Repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kirutthi.Lab.Appointments.System.model.Center;

public interface CenterRepository extends JpaRepository<Center, Integer> {
	@Query(value = "SELECT * FROM center WHERE deleted_at IS NULL", nativeQuery = true)
	public List<Center> findByDeletedIsNull();
	
	@Query(value = "SELECT COUNT(i.id), c.name total FROM invoices i LEFT JOIN center c ON c.id = i.center_id WHERE i.deleted_at IS NULL GROUP BY DATE(i.center_id)", nativeQuery = true)
	public List<Object> findByCenterTotalInvoices();
}
