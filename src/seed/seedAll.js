require("dotenv").config()

const mongoose = require("mongoose")

// const Category = require("../models/Category")
const Product = require("../models/Product")
const Coupon = require("../models/Coupon")
const User = require("../models/User")

// const categories = require("./categories")
const products = require("./products")
const coupons = require("./coupons")
const users = require("./users")

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {

        console.log("Database connected")

        // await Category.deleteMany()
        await Product.deleteMany()
        await Coupon.deleteMany()
        await User.deleteMany()

        console.log("Old data cleared")

        // await Category.insertMany(categories)
        await Product.insertMany(products)
        await Coupon.insertMany(coupons)
        await User.insertMany(users)

        console.log("Database seeded successfully")

        process.exit()

    })
    .catch(err => console.error(err))