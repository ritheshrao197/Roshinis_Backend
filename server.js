require("dotenv").config()
const mongoose = require("mongoose")
const app = require("./src/app")

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database connected")

        const PORT = process.env.PORT || 5000

        app.listen(PORT, () => {
            console.log("Server running")
        })

    })
    .catch(err => console.log(err))