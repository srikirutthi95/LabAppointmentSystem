package com.kirutthi.Lab.Appointments.System.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import com.kirutthi.Lab.Appointments.System.model.Payments;

public interface PaymentsRepository extends JpaRepository<Payments, Integer>{
	
	@Query(value = "SELECT * FROM payment WHERE DATE(date)=? AND deleted_at IS NULL", nativeQuery = true)
	public List<Payments> findByDatePayment(LocalDate invDate);
	
	@Query(value = "SELECT DATE(date), SUM(amount) total FROM payment WHERE DATE(date)<? AND deleted_at IS NULL GROUP BY DATE(date) LIMIT 30", nativeQuery = true)
	public List<Object> findByLast30Payment(LocalDate invDate);

}
