
const axios=require("axios")
const crypto=require("crypto")

exports.createPhonePePayment=async(orderId,amount)=>{

 const payload={
  merchantId:process.env.PHONEPE_MERCHANT_ID,
  merchantTransactionId:orderId,
  merchantUserId:"user",
  amount:amount*100,
  redirectUrl:process.env.FRONTEND_URL+"/payment-success",
  redirectMode:"POST",
  paymentInstrument:{type:"PAY_PAGE"}
 }

 const base64=Buffer.from(JSON.stringify(payload)).toString("base64")

 const checksum=crypto
  .createHash("sha256")
  .update(base64+"/pg/v1/pay"+process.env.PHONEPE_SALT_KEY)
  .digest("hex")+"###"+process.env.PHONEPE_SALT_INDEX

 const res=await axios.post(
  process.env.PHONEPE_BASE_URL+"/pg/v1/pay",
  {request:base64},
  {headers:{'X-VERIFY':checksum}}
 )

 return res.data

}
