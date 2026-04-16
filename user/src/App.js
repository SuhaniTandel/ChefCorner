import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";

import Dashboard from "./pages/dashboard";
import Category from "./pages/category";
import Preloader from "./pages/preloader";
import Login from "./pages/login";
import LoginModal from "./pages/loginmodal";
import Contact from "./pages/contact";
import Register from "./pages/register";
import RecipeWithSidebar from "./pages/recipe-with-sidebar";
import RecipeWithoutSidebar from "./pages/recipe-without-sidebar";
import SingleRecipe from "./pages/single-recipe1";
import SingleRecipe2 from "./pages/single-recipe2";
import About from "./pages/about";
import SubmitRecipe from "./pages/submit-recipe";
import SearchBar from "./pages/searchbar";
import RecipeByCategory from "./pages/recipebycategory";
import Subscription from "./pages/subscription";
import ViewPlan from "./pages/viewplan";


function PageLoader({ children }) {

  const location = useLocation();
  const [loading,setLoading] = useState(false);

  useEffect(()=>{

    setLoading(true);

    const timer = setTimeout(()=>{
      setLoading(false);
    },500);

    return ()=>clearTimeout(timer);

  },[location]);

  return (
    <>
      {loading && <Preloader/>}
      {children}
    </>
  );
}


function App() {

  return (
    <Router>

      <PageLoader>

      <div id="app">
        <div className="main-wrapper main-wrapper-1">

          <Header />
          <Sidebar />
          <LoginModal />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dash" element={<Dashboard />} />
            <Route path="/category" element={<Category />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recipe-with-sidebar" element={<RecipeWithSidebar />} />
            <Route path="/recipe-without-sidebar" element={<RecipeWithoutSidebar />} />
            <Route path="/single-recipe1/:id" element={<SingleRecipe />} />
            <Route path="/single-recipe2/:id" element={<SingleRecipe2 />} />
            <Route path="/about" element={<About />} />
            <Route path="/submit-recipe" element={<SubmitRecipe />} />
            <Route path="/searchbar" element={<SearchBar />} />
            <Route path="/recipes/:category_id" element={<RecipeByCategory />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/view-plan" element={<ViewPlan />} />
          </Routes>

          <Footer />

        </div>
      </div>

      </PageLoader>

    </Router>
  );
}

export default App;