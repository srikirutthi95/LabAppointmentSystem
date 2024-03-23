package com.kirutthi.Lab.Appointments.System.model;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table(name = "invoices")
@Entity
public class LabQueue {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String invoice_no;
	private LocalDateTime  date;
	private Integer patient_id;
	private Integer doctor_id;
	private Integer center_id;
	private Float discount;
	private Boolean status;
	private Integer user_id;
	private Timestamp created_at;
	private Timestamp updated_at;
	private Timestamp deleted_at;
	private String p_first_name;
	private String p_last_name;
	private Integer age;
	private String gender;
	private String center_name;
	private String d_first_name;
	private String d_last_name;
	private String specialist;
	private String u_first_name;
	private String u_last_name;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getInvoice_no() {
		return invoice_no;
	}
	public void setInvoice_no(String invoice_no) {
		this.invoice_no = invoice_no;
	}
	public LocalDateTime getDate() {
		return date;
	}
	public void setDate(LocalDateTime date) {
		this.date = date;
	}
	public Integer getPatient_id() {
		return patient_id;
	}
	public void setPatient_id(Integer patient_id) {
		this.patient_id = patient_id;
	}
	public Integer getDoctor_id() {
		return doctor_id;
	}
	public void setDoctor_id(Integer doctor_id) {
		this.doctor_id = doctor_id;
	}
	public Integer getCenter_id() {
		return center_id;
	}
	public void setCenter_id(Integer center_id) {
		this.center_id = center_id;
	}
	public Float getDiscount() {
		return discount;
	}
	public void setDiscount(Float discount) {
		this.discount = discount;
	}
	public Boolean getStatus() {
		return status;
	}
	public void setStatus(Boolean status) {
		this.status = status;
	}
	public Integer getUser_id() {
		return user_id;
	}
	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
	}
	public Timestamp getCreated_at() {
		return created_at;
	}
	public void setCreated_at(Timestamp created_at) {
		this.created_at = created_at;
	}
	public Timestamp getUpdated_at() {
		return updated_at;
	}
	public void setUpdated_at(Timestamp updated_at) {
		this.updated_at = updated_at;
	}
	public Timestamp getDeleted_at() {
		return deleted_at;
	}
	public void setDeleted_at(Timestamp deleted_at) {
		this.deleted_at = deleted_at;
	}
	public String getP_first_name() {
		return p_first_name;
	}
	public void setP_first_name(String p_first_name) {
		this.p_first_name = p_first_name;
	}
	public String getP_last_name() {
		return p_last_name;
	}
	public void setP_last_name(String p_last_name) {
		this.p_last_name = p_last_name;
	}
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}
	public String getCenter_name() {
		return center_name;
	}
	public void setCenter_name(String center_name) {
		this.center_name = center_name;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getD_first_name() {
		return d_first_name;
	}
	public void setD_first_name(String d_first_name) {
		this.d_first_name = d_first_name;
	}
	public String getD_last_name() {
		return d_last_name;
	}
	public void setD_last_name(String d_last_name) {
		this.d_last_name = d_last_name;
	}
	public String getSpecialist() {
		return specialist;
	}
	public void setSpecialist(String specialist) {
		this.specialist = specialist;
	}
	public String getU_first_name() {
		return u_first_name;
	}
	public void setU_first_name(String u_first_name) {
		this.u_first_name = u_first_name;
	}
	public String getU_last_name() {
		return u_last_name;
	}
	public void setU_last_name(String u_last_name) {
		this.u_last_name = u_last_name;
	}
	
}
