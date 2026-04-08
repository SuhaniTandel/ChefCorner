import React from "react";

function Chefs() {
  const stats = [
    { label: "Total Chefs", value: 18, icon: "👨‍🍳", color: "#667eea" },
    { label: "Top Rated Chefs", value: 6, icon: "⭐", color: "#764ba2" }
  ];

  const chefs = [
    { name: "Chef Ramesh", specialty: "Indian", experience: "8 Years", recipes: 45, rating: "4.8", followers: 342, image: "/assets/img/avatar.jpg" },
    { name: "Chef Ananya", specialty: "Italian", experience: "5 Years", recipes: 32, rating: "4.5", followers: 256, image: "/assets/img/avatar.jpg" },
    { name: "Chef Marco", specialty: "European", experience: "10 Years", recipes: 58, rating: "4.9", followers: 521, image: "/assets/img/avatar.jpg" },
    { name: "Chef Priya", specialty: "Asian Fusion", experience: "6 Years", recipes: 41, rating: "4.7", followers: 298, image: "/assets/img/avatar.jpg" },
    { name: "Chef Rajesh", specialty: "Desserts", experience: "7 Years", recipes: 36, rating: "4.6", followers: 187, image: "/assets/img/avatar.jpg" },
    { name: "Chef Sarah", specialty: "Vegan", experience: "4 Years", recipes: 28, rating: "4.4", followers: 215, image: "/assets/img/avatar.jpg" }
  ];

  return (
    <div className="admin-content">
      {/* Welcome */}
      <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "30px", borderRadius: "12px", marginBottom: "30px", color: "#fff" }}>
        <h1 style={{ fontSize: "32px", margin: "0 0 10px 0", fontWeight: "700" }}>👨‍🍳 Chefs Management</h1>
        <p style={{ fontSize: "16px", margin: "0", opacity: "0.9" }}>Manage professional chefs on ChefCorner</p>
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

      {/* Chef Cards Grid */}
      <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "20px", color: "#1f2937" }}>👨‍🍳 Chef List</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "25px" }}>
        {chefs.map((chef, idx) => (
          <div key={idx} className="card" style={{ padding: "0", overflow: "hidden", borderRadius: "12px", boxShadow: "0 15px 35px rgba(0, 0, 0, 0.08)", transition: "all 0.3s ease", cursor: "pointer" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 20px 50px rgba(102, 126, 234, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.08)";
            }}
          >
            {/* Image Section */}
            <div style={{ background: "linear-gradient(135deg, #a78bfa 0%, #c084fc 100%)", height: "180px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "80px", overflow: "hidden" }}>
              <img src={chef.image} alt={chef.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            {/* Content Section */}
            <div style={{ padding: "20px" }}>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "18px", fontWeight: "700", color: "#1f2937" }}>{chef.name}</h3>
              <p style={{ margin: "0 0 12px 0", fontSize: "13px", color: "#64748b", fontWeight: "600" }}>{chef.specialty} • {chef.experience}</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px", paddingBottom: "12px", borderBottom: "1px solid #f3f4f6" }}>
                <div>
                  <p style={{ margin: "0", fontSize: "12px", color: "#64748b", fontWeight: "600" }}>👨‍🍳 Recipes</p>
                  <p style={{ margin: "4px 0 0 0", fontSize: "15px", fontWeight: "bold", color: "#667eea" }}>{chef.recipes}</p>
                </div>
                <div>
                  <p style={{ margin: "0", fontSize: "12px", color: "#64748b", fontWeight: "600" }}>⭐ Rating</p>
                  <p style={{ margin: "4px 0 0 0", fontSize: "15px", fontWeight: "bold", color: "#f59e0b" }}>{chef.rating}</p>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", paddingBottom: "12px", borderBottom: "1px solid #f3f4f6" }}>
                <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "600" }}>👥 {chef.followers} Followers</span>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button style={{ flex: 1, padding: "8px 12px", background: "#667eea", color: "#fff", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer", transition: "background 0.3s" }} onMouseEnter={(e) => e.target.style.background = "#764ba2"} onMouseLeave={(e) => e.target.style.background = "#667eea"}>View</button>
                <button style={{ flex: 1, padding: "8px 12px", background: "#10b981", color: "#fff", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer", transition: "background 0.3s" }} onMouseEnter={(e) => e.target.style.background = "#059669"} onMouseLeave={(e) => e.target.style.background = "#10b981"}>Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chefs;