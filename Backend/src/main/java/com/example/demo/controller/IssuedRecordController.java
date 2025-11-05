package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.IssueRecord;
import com.example.demo.service.IssueRecord_Service;

@RestController
@RequestMapping("/issue")
@CrossOrigin(origins = "*")
public class IssuedRecordController {

	@Autowired
	private IssueRecord_Service issueService;
	
	@GetMapping("/allIssued")
	public List<IssueRecord> getAllIssuedBooks() {
	    return issueService.getAllIssuedBooks();
	}



	@PostMapping("/issueBook/{studentId}/{bookId}")
	public String issueBook(@PathVariable int studentId, @PathVariable int bookId) {
		return issueService.issueBook(studentId, bookId);
	}

	@PutMapping("/returnBook/{recordId}")
	public String returnBook(@PathVariable int recordId) {
		return issueService.returnBook(recordId);
	}
}
