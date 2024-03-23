package com.kirutthi.Lab.Appointments.System.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kirutthi.Lab.Appointments.System.model.TestResultView;

public interface TestResultsViewRepository extends JpaRepository<TestResultView, Integer>{
	@Query(value = "SELECT tr.*, t.test_name, t.unit, t.cat_id, t.reference"+
			" FROM test_results tr "+
			"LEFT JOIN tests t ON t.id = tr.test_id "+
			"WHERE tr.invoice_test_id = ? AND tr.deleted_at IS NULL", nativeQuery = true)
	public List<TestResultView> findByInvoiceTestId(int invoice_test_id);
}
