import React from "react";

function Settings() {
  return (
    <div class="admin-content">

      <div class="welcome-box">
        <h1>Settings ⚙️</h1>
        <p>Customize your admin panel</p>
      </div>

      <div class="table-box">
        <h2>General Settings</h2>
        <table>
          <tbody>
            <tr>
              <td>Website Name</td>
              <td>ChefCorner</td>
            </tr>
            <tr>
              <td>Theme Color</td>
              <td>Pink</td>
            </tr>
            <tr>
              <td>Admin Email</td>
              <td>admin@chefcorner.com</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Settings;
