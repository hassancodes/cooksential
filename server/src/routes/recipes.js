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



// put request is used to add the recipe to the saved.
router.put("/", async(req,res)=>{

    try{
        const recipe =await recipeModel.findById(req.body.recipeID)
        const user = await recipeModel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save().then(()=>{"Recipe is Saved Successfully"},(err)=>{console.log(err)});
        res.json({savedRecipes : user.savedRecipes});
    }
    catch(err){
        res.json(err);
    }
});


// route for showing all the saved recipes 
router.get("/savedRecipes/ids", async(req,res)=>{

    try{
    const user = await userModel.findById(req.body.userID);
    // this is the return that the frontend will recieve
    res.json({savedRecipes: user?.savedRecipes})
    }
    catch(err){
        res.json(err);
    }
})


// 

router.get("/savedRecipes", async (req,res)=>{
    try{
    const user = await userModel.findByID(req.body.userID)
    const recipes = await recipeModel.find({_id : {$in : user.savedRecipes}});
    }
    catch(err){
        console.error(err);
    }

})


export {router as recipeRouter}