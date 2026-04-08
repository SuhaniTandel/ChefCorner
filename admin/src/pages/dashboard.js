import React from "react";

function Dashboard() {
  const stats = [
    { label: "Total Recipes", value: 128, icon: "👨‍🍳", color: "#fb7185" },
    { label: "Premium Recipes", value: 42, icon: "⭐", color: "#f472b6" },
    { label: "Active Users", value: "1,245", icon: "👥", color: "#ec4899" },
    { label: "Total Orders", value: 312, icon: "🛒", color: "#f97316" }
  ];

  return (
    <div className="admin-content">
      
      {/* Welcome */}
      <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "30px", borderRadius: "12px", marginBottom: "30px", color: "#fff" }}>
        <h1 style={{ fontSize: "32px", margin: "0 0 10px 0", fontWeight: "700" }}>Welcome back 👋</h1>
        <p style={{ fontSize: "16px", margin: "0", opacity: "0.9" }}>Here's what's happening on ChefCorner today</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "30px" }}>
        {stats.map((stat, idx) => (
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
      
      {/* Welcome */}
      <div class="welcome-box">
        <h1>Welcome back 👋</h1>
        <p>Here’s what’s happening on ChefCorner today</p>
      </div>

      {/* Stats */}
      <div class="stats">
        <div class="card">
          <h3>Total Recipes</h3>
          <p>128</p>
        </div>

        <div class="card">
          <h3>Premium Recipes</h3>
          <p>42</p>
        </div>

        <div class="card">
          <h3>Users</h3>
          <p>1,245</p>
        </div>

        <div class="card">
          <h3>Orders</h3>
          <p>312</p>
        </div>
      </div>

      {/* Categories Overview */}
      <div className="table-box" style={{ marginTop: "0", marginBottom: "30px", borderRadius: "8px" }}>
        <h2 style={{ fontSize: "22px", marginBottom: "20px", fontWeight: "600", color: "#1f2937" }}>📊 Top Categories</h2>
        <table>
          <thead>
            <tr style={{ background: "#f8f9fa" }}>
              <th style={{ padding: "15px", textAlign: "left", fontWeight: "600", color: "#334155", fontSize: "14px" }}>Category</th>
              <th style={{ padding: "15px", textAlign: "left", fontWeight: "600", color: "#334155", fontSize: "14px" }}>Total Recipes</th>
              <th style={{ padding: "15px", textAlign: "left", fontWeight: "600", color: "#334155", fontSize: "14px" }}>Popularity</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #e5e7eb", transition: "background 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f9fafb"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
              <td style={{ padding: "15px", fontWeight: "500" }}>🇮🇳 Indian</td>
              <td style={{ padding: "15px" }}>48</td>
              <td style={{ padding: "15px" }}><span style={{ background: "#fecaca", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", color: "#991b1b" }}>🔥 High</span></td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb", transition: "background 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f9fafb"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
              <td style={{ padding: "15px", fontWeight: "500" }}>🇮🇹 Italian</td>
              <td style={{ padding: "15px" }}>32</td>
              <td style={{ padding: "15px" }}><span style={{ background: "#fef08a", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", color: "#854d0e" }}>⭐ Medium</span></td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb", transition: "background 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f9fafb"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
              <td style={{ padding: "15px", fontWeight: "500" }}>🍰 Desserts</td>
              <td style={{ padding: "15px" }}>28</td>
              <td style={{ padding: "15px" }}><span style={{ background: "#fbcfe8", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", color: "#831843" }}>❤️ High</span></td>
            </tr>
            <tr style={{ transition: "background 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f9fafb"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
              <td style={{ padding: "15px", fontWeight: "500" }}>🥬 Vegan</td>
              <td style={{ padding: "15px" }}>20</td>
              <td style={{ padding: "15px" }}><span style={{ background: "#d1fae5", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", color: "#047857" }}>👍 Growing</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Recent Orders */}
      <div className="table-box" style={{ borderRadius: "8px" }}>
        <h2 style={{ fontSize: "22px", marginBottom: "20px", fontWeight: "600", color: "#1f2937" }}>📦 Recent Orders</h2>
        <table>
          <thead>
            <tr style={{ background: "#f8f9fa" }}>
              <th style={{ padding: "15px", textAlign: "left", fontWeight: "600", color: "#334155", fontSize: "14px" }}>User</th>
              <th style={{ padding: "15px", textAlign: "left", fontWeight: "600", color: "#334155", fontSize: "14px" }}>Recipe</th>
              <th style={{ padding: "15px", textAlign: "left", fontWeight: "600", color: "#334155", fontSize: "14px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #e5e7eb", transition: "background 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f9fafb"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
              <td style={{ padding: "15px", fontWeight: "500" }}>👩 Anjali</td>
              <td style={{ padding: "15px" }}>Italian Pasta 🍝</td>
              <td style={{ padding: "15px" }}><span style={{ background: "#d1fae5", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", color: "#047857" }}>✅ Completed</span></td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb", transition: "background 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f9fafb"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
              <td style={{ padding: "15px", fontWeight: "500" }}>👱 Riya</td>
              <td style={{ padding: "15px" }}>Chocolate Cake 🍰</td>
              <td style={{ padding: "15px" }}><span style={{ background: "#fed7aa", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", color: "#92400e" }}>⏳ Pending</span></td>
            </tr>
            <tr style={{ transition: "background 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f9fafb"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
              <td style={{ padding: "15px", fontWeight: "500" }}>👨 Aman</td>
              <td style={{ padding: "15px" }}>Paneer Tikka 🍗</td>
              <td style={{ padding: "15px" }}><span style={{ background: "#d1fae5", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", color: "#047857" }}>✅ Completed</span></td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Dashboard;