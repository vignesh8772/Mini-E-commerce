const orderModel = require('../model/order');
const productModel = require('../model/product');

//Create Order - /api/v1/order 
exports.createOrder = async (req, res, next) => {
    const cartItems = req.body;
    // const amount=cartItems.reduce((acc,item)=>
    //    acc+(item.product.price ) * (item.qty),0); 
    const _status="pending";
    const data= await orderModel.create({cartItems:cartItems,status:_status});
    
    cartItems.forEach(async (item)=>{
        const product= await productModel.findById(item.product._id);
        product.stock = product.stock - item.count;
        await product.save();
    })
    res.json(
        {
            success:true,
            data:data,
            
        })
}