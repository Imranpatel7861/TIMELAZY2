import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from "./pages/MainPage/MainPage";
import About from "./pages/AboutUs/Aboutus";
import ContactUs from "./pages/ContactUs/ContactUs";
import Overview from "./components/admincomponents/Overview";
import Setting from "./components/admincomponents/Setting";
import Teacher from "./components/admincomponents/Teacher";
import Classes from "../../Frontend/src/pages/Admindash/Components/Classes/Classes";
 import Loginad from "./pages/Login/Loginad";
import LoginPer from "./pages/Login/Loginper";
import Signupad from "../../Frontend/src/pages/Signupad";
import SignupPer from "./pages/Signup/SignupPer";
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/About" element={<About/>} />
    <Route path="/Contactus" element={<ContactUs/>}/>
    <Route path="/Overview" element={<Overview/>}/>
    <Route path="/Setting" element={<Setting/>}/>
    <Route path="/TeacherManagement" element={<Teacher/>}/>
    <Route path="/Classes"element={<Classes/>}/>
    <Route path="/Loginad" element={<Loginad/>}/>
    <Route path="/LoginPer" element={<LoginPer/>}/>
    <Route path="/Signupad" element={<Signupad/>}/>
    <Route path="/SignupPer" element={<SignupPer/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
