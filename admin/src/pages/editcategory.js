import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';


function EditCategory() {
    function categoryedit() {
        const category_name = document.getElementById("category_name").value;
        const description = document.getElementById("description").value;
        if (!category_name || !description ) {

        Swal.fire({
            icon: 'error',
            title: 'oops....',
            text: 'Please fill all the fields',
        });
        return;
        }



        Axios.post("http://localhost:3001/api/updatecategory", {
        category_id: categoryData.category_id,
        category_name: category_name,
        description: description

        }).then((response) => {
        if(response.data.message) {
            Swal.fire ({
            icon: 'success',
            title: 'Success',
            text: response.data.message || 'Category updated successfully',
            confirmButtonText: 'OK',
            }).then(() => {
            window.location = "/viewcategory";
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
  
    const [list, setList] = useState([]);
    const location = useLocation();
    const category_id = location.state?.category_id;

    const [categoryData, setCategoryData] = useState({
        category_name: '',
        description: ''
    });

    useEffect(() => {
        if (category_id) {
            Axios.post(`http://localhost:3001/api/editcategory`, { category_id: category_id })
                .then((response) => {
                    setCategoryData(response.data);
                    // alert(response.data);
                })
                .catch((error) => {
                    console.error("There was an error fetching the category data:", error);
                })
        }
    }, [category_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }
 
  return (
    <div className="admin-content">
      <div className="form-box">
        <h1> Edit Category 🗂️</h1>

          <div className="form-group">

            
            <input
              type="hidden"
              name="category_id" 
              id="category_id" value={categoryData.category_id}
            
              
            />
            </div>
            <div className="form-group">
            <label>Category Name</label>
            <input
                type="text"
                name="category_name" value={categoryData.category_name}
                id="category_name"
                onChange={handleChange}
                />
          </div>

          

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description" value={categoryData.description}
              rows="4"
              id="description"
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn-submit" onClick={categoryedit}  >Edit Category</button>

      </div>
    </div>
  );
}

export default EditCategory;