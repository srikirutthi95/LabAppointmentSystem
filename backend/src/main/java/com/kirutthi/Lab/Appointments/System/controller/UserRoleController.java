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

import com.kirutthi.Lab.Appointments.System.Repository.UserRoleRepository;
import com.kirutthi.Lab.Appointments.System.model.UserRole;

@RestController
@CrossOrigin
public class UserRoleController {
	
	@Autowired
	private UserRoleRepository userRoleRepository;
	
	@PostMapping("/api/userRoles")
	public List<UserRole> getUserRoles() {
		return userRoleRepository.findAll();
	}
	
	@PostMapping("/api/userRole/{id}")
	public UserRole getUserRole(@PathVariable Integer id) {
		UserRole userRole = userRoleRepository.findById(id).get();
		return userRole;
	}
	
	@PostMapping("/api/userRole/create")
	public UserRole createUserRole(@RequestBody UserRole userRole) {
		userRoleRepository.save(userRole);
		return userRole;
	}
	
	@PutMapping("/api/userRole/update/{id}")
	public UserRole updateUserRole(@PathVariable Integer id, @RequestBody UserRole userRole) {
		userRole.setId(id);
		return userRoleRepository.save(userRole);
	}
	
	@DeleteMapping("/api/userRole/delete/{id}")
	public void deleteUserRole(@PathVariable Integer id) {
		UserRole userRole = userRoleRepository.findById(id).get();
		userRole.setDeleted_at(new Timestamp(System.currentTimeMillis()));
		userRoleRepository.save(userRole);
	}

}
