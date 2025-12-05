import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./style/style.css"
function Createaccount(){

    const [data,updateData]=useState({});

    function register(event){
        event.preventDefault();
        const formData = new FormData(event.target);
    const senddata = {
      userid: formData.get("userid"),
      password: formData.get("password"),
      address: formData.get("address")
    }
        // create code for calling api and api will return registration successfull
     fetch("https://pizza-backend-2mtc.onrender.com/Createaccount", {

      method: "POST",
      body: JSON.stringify(senddata),
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then((d) => updateData(d))
      .catch((err) => console.log(err));
       
      
  }
    return(
        <>
        <div><h1> Join Us and Enjoy our Pizza  </h1></div>
        <div className="container">
            <div className="imgcontainer">
              <img src="/accountcreate.jpg" alt="Avatar" className="avatar"/>

            </div>
        <form onSubmit={register}>
          <label htmlFor="userid"><b>Choose a UserName</b></label>
            <input type="text" name="userid"/>
            <label htmlFor="userid"><b>Choose a Password</b></label>
            <input type="password" name="password"/>
            <label htmlFor="userid"><b>Enter Deliver Address</b></label>
            <input type="text" name="address"/>
            <button type="submit">Register</button>
        </form>
        {data.Mesg && <h2>{data.Mesg}</h2>}
        <a href="/">Go to Home Page</a>
        </div>
        </>
    )
}
export default Createaccount;