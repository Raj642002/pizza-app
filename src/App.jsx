import { useState , createContext } from 'react'
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import Login from './component/login.jsx';
import Home from './component/home.jsx';
import Admin from './component/admin.jsx';
import Adminlogin from './component/adminlogin.jsx';
import Createaccount from './component/createaccount.jsx';
import Mycart from './component/mycart.jsx';

export const UserContext=createContext(null);

function App() {
   const [user,setUser]=useState(false);

  return (
    <>
      <BrowserRouter>
      <UserContext.Provider value={{user:user,setUser:setUser}}>
      <Routes>
        <Route path="/" element={<Login/>}/>
         <Route path="/Home" element={<Home/>}/>
          <Route path="Mycart/" element={<Mycart/>}/>
           <Route path="/Createaccount" element={<Createaccount/>}/>
            <Route path="/Adminlogin" element={<Adminlogin/>}/>
             <Route path="/Admin" element={<Admin/>}/>
             <Route path='*' element={<h1>soryy page not exit</h1>}/>
      </Routes>
      </UserContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
