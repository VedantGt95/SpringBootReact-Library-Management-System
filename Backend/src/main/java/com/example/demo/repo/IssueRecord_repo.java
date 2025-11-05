package com.example.demo.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.IssueRecord;

public interface IssueRecord_repo extends JpaRepository<IssueRecord,Integer>{

	Optional<IssueRecord> findByLibraryModelIdAndReturnDateIsNull(int bookId);

}
