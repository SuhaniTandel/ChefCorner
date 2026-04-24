import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
import "./viewplan.css";

function ViewPlans() {

  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const res = await Axios.get("http://localhost:3001/api/view-plans");
    setPlans(res.data);
  };

  // ✅ DELETE FUNCTION
  const handleDelete = async (id) => {

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This plan will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff6600",
      cancelButtonColor: "#999",
      confirmButtonText: "Yes, delete it!"
    });

    if (confirm.isConfirmed) {
      try {
        await Axios.delete(`http://localhost:3001/api/delete-plan/${id}`);
        fetchPlans();

        Swal.fire("Deleted!", "Plan has been removed.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
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

            <p>{plan.description}</p>

            {/* ✅ BUTTONS */}
            <div className="plan-actions">

              <button className="plan-btn" disabled>
                Active Plan
              </button>

              <button 
                className="delete-btn"
                onClick={() => handleDelete(plan.plan_id)}
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ViewPlans;