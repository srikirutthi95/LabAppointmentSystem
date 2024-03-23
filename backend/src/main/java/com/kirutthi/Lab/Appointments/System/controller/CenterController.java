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

import com.kirutthi.Lab.Appointments.System.Repository.CenterRepository;
import com.kirutthi.Lab.Appointments.System.model.Center;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
public class CenterController {
	@Autowired
	private CenterRepository centerRepository;
	
	@PostMapping("/api/centers")
	public List<Center> getCenters() {
		return centerRepository.findByDeletedIsNull();
	}
	
	@PostMapping("/api/getTotalCenters")
	public List<Object> getTotalCenters() {
		return centerRepository.findByCenterTotalInvoices();
	}
	
	@PostMapping("/api/center/{id}")
	public Center getCenterData(@PathVariable Integer id) {
		Center center = centerRepository.findById(id).get();
		return center;
	}
	
	@PostMapping("/api/centers/create")
	public Center createCenter(HttpServletRequest request) {
		Center center = new Center();
		center.setCode(request.getParameter("code"));
		center.setName(request.getParameter("name"));
		center.setDiscount(Float.parseFloat(request.getParameter("discount")));
		centerRepository.save(center);
		return center;
	}
	
	@PutMapping("/api/centers/update/{id}")
	public Center updateCenter(@PathVariable Integer id, HttpServletRequest request) {
		Center center = centerRepository.findById(id).get();
		center.setCode(request.getParameter("code"));
		center.setName(request.getParameter("name"));
		center.setDiscount(Float.parseFloat(request.getParameter("discount")));
		return centerRepository.save(center);
	}
	
	@DeleteMapping("/api/centers/delete/{id}")
	public String deleteCenter(@PathVariable Integer id) {
		Center center = centerRepository.findById(id).get();
		center.setDeleted_at(new Timestamp(System.currentTimeMillis()));
		centerRepository.save(center);
		return "Successfully Deleted.";
	}

}
