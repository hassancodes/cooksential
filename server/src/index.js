import express from  "express";
import cors from "cors";
// mongoose is an ORM for mongodb
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";

let app= express();


// for each reaquest mage
app.use(express.json());
app.use(cors);
app.use("/auth", userRouter);


const password = "evjr3303"

// connecting with mongodb

const functions = async (a)=>{
     const dog = await a;
     console.log(dog);
}
const a = mongoose.connect("mongodb+srv://thedevhassan:891OF4kDWzI4JoY9@recipes.zd1r0oz.mongodb.net/?retryWrites=true&w=majority");

// mongoose.connect("mongodb+srv://thedevhassan:891OF4kDWzI4JoY9@recipes.zd1r0oz.mongodb.net/");



app.listen(5500, ()=>{console.log("server running")});