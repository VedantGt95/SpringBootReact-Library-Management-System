package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.LibraryModel;
import com.example.demo.repo.LibraryModel_repo;

@Service
public class LibraryModel_Service {

    @Autowired
    private LibraryModel_repo libraryRepo;

    public List<LibraryModel> getAllBooks() {
        return libraryRepo.findAll();
    }

    public LibraryModel addBook(LibraryModel book) {
        return libraryRepo.save(book);
    }

    public String deleteBook(int id) {
        if(libraryRepo.existsById(id)) {
            libraryRepo.deleteById(id);
            return "Book Deleted";
        }
        return "Book Not Found";
    }
}
