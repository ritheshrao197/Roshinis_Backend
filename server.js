
require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
 console.log("Database connected");
 app.listen(process.env.PORT || 5000, ()=>{
   console.log("Server running");
 });
})
.catch(err=>console.log(err));
