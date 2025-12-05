 
import { UserContext } from "../App";
import { useContext ,useEffect, useState} from "react";
import "./style/style.css"
function Admin(){
 const {user}=useContext(UserContext);
  const [data,setdata]=useState([{Column1:"no data",Column2:"no data"}])  
function fetchData(){
    console.log("fetching data");
    //call api and will receive all order
    fetch("https://pizza-backend-2mtc.onrender.com/getorders")

     //fetch("http://localhost:8000/getorders")
     .then((res)=>res.json())
     .then((mydata)=>setdata(mydata))
     .catch((err)=>console.log(err))
}

useEffect(() =>{
    fetchData();
},[]);

 if(user){
    return(
        <>
        <div className="header"> <h1>Welcome shopkeer</h1></div>
          <table>
            <thead>
                <tr>{Object.keys(data[0]).map(column=><th key={Math.random()}>{column}</th>)}</tr>
            </thead>
            <tbody>
                {data.map(obj=>{
               return <tr key={Math.random()}>{
                 Object.values(obj).map(value=>{return <td key={Math.random()}>{value}</td>})
                } </tr>
                })}
                
            </tbody>
          </table>
        </>
    );
} else{
    return(
    <>
      <h1>you are not looged in</h1>
    </>
    );
}

  
}
export default Admin;