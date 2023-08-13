
import express from "express"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { userModel } from "../models/users.js";


const router = express.Router();

router.post("/register", async (req,res) => {
    const {username,password} = req.body;
    // always use async await while requesting data, since the database always return a promise. 
    const user = await userModel.findOne({username})
    if(user){
        return res.json({message:"User Already Exist"});
    }
    const hashedPassword = await bcrypt.hash(password,10);
    
    const newUser = new userModel({
        username,
        password: hashedPassword,
    });

    await newUser.save({collections:"recipes"}).then(() => console.log("One entry added"), 
    (err) => console.log(err));
    res.json({message: "user is not registered"});

});


router.post("/login", async (req,res)=>{
    const {username,password} = req.body;
    const user= await userModel.findOne({username})
    if(!user){
        return res.json({message:"User Not Found. Please register"});
    }
    const isPasswordValid = bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.json({message:"Username or Password is incorrect"})
    }
    
    // we can use a 
    const token = jwt.sign({id:user._id}, "secret");
    res.json({token,userID: user._id});
})


// this router is common for all files , can accessed as userRouter.
export {router as userRouter}