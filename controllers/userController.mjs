import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/userModels.mjs';
import  auth from "../middlewares/auth.mjs"

dotenv.config();

const userController = {
  signup: async (req, res) => {
    const {name,age, email, password,isAdmin } = req.body;
    try {
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
      let encryptedPassword = await bcrypt.hash(password, 10);
        await User.create({name:name,age:age, email: email, password:encryptedPassword ,isAdmin:isAdmin}).then(()=>{
            return res.status(200).json({ message: 'User created successfully' });
        }).catch((err)=>{
          console.log(err)
            return res.status(500).json({ message: 'Error creating user', error: err.message });
        })
    } catch (error) {
      return res.status(500).json({ message: 'some error occured in server', error: error.message });
    }
  },

  login: [async(req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    let checkUser = await User.findOne({ email: email })
    if(!checkUser){
      return res.status(404).json({ message: 'User not found' });
    }
    await bcrypt.compare(password, checkUser.password, (err, result)=>{
      if(err){
        return res.status(500).json({ message: 'Error logging in', error: err.message });
      }
      if(result){
        const token = jwt.sign({ email: checkUser.email, userId: checkUser._id ,isAdmin:checkUser.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Login successful', token: token });
      }
    })
  }],

  sample: [auth.authMiddleware,async(req, res) => {
    return res.status(200).json({ message: 'Sample route protected by auth middleware' });
  }],


  editProfile:[auth.authMiddleware,async(req, res) => {
   try {
    const { name,age } = req.body;
    console.log(req.user.email)
    let findUser  = await User.findOneAndUpdate({email:req.user.email},{
      name:name,
      age:age
    })
    return res.status(200).json({ message: 'Profile updated successfully' });
   } catch (error) {
    return res.status(500).json({ message: 'some error occured in server', error: error.message });
   }
   
  }],
};




export default userController;
