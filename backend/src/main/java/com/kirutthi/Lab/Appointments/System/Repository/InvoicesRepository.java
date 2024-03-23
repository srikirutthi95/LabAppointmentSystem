package com.kirutthi.Lab.Appointments.System.Repository;


import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kirutthi.Lab.Appointments.System.model.Invoices;

public interface InvoicesRepository extends JpaRepository<Invoices, Integer>{
	@Query(value = "SELECT * FROM invoices WHERE status=? AND deleted_at IS NULL", nativeQuery = true)
	public List<Invoices> findByStatus(Boolean status);
	
	@Query(value = "SELECT * FROM invoices WHERE deleted_at IS NULL", nativeQuery = true)
	public List<Invoices> findByAllInv();
	
	@Query(value = "SELECT * FROM invoices WHERE DATE(date)=? AND deleted_at IS NULL", nativeQuery = true)
	public List<Invoices> findByDateInv(LocalDate invDate);
}
