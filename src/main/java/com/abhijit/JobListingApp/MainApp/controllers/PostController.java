package com.abhijit.JobListingApp.MainApp.controllers;

import com.abhijit.JobListingApp.MainApp.repository.mongodbrepo;
import com.abhijit.JobListingApp.MainApp.models.Posts;
import com.abhijit.JobListingApp.MainApp.repository.searchrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class PostController {

    @Autowired
    mongodbrepo repo;

    @Autowired
    searchrepo srepo;

    @GetMapping("/allposts")
    public List<Posts> showall() {
        return repo.findAll();
    }

    @GetMapping("posts/{Text}")
    public List<Posts> byText(@PathVariable String Text) {

        return srepo.findbyText(Text);

    }

    @PostMapping("/addpost")
    public Posts add(@RequestBody Posts post1) {
        repo.save(post1);
        return post1;
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {

        if(!repo.existsById(id)) {
           return ResponseEntity.notFound().build();
        }
            repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Posts> update(@PathVariable String id, @RequestBody Posts postupdate){

        if(!repo.existsById(id))
        {
            return ResponseEntity.notFound().build();
        }
        postupdate.setId(id);
        Posts post=repo.save(postupdate);
       return ResponseEntity.ok(post);
    }
}