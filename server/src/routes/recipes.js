import { recipeModel } from "../models/Recipes.js";
import express from "express"
import mongoose from "mongoose";

const router = express.Router();
router.get("/", async(req,res)=>{
    try{
        const response= await recipeModel.find({})
        res.json(response);
    }
    catch(err){
        res.json(err);
    }
});

// start from here in the morning
router.post("/", async(req,res)=>{
    
    const recipe = new recipeModel(req.body)
    try{
        const response= await recipe.save().then(()=>("Recipe Successfully Saved"),(error)=>console.log(error));
        res.json(response);
    }
    catch(err){
        res.json(err);
    }
});




export {router as recipeRouter}