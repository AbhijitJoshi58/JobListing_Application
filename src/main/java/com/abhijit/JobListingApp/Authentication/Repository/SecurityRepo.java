package com.abhijit.JobListingApp.Authentication.Repository;

import com.abhijit.JobListingApp.Authentication.Models.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SecurityRepo extends JpaRepository<Users,Integer> {

    Users findByusername(String username);
}
