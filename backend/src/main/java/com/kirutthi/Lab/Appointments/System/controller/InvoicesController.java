package com.kirutthi.Lab.Appointments.System.controller;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kirutthi.Lab.Appointments.System.Repository.InvoicesRepository;
import com.kirutthi.Lab.Appointments.System.Repository.LabQueueRepository;
import com.kirutthi.Lab.Appointments.System.Repository.PaymentsRepository;
import com.kirutthi.Lab.Appointments.System.model.Invoices;
import com.kirutthi.Lab.Appointments.System.model.LabQueue;
import com.kirutthi.Lab.Appointments.System.model.Payments;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
public class InvoicesController {
	@Autowired
	private InvoicesRepository invoicesRepository;
	@Autowired
	private PaymentsRepository paymentRepository;
	@Autowired
	private LabQueueRepository labQueueRepository;
	
	@PostMapping("/api/labQueue")
	public List<LabQueue> getInvoicesData() {
		return labQueueRepository.findByLabQueue();
	}
	
	@PostMapping("/api/getCountInvoices")
	public ArrayList<Integer> getCountInvoices(HttpServletRequest request) {
		ArrayList<Integer> inv = new ArrayList<Integer>();
		Integer TotalInv = invoicesRepository.findByAllInv().size();
		inv.add(TotalInv);
		
		Integer pendingInv = invoicesRepository.findByStatus(false).size();
		inv.add(pendingInv);
		
		Integer completeInv = invoicesRepository.findByStatus(true).size();
		inv.add(completeInv);
		
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate invDate = LocalDate.parse(request.getParameter("invDate"), formatter);
		
		Integer todayInv = invoicesRepository.findByDateInv(invDate).size();
		inv.add(todayInv);
		
		return inv;
	}
	
	@PostMapping("/api/pendingInvCount")
	public Integer getCompletedInvoiceCount() {
		Integer countInv = invoicesRepository.findByStatus(true).size();
		return countInv;
	}
	
	@PostMapping("/api/invoice/{id}")
	public List<LabQueue> getInvoiceData(@PathVariable Integer id) {
		return labQueueRepository.findByInvoice(id);
	}
	
	@PostMapping("/api/patientInvoices/{id}")
	public List<LabQueue> getPatientInvoices(@PathVariable Integer id) {
		return labQueueRepository.findByPatients(id);
	}
	
	@PostMapping("/api/invoice/create")
	public Invoices createInvoice(HttpServletRequest request) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		LocalDateTime invDate = LocalDateTime.parse(request.getParameter("invDate"), formatter);
		
		Invoices invoices = new Invoices();
		invoices.setCenter_id(Integer.parseInt(request.getParameter("centerId")));
		invoices.setPatient_id(Integer.parseInt(request.getParameter("patientId")));
		invoices.setDoctor_id(Integer.parseInt(request.getParameter("doctorId")));
		invoices.setDate(invDate);
		invoices.setInvoice_no(request.getParameter("invoice"));
		invoices.setDiscount(Float.parseFloat(request.getParameter("centerDiscount")));
		invoices.setUser_id(Integer.parseInt(request.getParameter("userId")));
		invoices.setStatus(false);
		invoicesRepository.save(invoices);
		
		Payments payment = new Payments();
		payment.setInvoice_id(invoices.getId());
		payment.setDate(invDate);
		payment.setPayment_method(1);
		payment.setAmount(Float.parseFloat(request.getParameter("payment")));
		paymentRepository.save(payment);
		
		return invoices;
	}
	
	@PutMapping("/api/invoice/update/{id}")
	public Invoices updateInvoice(@PathVariable Integer id, @RequestBody Invoices invoices) {
		invoices.setId(id);
		return invoicesRepository.save(invoices);
	}
	
	@PutMapping("/api/invoice/setCompleted/{id}")
	public Invoices setCompleted(@PathVariable Integer id) {
		Invoices invoices = invoicesRepository.findById(id).get();
		invoices.setStatus(true);
		return invoicesRepository.save(invoices);
	}
	
	@DeleteMapping("/api/invoice/delete/{id}")
	public String deleteInvoice(@PathVariable Integer id) {
		Invoices invoices = invoicesRepository.findById(id).get();
		invoices.setDeleted_at(new Timestamp(System.currentTimeMillis()));
		invoicesRepository.save(invoices);
		return "Successfully Deleted.";
	}
}
