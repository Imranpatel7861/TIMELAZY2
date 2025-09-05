import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from "./pages/MainPage/MainPage";
import About from "./pages/AboutUs/Aboutus";
import ContactUs from "./pages/ContactUs/ContactUs";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/About" element={<About/>} />
    <Route path="/Contactus" element={<ContactUs/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
