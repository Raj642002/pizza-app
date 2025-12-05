import { useContext,useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../App"
import "./style/style.css"


function Adminlogin(){
    const navigate=useNavigate();
    const{user,setUser}=useContext(UserContext);
    const [k,updatek]=useState("")

    function getdata(event){
        event.preventDefault();
        const data=new FormData(event.target);
   const senddata={
    userid: data.get("userid"),
    password: data.get("password"),
   }
    // create code for calling api and api will return true
    // login successful
    fetch("http://localhost:8000/adminlogin", {
      method: "POST",
      body: JSON.stringify(senddata),
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then((d) => {
        if(d){
            
            setUser(d)
            navigate("/Admin")
        } else{
            updatek("Incorrect Id or Password");
        }
        })
        .catch((err) => console.log(err));
     
    }
    
 

    return(
        <>
        <div className="header"><h1>Welcome Shopkeeper</h1></div>
        <div className="container">
            <div className="imgcontainer">
            <img src="/shopkeeper.png" alt="Avatar" className="avatar"/>
        </div>
        <form onSubmit={getdata}>
            <label htmlFor="userid"><b>Shopkeeper ID</b></label>
  <input type="text" name="userid"/>
  <label htmlFor="userid"><b>Password</b></label>
  <input type="password" name="password"/>
  <button type="submit">Login</button>
        </form>
        <a href="/">Go to Home Page</a>
        <h3>{k}</h3>
        </div>
         </>
    )
}
export default  Adminlogin;
