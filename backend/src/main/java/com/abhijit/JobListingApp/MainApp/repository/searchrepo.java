package com.abhijit.JobListingApp.MainApp.repository;

import com.abhijit.JobListingApp.MainApp.models.Posts;

import java.util.List;

public interface searchrepo
{

public List<Posts> findbyText(String Text);

}
