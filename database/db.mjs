import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


mongoose.connect(process.env.mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Connected to MongoDB")
}).catch((err)=>{
    console.log("some error occured",err)
})

export default mongoose