import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
import "./viewcategory.css";

function ViewCategory() {

  const [list, setList] = useState([]);

  // 🔄 Fetch Categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    Axios.get("http://localhost:3001/api/viewcategory")
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load categories",
        });
      });
  };

  // 🗑 Delete Category
  const handleDelete = (category_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This category will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        Axios.delete(`http://localhost:3001/api/deletecategory/${category_id}`)
          .then(() => {
            setList(list.filter(item => item.category_id !== category_id));
            Swal.fire(
              "Deleted!",
              "Category has been deleted.",
              "success"
            );
          });

      } else {
        Swal.fire(
          'Cancelled',
          'Category deletion cancelled.',
          'info'
        );
      }
    });
  }

  return (
    <div className="admin-content">

      <div className="category-header">
        <h1>Category Management</h1>
        <Link to="/addcategory">
          <button className="add-btn">Add Category</button>
        </Link>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th> {/* ✅ ADD */}
              <th>Category Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {list.length > 0 ? (
              list.map((Val, index) => (
                <tr key={Val.category_id}>
                  <td>{index + 1}</td>

                  {/* ✅ IMAGE SHOW */}
                  <td>
                    <img
                      src={`http://localhost:3001/public/${Val.image}`}
                      alt="category"
                      style={{ width: "70px", height: "50px", objectFit: "cover" }}
                    />
                  </td>

                  <td>{Val.category_name}</td>
                  <td>{Val.description}</td>

                  <td>
                    <Link
                      to="/editcategory"
                      state={{ category_id: Val.category_id }}
                      className="btn btn-success"
                    >
                      Edit
                    </Link>

                    <a
                      className="btn btn-danger"
                      onClick={() => handleDelete(Val.category_id)}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No categories found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default ViewCategory;
