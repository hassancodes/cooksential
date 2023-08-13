import mongoose from "mongoose"
// always make a schema for whatever form you are submiting

const userSchema = new mongoose.Schema({
    username : {type:String, required:true, unique:true},
    password : {type: String, required:true}
})


export const userModel = mongoose.model("users",userSchema);

