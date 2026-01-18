package com.abhijit.JobListingApp.MainApp.repository;

import com.abhijit.JobListingApp.MainApp.models.Posts;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Limit;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface mongodbrepo extends MongoRepository<Posts,String> {

    List<Posts> findByOwnerId(Integer ownerId);

    Optional<Posts> findByidAndOwnerId(String id, Integer ownerId );

    void deleteByIdAndOwnerId(String id, Integer ownerId);


}
