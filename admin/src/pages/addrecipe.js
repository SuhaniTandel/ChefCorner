import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Axios from "axios";

function AddRecipe() {

  const [categories, setCategories] = useState([]);

  // ✅ ADD THIS
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/viewcategory")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load categories",
        });
      });
  }, []);

  function recipeadd() {
    const recipe_name = document.getElementById("recipe_name").value;
    const image = document.getElementById("image").files[0];
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const ingredients = document.getElementById("ingredients").value;
    const steps = document.getElementById("steps").value;
    const category_id = document.getElementById("category_id").value;
    const difficulty = document.getElementById("difficulty").value;
    const nutrition = document.getElementById("nutrition").value;
    const servings = document.getElementById("servings").value;
    const prep_time = document.getElementById("prep_time").value;
    const cook_time = document.getElementById("cook_time").value;

    if (
      !recipe_name || !image || !description || !price ||
      !ingredients || !steps || !category_id || !difficulty ||
      !nutrition || !servings || !prep_time || !cook_time
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields",
      });
      return;
    }

    const formData = new FormData();
    formData.append("recipe_name", recipe_name);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("ingredients", ingredients);
    formData.append("steps", steps);
    formData.append("category_id", category_id);
    formData.append("difficulty", difficulty);
    formData.append("nutrition", nutrition);
    formData.append("servings", servings);
    formData.append("prep_time", prep_time);
    formData.append("cook_time", cook_time);

    // ✅ FIXED
    formData.append("is_premium", isPremium ? 1 : 0);

    Axios.post("http://localhost:3001/api/addrecipe", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then((response) => {
      if (response.data.message) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message,
        }).then(() => {
          window.location = "/viewrecipes";
        });
      }
    }).catch(() => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong",
      });
    });
  }

  return (
    <div className="admin-content">
      <div className="form-box">
        <h1>Add Recipe 🍽️</h1>

        <div className="form-group">
          <label>Recipe Name</label>
          <input type="text" id="recipe_name" placeholder="Enter recipe name" />
        </div>

        <div className="form-group">
          <label>Recipe Image</label>
          <input type="file" id="image" />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea id="description" rows="4" placeholder="Enter recipe description" />
        </div>

        <div className="form-group">
          <label>Prep Time</label>
          <input type="text" id="prep_time" placeholder="e.g. 15 mins" />
        </div>

        <div className="form-group">
          <label>Cook Time</label>
          <input type="text" id="cook_time" placeholder="e.g. 30 mins" />
        </div>

        <div className="form-group premium-toggle">
          <label>Premium Recipe</label>
          <div
            className={`toggle-switch ${isPremium ? "active" : ""}`}
            onClick={() => setIsPremium(!isPremium)}
          >
            <div className="toggle-thumb"></div>
          </div>
        </div>

        <div className="form-group">
          <label>Ingredients</label>
          <textarea 
            id="ingredients" 
            rows="4" 
            placeholder="e.g. Rice:2 cups,Oil:1 tbsp,Salt:1 tsp"
          />
        </div>

        <div className="form-group">
          <label>Steps</label>
          <textarea 
            id="steps" 
            rows="4" 
            placeholder="Step description:time | Step description:time"
          />
        </div>

        <div className="form-group">
          <label>Nutrition</label>
          <textarea 
            id="nutrition" 
            rows="3" 
            placeholder="Calories:200,Protein:10g,Fat:5g"
          />
        </div>

        <div className="form-group">
          <label>Servings</label>
          <input 
            type="number" 
            id="servings" 
            placeholder="e.g. 4 People"
          />
        </div>

        <div className="form-group">
          <label>Select Category</label>
          <select id="category_id">
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Difficulty</label>
          <select id="difficulty">
            <option value="">Select difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="form-group">
          <label>Price (₹)</label>
          <input type="number" id="price" placeholder="Enter price" />
        </div>

        <button type="button" className="btn-submit" onClick={recipeadd}>
          Add Recipe
        </button>

      </div>
    </div>
  );
}

export default AddRecipe;