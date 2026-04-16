/* global $ */
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import "./viewplan.css";

function ViewPlan() {

  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 recipe_id coming from previous page
  const recipe_id = location.state?.recipe_id;

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await Axios.get("http://localhost:3001/api/view-plans");
      setPlans(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-content">

      <div className="plan-main-header">
        <h1>👑 Subscription Plans</h1>
        <p>Choose your plan to unlock premium recipes</p>
      </div>

      <div className="plan-cards-container">

        {plans.length > 0 ? (
          plans.map((plan) => (
            <div className="fancy-plan-card" key={plan.plan_id}>

              <div className="plan-top-strip"></div>

              <h2>{plan.plan_name}</h2>

              <div className="big-price">
                ₹{plan.price}
              </div>

              <div className="days-pill">
                {plan.duration_days} Days Access
              </div>

              <p>{plan.recipes_limit} Premium Recipes Access</p>

              <p>{plan.description}</p>

              {/* 🔥 IMPORTANT BUTTON */}
              <button
  className="plan-btn"
  onClick={() =>
    navigate("/subscription", {
      state: {
        plan: plan,
        recipe_id: location.state?.recipe_id
      }
    })
  }
>
  Subscribe Now
</button>

            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No plans available</p>
        )}

      </div>

    </div>
  );
}

export default ViewPlan;