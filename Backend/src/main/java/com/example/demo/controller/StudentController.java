package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Student;

import com.example.demo.service.Student_Service;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "*")
public class StudentController {

	@Autowired
	private Student_Service studentService;

	@GetMapping("/all")
	public List<Student> getAllStudents() {
		return studentService.getAllStudents();
	}

	@PostMapping("/add")
	public Student addStudent(@RequestBody Student student) {
		return studentService.addStudent(student);
	}

	@DeleteMapping("/delete/{id}")
	public String deleteStudent(@PathVariable int id) {
		return studentService.deleteStudent(id);
	}
}
