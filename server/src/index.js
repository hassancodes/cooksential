import express from  "express";
import cors from "cors";
// mongoose is an ORM for mongodb
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { recipeRouter } from "./routes/recipes.js";



let app= express();
// connecting with mongodb
// mongoose.connect("mongodb+srv://thedevhassan:891OF4kDWzI4JoY9@recipes.zd1r0oz.mongodb.net/");
const password= "891OF4kDWzI4JoY9";
mongoose.connect("mongodb+srv://thedevhassan:891OF4kDWzI4JoY9@recipes.zd1r0oz.mongodb.net/recipe-app?retryWrites=true&w=majority");





// for each reaquest mage
app.use(express.json());
// took me 5 hours to figure out that I didn't called cors inside app.use.
app.use(cors());
app.use("/auth", userRouter);
app.use("/recipe", recipeRouter);




app.listen(5500, ()=>{console.log("server running")});
