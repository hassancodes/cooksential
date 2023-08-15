export const Fetchuser = ()=>{
    const userID = window.localStorage.getItem("userID");
    return userID;
}