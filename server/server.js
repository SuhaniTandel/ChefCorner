const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const app = express();

app.use("/public", express.static("public"));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chefcorner"
});

const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "rzp_test_SbHXKCyIJ0GkmF",
  key_secret: "S06sNyyKGatk0R05aS4pFhSs"
});

con.connect((err) => {
    if (err) {
        console.error("Database connection fails:", err);
    } else {
        console.log("Database connected");
    }
});

const storage = multer.diskStorage({
    destination: path.join(__dirname, './public/'),
    filename: function (req, file, callback) {
        const filename = Date.now() + '-' + file.originalname;
        callback(null, filename);
    }
});

const upload = multer({ storage: storage });
const multi = upload.fields([{ name: 'image' }]);


app.post("/api/create-order", async (req, res) => {
  try {
    const { amount } = req.body;
    console.log("Amount received:", amount);

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    });

    res.json({ success: true, order });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/api/verify-payment", (req, res) => {

  const {
    user_id,
    plan_id,
    recipe_id,
    payment_id,
    amount
  } = req.body;

  const getPlanSql =
    "SELECT * FROM subscription_plan WHERE plan_id=?";

  con.query(getPlanSql,[plan_id],(err,planResult)=>{

    if(err) return res.status(500).send(err);

    if(planResult.length===0){
      return res.status(404).send({
        success:false,
        message:"Plan not found"
      });
    }

    const plan = planResult[0];

    const expiryDate = new Date();
    expiryDate.setDate(
      expiryDate.getDate() + plan.duration_days
    );

    const sql = `
      INSERT INTO subscription_table
      (
        user_id,
        plan_id,
        recipe_id,
        payment_id,
        amount,
        plan_name,
        recipes_limit,
        used_recipes,
        payment_status,
        expiry_date
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    con.query(sql,[
      user_id,
      plan_id,
      recipe_id, // ✅ FIXED
      payment_id,
      amount,
      plan.plan_name,
      plan.recipes_limit,
      0,
      "Paid",
      expiryDate
    ],(err,result)=>{

      if(err){
        console.log(err);
        return res.status(500).send(err);
      }

      res.send({
        success:true,
        message:"Subscription Activated"
      });

    });

  });

});

app.get("/api/subscription-recipes/:user_id", (req, res) => {

  const user_id = req.params.user_id;

  const sql = `
    SELECT 
      r.recipe_id,
      r.recipe_name,
      r.image,
      r.description,
      r.prep_time,
      r.cook_time,
      c.category_name,
      s.expiry_date,
      s.used_recipes,
      s.recipes_limit
    FROM subscription_table s
    INNER JOIN recipe_table r 
      ON s.recipe_id = r.recipe_id
    LEFT JOIN category_table c 
      ON r.category_id = c.category_id
    WHERE s.user_id = ?
    AND s.payment_status = 'Paid'
    AND s.expiry_date > NOW()
    AND r.approval_status = 1
  `;

  con.query(sql, [user_id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Database error");
    }

    res.send(result);
  });

});

// ================= ADD RECIPE API =================

app.post('/api/addrecipe', multi, (req, res) => {

    const recipe_name = req.body.recipe_name;
    const image = req.files?.image?.[0]?.filename;
    const description = req.body.description;
    const price = req.body.price;
    const ingredients = req.body.ingredients;
    const steps = req.body.steps;
    const category_id = req.body.category_id;
    const difficulty = req.body.difficulty;
    const prep_time = req.body.prep_time;
    const cook_time = req.body.cook_time;
    const nutrition = req.body.nutrition;
    const servings = req.body.servings;
    const is_premium = req.body.is_premium ? req.body.is_premium : 0;

    // ✅ VALIDATION UPDATE
    if (
        !recipe_name || !image || !description || !price ||
        !ingredients || !steps || !category_id || !difficulty ||
        !nutrition || !servings || !prep_time || !cook_time
    ){
        return res.status(400).send({ message: "All fields are required" });
    }

    // ✅ UPDATED QUERY
    const query = `
        INSERT INTO recipe_table 
            (recipe_name, description, image, price, ingredients, steps, category_id, difficulty, nutrition, servings, prep_time, cook_time, is_premium, approval_status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
    `;

    con.query(
        query,
        [
            recipe_name,
            description,
            image,
            price,
            ingredients,
            steps,
            category_id,
            difficulty,
            nutrition,
            servings,
            prep_time,
            cook_time,
            is_premium
        ],
        (err, result) => {
            if (err) {
                return res.status(500).send({
                    message: "Database insert error",
                    error: err,
                });
            }

            res.send({
                message: "Recipe added successfully",
                result: result,
            });
        }
    );
});

// ================= VIEW RECIPE API =================

app.get('/api/viewrecipes', (req, res) => {

    const query = `
        SELECT r.*, c.category_name 
        FROM recipe_table r
        LEFT JOIN category_table c 
        ON r.category_id = c.category_id
    `;

    con.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                message: "Database fetch error",
                error: err,
            });
        } else {
            res.send(result);
        }
    });

});


// 🟢 USER: ONLY APPROVED RECIPES

app.get('/api/userrecipes', (req, res) => {

    const query = `
        SELECT r.*, c.category_name 
        FROM recipe_table r
        LEFT JOIN category_table c 
        ON r.category_id = c.category_id
        WHERE r.approval_status = 1
    `;

    con.query(query, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});


// ✅ APPROVE RECIPE

app.put("/api/approve-recipe/:id", (req, res) => {
  const id = req.params.id;
  con.query(
    "UPDATE recipe_table SET approval_status = 1 WHERE recipe_id = ?",
    [id],
    (err) => {
      if (err) return res.send(err);
      res.send("Approved");
    }
  );
});

// REJECT
app.put("/api/reject-recipe/:id", (req, res) => {
  const id = req.params.id;
  con.query(
    "UPDATE recipe_table SET approval_status = 2 WHERE recipe_id = ?",
    [id],
    (err) => {
      if (err) return res.send(err);
      res.send("Rejected");
    }
  );
});



// ================= SINGLE RECIPE API =================

app.get('/api/singlerecipe/:id', (req, res) => {

  const id = req.params.id;
  const increment = req.query.increment;

  const runQuery = () => {
    const query = `
      SELECT r.*, c.category_name 
      FROM recipe_table r
      LEFT JOIN category_table c 
      ON r.category_id = c.category_id
      WHERE r.recipe_id = ?
    `;

    con.query(query, [id], (err, result) => {
      if (err) return res.status(500).send(err);
      res.send(result[0]);
    });
  };

  if (increment === "true") {
    const updateViews = "UPDATE recipe_table SET views = views + 1 WHERE recipe_id = ?";
    con.query(updateViews, [id], (err) => {
      if (err) console.log(err);
      runQuery();
    });
  } else {
    runQuery();
  }

});

// ================= LIKE API =================
app.put("/api/updatelikes/:id", (req, res) => {
  const id = req.params.id;

  const sql = "UPDATE recipe_table SET likes = likes + 1 WHERE recipe_id = ?";

  con.query(sql, [id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error updating likes");
    }

    // ✅ updated value fetch karo
    const getQuery = "SELECT likes FROM recipe_table WHERE recipe_id = ?";

    con.query(getQuery, [id], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }

      res.send(result[0]); // 👈 updated likes return
    });
  });
});


// ================= ADD CATEGORY API =================

app.post('/api/addcategory', upload.single('image'), (req, res) => {

    const category_name = req.body.category_name;
    const description = req.body.description;
    const image = req.file?.filename;   // 🔥 important

    if (!category_name || !description || !image) {
        return res.status(400).send({ message: "All fields are required" });
    }

    const query = "INSERT INTO category_table (category_name, description, image) VALUES (?, ?, ?)";

    con.query(query, [category_name, description, image], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                message: "Database insert error",
                error: err,
            });
        }

        res.send({
            message: "Category added successfully",
            result: result,
        });
    });
});


// ================= DELETE CATEGORY API =================

app.delete("/api/deletecategory/:category_id", (req, res) => {
  const category_id = req.params.category_id;

  const query = "DELETE FROM category_table WHERE category_id = ?";

  con.query(query, [category_id], (err, results) => {
    if (err) {
        return res.status(500).json({ message: 'server error' });
    } 
    if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  });
});


// ================= EDIT CATEGORY API =================

app.post('/api/editcategory', (req, res) => {
    const category_id = req.body.category_id;

    const query = "SELECT * FROM category_table WHERE category_id = ?";

    con.query(query, [category_id], (err, result) => {
        if (err) {
            return res.status(500).send({ error: 'An error occurred while fetching category data' });
        }
        if (result.length === 0) {
            return res.status(404).send({ message: 'No data found for the provided ID' });
        }
        res.send(result[0]);
    });
});

// ================= UPDATE CATEGORY API =================

app.post('/api/updatecategory', (req, res) => {
    const category_id = req.body.category_id;
    const category_name = req.body.category_name;
    const description = req.body.description;

    if (!category_name || !description) {
        return res.status(400).send({ message: "All fields are required" });
    }

    const query = "UPDATE category_table SET category_name = ?, description = ? WHERE category_id = ?";

    con.query(query, [category_name, description, category_id], (err, result) => {
        if (err) {
            return res.status(500).send({
                message: "Database update error",
                error: err,
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Category not found" });
        }
        res.send({
            message: "Category updated successfully",
            result: result,
        });
    });
});

// ================= CATEGORY WISE RECIPE API =================
app.get("/api/recipes/:category_id", (req, res) => {

  const category_id = req.params.category_id;

  const query = `
    SELECT r.*, c.category_name 
    FROM recipe_table r
    LEFT JOIN category_table c 
    ON r.category_id = c.category_id
    WHERE r.category_id = ? AND r.approval_status = 1
  `;

  con.query(query, [category_id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        message: "Database error",
        error: err
      });
    }

    res.send(result);
  });
});

// ================= Search API =================

app.get("/api/search", (req, res) => {
  const q = req.query.q;

  // ✅ 1 letter या empty → no result
  if (!q || q.trim().length <= 1) {
    return res.send([]); // 🔥 IMPORTANT
  }

  const searchText = `%${q.trim()}%`;

  const sql = `
    SELECT r.*, c.category_name 
    FROM recipe_table r
    LEFT JOIN category_table c 
    ON r.category_id = c.category_id
    WHERE 
      r.approval_status = 1
      AND (
        r.recipe_name LIKE ? 
        OR r.ingredients LIKE ?
        OR c.category_name LIKE ?
      )
  `;

  con.query(
    sql,
    [searchText, searchText, searchText],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.send(result);
    }
  );
});

// ================= LOGIN API =================

app.post('/api/login', (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  const query = "SELECT * FROM user_table WHERE user_email = ? AND user_pass = ?";

  con.query(query, [email, password], (err, result) => {

    if (err) return res.status(500).send({ message: "Database error" });

    if (result.length > 0) {
      res.send({
        success: true,
        user_id: result[0].user_id   // ✅ correct column
      });
    } else {
      res.send({ success: false, message: "Invalid email or password" });
    }

  });
});


// ================= VIEW CATEGORY API =================

app.get('/api/viewcategory', (req, res) => {

    const query = `
        SELECT 
            c.*,
            COUNT(r.recipe_id) AS total_recipes
        FROM category_table c
        LEFT JOIN recipe_table r 
        ON c.category_id = r.category_id 
        AND r.approval_status = 1
        GROUP BY c.category_id
    `;

    con.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        res.send(result);
    });
});

// ================= USER REGISTER API =================

app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;

  const checkUser = "SELECT * FROM user_table WHERE user_email = ?";

  con.query(checkUser, [email], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).send({ message: "Database error" });
    }

    if (result.length > 0) {
      return res.send({ message: "Email already exists" });
    }

    const sql = "INSERT INTO user_table (user_name, user_email, user_pass) VALUES (?, ?, ?)";

    con.query(sql, [name, email, password], (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).send({ message: "Error in registration" });
      }

      res.send({ success: true });
    });
  });
});

app.post("/api/check-active-plan", (req,res)=>{

  const { user_id } = req.body;

  const sql = `
    SELECT * FROM subscription_table
    WHERE user_id=?
    AND expiry_date > NOW()
    ORDER BY id DESC
    LIMIT 1
  `;

  con.query(sql,[user_id],(err,result)=>{

    if(err){
      return res.status(500).send(err);
    }

    if(result.length===0){
      return res.send({
        active:false
      });
    }

    res.send({
      active:true,
      subscription:result[0]
    });

  });

});

app.post("/api/use-recipe-access", (req,res)=>{

  const { user_id } = req.body;

  const sql = `
    SELECT * FROM subscription_table
    WHERE user_id=?
    AND expiry_date > NOW()
    ORDER BY id DESC
    LIMIT 1
  `;

  con.query(sql,[user_id],(err,result)=>{

    if(err){
      return res.status(500).send(err);
    }

    if(result.length===0){
      return res.send({
        success:false,
        message:"No Active Subscription"
      });
    }

    const sub = result[0];

    if(sub.used_recipes >= sub.recipes_limit){
      return res.send({
        success:false,
        message:"Recipe Limit Exceeded"
      });
    }

    const updateSql = `
      UPDATE subscription_table
      SET used_recipes = used_recipes + 1
      WHERE id=?
    `;

    con.query(updateSql,[sub.id],()=>{

      res.send({
        success:true,
        remaining:
          sub.recipes_limit - (sub.used_recipes+1)
      });

    });

  });

});

app.get("/api/my-subscription/:user_id",(req,res)=>{

  const user_id = req.params.user_id;

  const sql = `
    SELECT * FROM subscription_table
    WHERE user_id=?
    ORDER BY id DESC
  `;

  con.query(sql,[user_id],(err,result)=>{

    if(err){
      return res.status(500).send(err);
    }

    res.send(result);

  });

});

app.post("/api/check-subscription", (req, res) => {

  const { user_id, recipe_id } = req.body;

  const sql = `
    SELECT * FROM subscription_table
    WHERE user_id=?
    AND recipe_id=?   -- ✅ IMPORTANT
    AND payment_status='Paid'
    AND expiry_date > NOW()
    LIMIT 1
  `;

  con.query(sql, [user_id, recipe_id], (err, result) => {

    if (err) return res.status(500).send(err);

    if (result.length > 0) {
      res.send({ subscribed: true });
    } else {
      res.send({ subscribed: false });
    }

  });

});



// ================= ADD REVIEW API =================

app.post("/api/addreview", (req, res) => {
  const { recipe_id, name, email, message, rating } = req.body;

  // ✅ validation
  if (!recipe_id || !name || !email || !message || !rating) {
    return res.status(400).send({ message: "All fields required" });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).send({ message: "Rating must be 1-5" });
  }

  const sql = `
    INSERT INTO reviews (recipe_id, name, email, message, rating)
    VALUES (?, ?, ?, ?, ?)
  `;

  con.query(sql, [recipe_id, name, email, message, rating], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error inserting review");
    }

    res.send({ message: "Review Added Successfully" });
  });
});

app.get("/api/getreviews", (req, res) => {

  const sql = `
    SELECT 
      r.review_id,
      r.recipe_id,
      r.name,
      r.email,
      r.message,
      r.rating,
      r.created_at,
      COALESCE(rec.recipe_name, 'Unknown Recipe') AS recipe_name
    FROM reviews r
    LEFT JOIN recipe_table rec
    ON r.recipe_id = rec.recipe_id
    ORDER BY r.review_id DESC
  `;

  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    res.send(result);
  });

});

app.get("/api/averagerating/:recipe_id", (req, res) => {

  const recipe_id = req.params.recipe_id;

  const sql = `
    SELECT 
      ROUND(AVG(rating),1) as avgRating,
      COUNT(*) as totalReviews
    FROM reviews
    WHERE recipe_id = ?
  `;

  con.query(sql, [recipe_id], (err, result) => {
    if (err) return res.status(500).send(err);

    res.send(result[0]);
  });
});

// ================= ADD SUBSCRIPTION PLAN =================
app.post("/api/add-plan", (req, res) => {

  const { plan_name, price, duration_days, recipes_limit, description } = req.body;

  if(!plan_name || !price || !duration_days || !recipes_limit || !description){
    return res.status(400).send({
      success:false,
      message:"All fields required"
    });
  }

  const sql = `
    INSERT INTO subscription_plan
    (plan_name, price, duration_days, recipes_limit, description)
    VALUES (?, ?, ?, ?, ?)
  `;

  con.query(
    sql,
    [plan_name, price, duration_days, recipes_limit, description],
    (err) => {

      if(err){
        return res.status(500).send(err);
      }

      res.send({
        success:true
      });

    }
  );

});

// ================= VIEW SUBSCRIPTION PLANS =================
app.get("/api/view-plans", (req, res) => {

  const sql = "SELECT * FROM subscription_plan ORDER BY plan_id DESC";

  con.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    res.send(result);

  });

});

// ================= DELETE PLAN =================
app.delete("/api/delete-plan/:id", (req, res) => {

  const id = req.params.id;

  const sql = "DELETE FROM subscription_plan WHERE plan_id=?";

  con.query(sql, [id], (err) => {

    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    res.send({
      success: true,
      message: "Plan Deleted"
    });

  });

});

// ================= UPDATE PLAN =================
app.put("/api/update-plan/:id", (req, res) => {

  const id = req.params.id;

  const {
    plan_name,
    price,
    duration_days,
    description
  } = req.body;

  const sql = `
    UPDATE subscription_plan
    SET plan_name=?, price=?, duration_days=?, description=?
    WHERE plan_id=?
  `;

  con.query(
    sql,
    [
      plan_name,
      price,
      duration_days,
      description,
      id
    ],
    (err) => {

      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.send({
        success: true,
        message: "Plan Updated"
      });

    }
  );

});

app.post("/api/togglePremium", (req, res) => {

  const { recipe_id, is_premium } = req.body;

  const sql = "UPDATE recipe_table SET is_premium=? WHERE recipe_id=?";

  con.query(sql, [is_premium, recipe_id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error");
    }

    res.send("Updated");
  });

});

app.post("/api/toggleApproval", (req, res) => {
  const { recipe_id, status } = req.body;

  const sql = "UPDATE recipe_table SET approval_status=? WHERE recipe_id=?";

  con.query(sql, [status, recipe_id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error updating status");
    }

    res.send({ success: true });
  });
});

// ================= USER MANAGEMENT SUBSCRIPTIONS =================

app.get("/api/admin/subscriptions", (req, res) => {

  const sql = `
    SELECT 
      s.subscription_id,
      u.user_name,
      u.user_email,
      s.plan_name,
      s.amount,
      s.payment_date,
      s.expiry_date,
      s.payment_status,
      
      CASE 
        WHEN s.expiry_date > NOW() THEN 'Active'
        ELSE 'Expired'
      END AS status

    FROM subscription_table s
    INNER JOIN user_table u 
      ON s.user_id = u.user_id

    ORDER BY s.subscription_id DESC
  `;

  con.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);

    res.send({
      success: true,
      data: result
    });
  });
});

app.get("/api/admin/user-subscriptions/:user_id", (req, res) => {

  const user_id = req.params.user_id;

  const sql = `
    SELECT 
      s.*,
      u.user_name,
      u.user_email
    FROM subscription_table s
    INNER JOIN user_table u
      ON s.user_id = u.user_id
    WHERE s.user_id = ?
    ORDER BY s.id DESC
  `;

  con.query(sql, [user_id], (err, result) => {

    if (err) return res.status(500).send(err);

    res.send({
      success: true,
      data: result
    });

  });

});

app.delete("/api/admin/subscription/:id", (req, res) => {

  const id = req.params.id;

  const sql = "DELETE FROM subscription_table WHERE id = ?";

  con.query(sql, [id], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: "Delete failed"
      });
    }

    if (result.affectedRows === 0) {
      return res.send({
        success: false,
        message: "Subscription not found"
      });
    }

    res.send({
      success: true,
      message: "Subscription deleted"
    });

  });

});

app.put("/api/admin/update-payment-status/:id", (req, res) => {

  const id = req.params.id;
  const { payment_status } = req.body;

  const sql = `
    UPDATE subscription_table 
    SET payment_status = ?
    WHERE id = ?
  `;

  con.query(sql, [payment_status, id], (err) => {

    if (err) return res.status(500).send(err);

    res.send({
      success: true,
      message: "Payment status updated"
    });

  });

});

app.get("/api/admin/subscription-stats", (req, res) => {

  const sql = `
    SELECT 
      COUNT(*) AS totalSubscriptions,

      SUM(CASE WHEN expiry_date > NOW() THEN 1 ELSE 0 END) AS activeSubscriptions,

      SUM(CASE WHEN expiry_date <= NOW() THEN 1 ELSE 0 END) AS expiredSubscriptions,

      SUM(amount) AS totalRevenue

    FROM subscription_table
    WHERE payment_status = 'Paid'
  `;

  con.query(sql, (err, result) => {

    if (err) return res.status(500).send(err);

    res.send({
      success: true,
      data: result[0]
    });

  });

});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});