
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
        return res.json({message:"User Already Exist, Please Login!"});
    }
    else{
    const hashedPassword = await bcrypt.hash(password,10);
    
    const newUser = new userModel({
        username,
        password: hashedPassword,
    });

    await newUser.save().then(() => console.log("You are Registered. Please Login"), 
    (err) => console.log(err));
    res.json({message: "An Error Occured while Registering"});
    }

});


router.post("/login", async (req,res)=>{

    const {username,password} = req.body;
    const user= await userModel.findOne({username})
    
    if(!user){
        return res.json({message:"User Not Found. Please register"});
    }
    // if
    const isPasswordValid = bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.json({message:"Username or Password is incorrect"})
    }
    
    // Learn how to create a token for session
    const token = jwt.sign({id:user._id}, "secretcanbereplaced");
    res.json(
    {   token,
        userID: user._id
    });
})


// this router is common for all files , can accessed as userRouter.
export {router as userRouter}