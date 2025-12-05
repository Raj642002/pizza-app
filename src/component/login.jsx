import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useState } from "react";
import "./style/style.css"

function Login(){
const navigate=useNavigate();
const {user,setUser}=useContext(UserContext);
const [k,updatek]=useState("");

    function getdata(event){
        event.preventDefault();
        const data=new FormData(event.target);
        const senddata={
           userid:data.get("userid"),
          password:data.get('password') 
        };
        //console.log(senddata);
          
               
        
    // create code for  calling api and api will return ,userid,useaddress
     fetch("https://pizza-backend-2mtc.onrender.com/checklogin", {

      method: "POST",
      body: JSON.stringify(senddata),
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then((d) => {
        if(d){
             const result={userid:d.userid,address:d.address,orderid:"No Order yet"}
            setUser(result)
            navigate("/Home")
        } else{
            updatek("Incorrect Id or Password");
        }
        })
        .catch((err) => console.log(err));
     
    }
    
    return(
        <>
        <div className="header" ><h1>Ravish's Pizza</h1></div>
        <div className="container">
            <div className="imgcontainer">
              <img src="/chef.jpg" alt="Avatar" className="avatar"/>

            </div>
       <form onSubmit={getdata}>
        <label htmlFor="userid"><b>UserName</b></label>
        <input type="text" name="userid"/>
        <label htmlFor="userid"><b>Password</b></label>
        <input type="password" name="password"/>
        <button type="submit">Login</button>

        </form>
       
        <h3>{k}</h3>
        <a href="/Createaccount" > i do not have an account</a><br/>
        <a href="/Adminlogin">I am a shopkee</a>
          </div>

        </>
    )
}
export default Login;