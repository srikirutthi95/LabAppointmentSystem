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

import com.kirutthi.Lab.Appointments.System.Repository.DoctorRepository;
import com.kirutthi.Lab.Appointments.System.model.Doctor;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
public class DoctorController {
	@Autowired
	private DoctorRepository doctorRepository;
	
	@PostMapping("/api/doctors")
	public List<Doctor> getDoctors() {
		return doctorRepository.findByDeletedIsNull();
	}
	
	@PostMapping("/api/doctor/{id}")
	public Doctor getUserData(@PathVariable Integer id) {
		Doctor doctor = doctorRepository.findById(id).get();
		return doctor;
	}
	
	@PostMapping("/api/doctor/create")
	public Doctor createDoctor(HttpServletRequest request) {
		Doctor doctor = new Doctor();
		doctor.setFirst_name(request.getParameter("first_name"));
		doctor.setLast_name(request.getParameter("last_name"));
		doctor.setSpecialist(request.getParameter("specialist"));
		doctor.setPhone_no(request.getParameter("phone_no"));
		doctorRepository.save(doctor);
		return doctor;
	}
	
	@PutMapping("/api/doctor/update/{id}")
	public Doctor updateDoctor(@PathVariable Integer id, HttpServletRequest request) {
		Doctor doctor = doctorRepository.findById(id).get();
		doctor.setId(id);
		doctor.setFirst_name(request.getParameter("first_name"));
		doctor.setLast_name(request.getParameter("last_name"));
		doctor.setSpecialist(request.getParameter("specialist"));
		doctor.setPhone_no(request.getParameter("phone_no"));
		return doctorRepository.save(doctor);
	}
	
	@DeleteMapping("/api/doctor/delete/{id}")
	public String deleteDoctor(@PathVariable Integer id) {
		Doctor doctor = doctorRepository.findById(id).get();
		doctor.setDeleted_at(new Timestamp(System.currentTimeMillis()));
		doctorRepository.save(doctor);
		return "Successfully Deleted.";
	}

}
