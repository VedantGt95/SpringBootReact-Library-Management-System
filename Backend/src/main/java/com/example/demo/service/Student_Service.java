package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Student;
import com.example.demo.repo.Student_repo;

@Service
public class Student_Service {

    @Autowired
    private Student_repo studentRepo;

    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    public Student addStudent(Student student) {
        return studentRepo.save(student);
    }

    public String deleteStudent(int id) {
        if(studentRepo.existsById(id)) {
            studentRepo.deleteById(id);
            return "Student Deleted";
        }
        return "Student Not Found";
    }
}
