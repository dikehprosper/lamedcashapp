"use client";
import {useState, useEffect}  from "react"
 import Hero from "@/components/(LandingPage)/(Hero)/(Hero)/Hero";
import SecondSection from "@/components/(LandingPage)/(SecondSection)/SecondSection";
import ThirdSection from "@/components/(LandingPage)/(ThirdSection)/(ThirdSection)/ThirdSection";
import FourthSection from "@/components/(LandingPage)/(FourthSection)/(FourthSection)/FourthSection";
import FifthSection from "@/components/(LandingPage)/(FifthSection)/FifthSection";
import Footer from "@/components/(LandingPage)/(Footer)/Footer";
import PrivacyFooter from "@/components/(LandingPage)/(Footer)/PrivacyFooter";
import Banner from "@/components/Banner/Banner";
import {  useAppSelector } from "@/lib/hooks";

export default function Home() {
 const updatedTheme = useAppSelector((state) => state.theme.theme);
   useEffect(() => {
    if (updatedTheme === null) {
        dispatch(setTheme("light")); // Set the theme in Redux
    }
       
    }, [updatedTheme]);
  
  return (updatedTheme === "dark" || updatedTheme === "light"? 
      <div className='main' style={{background: updatedTheme === "dark"? "rgb(10, 20, 38)" : "white"}}>
       
        <div className='home-banner'>{/* <Banner /> */}</div>
       
        <Hero updatedTheme={updatedTheme}/>
      
        <SecondSection updatedTheme={updatedTheme} />
        <ThirdSection updatedTheme={updatedTheme} />
        <FourthSection updatedTheme={updatedTheme} /> 
         <Footer updatedTheme={updatedTheme} />
        <PrivacyFooter updatedTheme={updatedTheme} />
      </div>: null
    
  );
}
