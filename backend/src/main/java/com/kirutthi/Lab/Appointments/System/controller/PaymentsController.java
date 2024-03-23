package com.kirutthi.Lab.Appointments.System.controller;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kirutthi.Lab.Appointments.System.Repository.PaymentsRepository;
import com.kirutthi.Lab.Appointments.System.model.Payments;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
public class PaymentsController {
	@Autowired
	private PaymentsRepository paymentsRepository;
	
	@PostMapping("/api/payments")
	public List<Payments> getInvoicesData() {
		return paymentsRepository.findAll();
	}
	
	@PostMapping("/api/paymentDate")
	public List<Payments> getpaymentDate(HttpServletRequest request) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate payDate = LocalDate.parse(request.getParameter("payDate"), formatter);
		return paymentsRepository.findByDatePayment(payDate);
	}
	@PostMapping("/api/paymentLast30")
	public List<Object> getpaymentLast30(HttpServletRequest request) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate payDate = LocalDate.parse(request.getParameter("payDate"), formatter);
		return paymentsRepository.findByLast30Payment(payDate);
	}
	
	@PostMapping("/api/payment/{id}")
	public Payments getInvoiceData(@PathVariable Integer id) {
		Payments payments = paymentsRepository.findById(id).get();
		return payments;
	}
	
	@PostMapping("/api/payment/create")
	public Payments createInvoice(@RequestBody Payments payments) {
		paymentsRepository.save(payments);
		return payments;
	}
	
	@PutMapping("/api/payment/update/{id}")
	public Payments updateInvoice(@PathVariable Integer id, @RequestBody Payments payments) {
		payments.setId(id);
		return paymentsRepository.save(payments);
	}
	
	@DeleteMapping("/api/payment/delete/{id}")
	public void deleteInvoice(@PathVariable Integer id) {
		Payments payments = paymentsRepository.findById(id).get();
		payments.setDeleted_at(new Timestamp(System.currentTimeMillis()));
		paymentsRepository.save(payments);
	}
}
