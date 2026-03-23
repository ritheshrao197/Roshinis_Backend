
exports.generateInvoice=(order)=>{

 return {
  invoiceId:"INV-"+order.orderId,
  amount:order.totalAmount,
  date:new Date(),
  items:order.items
 }

}
