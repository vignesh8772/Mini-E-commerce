const { default: mongoose } = require("mongoose");

const Order=new mongoose.Schema({

    cartItems:Array,
    amount:Number,
    status:String,
    createdAt:Date

});

const Ordermodel=mongoose.model('Order',Order);
module.exports=Ordermodel;