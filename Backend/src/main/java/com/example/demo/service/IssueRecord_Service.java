package com.example.demo.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.IssueRecord;
import com.example.demo.model.LibraryModel;
import com.example.demo.model.Student;
import com.example.demo.repo.IssueRecord_repo;
import com.example.demo.repo.LibraryModel_repo;
import com.example.demo.repo.Student_repo;

@Service
public class IssueRecord_Service {

    @Autowired
    private IssueRecord_repo issueRepo;

    @Autowired
    private Student_repo studentRepo;

    @Autowired
    private LibraryModel_repo libraryRepo;

    public List<IssueRecord> getAllIssuedBooks() {
        return issueRepo.findAll();
    }

    @Transactional
    public String issueBook(int studentId, int bookId) {

        Optional<Student> studentOpt = studentRepo.findById(studentId);
        if (studentOpt.isEmpty()) {
            return "Student Not Found";
        }

        Optional<LibraryModel> bookOpt = libraryRepo.findById(bookId);
        if (bookOpt.isEmpty()) {
            return "Book Not Found";
        }

        LibraryModel book = bookOpt.get();

        if (!book.isAvailable()) {
            return "Book '" + book.getBookName() + "' is currently not available.";
        }

        Optional<IssueRecord> issuedRecord = issueRepo.findByLibraryModelIdAndReturnDateIsNull(bookId);

        if (issuedRecord.isPresent()) {
            return "Book '" + book.getBookName() + "' is already issued to another student.";
        }

        IssueRecord record = new IssueRecord();
        record.setStudent(studentOpt.get());
        record.setLibraryModel(book);
        record.setIssueDate(LocalDate.now());

        issueRepo.save(record);

   
        book.setAvailable(false);
        libraryRepo.save(book);

        return "Book '" + book.getBookName() + "' issued to " + studentOpt.get().getName() + 
                " (Record ID: " + record.getRecordId() + ")";
    }

    @Transactional
    public String returnBook(int recordId) {
        Optional<IssueRecord> recordOpt = issueRepo.findById(recordId);

        if (recordOpt.isEmpty()) {
            return "❌ Issue Record Not Found";
        }

        IssueRecord issueRecord = recordOpt.get();

        if (issueRecord.getReturnDate() != null) {
            return "Book '" + issueRecord.getLibraryModel().getBookName() + 
                   "' was already returned on " + issueRecord.getReturnDate();
        }

        issueRecord.setReturnDate(LocalDate.now());
        issueRepo.save(issueRecord);

     
        LibraryModel book = issueRecord.getLibraryModel();
        book.setAvailable(true);
        libraryRepo.save(book);

        Student student = issueRecord.getStudent();

        return "Book '" + book.getBookName() + "' returned by " + student.getName() + 
               " (Record ID: " + issueRecord.getRecordId() + ")";
    }
}
