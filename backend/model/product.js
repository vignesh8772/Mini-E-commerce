const { default: mongoose } = require("mongoose")

const mongooseSchema =new mongoose.Schema({
    name:String,
    price:Number,
    description:String,
    rating:String,
    image:[{
        image:String
    }],
    category:String,
    seller:String,
    stock:String,
    noofreview:String,
    CreateAt:Date
});

const productmodel=mongoose.model('product',mongooseSchema);

module.exports = productmodel;