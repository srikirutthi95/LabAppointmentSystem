package com.kirutthi.Lab.Appointments.System.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kirutthi.Lab.Appointments.System.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	@Query(value = "SELECT * FROM users WHERE deleted_at IS NULL", nativeQuery = true)
	public List<User> findByDeletedIsNull();
	
	@Query(value = "SELECT * FROM users WHERE user_name=? AND password=? AND deleted_at IS NULL", nativeQuery = true)
	public List<User> findByUsernamePassword(String userName, String password);

}
