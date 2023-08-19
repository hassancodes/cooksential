import express from  "express";
import dotenv from 'dotenv';
import cors from "cors";
// mongoose is an ORM for mongodb
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { recipeRouter } from "./routes/recipes.js";
dotenv.config("./.env");


let app= express();
// connecting with mongodb
// mongoose.connect("mongodb+srv://thedevhassan:891OF4kDWzI4JoY9@recipes.zd1r0oz.mongodb.net/");



const myVar = process.env.MONGODB;
console.log("whatttttttttttttttttttttt" ,myVar)
// mongoose.connect(`mongodb+srv://${process.env.USERNAME_MONGO}:${process.env.PASSWORD_MONGO}@recipes.zd1r0oz.mongodb.net/recipe-app?retryWrites=true&w=majority`);
mongoose.connect(process.env.MONGODB);




// for each reaquest mage
app.use(express.json());
// took me 5 hours to figure out that I didn't called cors inside app.use.
app.use(cors());
app.use("/auth", userRouter);
app.use("/recipe", recipeRouter);




app.listen(5500, ()=>{console.log("server running")});
