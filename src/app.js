
const express=require("express")
const cors=require("cors")

const productRoutes=require("./routes/productRoutes")
const categoryRoutes=require("./routes/categoryRoutes")
const couponRoutes=require("./routes/couponRoutes")
const wishlistRoutes=require("./routes/wishlistRoutes")
const reviewRoutes=require("./routes/reviewRoutes")
const shippingRoutes=require("./routes/shippingRoutes")
const analyticsRoutes=require("./routes/analyticsRoutes")
const authRoutes=require("./routes/authRoutes")
const orderRoutes=require("./routes/orderRoutes")
const paymentRoutes=require("./routes/paymentRoutes")
const adminRoutes=require("./routes/adminRoutes")

const app=express()

app.use(cors())
app.use(express.json())

app.use("/api/products",productRoutes)
app.use("/api/categories",categoryRoutes)
app.use("/api/coupons",couponRoutes)
app.use("/api/wishlist",wishlistRoutes)
app.use("/api/reviews",reviewRoutes)
app.use("/api/shipping",shippingRoutes)
app.use("/api/analytics",analyticsRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/payments",paymentRoutes)
app.use("/api/admin",adminRoutes)

module.exports=app
