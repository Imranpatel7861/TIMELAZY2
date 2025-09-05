import React from "react";
import Loading from "../../components/Loading/Loading"
import Hero from "../../components/Hero/Hero";
import Compare from "../../components/Compare/Compare";
import Footer from "../../../../Frontend/src/Component/Footer/Footer";
import TimetableDemo from "../../../../Frontend/src/Component/TimetableDemo/TimetableDemo";
import Review from "../../../../Frontend/src/Component/Review/Review";
import Navbar from "../../components/NavBar/Navbar";
import ChooseMode from "../../../../Frontend/src/Component/ChooseMode/ChooseMode";
import { ThemeProvider } from '../../components/Theme/Theme';
function MainPage() {
  return (
    <>
    <Loading/>
    <ThemeProvider>   
        <Navbar/>
    
 
    <Hero/>
   <Compare/>
<TimetableDemo/>
<ChooseMode/>
 <Review/>
    <Footer/>
</ThemeProvider>
    </>
  );
}

export default MainPage;
