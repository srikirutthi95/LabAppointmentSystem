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

import com.kirutthi.Lab.Appointments.System.Repository.PatientsRepository;
import com.kirutthi.Lab.Appointments.System.model.Patients;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
public class PatientsController {
	
	@Autowired
	private PatientsRepository patientsRepository;
	
	@PostMapping("/api/patients")
	public List<Patients> getPatients() {
		return patientsRepository.findByDeletedIsNull();
	}
	
	@PostMapping("/api/patient/{id}")
	public Patients getPatient(@PathVariable Integer id) {
		Patients patient = patientsRepository.findById(id).get();
		return patient;
	}
	
	@PostMapping("/api/patient/create")
	public Patients createPatient(HttpServletRequest request) {
		Patients patient = new Patients();
		patient.setFirst_name(request.getParameter("first_name"));
		patient.setLast_name(request.getParameter("last_name"));
		patient.setAddress(request.getParameter("address"));
		patient.setPhone_no(request.getParameter("phone_no"));
		patient.setEmail(request.getParameter("email"));
		patient.setGender(request.getParameter("gender"));
		patient.setAge(Integer.parseInt(request.getParameter("age")));
		patientsRepository.save(patient);
		return patient;
	}
	
	@PutMapping("/api/patient/update/{id}")
	public Patients updatePatient(@PathVariable Integer id, HttpServletRequest request) {
		Patients patient = patientsRepository.findById(id).get();
		patient.setFirst_name(request.getParameter("first_name"));
		patient.setLast_name(request.getParameter("last_name"));
		patient.setAddress(request.getParameter("address"));
		patient.setPhone_no(request.getParameter("phone_no"));
		patient.setEmail(request.getParameter("email"));
		patient.setGender(request.getParameter("gender"));
		patient.setAge(Integer.parseInt(request.getParameter("age")));
		return patientsRepository.save(patient);
	}
	
	@DeleteMapping("/api/patient/delete/{id}")
	public String deleteUser(@PathVariable Integer id) {
		Patients patient = patientsRepository.findById(id).get();
		patient.setDeleted_at(new Timestamp(System.currentTimeMillis()));
		patientsRepository.save(patient);
		return "Successfully deleted";
	}

}
