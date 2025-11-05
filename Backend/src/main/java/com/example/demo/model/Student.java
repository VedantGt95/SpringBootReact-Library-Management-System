package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;



@Entity


public class Student {
	
	public int getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public String getCourse() {
		return course;
	}
	public String getEmail() {
		return email;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setCourse(String course) {
		this.course = course;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String name;
	private String course;
	private String email;
}
