import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const notifyRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifyRef.current && !notifyRef.current.contains(e.target)) {
        setNotifyOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sidebar toggle
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);

    const sidebar = document.querySelector('.admin-sidebar');
    if (sidebar) {
      sidebar.classList.toggle('hide');
    }
  };

  // Theme toggle
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-theme');
  };

  // Notification click handler
  const handleNotificationClick = () => {
    setNotifyOpen(!notifyOpen);
    setProfileOpen(false);
  };

  // Profile click handler
  const handleProfileClick = () => {
    setProfileOpen(!profileOpen);
    setNotifyOpen(false);
  };

  return (
    <>
      <nav className="admin-navbar">

        {/* LEFT */}
        <div className="nav-left">
          <i
            className="fas fa-bars menu-icon"
            onClick={toggleSidebar}
          ></i>
          <h2>ChefCorner</h2>
        </div>

        {/* CENTER */}
        <div className="nav-center">
          <div className="search-box">
            <i className="fas fa-search search-icon"></i>
            <input type="text" placeholder="Search recipes, chefs..." />
          </div>
        </div>

        {/* RIGHT */}
        <div className="nav-right">

          {/* THEME */}
          <i
            className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} theme-icon`}
            onClick={toggleTheme}
            title={darkMode ? "Light Mode" : "Dark Mode"}
          ></i>

          {/* NOTIFICATION */}
          <div
            className="notification-icon"
            onClick={handleNotificationClick}
            ref={notifyRef}
          >
            <i className="fas fa-bell"></i>
            <span className="notification-badge">4</span>

            {notifyOpen && (
              <div className="notification-dropdown">
                <div style={{ padding: "8px 0", fontSize: "12px", fontWeight: "600", color: "#64748b", paddingLeft: "15px", borderBottom: "1px solid #e5e7eb" }}>📢 NOTIFICATIONS</div>
                <div style={{ padding: "12px 15px", borderBottom: "1px solid #e5e7eb", cursor: "pointer", transition: "background 0.2s", display: "flex", gap: "10px", alignItems: "center" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9fa"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <span style={{ fontSize: "16px" }}>🍝</span>
                  <div>
                    <p style={{ margin: "0", fontSize: "13px", fontWeight: "600", color: "#1f2937" }}>New recipe added</p>
                    <p style={{ margin: "0", fontSize: "11px", color: "#64748b" }}>Paneer Tikka by Chef Ravi</p>
                  </div>
                </div>
                <div style={{ padding: "12px 15px", borderBottom: "1px solid #e5e7eb", cursor: "pointer", transition: "background 0.2s", display: "flex", gap: "10px", alignItems: "center" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9fa"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <span style={{ fontSize: "16px" }}>🛒</span>
                  <div>
                    <p style={{ margin: "0", fontSize: "13px", fontWeight: "600", color: "#1f2937" }}>Order completed</p>
                    <p style={{ margin: "0", fontSize: "11px", color: "#64748b" }}>Order #2847 shipped</p>
                  </div>
                </div>
                <div style={{ padding: "12px 15px", borderBottom: "1px solid #e5e7eb", cursor: "pointer", transition: "background 0.2s", display: "flex", gap: "10px", alignItems: "center" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9fa"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <span style={{ fontSize: "16px" }}>👍</span>
                  <div>
                    <p style={{ margin: "0", fontSize: "13px", fontWeight: "600", color: "#1f2937" }}>Chef liked your recipe</p>
                    <p style={{ margin: "0", fontSize: "11px", color: "#64748b" }}>Chef Arun liked Biryani</p>
                  </div>
                </div>
                <div style={{ padding: "12px 15px", cursor: "pointer", transition: "background 0.2s", display: "flex", gap: "10px", alignItems: "center" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9fa"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <span style={{ fontSize: "16px" }}>⭐</span>
                  <div>
                    <p style={{ margin: "0", fontSize: "13px", fontWeight: "600", color: "#1f2937" }}>New review received</p>
                    <p style={{ margin: "0", fontSize: "11px", color: "#64748b" }}>5 stars on Chocolate Cake</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* PROFILE */}
          <div className="profile-wrapper" ref={profileRef}>
            <img
              src="/assets/img/avatar.jpg"
              alt="Admin"
              className="admin-avatar"
              onClick={handleProfileClick}
            />

            {profileOpen && (
              <div className="profile-dropdown">
                <div style={{ padding: "15px", textAlign: "center", borderBottom: "1px solid #e5e7eb" }}>
                  <img src="/assets/img/avatar.jpg" alt="Admin" style={{ width: "50px", height: "50px", borderRadius: "50%", marginBottom: "8px", border: "2px solid #fb7185" }} />
                  <p style={{ margin: "0 0 4px 0", fontSize: "13px", fontWeight: "700", color: "#1f2937" }}>Admin User</p>
                  <p style={{ margin: "0", fontSize: "11px", color: "#64748b" }}>admin@chefcorner.com</p>
                </div>
                <div style={{ padding: "8px 0" }}>
                  <div style={{ padding: "12px 15px", cursor: "pointer", transition: "background 0.2s", display: "flex", gap: "10px", alignItems: "center", fontSize: "14px" }} onClick={() => { navigate('/admin-profile'); setProfileOpen(false); }} onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9fa"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                    <span style={{ fontSize: "16px" }}>👤</span>
                    <span style={{ color: "#475569", fontWeight: "500" }}>My Profile</span>
                  </div>
                  <div style={{ padding: "12px 15px", cursor: "pointer", transition: "background 0.2s", display: "flex", gap: "10px", alignItems: "center", fontSize: "14px" }} onClick={() => { navigate('/admin-settings'); setProfileOpen(false); }} onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9fa"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                    <span style={{ fontSize: "16px" }}>⚙️</span>
                    <span style={{ color: "#475569", fontWeight: "500" }}>Settings</span>
                  </div>
                  <div style={{ padding: "12px 15px", cursor: "pointer", transition: "background 0.2s", display: "flex", gap: "10px", alignItems: "center", fontSize: "14px" }} onClick={() => { navigate('/admin-analytics'); setProfileOpen(false); }} onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9fa"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                    <span style={{ fontSize: "16px" }}>📊</span>
                    <span style={{ color: "#475569", fontWeight: "500" }}>Analytics</span>
                  </div>
                  <div style={{ padding: "8px 15px", margin: "4px 0", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb" }}>
                    <div style={{ padding: "8px 0", cursor: "pointer", transition: "background 0.2s", display: "flex", gap: "10px", alignItems: "center", fontSize: "14px" }} onClick={() => { navigate('/admin-logout'); setProfileOpen(false); }} onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9fa"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                      <span style={{ fontSize: "16px" }}>🚪</span>
                      <span style={{ color: "#ef4444", fontWeight: "600" }}>Logout</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

      </nav>
    </>
  );
}

export default Header;
