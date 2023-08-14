import mongoose from "mongoose";


const recipeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    ingredients:[{type:String, required:true}],
    instructions:{type:String, required:true},
    imageUrl: {type:String,required:true},
    cookingTime: {type:Number, required:true},
    // need to learn/focus more on this
    userOwner :{
        type : mongoose.Schema.Types.ObjectId,
        // reference is users since we are fetching the id from users docs
        ref: "users",
        required:true,
    }
})

export const  recipeModel= mongoose.model("recipes",recipeSchema);