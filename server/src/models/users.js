import mongoose from "mongoose"
// always make a schema for whatever form you are submiting

const userSchema = new mongoose.Schema({
    username : {type:String, required:true, unique:true},
    password : {type: String, required:true},
    savedRecipes: [{type:mongoose.Schema.Types.ObjectId , ref:recipes}]

})


export const userModel = mongoose.model("users",userSchema);

