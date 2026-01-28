import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./NewPost.css";

export default function NewPost() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    experience: "",
    skills: "",
    jobType: "FULL_TIME",
    postedOn: "",
    remote: false,
    link: "",
    Mobile_no: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      skills: form.skills.split(",").map((s) => s.trim()),
    };

    await api.post("/addpost", payload);
    navigate("/company");
  };

  return (
    <div className="newpost-page">
      <div className="newpost-card">
        <h2>Add Job</h2>
        <p className="subtitle">
          Provide details about the role you are hiring for
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid">
            <input
              name="title"
              placeholder="Job Title"
              value={form.title}
              onChange={handleChange}
              required
            />

            <input
              name="company"
              placeholder="Company"
              value={form.company}
              onChange={handleChange}
              required
            />

            <input
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              required
            />

            <input
              name="salary"
              placeholder="Salary"
              value={form.salary}
              onChange={handleChange}
            />

            <input
              name="experience"
              placeholder="Experience (e.g. 2+ years)"
              value={form.experience}
              onChange={handleChange}
            />

            <select
              name="jobType"
              value={form.jobType}
              onChange={handleChange}
            >
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="CONTRACT">Contract</option>
            </select>
          </div>

          <input
            name="skills"
            placeholder="Skills (comma separated)"
            value={form.skills}
            onChange={handleChange}
          />

          <div className="row">
            <input
              type="date"
              name="postedOn"
              value={form.postedOn}
              onChange={handleChange}
            />

            <input
              name="Mobile_no"
              placeholder="Mobile Number"
              value={form.Mobile_no}
              onChange={handleChange}
            />
          </div>

          <input
            name="link"
            placeholder="Apply Link"
            value={form.link}
            onChange={handleChange}
          />

          <label className="checkbox">
            <input
              type="checkbox"
              name="remote"
              checked={form.remote}
              onChange={handleChange}
            />
            Remote position
          </label>

          <div className="actions">
            <button
              type="button"
              className="secondary"
              onClick={() => navigate("/company")}
            >
              Back
            </button>

            <button type="submit" className="primary">
              Create Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
