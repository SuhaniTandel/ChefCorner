import React from "react";

function AdminAnalytics() {
  const analyticsData = [
    { label: "Total Users", value: "1,245", change: "+12%", color: "#fb7185", icon: "👥" },
    { label: "Total Revenue", value: "$24,580", change: "+8%", color: "#f472b6", icon: "💰" },
    { label: "Recipes Published", value: 128, change: "+5%", color: "#ec4899", icon: "👨‍🍳" },
    { label: "Active Sessions", value: 342, change: "+18%", color: "#f97316", icon: "🔒" }
  ];

  const revenueByCategory = [
    { name: "Indian", revenue: "$5,200", percentage: 22 },
    { name: "Italian", revenue: "$4,150", percentage: 18 },
    { name: "Desserts", revenue: "$3,800", percentage: 16 },
    { name: "Vegan", revenue: "$2,950", percentage: 13 },
    { name: "Asian", revenue: "$3,250", percentage: 14 },
    { name: "Others", revenue: "$5,230", percentage: 17 }
  ];

  return (
    <div className="admin-content">
      {/* Welcome */}
      <div style={{ background: "linear-gradient(135deg, #f97316 0%, #fb923c 100%)", padding: "30px", borderRadius: "12px", marginBottom: "30px", color: "#fff" }}>
        <h1 style={{ fontSize: "32px", margin: "0 0 10px 0", fontWeight: "700" }}>📊 Analytics Dashboard</h1>
        <p style={{ fontSize: "16px", margin: "0", opacity: "0.9" }}>Real-time insights and performance metrics</p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "30px" }}>
        {analyticsData.map((stat, idx) => (
          <div key={idx} className="card" style={{ padding: "25px", borderLeft: `5px solid ${stat.color}`, borderRadius: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <div>
                <p style={{ color: "#64748b", fontSize: "13px", margin: "0", fontWeight: "600" }}>{stat.label}</p>
                <p style={{ color: stat.color, fontSize: "28px", fontWeight: "bold", margin: "8px 0 0 0" }}>{stat.value}</p>
              </div>
              <div style={{ fontSize: "32px" }}>{stat.icon}</div>
            </div>
            <p style={{ color: "#16a34a", fontSize: "13px", margin: "0", fontWeight: "600" }}>{stat.change} this month</p>
          </div>
        ))}
      </div>

      {/* Revenue by Category */}
      <div className="card" style={{ padding: "30px", borderRadius: "8px", marginBottom: "30px" }}>
        <h2 style={{ margin: "0 0 20px 0", fontSize: "22px", fontWeight: "600", color: "#1f2937" }}>💵 Revenue by Category</h2>
        <div style={{ display: "grid", gap: "15px" }}>
          {revenueByCategory.map((cat, idx) => (
            <div key={idx}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontWeight: "600", color: "#1f2937" }}>{cat.name}</span>
                <span style={{ fontWeight: "bold", color: "#fb7185" }}>{cat.revenue}</span>
              </div>
              <div style={{ background: "#f3f4f6", borderRadius: "8px", height: "8px", overflow: "hidden" }}>
                <div
                  style={{
                    background: `linear-gradient(90deg, #fb7185 0%, #f472b6 100%)`,
                    height: "100%",
                    width: `${cat.percentage}%`,
                    transition: "width 0.3s ease"
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Recipes */}
      <div className="card" style={{ padding: "30px", borderRadius: "8px" }}>
        <h2 style={{ margin: "0 0 20px 0", fontSize: "22px", fontWeight: "600", color: "#1f2937" }}>🔥 Top Recipes</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8f9fa", borderBottom: "2px solid #e5e7eb" }}>
              <th style={{ padding: "12px 15px", textAlign: "left", fontWeight: "600", color: "#475569", fontSize: "13px" }}>Recipe Name</th>
              <th style={{ padding: "12px 15px", textAlign: "left", fontWeight: "600", color: "#475569", fontSize: "13px" }}>Views</th>
              <th style={{ padding: "12px 15px", textAlign: "left", fontWeight: "600", color: "#475569", fontSize: "13px" }}>Favorites</th>
              <th style={{ padding: "12px 15px", textAlign: "left", fontWeight: "600", color: "#475569", fontSize: "13px" }}>Rating</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #e5e7eb", transition: "background 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f9fafb"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
              <td style={{ padding: "12px 15px", fontWeight: "500", color: "#1f2937" }}>🍛 Paneer Butter Masala</td>
              <td style={{ padding: "12px 15px", color: "#64748b" }}>1,245</td>
              <td style={{ padding: "12px 15px", color: "#64748b" }}>342</td>
              <td style={{ padding: "12px 15px" }}><span style={{ background: "#d1fae5", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", color: "#047857" }}>⭐ 4.8/5</span></td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb", transition: "background 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f9fafb"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
              <td style={{ padding: "12px 15px", fontWeight: "500", color: "#1f2937" }}>🍰 Chocolate Cake</td>
              <td style={{ padding: "12px 15px", color: "#64748b" }}>856</td>
              <td style={{ padding: "12px 15px", color: "#64748b" }}>268</td>
              <td style={{ padding: "12px 15px" }}><span style={{ background: "#d1fae5", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", color: "#047857" }}>⭐ 4.9/5</span></td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb", transition: "background 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f9fafb"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
              <td style={{ padding: "12px 15px", fontWeight: "500", color: "#1f2937" }}>🍚 Biryani Recipe</td>
              <td style={{ padding: "12px 15px", color: "#64748b" }}>734</td>
              <td style={{ padding: "12px 15px", color: "#64748b" }}>189</td>
              <td style={{ padding: "12px 15px" }}><span style={{ background: "#d1fae5", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", color: "#047857" }}>⭐ 4.7/5</span></td>
            </tr>
            <tr style={{ transition: "background 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f9fafb"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
              <td style={{ padding: "12px 15px", fontWeight: "500", color: "#1f2937" }}>🍗 Grilled Chicken</td>
              <td style={{ padding: "12px 15px", color: "#64748b" }}>612</td>
              <td style={{ padding: "12px 15px", color: "#64748b" }}>156</td>
              <td style={{ padding: "12px 15px" }}><span style={{ background: "#d1fae5", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", color: "#047857" }}>⭐ 4.6/5</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminAnalytics;
