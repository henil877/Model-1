const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bloomshop";
const PORT = process.env.PORT || 8080;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err.message));

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    phone: { type: String, default: "" },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        name: String,
        image: String,
        price: Number,
        qty: { type: Number, default: 1 },
        color: { type: String, default: "Black" },
        size: { type: String, default: "L" },
      },
    ],
    subtotal: { type: Number, default: 0 },
    platformFee: { type: Number, default: 8 },
    totalAmount: { type: Number, default: 0 },
    paymentMethod: { type: String, enum: ["card", "cod"], default: "card" },
    paymentStatus: { type: String, default: "Success" },
    orderStatus: { type: String, default: "Delivered" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
const Order = mongoose.model("Order", orderSchema);

function safeUser(user) {
  return {
    _id: user._id,
    fullname: user.fullname,
    username: user.username,
    email: user.email,
    phone: user.phone,
    createdAt: user.createdAt,
  };
}

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "BloomShop API running" });
});

app.post("/api/register", async (req, res) => {
  try {
    const { fullname, username, email, phone = "", password } = req.body;

    if (!fullname || !username || !email || !password) {
      return res.status(400).json({ success: false, message: "All required fields are missing" });
    }

    const namePattern = /^[A-Za-z ]{3,}$/;
    const usernamePattern = /^[A-Za-z0-9_]{4,}$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^$|^[0-9]{10}$/;

    if (!namePattern.test(fullname)) return res.status(400).json({ success: false, message: "Full name must contain only letters and minimum 3 characters" });
    if (!usernamePattern.test(username)) return res.status(400).json({ success: false, message: "Username must be minimum 4 characters" });
    if (!passwordPattern.test(password)) return res.status(400).json({ success: false, message: "Password must contain 1 uppercase letter, 1 number and minimum 6 characters" });
    if (!emailPattern.test(email)) return res.status(400).json({ success: false, message: "Invalid email address" });
    if (!phonePattern.test(phone)) return res.status(400).json({ success: false, message: "Phone number must be 10 digits" });

    const exists = await User.findOne({ $or: [{ email: email.toLowerCase() }, { username }] });
    if (exists) {
      return res.status(409).json({ success: false, message: "Email or username already registered" });
    }

    const user = await User.create({ fullname, username, email, phone, password });
    res.status(201).json({ success: true, message: "Registration successful", user: safeUser(user) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username/email and password required" });
    }

    const user = await User.findOne({
      $or: [{ username }, { email: String(username).toLowerCase() }],
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: "Wrong username/email or password" });
    }

    res.json({ success: true, message: "Login successful", user: safeUser(user) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/api/users", async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json({ success: true, users });
});

app.post("/api/orders", async (req, res) => {
  try {
    const { userId, items = [], subtotal = 0, platformFee = 8, totalAmount = 0, paymentMethod = "card" } = req.body;
    if (!userId) return res.status(401).json({ success: false, message: "Please login first" });
    if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ success: false, message: "Cart is empty" });

    const order = await Order.create({ userId, items, subtotal, platformFee, totalAmount, paymentMethod });
    res.status(201).json({ success: true, message: "Order saved successfully", order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/api/my-orders/:userId", async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
  res.json({ success: true, orders });
});

const staticPath = path.join(__dirname, "../Frontend/public/model_1_StaticWeb");
app.use("/model_1_StaticWeb", express.static(staticPath));
app.get("/", (req, res) => res.redirect("/model_1_StaticWeb/Register.html"));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
