// import { useContext } from "react";
// import { UserContext } from "../App";
// import { useNavigate } from "react-router-dom";
// import "./style/style.css"
// function mycart(){
//    const {user,setUser}=useContext(UserContext);
//    const navigate =useNavigate();
//     function placeorder(){
        
//   // here is the code for ApI where user will send data to be store in database
//   // orderid receve by api
//   fetch("http://localhost:8000/placeorder", {
//       method: "POST",
//       body: JSON.stringify(user),
//       headers: { "Content-Type": "application/json" }
//     })
//       .then((res) => res.json())
//      .then((d)=>{
//        const result={userid:user.userid,address:user.address,orderid:d.orderid}
//     setUser(result)
//     navigate("/home")
//      })
//       .catch((err) => console.log(err));
     
//    const result={userid:user.userid,address:user.address,orderid:"345sdgf56"}
//     setUser(result)
//     navigate("/home")
//     }
 
//     return(
//         <>
//         <div className="header">My Cart</div>
//         <div  className="container">
//           <div className="imgcontainer">
//             <img src="/pizzaorder image.png" alt="Avatar" className="avatar"/>
//           </div>
//         <table>
//         <tbody> 
//           <tr>
//             <td>UserId</td>
//             <td>{user.userid}</td>
//           </tr>
//           <tr>
//             <td>Cheese and Corn</td>
//             <td>{user.chesseandcorn}</td>
//           </tr>
//           <tr>
//             <td>Capsicum</td>
//             <td>{user.capsicum}</td>
//           </tr>
//           <tr>
//             <td>Margherita</td>
//             <td>{user.margherita}</td>
//           </tr>
//           <tr>
//             <td>Onion</td>
//             <td>{user.onion}</td>
//           </tr>
//           <tr>
//             <td>CheeseBust</td>
//             <td>{user.chessebust}</td>
//           </tr>
//           <tr>
//             <td>Address</td>
//             <td>{user.address}</td>
//           </tr>
//           <tr><td>Total Amount</td><td>{user.totalamount}</td></tr>
//         </tbody>
//       </table>
//       <button onClick={placeorder}>Place Order</button>
//          <a href="/">Go to Home Page</a>
//       </div>
//         </>
//     )
// }
// export default mycart;




import { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./style/style.css";

function Mycart() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function loadRazorpayScript() {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function placeorder() {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    // Create payment order on backend
    const paymentOrder = await fetch("http://localhost:8000/create-payment", {
      method: "POST",
      body: JSON.stringify({ amount: user.totalamount }),
      headers: { "Content-Type": "application/json" }
    }).then((res) => res.json());

    const options = {
      key: "rzp_test_9aoQftRODjIlIO", 
      amount: paymentOrder.amount,
      currency: "INR",
      name: "Ravish Pizza Delivery",
      description: "Order Payment",
      order_id: paymentOrder.id,

      handler: function (response) {
        // Payment Success → Now place order in DB
        fetch("http://localhost:8000/placeorder", {
          method: "POST",
          body: JSON.stringify(user),
          headers: { "Content-Type": "application/json" }
        })
          .then((res) => res.json())
          .then((d) => {
            const result = {
              userid: user.userid,
              address: user.address,
              orderid: d.orderid
            };
            setUser(result);
            navigate("/home");
          });
      },

      theme: { color: "#F37254" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  return (
    <>
      <div className="header">My Cart</div>
      <div className="container">
        <div className="imgcontainer">
          <img src="/pizzaorder image.png" alt="Avatar" className="avatar" />
        </div>

        <table>
          <tbody>
            <tr><td>UserId</td><td>{user.userid}</td></tr>
            <tr><td>Cheese and Corn</td><td>{user.chesseandcorn}</td></tr>
            <tr><td>Capsicum</td><td>{user.capsicum}</td></tr>
            <tr><td>Margherita</td><td>{user.margherita}</td></tr>
            <tr><td>Onion</td><td>{user.onion}</td></tr>
            <tr><td>CheeseBust</td><td>{user.chessebust}</td></tr>
            <tr><td>Address</td><td>{user.address}</td></tr>
            <tr><td>Total Amount</td><td>{user.totalamount}</td></tr>
          </tbody>
        </table>

        <button onClick={placeorder}>Pay & Place Order</button>
        <a href="/">Go to Home Page</a>
      </div>
    </>
  );
}

export default Mycart;
