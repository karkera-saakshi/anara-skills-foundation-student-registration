import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';
import axios from 'axios';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname.includes(path) ? 'nav-item active' : 'nav-item';
  };

  let handleLogout = () => {
    axios.post("https://anara-skills-foundation-student-reg-sigma.vercel.app/api/logout", {}, { withCredentials: true })
      .then(() => {
        navigate('/login');
      })
      .catch((err) => {
        console.error('Error occurred while logging out:', err);
      });
  };

  return (
    <aside className="sidebar">
      
      <nav className="sidebar-nav">
        <Link to="/view" className={isActive('/view')}>
         View All Students
        </Link>
        <Link to="/create" className={isActive('/create')}>
         Add Student
        </Link>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={() => handleLogout()}>
          Log Out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;