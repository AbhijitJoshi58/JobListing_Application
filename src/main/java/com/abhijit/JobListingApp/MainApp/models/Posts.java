package com.abhijit.JobListingApp.MainApp.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "JobListing")
public class Posts {

    @Id
    private String id;

    private Integer ownerId;
    private String title;
    private String company;
    private String location;
    private String salary;
    private String experience;
    private List<String> skills;
    private String jobType;
    private String postedOn;
    private boolean remote;
    private String link;
    private String Mobile_no;

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getMobile_no() {
        return Mobile_no;
    }

    public void setMobile_no(String mobile_no) {
        Mobile_no = mobile_no;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getSalary() { return salary; }
    public void setSalary(String salary) { this.salary = salary; }

    public String getExperience() { return experience; }
    public void setExperience(String experience) { this.experience = experience; }

    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }

    public String getJobType() { return jobType; }
    public void setJobType(String jobType) { this.jobType = jobType; }

    public String getPostedOn() { return postedOn; }
    public void setPostedOn(String postedOn) { this.postedOn = postedOn; }

    public boolean isRemote() { return remote; }
    public void setRemote(boolean remote) { this.remote = remote; }

    public Integer getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Integer ownerId) {
        this.ownerId = ownerId;
    }

    @Override
    public String toString() {
        return "Posts{" +
                "id='" + id + '\'' +
                ", ownerId=" + ownerId +
                ", title='" + title + '\'' +
                ", company='" + company + '\'' +
                ", location='" + location + '\'' +
                ", salary='" + salary + '\'' +
                ", experience='" + experience + '\'' +
                ", skills=" + skills +
                ", jobType='" + jobType + '\'' +
                ", postedOn='" + postedOn + '\'' +
                ", remote=" + remote +
                ", link='" + link + '\'' +
                ", Mobile_no='" + Mobile_no + '\'' +
                '}';
    }
}
