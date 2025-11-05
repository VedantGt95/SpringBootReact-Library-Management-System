package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.LibraryModel;
import com.example.demo.service.LibraryModel_Service;


@RestController
@RequestMapping("/book")
@CrossOrigin(origins = "*")
public class LibraryController {

    @Autowired
    private LibraryModel_Service libraryService;

    @GetMapping("/all")
    public List<LibraryModel> getAllBooks() {
        return libraryService.getAllBooks();
    }

    @PostMapping("/add")
    public LibraryModel addBook(@RequestBody LibraryModel book) {
        return libraryService.addBook(book);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteBook(@PathVariable int id) {
        return libraryService.deleteBook(id);
    }
}
