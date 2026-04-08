import React, { useState } from "react";
import "./searchbar.css";

function SearchBar({ recipes }) {

  const [query, setQuery] = useState("");

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.recipe_name.toLowerCase().includes(query.toLowerCase()) ||
    recipe.category_name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-wrapper">

      {/* Search Input */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button>
          <i className="fas fa-search"></i>
        </button>
      </div>

      {/* Search Results */}
      {query && (
        <div className="search-results">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <div className="search-item" key={recipe.recipe_id}>
                <img
                  src={`http://localhost:3001/public/${recipe.image}`}
                  alt=""
                />

                <div>
                  <h4>{recipe.recipe_name}</h4>
                  <p>{recipe.category_name}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-result">No Recipe Found</p>
          )}
        </div>
      )}

    </div>
  );
}

export default SearchBar;