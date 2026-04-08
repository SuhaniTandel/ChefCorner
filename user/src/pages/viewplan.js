import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./viewplan.css";

function ViewPlan() {

  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {

      const res = await Axios.get(
        "http://localhost:3001/api/view-plans"
      );

      setPlans(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="user-plan-page">

      <div className="plan-header">
        <h1>Choose Your Premium Plan 👑</h1>
        <p>Unlock Premium Recipes & Features</p>
      </div>

      <div className="user-plan-container">

        {plans.length > 0 ? (
          plans.map((plan) => (
            <div className="user-plan-card" key={plan.plan_id}>

              <div className="premium-tag">
                PREMIUM
              </div>

              <h2>{plan.plan_name}</h2>

              <div className="plan-price">
                ₹{plan.price}
              </div>

              <div className="plan-days">
                {plan.duration_days} Days Access
              </div>

              <p>
                {plan.recipes_limit} Premium Recipes Access
              </p>

              <p>
                {plan.description}
              </p>

              <button
                className="subscribe-btn"
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
          <h3>No Plans Available</h3>
        )}

      </div>

    </div>
  );
}

export default ViewPlan;