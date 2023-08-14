import {useState} from "react";

export const CreateRecipe=()=>{
    const [recipe,setRecipe] = useState({
        name:"",
        description:"",
        ingredients:[""],
        imageUrl:"",
        cookingTime:0,
        userOwner:0.

    
    });

    const handleChange=(event:any)=>{
        const {name,value} = event?.target;
        setRecipe({...recipe, [name]:value})

    }

    const addIngredient=()=>{
        setRecipe({...recipe, ingredients:[...recipe.ingredients,""]});
    }
    



    return <div className="create-recipe" style={{display:"flex  " ,width:"500px"}}>
        <h2>Create Recipe</h2>
        <form action="" style={{display:"block"}}>
            {/* name */}
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />

            {/* description */}
            <label htmlFor="description">Description</label>
            <textarea id="description"  name="description" onChange={handleChange}></textarea>
            
            
            {/* ingredients */}
            <label htmlFor="ingredients">Ingredients</label>
            {/* <textarea id="ingredients" name="ingredients"></textarea> */}
            <button onClick={addIngredient}>Add Ingredients</button>

            {/* instructions */}
            <label htmlFor="instructions">Instructions</label>
            <textarea id="instructions" name="instructions" onChange={handleChange}></textarea>
            
            {/* imageUrl */}
            <label htmlFor="imageUrl">Image Url</label>
            <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange}/>

            {/* cookingTime */}
            <label htmlFor="cookingTime">Cooking Time (mins)</label>
            <input type="number" name="cookingTime" id="cookingTime" onChange={handleChange} />
        </form>
    </div>
}