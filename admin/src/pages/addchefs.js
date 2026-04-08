import React from "react";
import Swal from 'sweetalert2';
import Axios from 'axios';

function AddChef() {
  function chefsadd() {
    const chefs_name = document.getElementById("chefs_name").value;
    const description = document.getElementById("description").value;
    

    if (!chefs_name || !description  ) {

      Swal.fire({
        icon: 'error',
        title: 'oops....',
        text: 'Please fill all the fields',
      });
      return;
    }



    Axios.post("http://localhost:3001/api/addchefs", {
      chefs_name: chefs_name,
      description: description

    }).then((response) => {
      if(response.data.message) {
        Swal.fire ({
          icon: 'success',
          title: 'Success',
          text: response.data.message || 'Chef added successfully',
          confirmButtonText: 'OK',
        }).then(() => {
          window.location = "/chefs";
        });
      }
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong',
      });
    });
  }
  return (
    <div className="admin-content">
      <div className="form-box">
        <h1>Add Chef 👨‍🍳</h1>

        
          <div className="form-group">
            <label>Chef Name</label>
            <input
              type="text"
              name="name"
              id="chefs_name"
              placeholder="Enter chef name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group">
            <label>Experience (Years)</label>
            <input
              type="number"
              name="experience"
              id="experience"
              placeholder="Enter years of experience"
              required
            />
          </div>

          <div className="form-group">
            <label>Specialty</label>
            <input
              type="text"
              name="specialty"
              id="specialty"
              placeholder="e.g. Italian, Indian, Chinese"
              required
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              rows="4"
              placeholder="Short description about chef"
              required
            ></textarea>
          </div>

          

          <button type="submit" className="btn-submit" onClick={chefsadd} >Add Chef</button>
        
      </div>
    </div>
  );
}

export default AddChef;