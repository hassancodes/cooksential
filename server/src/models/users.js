import mongoose from "mongoose"
// always make a schema for whatever form you are submiting

const userSchema = new mongoose.Schema({
    userName : {type:String, required:true, unique:true},
    passWord : {type: String, required:true}
})


export const userModel = mongoose.model("users",userSchema);

