package com.kirutthi.Lab.Appointments.System.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kirutthi.Lab.Appointments.System.model.LabQueue;

public interface LabQueueRepository extends JpaRepository<LabQueue, Integer>{
	@Query(value = "SELECT i.*, p.first_name p_first_name, p.last_name p_last_name, p.age, p.gender, c.name center_name, d.first_name d_first_name, d.last_name d_last_name, d.specialist, u.first_name u_first_name, u.last_name u_last_name"+
			" FROM invoices i "+
			"LEFT JOIN center c ON c.id = i.center_id "+
			"LEFT JOIN patients p ON p.id = i.patient_id "+
			"LEFT JOIN doctors d ON d.id = i.doctor_id "+
			"LEFT JOIN users u ON u.id = i.user_id "+
			"WHERE i.status = 0 AND i.deleted_at IS NULL", nativeQuery = true)
	public List<LabQueue> findByLabQueue();
	
	@Query(value = "SELECT i.*, p.first_name p_first_name, p.last_name p_last_name, p.age, p.gender, c.name center_name, d.first_name d_first_name, d.last_name d_last_name, d.specialist, u.first_name u_first_name, u.last_name u_last_name"+
	" FROM invoices i "+
	"LEFT JOIN center c ON c.id = i.center_id "+
	"LEFT JOIN patients p ON p.id = i.patient_id "+
	"LEFT JOIN doctors d ON d.id = i.doctor_id "+
	"LEFT JOIN users u ON u.id = i.user_id "+
	"WHERE i.id = ? AND i.deleted_at IS NULL", nativeQuery = true)
	public List<LabQueue> findByInvoice(int invoice);
	
	@Query(value = "SELECT i.*, p.first_name p_first_name, p.last_name p_last_name, p.age, p.gender, c.name center_name, d.first_name d_first_name, d.last_name d_last_name, d.specialist, u.first_name u_first_name, u.last_name u_last_name"+
			" FROM invoices i "+
			"LEFT JOIN center c ON c.id = i.center_id "+
			"LEFT JOIN patients p ON p.id = i.patient_id "+
			"LEFT JOIN doctors d ON d.id = i.doctor_id "+
			"LEFT JOIN users u ON u.id = i.user_id "+
			"WHERE i.patient_id = ? AND i.deleted_at IS NULL ORDER BY id DESC", nativeQuery = true)
			public List<LabQueue> findByPatients(int patient);
}
