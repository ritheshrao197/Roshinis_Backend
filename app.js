
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const adminRoutes = require("./routes/adminRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/upload",uploadRoutes);

module.exports = app;
