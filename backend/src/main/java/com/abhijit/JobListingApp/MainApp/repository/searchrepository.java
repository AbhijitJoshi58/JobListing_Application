package com.abhijit.JobListingApp.MainApp.repository;

import com.abhijit.JobListingApp.MainApp.models.Posts;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class searchrepository implements searchrepo
{
    @Autowired
    MongoClient client;

    @Autowired
    MongoConverter converter;

    @Override
    public List<Posts> findbyText(String Text) {

        final List<Posts> p = new ArrayList<>();

        MongoDatabase database = client.getDatabase("JobListing");
        MongoCollection<Document> collection = database.getCollection("JobListing");
        AggregateIterable<Document> result = collection.aggregate(Arrays.asList(new Document("$search",
                        new Document("text",
                                new Document("query", Text)
                                        .append("path", Arrays.asList( "title","company"," location","salary","experience","skills","jobType"))
                                        .append("matchCriteria", "any"))),
                new Document("$sort",
                        new Document("experience", 1L))));

        result.forEach(doc -> p.add(converter.read(Posts.class,doc)));
        return p;
    }
}
