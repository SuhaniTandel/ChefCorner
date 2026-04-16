import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

function SubmitRecipe() {

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    recipe_name: "",
    description: "",
    category_id: "",
    prep_time: "",
    cook_time: "",
    servings: "",
    ingredients: "",
    steps: "",
    nutrition: "",
    price: "",
    difficulty: ""
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/viewcategory")
      .then((res) => setCategories(res.data))
      .catch(() => {
        Swal.fire("Error", "Category load failed", "error");
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    data.append("image", image);

    Axios.post("http://localhost:3001/api/addrecipe", data, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then((res) => {
      Swal.fire({
        title: "Success",
        text: "Recipe submitted! Waiting for admin approval.",
        icon: "success"
      }).then(() => {
        window.location.href = "/"; // 👈 redirect
      });
    })
      .catch(() => {
        Swal.fire("Error", "Something went wrong", "error");
      });
  };

  return (
    <>
    
      {/* Banner */}
      <section className="inner-page-banner bg-common">
        <div className="container">
          <div className="breadcrumbs-area text-center">
            <h1>Submit a Recipe</h1>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li>Recipe Post</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="submit-recipe-page-wrap padding-top-74 padding-bottom-50">
        <div className="container">

          {/* ✅ CENTER ALIGN FIX */}
          <div className="row justify-content-center">
            <div className="col-lg-18">
            
              <form className="submit-recipe-form" onSubmit={handleSubmit}>

                {/* Title */}
                <div className="form-group">
                  <label>Recipe Title</label>
                  <input
                    type="text"
                    name="recipe_name"
                    className="form-control"
                    placeholder="Enter recipe name"
                    onChange={handleChange}
                  />
                </div>

                {/* Category */}
                <div className="form-group">
                  <label>Choose Category</label>
                  <select
                    name="category_id"
                    className="form-control category-select"
                    onChange={handleChange}
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.category_id} value={cat.category_id}>
                        {cat.category_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows="6"
                    placeholder="Write recipe description..."
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Image */}
                <div className="form-group">
                  <label>Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

                <div className="mt-4 p-3" style={{background:"#f9f9f9", borderRadius:"10px"}}>

                <div className="row">
                    <div className="col-md-4">
                      <label>Prep Time</label>
                    <input type="text" name="prep_time" placeholder="e.g. 15 mins" className="form-control" onChange={handleChange}/>
                    </div>

                    <div className="col-md-4">
                      <label>Cook Time</label>
                    <input type="text" name="cook_time" placeholder="e.g. 30 mins" className="form-control" onChange={handleChange}/>
                    </div>

                    <div className="col-md-4">
                      <label>Servings</label>
                    <input type="number" name="servings" placeholder="e.g. 4 People" className="form-control" onChange={handleChange}/>
                    </div>
                </div>
                </div>

                {/* ===== Ingredients ===== */}
                <div className="form-group mt-3">
                  <label>Ingredients</label>
                  <textarea 
                    name="ingredients" className="form-control" 
                    placeholder="e.g. Rice:2 cups,Oil:1 tbsp,Salt:1 tsp" onChange={handleChange}>

                  </textarea>
                </div>

                {/* ===== Steps ===== */}
                <div className="form-group">
                <label>Steps</label>
                <textarea name="steps" className="form-control" placeholder="Step description:time | Step description:time" onChange={handleChange}></textarea>
                </div>

                {/* ===== Nutrition ===== */}
                <div className="form-group">
                <label>Nutrition Facts</label>
                <textarea name="nutrition" className="form-control" placeholder="Calories:200,Protein:10g,Fat:5g" onChange={handleChange}></textarea>
                </div>

                {/* ===== Difficulty ===== */}
                <div className="form-group mt-3">
                <label>Difficulty</label>
                <select name="difficulty" className="form-control" onChange={handleChange}>
                    <option value="">Select difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
                </div>

                {/* ===== Price ===== */}
                <div className="form-group">
                <label>Price (₹)</label>
                <input type="number" name="price" className="form-control" placeholder="Enter price" onChange={handleChange}/>
                </div>

                <button type="submit" className="btn-submit">
                  SUBMIT RECIPE
                </button>

              </form>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SubmitRecipe;