package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class LibraryModel {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
private int id;
private String bookName;
private String author;
private int price;
private boolean available = true;


public int getId() {
	return id;
}

public String getBookName() {
	return bookName;
}

public String getAuthor() {
	return author;
}

public int getPrice() {
	return price;
}

public void setId(int id) {
	this.id = id;
}

public void setBookName(String bookName) {
	this.bookName = bookName;
}

public void setAuthor(String author) {
	this.author = author;
}

public void setPrice(int price) {
	this.price = price;
}

public boolean isAvailable() {
    return available;
}

public void setAvailable(boolean available) {
    this.available = available;
}
public LibraryModel() {
	
}

public LibraryModel(int id, String bookName, String author, int price) {
	this.id = id;
	this.bookName = bookName;
	this.author = author;
	this.price = price;
}
}
