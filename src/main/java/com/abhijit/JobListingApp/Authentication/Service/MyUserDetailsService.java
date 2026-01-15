package com.abhijit.JobListingApp.Authentication.Service;

import com.abhijit.JobListingApp.Authentication.Models.UserPrincipal;
import com.abhijit.JobListingApp.Authentication.Models.Users;
import com.abhijit.JobListingApp.Authentication.Repository.SecurityRepo;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private SecurityRepo repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Users user = repo.findByusername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        return new UserPrincipal(user);
    }
}
