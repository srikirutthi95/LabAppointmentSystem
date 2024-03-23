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
public class Invoices {
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
}
