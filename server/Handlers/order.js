const Order  = require("../Schema/orderSchema.js");

const placeOrder=async (req,res)=>{
    try{
        console.log("name",req.body.name,"email",req.body.email,"address",req.body.addr,"phone",req.body.phone,"item",req.body.item,"quantity",req.body.quantity,"date",req.body.date,"cost",req.body.cost)

        const order={"name":req.body.name,"email":req.body.email,"address":req.body.addr,"phone":req.body.phone,"item":req.body.item,"quantity":req.body.quantity,"date":req.body.date,"cost":req.body.cost}
        console.log(order)

        const newOrder=new Order(order)
        await newOrder.save()


        res.status(200).json({"isSuccess":true,"msg":"Order placed successfully!"})
        
    }catch(error){
        res.status(400).json({"isSuccess":false,"msg":error.message})
    }
}

module.exports= placeOrder;