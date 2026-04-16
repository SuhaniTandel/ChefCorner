import React from "react";
import Swal from 'sweetalert2';
import Axios from 'axios';

function AddCategory() {
function categoryadd() {
  const category_name = document.getElementById("category_name").value;
  const description = document.getElementById("description").value;
  const image = document.getElementById("image").files[0];

  if (!category_name || !description || !image) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please fill all fields including image',
    });
    return;
  }

  const formData = new FormData();
  formData.append("category_name", category_name);
  formData.append("description", description);
  formData.append("image", image);

  Axios.post("http://localhost:3001/api/addcategory", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
    .then((response) => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message || 'Category added successfully',
      }).then(() => {
        window.location = "/viewcategory";
      });
    })
    .catch(() => {
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
        <h1>Add Category 🗂️</h1>

        

          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              name="name"
              id="category_name"
              placeholder="Enter category name"
              required
            />
          </div>

          

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Enter category description"
              rows="4"
              id="description"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Category Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              required
            />
          </div>

          <button type="submit" className="btn-submit" onClick={categoryadd}>Add Category</button>

      </div>
    </div>
  );
}

export default AddCategory;