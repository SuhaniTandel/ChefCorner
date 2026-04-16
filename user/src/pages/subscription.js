import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./subscription.css";

function Subscription() {

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ ONLY STATE (NO localStorage)
  const plan = location.state?.plan;
  const recipe_id = location.state?.recipe_id;

  console.log("PLAN:", plan);
  console.log("RECIPE ID:", recipe_id);

  // ✅ अगर state missing है → redirect
  if (!plan) {
    return (
      <div className="sub-container">
        <div className="sub-card">
          <h2>No Plan Selected</h2>
          <button
            className="pay-btn"
            onClick={() => navigate("/view-plan")}
          >
            Go Back To Plans
          </button>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    try {
      const user_id = localStorage.getItem("user_id");

      if (!user_id) {
        Swal.fire({
          icon: "warning",
          title: "Login Required",
          text: "Please login first",
        });
        navigate("/login");
        return;
      }

      const res = await fetch(
        "http://localhost:3001/api/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: plan.price,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
        });
        return;
      }

      const options = {
        key: "rzp_test_SbHXKCyIJ0GkmF",
        amount: data.order.amount,
        currency: "INR",
        name: "Chef Corner",
        description: plan.plan_name,
        order_id: data.order.id,

        handler: async function (response) {
          const verify = await fetch(
            "http://localhost:3001/api/verify-payment",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                user_id,
                plan_id: plan.plan_id,
                recipe_id,
                payment_id: response.razorpay_payment_id,
                amount: plan.price,
              }),
            }
          );

          const verifyData = await verify.json();

          if (verifyData.success) {
            Swal.fire({
              icon: "success",
              title: "Payment Successful",
            }).then(() => {
              navigate(`/single-recipe1/${recipe_id}`);
            });
          }
        },

        theme: {
          color: "#ff6600",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sub-wrapper">
      <div className="sub-box">

        <h1>{plan.plan_name}</h1>

        <p className="sub-desc">
          Unlock premium recipes instantly after payment
        </p>

        <div className="price-section">
          <h2>₹{plan.price}</h2>
          <span>{plan.duration_days} Days Validity</span>
        </div>

        <div className="feature-list">
          <p>✔ {plan.recipes_limit} Premium Recipes</p>
          <p>✔ Full Ingredients Details</p>
          <p>✔ Detailed Cooking Steps</p>
          <p>✔ Instant Premium Access</p>
        </div>

        <button className="pay-btn" onClick={handlePayment}>
          Pay Now 💳
        </button>

      </div>
    </div>
  );
}

export default Subscription;