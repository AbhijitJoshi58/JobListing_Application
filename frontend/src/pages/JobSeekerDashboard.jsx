import { useEffect, useState } from "react";
import api from "../api/axios";
import "./JobSeeker.css";

export default function JobSeekerDashboard() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [jobType, setJobType] = useState("ALL");
  const [remoteOnly, setRemoteOnly] = useState(false);

  useEffect(() => {
    api
      .get("/allposts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const normalize = (v) =>
    v?.toLowerCase().replace(/[\s-]/g, "_");

  const filteredPosts = posts.filter((p) => {
    const matchesSearch = debouncedSearch
      ? `
        ${p.title}
        ${p.company}
        ${p.location}
        ${p.jobType}
        ${p.salary}
        ${p.experience}
        ${p.skills?.join(" ")}
      `
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase())
      : true;

    const matchesJobType =
      jobType === "ALL" ||
      normalize(p.jobType) === normalize(jobType);

    const matchesRemote = remoteOnly ? p.remote === true : true;

    return matchesSearch && matchesJobType && matchesRemote;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="nav-left">Find jobs</div>

          <div className="nav-search">
            <input
              type="text"
              placeholder="Search jobs, skills, companies"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="page">
        <aside className="filters">
          <h3>Filter</h3>

          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="ALL">All Job Types</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
          </select>

          <label className="checkbox">
            <input
              type="checkbox"
              checked={remoteOnly}
              onChange={(e) => setRemoteOnly(e.target.checked)}
            />
            Remote Only
          </label>
        </aside>

        <main className="main">
          {filteredPosts.length === 0 && <p>No jobs found.</p>}

          <div className="jobs-grid">
            {filteredPosts.map((job) => (
              <div className="job-card" key={job.id}>
                <h3>{job.title}</h3>

                <div className="job-meta">
                  {job.company} • {job.location}
                </div>

                <div className="tags">
                  <span className="tag">{job.jobType}</span>
                  <span className="tag">
                    {job.remote ? "Remote" : "Onsite"}
                  </span>
                </div>

                <div className="job-meta">
                  {job.salary} • {job.experience}
                </div>

                <a href={job.link} target="_blank" rel="noreferrer">
                  <button className="apply-btn">Apply</button>
                </a>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
