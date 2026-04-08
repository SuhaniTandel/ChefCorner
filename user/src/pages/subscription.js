import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./subscription.css";

function Subscription() {
  const navigate = useNavigate();
  const location = useLocation();

  const plan =
    location.state?.plan ||
    JSON.parse(localStorage.getItem("selectedPlan"));

  const recipe_id = location.state?.recipe_id;

  useEffect(() => {
    if (location.state?.plan) {
      localStorage.setItem(
        "selectedPlan",
        JSON.stringify(location.state.plan)
      );
    }
  }, [location.state]);

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

      // 1️⃣ Create order on backend
      const res = await fetch("http://localhost:3001/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: plan.price }),
      });

      const data = await res.json();

      if (!data.success) {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: "Unable to create order. Try again later.",
        });
        return;
      }

      // 2️⃣ Razorpay payment options
      const options = {
        key: "YOUR_RAZORPAY_KEY", // <-- Replace with your key
        amount: data.order.amount, // paise
        currency: "INR",
        name: "Chef Corner",
        description: plan.plan_name,
        image: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
        order_id: data.order.id,
        handler: async function (response) {
          try {
            // 3️⃣ Verify payment on backend
            const verify = await fetch(
              "http://localhost:3001/api/verify-payment",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  user_id,
                  plan_id: plan.plan_id,
                  payment_id: response.razorpay_payment_id,
                  amount: plan.price,
                }),
              }
            );

            const verifyData = await verify.json();

            if (verifyData.success) {
              Swal.fire({
                icon: "success",
                title: "Payment Successful 🎉",
                text: "Premium Activated Successfully",
                confirmButtonText: "View Recipe",
              }).then(() => {
                localStorage.removeItem("selectedPlan");
                if (recipe_id) {
                  navigate(`/single-recipe2/${recipe_id}`);
                } else {
                  navigate("/");
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Payment Failed",
                text: "Payment verification failed",
              });
            }
          } catch (err) {
            console.error(err);
            Swal.fire({
              icon: "error",
              title: "Payment Failed",
              text: "Something went wrong during verification",
            });
          }
        },
        prefill: {
          name: "",
          email: "",
        },
        notes: {
          plan_name: plan.plan_name,
        },
        theme: {
          color: "#ff6600",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: "Something went wrong",
      });
    }
  };

  return (
    <div className="sub-container">
      <div className="sub-card">
        <div className="premium-badge">PREMIUM ACCESS</div>

        <h1>{plan.plan_name}</h1>
        <p>Unlock all premium recipes instantly after payment</p>

        <div className="price-box">
          <h2>₹{plan.price}</h2>
          <span>{plan.duration_days} Days Validity</span>
        </div>

        <ul className="features">
          <li>✔ {plan.recipes_limit} Premium Recipes</li>
          <li>✔ Full Ingredients Details</li>
          <li>✔ Detailed Cooking Steps</li>
          <li>✔ Instant Access After Payment</li>
        </ul>

        <button className="pay-btn" onClick={handlePayment}>
          Pay Now 💳
        </button>
      </div>
    </div>
  );
}

export default Subscription;