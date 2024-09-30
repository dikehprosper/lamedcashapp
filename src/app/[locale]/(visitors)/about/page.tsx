"use client";
import AboutSection from "@/components/(AboutSection)/About";
import Footer from "@/components/(LandingPage)/(Footer)/Footer";
import {  useAppSelector } from "@/lib/hooks";
import Cookies from 'js-cookie';
import {useEffect} from "react"

const About = async () => {
  const updatedTheme = useAppSelector(
    (state: any) => (state.theme as any)?.theme
  );




    //Language settings
const getCurrentLangFromPath = () => {
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

  return (updatedTheme === "dark" || updatedTheme === "light" && updatedLang === "fr" || updatedLang === "en"?  <div style={{background: updatedTheme === "dark"? "rgb(10, 20, 38)" : "white"}}>
      <AboutSection updatedTheme={updatedTheme} updatedLang={updatedLang} />
      <Footer updatedTheme={updatedTheme} updatedLang={updatedLang} />
    </div>: null
   
  );
};
export default About;
