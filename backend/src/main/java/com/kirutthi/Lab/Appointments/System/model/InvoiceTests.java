package com.kirutthi.Lab.Appointments.System.model;

import java.sql.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table(name = "invoices_tests")
@Entity
public class InvoiceTests {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private Integer invoice_id;
	private Integer test_cat_id;
	private Integer specimen;
	private Float price;
	private String comment;
	private Timestamp created_at;
	private Timestamp updated_at;
	private Timestamp deleted_at;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getInvoice_id() {
		return invoice_id;
	}
	public void setInvoice_id(Integer invoice_id) {
		this.invoice_id = invoice_id;
	}
	public Integer getTest_cat_id() {
		return test_cat_id;
	}
	public void setTest_cat_id(Integer test_cat_id) {
		this.test_cat_id = test_cat_id;
	}
	public Integer getSpecimen() {
		return specimen;
	}
	public void setSpecimen(Integer specimen) {
		this.specimen = specimen;
	}
	public Float getPrice() {
		return price;
	}
	public void setPrice(Float price) {
		this.price = price;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
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
