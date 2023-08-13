import { useState } from "react"
import axios from "axios"
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

export const Auth=()=>{
    return <div>
        <Login />
        <Register />

    </div>
}




const Login = ()=>{
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    // name of the cookie is the access_token
    const [_,setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    
    const targetUrl = "http://localhost:5500/auth/login"

    const onSubmit=async (event:any)=>{

    event?.preventDefault();
    try {
    const response = await axios.post(targetUrl , {username,password});
    
    setCookies("access_token",response.data.token)

    // need to study this more
    window.localStorage.setItem("userID",response.data.userID);
    // window.location.pathname="/"
    
    navigate("/");


    alert("you are logged in");
    }catch(err){
        console.error(err);
    }
}


    // import FORM
    return (
        <Form username={username}
              setUsername={setUsername}
              password={password}
              setPassword= {setPassword}
              label="Login" 
              onSubmit={onSubmit}/>
    );
}




const Register = ()=>{
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    // api building
    const onSubmit= async(event:any)=>{
        event.preventDefault();

        try{
            
            await axios.post("http://localhost:5500/auth/register", {username,password}); 
            alert("Registration complete");

        }catch(err){
            console.error(err);
        }

    }

    // import FORM
    return (
        <Form username={username}
              setUsername={setUsername}
              password={password}
              setPassword= {setPassword}
              label="Register"
              onSubmit={onSubmit}/>
    );

}

const Form =(props:any)=>{

    const {username,setUsername,password,setPassword,label,onSubmit} = props;
    return (
    <div className="auth-containter">
        <form onSubmit={onSubmit}>
            <h2>{label}</h2>
            <div className="form-group">
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" placeholder="username" value={username} onChange={(event)=>(setUsername(event.target.value))} />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" placeholder="password" value={password} onChange={(event)=>(setPassword(event.target.value))} />
            </div>
            <button type="submit">{label}</button>
        </form>
    </div>
    )
}