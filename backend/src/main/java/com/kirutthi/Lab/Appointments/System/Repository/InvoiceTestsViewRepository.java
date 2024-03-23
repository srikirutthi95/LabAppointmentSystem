package com.kirutthi.Lab.Appointments.System.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kirutthi.Lab.Appointments.System.model.InvoiceTestsView;

public interface InvoiceTestsViewRepository extends JpaRepository<InvoiceTestsView, Integer>{
	@Query(value = "SELECT i.*, c.category_name, c.reference"+
			" FROM invoices_tests i "+
			"LEFT JOIN test_categories c ON c.id = i.test_cat_id "+
			"WHERE i.invoice_id = ? AND i.deleted_at IS NULL", nativeQuery = true)
	public List<InvoiceTestsView> findByInvoice(int invoice);
}
