import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import "./NewPost.css";

export default function EditPost() {
  const { id } = useParams();
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

  /* ===== FETCH FROM /myposts AND FIND BY ID ===== */
  useEffect(() => {
    api.get("/myposts").then((res) => {
      const post = res.data.find(
        (p) => p.id === id || p._id === id
      );

      if (!post) {
        alert("Post not found");
        return;
      }

      setForm({
        title: post.title || "",
        company: post.company || "",
        location: post.location || "",
        salary: post.salary || "",
        experience: post.experience || "",
        skills: Array.isArray(post.skills) ? post.skills.join(", ") : "",
        jobType: post.jobType || "FULL_TIME",
        postedOn: post.postedOn ? post.postedOn.split("T")[0] : "",
        remote: Boolean(post.remote),
        link: post.link || "",
        Mobile_no: post.Mobile_no || "",
      });
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      skills: form.skills.split(",").map((s) => s.trim()),
    };

    await api.put(`/update/${id}`, payload);
    navigate("/company");
  };

  return (
    <div className="newpost-page">
      <div className="newpost-card">
        <h2>Edit Job</h2>
        <p className="subtitle">Modify the existing job details</p>

        <form onSubmit={handleSubmit}>
          <div className="grid">
            <input name="title" value={form.title} onChange={handleChange} />
            <input name="company" value={form.company} onChange={handleChange} />
            <input name="location" value={form.location} onChange={handleChange} />
            <input name="salary" value={form.salary} onChange={handleChange} />
            <input name="experience" value={form.experience} onChange={handleChange} />

            <select name="jobType" value={form.jobType} onChange={handleChange}>
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="CONTRACT">Contract</option>
            </select>
          </div>

          <input name="skills" value={form.skills} onChange={handleChange} />

          <div className="row">
            <input type="date" name="postedOn" value={form.postedOn} onChange={handleChange} />
            <input name="Mobile_no" value={form.Mobile_no} onChange={handleChange} />
          </div>

          <input name="link" value={form.link} onChange={handleChange} />

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
            <button type="button" className="secondary" onClick={() => navigate("/company")}>
              Back
            </button>
            <button type="submit" className="primary">
              Update Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
