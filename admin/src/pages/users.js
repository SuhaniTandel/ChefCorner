import React from "react";

function Users() {
  return (
    <div class="admin-content">

      <div class="welcome-box">
        <h1>Users 👤</h1>
        <p>Registered users on ChefCorner</p>
      </div>

      <div class="stats">
        <div class="card">
          <h3>Total Users</h3>
          <p>1,245</p>
        </div>

        <div class="card">
          <h3>New This Week</h3>
          <p>87</p>
        </div>
      </div>

      <div class="table-box">
        <h2>User List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Anjali</td>
              <td>anjali@gmail.com</td>
              <td>Active</td>
            </tr>
            <tr>
              <td>Rohan</td>
              <td>rohan@gmail.com</td>
              <td>Blocked</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Users;
