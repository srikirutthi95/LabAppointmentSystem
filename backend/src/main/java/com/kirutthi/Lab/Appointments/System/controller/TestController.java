package com.kirutthi.Lab.Appointments.System.controller;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kirutthi.Lab.Appointments.System.Repository.TestsRepository;
import com.kirutthi.Lab.Appointments.System.model.Tests;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
public class TestController {
	@Autowired
	private TestsRepository testsRepository;
	
	@PostMapping("/api/tests")
	public List<Tests> getTestsData(HttpServletRequest request) {
		return testsRepository.findByCatId(Integer.parseInt(request.getParameter("cat_id")));
	}
	
	@PostMapping("/api/test/{id}")
	public Tests getTestData(@PathVariable Integer id) {
		Tests testCategories = testsRepository.findById(id).get();
		return testCategories;
	}
	
	@PostMapping("/api/test/create")
	public Tests createTest(HttpServletRequest request) {
		Tests tests = new Tests();
		tests.setCat_id(Integer.parseInt(request.getParameter("cat_id")));
		tests.setTest_name(request.getParameter("test_name"));
		tests.setUnit(request.getParameter("unit"));
		tests.setReference(request.getParameter("reference"));
		tests.setFlag(request.getParameter("flag"));
		testsRepository.save(tests);
		return tests;
	}
	
	@PutMapping("/api/test/update/{id}")
	public Tests updateTest(@PathVariable Integer id, HttpServletRequest request) {
		Tests tests = testsRepository.findById(id).get();
		tests.setCat_id(Integer.parseInt(request.getParameter("cat_id")));
		tests.setTest_name(request.getParameter("test_name"));
		tests.setUnit(request.getParameter("unit"));
		tests.setReference(request.getParameter("reference"));
		tests.setFlag(request.getParameter("flag"));
		return testsRepository.save(tests);
	}
	
	@DeleteMapping("/api/test/delete/{id}")
	public String deleteTest(@PathVariable Integer id) {
		Tests tests = testsRepository.findById(id).get();
		tests.setDeleted_at(new Timestamp(System.currentTimeMillis()));
		testsRepository.save(tests);
		return "Successfully Deleted.";
	}
}
