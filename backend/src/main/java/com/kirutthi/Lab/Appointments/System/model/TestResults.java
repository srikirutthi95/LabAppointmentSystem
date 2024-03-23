package com.kirutthi.Lab.Appointments.System.model;

import java.sql.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table(name = "test_results")
@Entity
public class TestResults {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private Integer invoice_test_id;
	private Integer test_id;
	private String result;
	private String flag;
	private Timestamp created_at;
	private Timestamp updated_at;
	private Timestamp deleted_at;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getInvoice_test_id() {
		return invoice_test_id;
	}
	public void setInvoice_test_id(Integer invoice_test_id) {
		this.invoice_test_id = invoice_test_id;
	}
	public Integer getTest_id() {
		return test_id;
	}
	public void setTest_id(Integer test_id) {
		this.test_id = test_id;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
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
