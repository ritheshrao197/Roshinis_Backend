require("dotenv").config()
const mongoose = require("mongoose")

const Product = require("../models/Product")
const products = require("./products")

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {

        console.log("Database connected")

        await Product.deleteMany()

        console.log("Old products removed")

        await Product.insertMany(products)

        console.log("Products seeded successfully")

        process.exit()

    })
    .catch(err => console.error(err))