package com.kirutthi.Lab.Appointments.System.controller;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kirutthi.Lab.Appointments.System.Repository.InvoiceTestsRepository;
import com.kirutthi.Lab.Appointments.System.Repository.InvoiceTestsViewRepository;
import com.kirutthi.Lab.Appointments.System.model.InvoiceTests;
import com.kirutthi.Lab.Appointments.System.model.InvoiceTestsView;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
public class InvoiceTestController {
	@Autowired
	private InvoiceTestsRepository invoiceTestsRepository;
	@Autowired
	private InvoiceTestsViewRepository invoiceTestsViewRepository;
	
	@PostMapping("/api/invoiceTests")
	public List<InvoiceTestsView> getInvoicesData(HttpServletRequest request) {
		return invoiceTestsViewRepository.findByInvoice(Integer.parseInt(request.getParameter("invoiceId")));
	}
	
	@PostMapping("/api/invoiceTest/{id}")
	public InvoiceTests getInvoiceData(@PathVariable Integer id) {
		InvoiceTests invoices = invoiceTestsRepository.findById(id).get();
		return invoices;
	}
	
	@PostMapping("/api/invoiceTest/create")
	public InvoiceTests createInvoice(HttpServletRequest request) {
		InvoiceTests invoiceTests = new InvoiceTests();
		invoiceTests.setInvoice_id(Integer.parseInt(request.getParameter("invoiceId")));
		invoiceTests.setTest_cat_id(Integer.parseInt(request.getParameter("testId")));
		invoiceTests.setSpecimen(Integer.parseInt(request.getParameter("specimen")));
		invoiceTests.setPrice(Float.parseFloat(request.getParameter("price")));
		
		invoiceTestsRepository.save(invoiceTests);
		return invoiceTests;
	}
	
	@PutMapping("/api/invoiceTest/update/{id}")
	public InvoiceTests updateInvoice(@PathVariable Integer id, @RequestBody InvoiceTests invoiceTests) {
		invoiceTests.setId(id);
		return invoiceTestsRepository.save(invoiceTests);
	}
	
	@PutMapping("/api/invoiceTest/setComments/{id}")
	public InvoiceTests setComments(@PathVariable Integer id, HttpServletRequest request) {
		InvoiceTests invoiceTests = invoiceTestsRepository.findById(id).get();
		invoiceTests.setComment(request.getParameter("comments"));
		return invoiceTestsRepository.save(invoiceTests);
	}
	
	@DeleteMapping("/api/invoiceTest/delete/{id}")
	public void deleteInvoice(@PathVariable Integer id) {
		InvoiceTests invoiceTests = invoiceTestsRepository.findById(id).get();
		invoiceTests.setDeleted_at(new Timestamp(System.currentTimeMillis()));
		invoiceTestsRepository.save(invoiceTests);
	}

}
