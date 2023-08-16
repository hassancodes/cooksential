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
export const Home=()=>{
    const [recipes,setRecipes] = useState([]);
    const [savedRecipes,setSavedRecipes] = useState([]);
    const userID = Fetchuser();
    console.log("userid" , userID);
    
    // we are using useEffect. 
    useEffect(()=>{

        // fetching recipes to display on home page
        const fetchRecipes =async () => {
            try {
                // just using any and assuming it will work
               const recipeResponse:any = await axios.get("http://localhost:5500/recipe")
               setRecipes(recipeResponse.data);
            } catch (error) {
                console.error(error)
            }
        }



        // function to check the saved recipes so we cannot save them again
        const fetchSavedRecipes =async () => {
          try {
              // just using any and assuming it will work
             const response = await axios.get(`http://localhost:5500/recipe/savedRecipes/ids/${userID}`)
             setSavedRecipes(response.data.savedRecipes);
             console.log("this is saved recipes",savedRecipes)
          } catch (error) {
              console.error(error)
          }
      }




        fetchSavedRecipes();
        fetchRecipes();



    },[]);
    const saveRecipe = async (recipeID:string) => {
        try {
            console.log("this is recipe id",recipeID);
            console.log("this is user id",userID);


          const response = await axios.put("http://localhost:5500/recipe", {
            recipeID : recipeID,
            userID : userID,
          });
          console.log(response)
        //   setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
          console.log(err);
        }
      };
    return (
<div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe:Recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              {userID ? <button onClick={()=>saveRecipe(recipe._id)}>Saved Recipe</button> : ""}

            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>

    );
}