package com.kirutthi.Lab.Appointments.System.controller;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kirutthi.Lab.Appointments.System.Repository.UserRepository;
import com.kirutthi.Lab.Appointments.System.model.User;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
public class UserController {
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("/hi")
	public String helloWorld() {
		return "Hi This Is Me";
	}
	
	@PostMapping("/api/users")
	public List<User> getUsersData() {
		return userRepository.findByDeletedIsNull();
	}
	
	@PostMapping("/api/login")
	public List<User> userLogin(HttpServletRequest request) {
		return userRepository.findByUsernamePassword(request.getParameter("uname"), request.getParameter("pwd"));
	}
	
	@PostMapping("/api/user/{id}")
	public User getUserData(@PathVariable Integer id) {
		User user = userRepository.findById(id).get();
		return user;
	}
	
	@PostMapping("/api/user/create-user")
	public User createUser(HttpServletRequest request) {
		User newUser = new User();
		newUser.setFirst_name(request.getParameter("first_name"));
		newUser.setLast_name(request.getParameter("last_name"));
		newUser.setPhone_no(request.getParameter("phone_no"));
		newUser.setAddress(request.getParameter("address"));
		newUser.setEmail(request.getParameter("email"));
		newUser.setUser_name(request.getParameter("user_name"));
		newUser.setPassword(request.getParameter("password"));
		newUser.setRole(Integer.parseInt(request.getParameter("role")));
		newUser.setStatus(true);
		
		userRepository.save(newUser);
		return newUser;
	}
	
	@PutMapping("/api/user/update-user/{id}")
	public User updateUser(@PathVariable Integer id, HttpServletRequest request) {
		User user = userRepository.findById(id).get();
		user.setId(id);
		user.setFirst_name(request.getParameter("first_name"));
		user.setLast_name(request.getParameter("last_name"));
		user.setPhone_no(request.getParameter("phone_no"));
		user.setAddress(request.getParameter("address"));
		user.setEmail(request.getParameter("email"));
		user.setUser_name(request.getParameter("user_name"));
		user.setRole(Integer.parseInt(request.getParameter("role")));
		return userRepository.save(user);
	}
	
	@PutMapping("/api/user/setPermission/{id}")
	public User setPermission(@PathVariable Integer id, HttpServletRequest request) {
		User user = userRepository.findById(id).get();
		System.out.println(request.getParameter("permission"));
		user.setPermission(request.getParameter("permission"));
		return userRepository.save(user);
	}
	
	@DeleteMapping("/api/user/delete-user/{id}")
	public String deleteUser(@PathVariable Integer id) {
		User user = userRepository.findById(id).get();
		user.setDeleted_at(new Timestamp(System.currentTimeMillis()));
		userRepository.save(user);
		return "Successfully Deleted.";
	}
	
	
}
