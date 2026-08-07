import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname.includes(path) ? 'nav-item active' : 'nav-item';
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
        <button className="logout-btn" onClick={() => navigate('/login')}>
          Log Out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;