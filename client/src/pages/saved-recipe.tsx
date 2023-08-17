import {useState,useEffect} from "react";
import axios from "axios"
import { Fetchuser } from "../hooks/fetchuser.tsx";

// fetching all the recipes to display on home.

interface Recipe{
    _id:string,
    name:string,
    instructions:string,
    ingredients: string[],
    imageUrl : string,
    cookingTime:number,
    userOwner:string,
}

export const SavedRecipe=()=>{
    const [savedRecipes,setSavedRecipes] = useState<Recipe[]>([]);



    const userID = Fetchuser();
    console.log("userid" , userID);
    
    // we are using useEffect. 
    useEffect(()=>{

        // function to check the saved recipes so we cannot save them again
        const fetchSavedRecipes =async () => {
          try {

             const response = await axios.get(`http://localhost:5500/recipe/savedRecipes/${userID}`)
             console.log("sending this request")
             setSavedRecipes(response.data.savedRecipes);
            //  console.log("this is saved recipes",response.data.savedRecipes)
          } catch (error) {
              console.error(error)
          }
      };

        fetchSavedRecipes();

    },[]);
      // checking if the recipe is saved or not

  

    return (
<div>
      <h1> Saved Recipes</h1>
      <ul>
        {savedRecipes.map((savedRecipe) => (
          <li key={savedRecipe._id}>

            <div>
              <h2>{savedRecipe.name}</h2>
            </div>
            <div className="instructions">
              <p>{savedRecipe.instructions}</p>
            </div>
            <img src={savedRecipe.imageUrl} alt={savedRecipe.name} />
            <p>Cooking Time: {savedRecipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>

    );
}