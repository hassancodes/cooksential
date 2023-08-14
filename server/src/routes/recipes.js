import { recipeModel } from "../models/Recipes";
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


router.post("/", async(req,res)=>{
    
    const recipe = new recipeModel(req.body)
    try{
        const response= await recipe.save().then(()=>("Recipe Successfully Saved"),(err)=>("Error Occurred While Saving")).catch();
        res.json(response);
    }
    catch(err){
        res.json(err);
    }
});


export {router as recipeRouter}