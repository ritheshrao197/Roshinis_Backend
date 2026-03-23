
exports.calculateShipping=(req,res)=>{

 const {weight,pincode}=req.body

 let cost=50

 if(weight>2) cost+=30
 if(!pincode.startsWith("56")) cost+=40

 res.json({shippingCost:cost})

}
