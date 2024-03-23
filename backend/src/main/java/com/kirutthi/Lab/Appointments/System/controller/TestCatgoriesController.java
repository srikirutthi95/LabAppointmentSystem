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

import com.kirutthi.Lab.Appointments.System.Repository.TestCategoriesRepository;
import com.kirutthi.Lab.Appointments.System.model.TestCategories;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
public class TestCatgoriesController {
	
	@Autowired
	private TestCategoriesRepository testCategoriesRepository;
	
	@PostMapping("/api/testCategories")
	public List<TestCategories> getUsersData() {
		return testCategoriesRepository.findByDeletedIsNull();
	}
	
	@PostMapping("/api/testCategory/{id}")
	public TestCategories getUserData(@PathVariable Integer id) {
		TestCategories testCategories = testCategoriesRepository.findById(id).get();
		return testCategories;
	}
	
	@PostMapping("/api/testCategories/create")
	public TestCategories createUser(HttpServletRequest request) {
		TestCategories testCategories = new TestCategories();
		testCategories.setCategory_name(request.getParameter("category_name"));
		testCategories.setAmount(Float.parseFloat(request.getParameter("amount")));
		testCategories.setReference(request.getParameter("reference"));
		testCategories.setComment(request.getParameter("comments"));
		testCategoriesRepository.save(testCategories);
		return testCategories;
	}
	
	@PutMapping("/api/testCategories/update/{id}")
	public TestCategories updateUser(@PathVariable Integer id, HttpServletRequest request) {
		TestCategories testCategories = testCategoriesRepository.findById(id).get();
		testCategories.setCategory_name(request.getParameter("category_name"));
		testCategories.setAmount(Float.parseFloat(request.getParameter("amount")));
		testCategories.setReference(request.getParameter("reference"));
		testCategories.setComment(request.getParameter("comments"));
		return testCategoriesRepository.save(testCategories);
	}
	
	@DeleteMapping("/api/testCategories/delete/{id}")
	public String deleteUser(@PathVariable Integer id) {
		TestCategories testCategories = testCategoriesRepository.findById(id).get();
		testCategories.setDeleted_at(new Timestamp(System.currentTimeMillis()));
		testCategoriesRepository.save(testCategories);
		return "Successfully Deleted.";
	}

}
