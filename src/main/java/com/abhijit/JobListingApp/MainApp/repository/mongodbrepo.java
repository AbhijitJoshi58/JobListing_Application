package com.abhijit.JobListingApp.MainApp.repository;

import com.abhijit.JobListingApp.MainApp.models.Posts;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface mongodbrepo extends MongoRepository<Posts,String> {
}
