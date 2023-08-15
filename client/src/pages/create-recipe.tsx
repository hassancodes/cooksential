import {useState} from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Fetchuser } from "../hooks/Fetchuser";


// creating the interface for recipe object.
interface LOLDOPE{
    name:any;
    description:String,
    ingredients: String[],
    imageUrl:String,
    cookingTime:Number,
    userOwner:any,
}
export const CreateRecipe=()=>{
    const userID = Fetchuser();
    const [recipe,setRecipe] = useState<LOLDOPE>({
        name:"",
        description:"",
        ingredients:[],
        imageUrl:"",
        cookingTime:0,
        userOwner:userID,
    
    });




    // this will add the recipe data to the form when the user is typing.
    const handleChange=(event:any)=>{
        const {name,value} = event.target;
        setRecipe({...recipe, [name]:value});

    }


    // since ingredient is a list so we need a seperate funciton for that
    const addIngredient=()=>{
        setRecipe({...recipe, ingredients:[...recipe.ingredients,""]});
    }


    const handleIngredientChange=(event:any,index:any)=>{
        const {value} = event.target;
        const ingredients = recipe.ingredients;
        ingredients[index] = value;
        setRecipe({...recipe,ingredients})

    }
    console.log(recipe);
    const onSubmit= async(event:any)=>{
        // I clearly don't know why I am doing this.
        event.preventDefault();
        try{
            await axios.post("http://localhost:5500/recipe",recipe);
            alert("Recipe Create")

        }
        catch(err){

        }

    }
    return <div className="create-recipe">
        <h2>Create Recipe</h2>
        <form onSubmit={onSubmit} className="create-recipe-form">
            {/* name */}
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" onChange={handleChange}/>

            {/* description */}
            <br />
            <label htmlFor="description">Description</label>
            <textarea id="description"  name="description" onChange={handleChange}></textarea>
            
            
            {/* ingredients */}
            <br />
            <label htmlFor="ingredients">Ingredients</label>
            {recipe.ingredients.map((ingredient:any,index)=>(
                <input type="text" key={index} name="ingredients" value={ingredient} onChange={(event)=>handleIngredientChange(event,index)}/>
            ))}

            <button onClick={addIngredient} type="button">Add Ingredients</button>

            {/* instructions */}
            <br />
            <label htmlFor="instructions">Instructions</label>
            <textarea id="instructions" name="instructions" onChange={handleChange}></textarea>
            
            {/* imageUrl */}
            <br />
            <label htmlFor="imageUrl">Image Url</label>
            <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange}/>

            {/* cookingTime */}
            <br />
            <label htmlFor="cookingTime">Cooking Time (mins)</label>
            <input type="number" name="cookingTime" id="cookingTime" onChange={handleChange} />
            <button type="submit">Create Recipe</button>
        </form>
    </div>
}