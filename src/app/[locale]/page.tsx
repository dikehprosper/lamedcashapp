"use client";
import {useState, useEffect}  from "react";
import Cookies from 'js-cookie';
 import Hero from "@/components/(LandingPage)/(Hero)/(Hero)/Hero";
import SecondSection from "@/components/(LandingPage)/(SecondSection)/SecondSection";
import ThirdSection from "@/components/(LandingPage)/(ThirdSection)/(ThirdSection)/ThirdSection";
import FourthSection from "@/components/(LandingPage)/(FourthSection)/(FourthSection)/FourthSection";
import FifthSection from "@/components/(LandingPage)/(FifthSection)/FifthSection";
import Footer from "@/components/(LandingPage)/(Footer)/Footer";
import PrivacyFooter from "@/components/(LandingPage)/(Footer)/PrivacyFooter";
import Banner from "@/components/Banner/Banner";
import { setTheme } from "@/lib/features/themeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

function setLocale(locale: string) {
  Cookies.set('locale', locale, { expires: 365 }); // Store locale in cookies for 365 days
}

export default function Home() {

   const dispatch = useAppDispatch();

    const updatedTheme = useAppSelector(
    (state: any) => (state.theme as any)?.theme
  );



   //Language settings
const getCurrentLangFromPath = (): string => {
  const currentPath = window.location.pathname; // Use window.location.pathname instead of router.asPath
  const currentLang = currentPath.split("/")[1]; // Extract the first part of the path
  return currentLang === "fr" || currentLang === "en" ? currentLang : "fr"; // Default to 'fr' if not 'en' or 'fr'
};

useEffect(() => {
  const currentLang = getCurrentLangFromPath();

  // Check if the cookie is already set to the current language in the path
  const cookieLang = Cookies.get("locale");

  if (cookieLang !== currentLang) {
    // If the cookie is not set to the current language, update the cookie
    Cookies.set("locale", currentLang, { expires: 365 }); // Set cookie to last 1 year
  }
}, [window.location.pathname]); // Update dependency to window.location.pathname

const updatedLang = getCurrentLangFromPath(); 


  
  return updatedTheme === "dark" || updatedTheme === "light" && updatedLang === "fr" || updatedLang === "en" ? 
      <div className='main' style={{background: updatedTheme === "dark"? "rgb(10, 20, 38)" : "white"}}>
       
   
       
        <Hero updatedTheme={updatedTheme} updatedLang={updatedLang}  />
      
        <SecondSection updatedTheme={updatedTheme} updatedLang={updatedLang} />
        <ThirdSection updatedTheme={updatedTheme} updatedLang={updatedLang} />
         <FourthSection updatedTheme={updatedTheme} updatedLang={updatedLang} /> 
       <Footer updatedTheme={updatedTheme} updatedLang={updatedLang} />
         <PrivacyFooter updatedTheme={updatedTheme} updatedLang={updatedLang} />
      </div>: null

}
