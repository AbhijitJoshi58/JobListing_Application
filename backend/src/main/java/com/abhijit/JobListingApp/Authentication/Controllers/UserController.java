package com.abhijit.JobListingApp.Authentication.Controllers;

import com.abhijit.JobListingApp.Authentication.Models.Users;
import com.abhijit.JobListingApp.Authentication.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    UserService service;

    @PostMapping("/register")
    public Users Register(@RequestBody Users user)
    {
        return service.register(user) ;
    }

    @PostMapping("/login")
    public String Login(@RequestBody Users user)
    {
        return service.verify(user);
    }
}
