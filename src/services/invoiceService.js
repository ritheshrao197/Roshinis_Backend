
const PDFDocument=require("pdfkit")

exports.generateInvoice=(order,res)=>{

 const doc=new PDFDocument()

 res.setHeader("Content-Type","application/pdf")

 doc.text("GST INVOICE")
 doc.text("Order ID: "+order.orderId)
 doc.text("Amount: "+order.totalAmount)

 doc.end()
 doc.pipe(res)

}
