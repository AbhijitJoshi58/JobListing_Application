// CompanyDashboard.jsx (UNCHANGED)
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../auth/AuthContext";
import "./Company.css";

export default function CompanyDashboard() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const [myPosts, setMyPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMyPosts();
    fetchAllPosts();
  }, []);

  const fetchMyPosts = async () => {
    const res = await api.get("/myposts");
    setMyPosts(res.data);
  };

  const fetchAllPosts = async () => {
    const res = await api.get("/allposts");
    setAllPosts(res.data);
  };

  const deletePost = async (id) => {
    await api.delete(`/delete/${id}`);
    fetchMyPosts();
    fetchAllPosts();
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const filteredPosts = allPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2 className="logo">
          Hire<span>Network</span>
        </h2>
        <nav>
          <p className="active">Dashboard</p>
          <p>My Jobs</p>
          <p>Applicants</p>
          <p>Settings</p>
        </nav>
      </aside>

      <div className="content">
        <header className="topbar">
          <input
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="actions">
            <button onClick={() => navigate("/company/new-post")}>
              + Add Job
            </button>
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <main className="main">
          <h3>My Posts</h3>
          <div className="card-list">
            {myPosts.map((p) => (
              <div className="card" key={p.id}>
                <h4>{p.title}</h4>
                <p>{p.location}</p>
                <div className="card-actions">
                  <button onClick={() => navigate(`/company/edit/${p.id}`)}>
                    Edit
                  </button>
                  <button className="danger" onClick={() => deletePost(p.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: 40 }}>All Posts</h3>
          <div className="grid">
            {filteredPosts.map((p) => (
              <div className="grid-card" key={p.id}>
                <h4>{p.title}</h4>
                <p>{p.company}</p>
                <span>{p.location}</span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
