import React, { useState } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "./addplan.css";

function AddPlan() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    plan_name: "",
    price: "",
    duration_days: "",
    recipes_limit: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addPlan = async () => {

    if (
      !form.plan_name ||
      !form.price ||
      !form.duration_days ||
      !form.recipes_limit ||
      !form.description
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all fields"
      });
      return;
    }

    try {

      await Axios.post(
        "http://localhost:3001/api/add-plan",
        form
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Plan Added Successfully"
      }).then(() => {
        navigate("/view-plan");
      });

      setForm({
        plan_name: "",
        price: "",
        duration_days: "",
        recipes_limit: "",
        description: ""
      });

    } catch (err) {

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong"
      });

    }

  };

  return (
    <div className="admin-content">
      <div className="form-box">

        <h1>Add Subscription Plan 👑</h1>

        <div className="form-group">
          <label>Plan Name</label>
          <input
            type="text"
            name="plan_name"
            value={form.plan_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Duration (Days)</label>
          <input
            type="number"
            name="duration_days"
            value={form.duration_days}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Recipe Limit</label>
          <input
            type="number"
            name="recipes_limit"
            value={form.recipes_limit}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="4"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <button
          className="btn-submit"
          onClick={addPlan}
        >
          Add Plan
        </button>

      </div>
    </div>
  );
}

export default AddPlan;