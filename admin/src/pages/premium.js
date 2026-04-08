import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import "./premium.css";

function Premium() {

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPremiumRecipes();
  }, []);

  const fetchPremiumRecipes = async () => {
    try {

      setLoading(true);

      const response = await Axios.get(
        "http://localhost:3001/api/viewrecipes"
      );

      const premiumRecipes = response.data.filter(
        (recipe) => Number(recipe.is_premium) === 1
      );

      setRecipes(premiumRecipes);

    } catch (error) {

      Swal.fire("Error", "Unable to load premium recipes", "error");

    } finally {

      setLoading(false);

    }
  };

  const removePremium = async (recipeId) => {

    const confirm = await Swal.fire({
      title: "Remove Premium?",
      text: "Recipe will no longer be premium.",
      icon: "warning",
      showCancelButton: true
    });

    if (!confirm.isConfirmed) return;

    try {

      await Axios.post(
        "http://localhost:3001/api/togglePremium",
        {
          recipe_id: recipeId,
          is_premium: 0
        }
      );

      Swal.fire("Removed!", "Recipe removed from premium", "success");

      fetchPremiumRecipes();

    } catch {

      Swal.fire("Error", "Failed to remove premium", "error");

    }
  };

  return (

    <div className="admin-content">

      <div className="premium-page">

        <div className="premium-header">

          <div>
            <h1>⭐ Premium Recipes</h1>
            <p>Manage all premium subscription recipes here</p>
          </div>

          <button
            className="refresh-btn"
            onClick={fetchPremiumRecipes}
          >
            Refresh
          </button>

        </div>

        <div className="premium-count-box">
          Total Premium Recipes:
          <span>{recipes.length}</span>
        </div>

        <div className="premium-table-wrapper">

          <table className="premium-table">

            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Recipe</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td colSpan="7" className="loading-text">
                    Loading Premium Recipes...
                  </td>
                </tr>

              ) : recipes.length > 0 ? (

                recipes.map((recipe, index) => (

                  <tr key={recipe.recipe_id}>

                    <td>{index + 1}</td>

                    <td>
                      <img
                        src={`http://localhost:3001/public/${recipe.image}`}
                        alt={recipe.recipe_name}
                        className="premium-img"
                      />
                    </td>

                    <td>{recipe.recipe_name}</td>

                    <td>{recipe.category_name}</td>

                    <td>₹{recipe.price}</td>

                    <td>
                      <span className="premium-status-badge">
                        Premium
                      </span>
                    </td>

                    <td>
                      <button
                        className="remove-btn"
                        onClick={() =>
                          removePremium(recipe.recipe_id)
                        }
                      >
                        Remove
                      </button>
                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="7" className="loading-text">
                    No Premium Recipes Found
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default Premium;