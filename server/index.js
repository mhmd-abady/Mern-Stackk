const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log('server started on port: '+PORT)
})

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:['http://localhost:3000'],
    credentials:true,
}));

mongoose.connect(process.env.Mongo,{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(err) console.log(err)
    console.log('DB connected')
    })


//set up routers
app.use('/auth' , require('./routers/userRouter') )
app.use('/customers' , require('./routers/customerRouter') )