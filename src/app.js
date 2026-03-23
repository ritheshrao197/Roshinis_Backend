
const express=require("express")
const cors=require("cors")

const auth=require("./routes/authRoutes")
const products=require("./routes/productRoutes")
const orders=require("./routes/orderRoutes")
const payments=require("./routes/paymentRoutes")
const admin=require("./routes/adminRoutes")

const app=express()

app.use(cors())
app.use(express.json())

app.use("/api/auth",auth)
app.use("/api/products",products)
app.use("/api/orders",orders)
app.use("/api/payments",payments)
app.use("/api/admin",admin)

module.exports=app
