import { recipeModel } from "../models/Recipes.js";
import express from "express"
import mongoose from "mongoose";
import {userModel} from "../models/users.js"
import { verifyToken } from "./users.js";

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
    console.log(req)
    const recipe = new recipeModel(req.body)
    try{
        const response= await recipe.save().then(()=>("Recipe Successfully Saved"),(error)=>console.log(error));
        res.json(response);
    }
    catch(err){
        res.json(err);
    }
});



// put request is used to add the recipe to the saved Recipe Page.
router.put("/",async (req, res) => {
    const recipe = await recipeModel.findById(req.body.recipeID);
    const user = await userModel.findById(req.body.userID);
    try {
      user.savedRecipes.push(recipe);
      await user.save();
      res.status(201).json({ savedRecipes: user.savedRecipes });
    } catch (err) {
      res.status(500).json(err);
    }
  });




// route for showing all the saved recipes 
router.get("/savedRecipes/ids/:userID", async(req,res)=>{

    try{
    const user = await userModel.findById(req.params.userID);
    // this is the return that the frontend will recieve
    res.json({savedRecipes: user?.savedRecipes})
    }
    catch(err){
        res.json(err);
    }
})


// 

router.get("/savedRecipes/:userID", async (req,res)=>{
    try{
    const user = await userModel.findByID(req.params.userID)
    const recipes = await recipeModel.find({_id : {$in : user.savedRecipes}});
    console.log("this is recipes data",recipes)

    res.json({savedRecipes})
    }
    catch(err){
        res.json(err);
    }

})


export {router as recipeRouter}