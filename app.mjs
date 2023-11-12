import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';
import db from "./database/db.mjs";
import adminRoute from "./routes/adminRoute.mjs"
import userRoute  from "./routes/userRoute.mjs"
import menuController from './routes/menuRoute.mjs';


dotenv.config();



const app = express();


app.use(session({ secret: "ko", resave: true, saveUninitialized: true }));
app.use(bodyParser.json())
app.use(express.json())
//app.use(morgan('combined'))
app.use("/user",userRoute)
app.use("/admin",adminRoute)
app.use("/menu",menuController)











app.listen(process.env.port, () => {
    console.log(`Server listening on port ${process.env.port}`);
})
