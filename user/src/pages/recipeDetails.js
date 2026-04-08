import React from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetails() {
  const { id } = useParams();

  const recipe = {
    title: "Delicious Tomatoes Stuffed with Foie and Chanterelles",
    category: "BREAKFAST",
    author: "Chef John Martin",
    date: "March 10, 2026",
    prepTime: "15 mins",
    cookTime: "30 mins",
    servings: "4",
    rating: 9,
    image: "assets/img/product/product1.jpg",
    description: "This elegant dish combines tender tomatoes with rich foie gras and earthy chanterelle mushrooms. Perfect for a special breakfast or brunch occasion.",
    ingredients: [
      "4 large tomatoes",
      "200g foie gras",
      "300g fresh chanterelle mushrooms",
      "2 tablespoons butter",
      "Salt and pepper to taste",
      "Fresh herbs (parsley, thyme)",
      "Extra virgin olive oil"
    ],
    instructions: [
      "Preheat oven to 375°F (190°C)",
      "Cut tomatoes in half and scoop out the seeds",
      "Clean and slice the chanterelle mushrooms",
      "Sauté mushrooms in butter until golden, season with salt and pepper",
      "Layer foie gras and mushroom mixture in tomato halves",
      "Drizzle with olive oil and season with fresh herbs",
      "Bake for 20-25 minutes until tomatoes are tender",
      "Serve hot with crusty bread"
    ],
    tags: ["Vegetarian", "Gourmet", "Breakfast", "French Cuisine"]
  };

  return (
    <>
      <section className="page-title-area" style={{backgroundImage: `url(${recipe.image})`, backgroundSize: 'cover'}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="page-title-content">
                <h1 className="title">{recipe.title}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="padding-bottom-45">
        <div className="container">
          <div className="row gutters-60">
            <div className="col-lg-8">
              <article className="recipe-article">
                <figure className="item-figure" style={{marginBottom: '30px'}}>
                  <img src={recipe.image} alt={recipe.title} style={{width: '100%'}} />
                </figure>

                <div className="section-heading heading-dark" style={{marginBottom: '20px'}}>
                  <h2 className="item-heading">{recipe.title}</h2>
                </div>

                <ul className="entry-meta" style={{marginBottom: '30px'}}>
                  <li><a href="#"><i className="fas fa-clock"></i>{recipe.prepTime}</a></li>
                  <li><a href="#"><i className="fas fa-user"></i>by <span>{recipe.author}</span></a></li>
                  <li><a href="#"><i className="fas fa-calendar"></i>{recipe.date}</a></li>
                  <li><a href="#"><i className="fas fa-star"></i>{recipe.rating}/10</a></li>
                </ul>

                <div style={{backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '5px', marginBottom: '30px'}}>
                  <div className="row">
                    <div className="col-md-3"><strong>Prep Time:</strong> {recipe.prepTime}</div>
                    <div className="col-md-3"><strong>Cook Time:</strong> {recipe.cookTime}</div>
                    <div className="col-md-3"><strong>Servings:</strong> {recipe.servings}</div>
                  </div>
                </div>

                <h3>Description</h3>
                <p>{recipe.description}</p>

                <h3 style={{marginTop: '30px'}}>Ingredients</h3>
                <ul style={{listStyle: 'none', paddingLeft: 0}}>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} style={{paddingBottom: '8px', borderBottom: '1px solid #eee'}}>
                      <i className="fas fa-check" style={{color: '#4CAF50', marginRight: '10px'}}></i>
                      {ingredient}
                    </li>
                  ))}
                </ul>

                <h3 style={{marginTop: '30px'}}>Instructions</h3>
                <ol style={{paddingLeft: '20px'}}>
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} style={{paddingBottom: '15px', lineHeight: '1.6'}}>
                      {instruction}
                    </li>
                  ))}
                </ol>

                <h3 style={{marginTop: '30px'}}>Tags</h3>
                <div style={{marginTop: '15px'}}>
                  {recipe.tags.map((tag, index) => (
                    <span key={index} style={{
                      display: 'inline-block',
                      backgroundColor: '#f0f0f0',
                      padding: '5px 15px',
                      marginRight: '10px',
                      marginBottom: '10px',
                      borderRadius: '20px',
                      fontSize: '14px'
                    }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </article>
            </div>

            <div className="col-lg-4 sidebar-widget-area sidebar-break-md">
              <div className="widget">
                <div className="section-heading heading-dark">
                  <h3 className="item-heading">RECIPE INFO</h3>
                </div>
                <div className="widget-about">
                  <p><strong>Category:</strong> {recipe.category}</p>
                  <p><strong>Difficulty:</strong> Medium</p>
                  <p><strong>Cuisine:</strong> French</p>
                </div>
              </div>

              <div className="widget">
                <div className="section-heading heading-dark">
                  <h3 className="item-heading">SHARE THIS RECIPE</h3>
                </div>
                <div className="widget-follow-us">
                  <ul>
                    <li className="single-item"><a href="#"><i className="fab fa-facebook-f"></i>FACEBOOK</a></li>
                    <li className="single-item"><a href="#"><i className="fab fa-twitter"></i>TWITTER</a></li>
                    <li className="single-item"><a href="#"><i className="fab fa-pinterest-p"></i>PINTEREST</a></li>
                    <li className="single-item"><a href="#"><i className="fas fa-envelope"></i>EMAIL</a></li>
                  </ul>
                </div>
              </div>

              <div className="widget">
                <div className="widget-newsletter-subscribe">
                  <h3>SAVE RECIPE</h3>
                  <p>Save this recipe for later</p>
                  <button className="item-btn" style={{width: '100%'}}>
                    <i className="far fa-heart"></i> SAVE
                  </button>
                </div>
              </div>

              <div className="widget">
                <div className="section-heading heading-dark">
                  <h3 className="item-heading">AUTHOR</h3>
                </div>
                <div className="widget-about">
                  <p><strong>Chef John Martin</strong></p>
                  <p>Professional chef with 15 years of experience in French cuisine and gourmet cooking.</p>
                  <a href="#" className="item-btn" style={{display: 'block', textAlign: 'center'}}>VIEW PROFILE</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default RecipeDetails;
