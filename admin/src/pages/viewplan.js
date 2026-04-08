import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./viewplan.css";

function ViewPlans() {

  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const res = await Axios.get("http://localhost:3001/api/view-plans");
    setPlans(res.data);
  };

  return (
    <div className="admin-content">

      <div className="plan-main-header">
        <h1>👑 Subscription Plans</h1>
        <p>Choose and manage premium membership plans</p>
      </div>

      <div className="plan-cards-container">

        {plans.map((plan) => (
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

            <p>
              {plan.description}
            </p>

            <button
                className="plan-btn"
                onClick={() =>
                    navigate("/subscription", {
                    state: { plan }
                    })
                }
                >
                Subscribe Now
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ViewPlans;