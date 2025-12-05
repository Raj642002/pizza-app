import { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
function home(){
  const navigate=useNavigate();
    const {user,setUser}=useContext(UserContext);

   function finalorder(event){
     event.preventDefault();
       const data = new FormData(event.target);
      const senddata={
        userid: user.userid,
        chesseandcorn:data.get("chesseandcorn"),
        capsicum:data.get("capsicum"),
        margherita:data.get("margherita"),
        onion:data.get("onion"),
        chessebust:data.get("chessebust"),
        address:user.address,
        totalamount:data.get("chesseandcorn")*110+data.get("capsicum")*90+data.get("margherita")*150+data.get("onion")*69+data.get("chessebust")*180
      }   
    setUser(senddata);
     navigate("/mycart");
        }
   
  
    if(user){
    return(
        <>
         <div class="header"><h3>Welcome , {user.userid}</h3>
         <h2>Your order will be delivered to : {user.address} Order ID:{user.orderid} </h2>
         <h3>OrderId: {user.orderid}</h3> </div>
              <form onSubmit={finalorder}>
                <div className="menu">
                  <div className="card">
                   <img src="cheeseandcorn.jpg" alt="Avatar" className="icon"/>
                  <div className="container-card">
                     <h4><b>Cheese and Corn</b></h4>
                        <h4><b>Price:Rs.110</b></h4>
            <input type="number" name="chesseandcorn" min="0" defaultValue={0}/>
     </div>
     </div>
      <div className="card">
                   <img src="caspsium.jpg" alt="Avatar" className="icon"/>
                  <div className="container-card">
                     <h4><b>Capsicum</b></h4>
                        <h4><b>Price:Rs.90</b></h4>
             <input type="number" name="capsicum" min="0" defaultValue={0}/>
     </div>
     </div>
      <div className="card">
                   <img src="margheritha.jpg" alt="Avatar" className="icon"/>
                  <div className="container-card">
                     <h4><b>Margherita</b></h4>
                        <h4><b>Price:Rs.150</b></h4>
           <input type="number" name="margherita" min="0" defaultValue={0}/>
     </div>
     </div>
      <div className="card">
                   <img src="onionpizza.jpg" alt="Avatar" className="icon"/>
                  <div className="container-card">
                     <h4><b>Onion Pizza</b></h4>
                        <h4><b>Price:Rs.69</b></h4>
            <input type="number" name="onion" min="0" defaultValue={0}/>
     </div>
     </div>
      <div className="card">
                   <img src="cheeseeandbust.jpg" alt="Avatar" className="icon"/>
                  <div className="container-card">
                     <h4><b>ChesseBust</b></h4>
                        <h4><b>Price:Rs.180</b></h4>
           <input type="number" name="chessebust" min="0" defaultValue={0}/>
     </div>
     
     </div>
       
       
        </div>
        <div className="container"> <button type="submit">Add Pizza</button></div>
        <a href="/" style={{ marginLeft: "550px", marginBottom: "90", display: "inline-block" }}>
                         Go to Home Page </a> 
</form>
        </>
    )
} else{
    return(
    <>
      <h1>you are not looged in</h1>
    </>
    ) 
  }
}

export default home;