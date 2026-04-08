import React from "react";

function Reviews() {
  return (
    <div class="admin-content">
      <div class="welcome-box">
        <h1>User Reviews ⭐</h1>
        <p>See what users are saying about recipes</p>
      </div>

      <div class="stats">
        <div class="card">
          <h3>Total Reviews</h3>
          <p>3</p>
        </div>
        <div class="card">
          <h3>Positive Reviews</h3>
          <p>2</p>
        </div>
        <div class="card">
          <h3>Negative Reviews</h3>
          <p>1</p>
        </div>
      </div>

      <div class="table-box">
        <h2>Recent Reviews</h2>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Recipe</th>
              <th>Image</th>
              <th>Rating</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Anjali</td>
              <td>Pasta</td>
              <td><img src="/assets/img/pasta.jpg" alt="Pasta" /></td>
              <td>⭐⭐⭐⭐⭐</td>
              <td>Absolutely delicious!</td>
            </tr>
            <tr>
              <td>Rohan</td>
              <td>Paneer Tikka</td>
              <td><img src="/assets/img/paneer_tikka.jpg" alt="Paneer Tikka" /></td>
              <td>⭐⭐⭐⭐</td>
              <td>Very tasty</td>
            </tr>
            <tr>
              <td>Meera</td>
              <td>Chocolate Cake</td>
              <td><img src="/assets/img/chocolate_cake.jpg" alt="Chocolate Cake" /></td>
              <td>⭐⭐⭐</td>
              <td>Good but a bit sweet</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reviews;