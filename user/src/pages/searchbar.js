import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./searchbar.css";

function SearchBar({ recipes = [] }) {

  const [query, setQuery] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const navigate = useNavigate();

  // ✅ Enter press
  const handleSearch = () => {
    setSearchTriggered(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // ❗ IMPORTANT: only filter AFTER search
  const filteredRecipes =
    searchTriggered && query.length > 1
      ? recipes.filter((recipe) => {
          const name = recipe.recipe_name?.toLowerCase() || "";
          const category = recipe.category_name?.toLowerCase() || "";
          const searchText = query.toLowerCase();

          return (
            name.includes(searchText) ||
            category.includes(searchText)
          );
        })
      : [];

  return (
    <div className="search-wrapper">

      {/* 🔍 Input */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSearchTriggered(false); // 🔥 reset old results
          }}
          onKeyDown={handleKeyDown}
        />

        <button onClick={handleSearch}>
          🔍
        </button>
      </div>

      {/* 📋 Results */}
      {searchTriggered && (
        <div className="search-results">

          {/* ❌ 1 letter OR no match */}
          {query.length <= 1 || filteredRecipes.length === 0 ? (
            <p className="no-result">No Recipe Found</p>
          ) : (
            filteredRecipes.map((recipe) => (
              <div
                className="search-item"
                key={recipe.recipe_id}
                onClick={() =>
                  navigate(`/single-recipe2/${recipe.recipe_id}`)
                }
              >
                <img
                  src={`http://localhost:3001/public/${recipe.image || "default.jpg"}`}
                  alt={recipe.recipe_name}
                />

                <div>
                  <h4>{recipe.recipe_name}</h4>
                  <p>{recipe.category_name}</p>
                </div>
              </div>
            ))
          )}

        </div>
      )}

    </div>
  );
}

export default SearchBar;