import React from "react";

function Logout() {
  return (
    <div class="admin-content">

      <div class="welcome-box" style={{ textAlign: "center" }}>
        <h1>Logout 🔐</h1>
        <p>You are about to log out from ChefCorner Admin Panel</p>
      </div>

      <div class="table-box" style={{ textAlign: "center" }}>
        <h2>Are you sure?</h2>
        <p style={{ marginBottom: "20px", color: "#64748b" }}>
          Click confirm to securely logout
        </p>

        <button
          style={{
            padding: "12px 30px",
            background: "#fb7185",
            border: "none",
            borderRadius: "30px",
            color: "#fff",
            fontSize: "15px",
            cursor: "pointer"
          }}
        >
          Confirm Logout
        </button>
      </div>

    </div>
  );
}

export default Logout;
