import React, { useEffect, useState } from "react";
import Axios from "axios";

function Dashboard() {

  const [stats, setStats] = useState({
    totalRecipes: 0,
    premiumRecipes: 0,
    activeUsers: 0,
    totalOrders: 0,
    totalRevenue: 0
  });

  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {

      // ================= RECIPES =================
      const recipeRes = await Axios.get("http://localhost:3001/api/viewrecipes");
      const recipes = recipeRes.data || [];

      const totalRecipes = recipes.length;

      const premiumRecipes = recipes.filter(
        (r) => Number(r.is_premium) === 1
      ).length;

      // ================= SUBSCRIPTION STATS =================
      const subStats = await Axios.get("http://localhost:3001/api/admin/subscription-stats");

      const subData = subStats.data?.data || {};

      // ================= ORDERS =================
      const orderRes = await Axios.get("http://localhost:3001/api/admin/subscriptions");
      const ordersData = orderRes.data?.data || [];

      // ================= CATEGORY COUNT =================
      const categoryCount = {};

      recipes.forEach((r) => {
        if (r.category_name) {
          categoryCount[r.category_name] =
            (categoryCount[r.category_name] || 0) + 1;
        }
      });

      const topCategories = Object.entries(categoryCount)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 4);

      // ================= SET STATE =================
      setStats({
        totalRecipes,
        premiumRecipes,
        activeUsers: subData.activeSubscriptions || 0,
        totalOrders: ordersData.length,
        totalRevenue: subData.totalRevenue || 0
      });

      setCategories(topCategories);
      setOrders(ordersData.slice(0, 5));

    } catch (err) {
      console.log("Dashboard Error:", err);
    }
  };

  return (
    <div className="admin-content">

      {/* WELCOME */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "30px",
        borderRadius: "12px",
        marginBottom: "30px",
        color: "#fff"
      }}>
        <h1>Welcome back 👋</h1>
        <p>Here's what's happening on ChefCorner today</p>
      </div>

      {/* STATS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
        marginBottom: "30px"
      }}>

        <div className="card">
          <h3>Total Recipes</h3>
          <p>{stats.totalRecipes}</p>
        </div>

        <div className="card">
          <h3>Premium Recipes</h3>
          <p>{stats.premiumRecipes}</p>
        </div>

        <div className="card">
          <h3>Active Users</h3>
          <p>{stats.activeUsers}</p>
        </div>

        <div className="card">
          <h3>Total Orders</h3>
          <p>{stats.totalOrders}</p>
        </div>

        <div className="card">
          <h3>Total Revenue</h3>
          <p>₹{stats.totalRevenue}</p>
        </div>

      </div>

      {/* CATEGORIES */}
      <div className="table-box">
        <h2>📊 Top Categories</h2>

        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Total Recipes</th>
            </tr>
          </thead>

          <tbody>
            {categories.length > 0 ? (
              categories.map((cat, i) => (
                <tr key={i}>
                  <td>{cat.name}</td>
                  <td>{cat.count}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No Data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* RECENT ORDERS */}
      <div className="table-box" style={{ marginTop: "30px" }}>
        <h2>📦 Recent Orders</h2>

        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Plan</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((o) => (
                <tr key={o.subscription_id}>
                  <td>{o.user_name}</td>
                  <td>{o.plan_name}</td>
                  <td>₹{o.amount}</td>

                  <td style={{
                    color: o.status === "Active" ? "green" : "red",
                    fontWeight: "bold"
                  }}>
                    {o.status}
                  </td>

                  <td>
                    {o.payment_date
                      ? new Date(o.payment_date).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No Orders</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Dashboard;