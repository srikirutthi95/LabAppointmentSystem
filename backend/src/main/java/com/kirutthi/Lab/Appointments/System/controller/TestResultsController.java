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

import com.kirutthi.Lab.Appointments.System.Repository.TestResultsRepository;
import com.kirutthi.Lab.Appointments.System.Repository.TestResultsViewRepository;
import com.kirutthi.Lab.Appointments.System.model.TestResultView;
import com.kirutthi.Lab.Appointments.System.model.TestResults;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
public class TestResultsController {
	@Autowired
	private TestResultsRepository testResultsRepository;
	@Autowired
	private TestResultsViewRepository testResultsViewRepository;
	
	@PostMapping("/api/testResults")
	public List<TestResults> getInvoicesData() {
		return testResultsRepository.findAll();
	}
	
	@PostMapping("/api/testResult/getInvoiceTest")
	public List<TestResultView> getInvoiceTestId(HttpServletRequest request) {
		return testResultsViewRepository.findByInvoiceTestId(Integer.parseInt(request.getParameter("invoiceTestId")));
	}
	
	@PostMapping("/api/testResults/create")
	public TestResults createInvoice(HttpServletRequest request) {
		TestResults testResults = new TestResults();
		testResults.setInvoice_test_id(Integer.parseInt(request.getParameter("invoice_test_id")));
		System.out.println(request.getParameter("test_id"));
		if(request.getParameter("test_id") != null && !request.getParameter("test_id").trim().isEmpty()) {
			testResults.setTest_id(Integer.parseInt(request.getParameter("test_id")));
		}
		testResults.setResult(request.getParameter("result"));
		testResults.setFlag(request.getParameter("flag"));
		testResultsRepository.save(testResults);
		return testResults;
	}
	
	@PutMapping("/api/testResult/update/{id}")
	public TestResults updateInvoice(@PathVariable Integer id, HttpServletRequest request) {
		TestResults testResults = testResultsRepository.findById(id).get();
		testResults.setResult(request.getParameter("result"));
		testResults.setFlag(request.getParameter("flag"));
		testResultsRepository.save(testResults);
		return testResults;
	}
	
	@DeleteMapping("/api/testResult/delete/{id}")
	public void deleteInvoice(@PathVariable Integer id) {
		TestResults testResults = testResultsRepository.findById(id).get();
		testResults.setDeleted_at(new Timestamp(System.currentTimeMillis()));
		testResultsRepository.save(testResults);
	}
}
