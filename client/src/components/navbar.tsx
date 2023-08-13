import {Link} from "react-router-dom"
import {useCookies} from "react-cookie";
import { useNavigate } from "react-router-dom";
export const Navbar = ()=>{
    const [cookies,setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const logout=()=>{
        navigate("/auth")
        window.localStorage.removeItem("userID");
        setCookies("access_token","");
    }
    return (<div>
        <Link to="/">Home</Link>
        <Link to="/create-recipe">Create Recipe</Link>
        <Link to="/saved-recipe">Saved Recipe</Link>
        {!cookies.access_token ? <Link to="/auth">Login/Sign Up</Link> : <button onClick={logout}>Logout</button> }
    


    </div>)


}