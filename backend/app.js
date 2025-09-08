const express=require('express');
const app =express();
const dotenv=require('dotenv');
const path=require('path');
const connectDB=require('./config/connectDB');
const cors=require('cors')
dotenv.config({path:path.join(__dirname,'config','config.env')});

const product=require('./routes/product');
const order=require('./routes/order');

connectDB();
app.use(express.json());
app.use(cors());
app.use('/api/v1/',product);
app.use('/api/v1',order);




app.listen(process.env.PORT,()=>{
    console.log(`server listing to port ${process.env.PORT} in ${process.env.NODE_ENV}`);
}); 