import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";

import Dashboard from "./pages/dashboard";
import ViewRecipes from "./pages/viewrecipes";
import Premium from "./pages/premium";
import Reviews from "./pages/reviews";
import ViewCategory from "./pages/viewcategory";
import EditCategory from "./pages/editcategory";
import AddCategory from "./pages/addcategory";
import AddRecipe from "./pages/addrecipe";
import AddPlan from "./pages/addplan";
import ViewPlan from "./pages/viewplan";

import Login from "./pages/login";
import Logout from "./pages/logout";
import Settings from "./pages/settings";
import Users from "./pages/users";
import AdminProfile from "./pages/adminprofile";
import AdminAnalytics from "./pages/adminanalytics";
import ViewSubscriptions from "./pages/viewsubscriptions";

function App() {
  return (
    <Router>
      <div id="app">
        <div className="main-wrapper main-wrapper-1">

          <Header />
          <Sidebar />

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dash" element={<Dashboard />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/viewcategory" element={<ViewCategory />} />
            <Route path="/viewrecipes" element={<ViewRecipes />} />
            <Route path="/editcategory" element={<EditCategory />} />
            <Route path="/addcategory" element={<AddCategory />} />
            <Route path="/addrecipe" element={<AddRecipe />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/admin-settings" element={<Settings />} />
            <Route path="/users" element={<Users />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/admin-logout" element={<Logout />} />
            <Route path="/admin-profile" element={<AdminProfile />} />
            <Route path="/admin-analytics" element={<AdminAnalytics />} />
            <Route path="/add-plan" element={<AddPlan />} />
            <Route path="/view-plan" element={<ViewPlan />} />
            <Route path="/subscriptions" element={<ViewSubscriptions />} />
          </Routes>

          <Footer />

        </div>
      </div>
    </Router>
  );
}

export default App;