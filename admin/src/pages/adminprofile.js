import React, { useState } from "react";

function AdminProfile() {
  const [editMode, setEditMode] = useState(false);

  const adminStats = [
    { label: "Total Recipes", value: 128, icon: "👨‍🍳", color: "#fb7185" },
    { label: "Active Users", value: "1,245", icon: "👥", color: "#f472b6" },
    { label: "Total Orders", value: 312, icon: "📦", color: "#ec4899" },
    { label: "Revenue", value: "$24,580", icon: "💰", color: "#f97316" }
  ];

  return (
    <div className="admin-content">
      {/* Welcome */}
      <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "30px", borderRadius: "12px", marginBottom: "30px", color: "#fff" }}>
        <h1 style={{ fontSize: "32px", margin: "0 0 10px 0", fontWeight: "700" }}>👤 Admin Profile</h1>
        <p style={{ fontSize: "16px", margin: "0", opacity: "0.9" }}>Manage your admin account and preferences</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "30px" }}>
        {adminStats.map((stat, idx) => (
          <div key={idx} className="card" style={{ padding: "25px", borderLeft: `5px solid ${stat.color}`, borderRadius: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "15px" }}>
              <div>
                <p style={{ color: "#64748b", fontSize: "13px", margin: "0", fontWeight: "600" }}>{stat.label}</p>
                <p style={{ color: stat.color, fontSize: "28px", fontWeight: "bold", margin: "8px 0 0 0" }}>{stat.value}</p>
              </div>
              <div style={{ fontSize: "32px" }}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Profile Section */}
      <div className="card" style={{ padding: "30px", marginBottom: "30px", borderRadius: "8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
          <h2 style={{ margin: "0", fontSize: "22px", fontWeight: "600", color: "#1f2937" }}>Personal Information</h2>
          <button
            onClick={() => setEditMode(!editMode)}
            style={{
              padding: "10px 20px",
              background: editMode ? "#ef4444" : "#fb7185",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background 0.3s"
            }}
            onMouseEnter={(e) => e.target.style.background = editMode ? "#dc2626" : "#f472b6"}
            onMouseLeave={(e) => e.target.style.background = editMode ? "#ef4444" : "#fb7185"}
          >
            {editMode ? "❌ Cancel" : "✏️ Edit"}
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "30px", alignItems: "start" }}>
          {/* Avatar */}
          <div style={{ textAlign: "center" }}>
            <img
              src="/assets/img/avatar.jpg"
              alt="Admin"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                border: "4px solid #fb7185",
                marginBottom: "15px"
              }}
            />
            <p style={{ margin: "0", fontSize: "14px", color: "#64748b" }}>Admin User</p>
          </div>

          {/* Form */}
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "8px" }}>First Name</label>
                <input
                  type="text"
                  defaultValue="Admin"
                  disabled={!editMode}
                  style={{
                    width: "100%",
                    padding: "10px 15px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    fontSize: "14px",
                    background: editMode ? "#fff" : "#f8fafc",
                    color: "#1f2937",
                    cursor: editMode ? "text" : "not-allowed"
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "8px" }}>Last Name</label>
                <input
                  type="text"
                  defaultValue="User"
                  disabled={!editMode}
                  style={{
                    width: "100%",
                    padding: "10px 15px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    fontSize: "14px",
                    background: editMode ? "#fff" : "#f8fafc",
                    color: "#1f2937",
                    cursor: editMode ? "text" : "not-allowed"
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "8px" }}>Email</label>
              <input
                type="email"
                defaultValue="admin@chefcorner.com"
                disabled={!editMode}
                style={{
                  width: "100%",
                  padding: "10px 15px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  fontSize: "14px",
                  background: editMode ? "#fff" : "#f8fafc",
                  color: "#1f2937",
                  cursor: editMode ? "text" : "not-allowed"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "8px" }}>Phone</label>
              <input
                type="text"
                defaultValue="+91 98765 43210"
                disabled={!editMode}
                style={{
                  width: "100%",
                  padding: "10px 15px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  fontSize: "14px",
                  background: editMode ? "#fff" : "#f8fafc",
                  color: "#1f2937",
                  cursor: editMode ? "text" : "not-allowed"
                }}
              />
            </div>

            {editMode && (
              <button
                style={{
                  marginTop: "20px",
                  padding: "12px 30px",
                  background: "#16a34a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "background 0.3s"
                }}
                onMouseEnter={(e) => e.target.style.background = "#15803d"}
                onMouseLeave={(e) => e.target.style.background = "#16a34a"}
              >
                ✅ Save Changes
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="card" style={{ padding: "30px", borderRadius: "8px" }}>
        <h2 style={{ margin: "0 0 20px 0", fontSize: "22px", fontWeight: "600", color: "#1f2937" }}>Preferences</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div style={{ padding: "15px", background: "#f8fafc", borderRadius: "6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ margin: "0 0 4px 0", fontWeight: "600", color: "#1f2937" }}>📧 Email Notifications</p>
              <p style={{ margin: "0", fontSize: "13px", color: "#64748b" }}>Receive email updates</p>
            </div>
            <input type="checkbox" defaultChecked style={{ width: "20px", height: "20px", cursor: "pointer" }} />
          </div>

          <div style={{ padding: "15px", background: "#f8fafc", borderRadius: "6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ margin: "0 0 4px 0", fontWeight: "600", color: "#1f2937" }}>🔔 Push Notifications</p>
              <p style={{ margin: "0", fontSize: "13px", color: "#64748b" }}>In-app alerts enabled</p>
            </div>
            <input type="checkbox" defaultChecked style={{ width: "20px", height: "20px", cursor: "pointer" }} />
          </div>

          <div style={{ padding: "15px", background: "#f8fafc", borderRadius: "6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ margin: "0 0 4px 0", fontWeight: "600", color: "#1f2937" }}>📊 Analytics Reports</p>
              <p style={{ margin: "0", fontSize: "13px", color: "#64748b" }}>Weekly reports</p>
            </div>
            <input type="checkbox" defaultChecked style={{ width: "20px", height: "20px", cursor: "pointer" }} />
          </div>

          <div style={{ padding: "15px", background: "#f8fafc", borderRadius: "6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ margin: "0 0 4px 0", fontWeight: "600", color: "#1f2937" }}>🔐 Two-Factor Auth</p>
              <p style={{ margin: "0", fontSize: "13px", color: "#64748b" }}>Enhanced security</p>
            </div>
            <input type="checkbox" style={{ width: "20px", height: "20px", cursor: "pointer" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
