import {Link} from "react-router-dom"
export const Navbar = ()=>{
    return (<div>
        <Link to="/">Home</Link>
        <Link to="/create-recipe">Create Recipe</Link>
        <Link to="/saved-recipe">Saved Recipe</Link>
        <Link to="/auth">Login/Sign Up</Link>


    </div>)


}