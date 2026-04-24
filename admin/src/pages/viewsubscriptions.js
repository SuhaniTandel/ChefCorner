import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./viewsubscriptions.css";

function ViewSubscriptions() {

  const [subs, setSubs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    Axios.get("http://localhost:3001/api/admin/subscriptions")
      .then((res) => {
        console.log("API DATA:", res.data);
        setSubs(res.data.data || []);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="admin-content">

      <h2>💳 User Subscription Details</h2>

      <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Plan</th>
            <th>Amount</th>
            <th>Payment Date</th>
            <th>Expiry Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {subs.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No Data Found
              </td>
            </tr>
          ) : (
            subs.map((s) => (
              <tr key={s.subscription_id}>

                <td>{s.user_name}</td>
                <td>{s.user_email}</td>
                <td>{s.plan_name}</td>
                <td>₹{s.amount}</td>

                <td>
                  {s.payment_date
                    ? new Date(s.payment_date).toLocaleString()
                    : "N/A"}
                </td>

                <td>
                  {s.expiry_date
                    ? new Date(s.expiry_date).toLocaleDateString()
                    : "N/A"}
                </td>

                <td>
                  <span style={{
                    color: s.status === "Active" ? "green" : "red",
                    fontWeight: "bold"
                  }}>
                    {s.status}
                  </span>
                </td>

              </tr>
            ))
          )}
        </tbody>

      </table>

    </div>
  );
}

export default ViewSubscriptions;