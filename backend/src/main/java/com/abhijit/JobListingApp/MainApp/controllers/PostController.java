package com.abhijit.JobListingApp.MainApp.controllers;

import com.abhijit.JobListingApp.Authentication.Models.UserPrincipal;
import com.abhijit.JobListingApp.MainApp.repository.mongodbrepo;
import com.abhijit.JobListingApp.MainApp.models.Posts;
import com.abhijit.JobListingApp.MainApp.repository.searchrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
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

    public Integer getcurrentUserId() {
        UserPrincipal principal =
                (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return principal.getId();
    }


    @PostMapping("/addpost")
    @PreAuthorize("hasRole('COMPANY')")
    public Posts add(@RequestBody Posts post1) {

        post1.setOwnerId(getcurrentUserId());

        return repo.save(post1);
    }

    @GetMapping("/myposts")
    @PreAuthorize("hasRole('COMPANY')")
    public List<Posts> myposts() {
        return repo.findByOwnerId(getcurrentUserId());
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<Void> delete(@PathVariable String id) {

        Posts post = repo.findById(id).orElse(null);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }
        if (!post.getOwnerId().equals(getcurrentUserId())) {
            return ResponseEntity.status(403).build();
        }
        repo.delete(post);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Posts> update(@PathVariable String id, @RequestBody Posts postupdate) {

        Posts post = repo.findById(id).orElse(null);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }
        if (!post.getOwnerId().equals(getcurrentUserId())) {
            return ResponseEntity.status(403).build();
        }
        postupdate.setId(id);
        postupdate.setOwnerId(post.getOwnerId());

        return ResponseEntity.ok(repo.save(postupdate));

    }
}