
const express=require("express")
const cors=require("cors")

const productRoutes=require("./routes/productRoutes")
const categoryRoutes=require("./routes/categoryRoutes")
const couponRoutes=require("./routes/couponRoutes")
const wishlistRoutes=require("./routes/wishlistRoutes")
const reviewRoutes=require("./routes/reviewRoutes")
const shippingRoutes=require("./routes/shippingRoutes")
const analyticsRoutes=require("./routes/analyticsRoutes")

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

module.exports=app
