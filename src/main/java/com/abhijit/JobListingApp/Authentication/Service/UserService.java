package com.abhijit.JobListingApp.Authentication.Service;

import com.abhijit.JobListingApp.Authentication.Models.Users;
import com.abhijit.JobListingApp.Authentication.Repository.SecurityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private AuthenticationManager authmanager;

    @Autowired
    private SecurityRepo repo;

    @Autowired
    private JWTService jwtservice;

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);


    public Users register(Users user)
    {
        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }

    public String verify(Users user)
    {
        Authentication authentication =authmanager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()));

        if(authentication.isAuthenticated())
            return jwtservice.generatetoken(user.getUsername());

        return "failed";
    }
}
