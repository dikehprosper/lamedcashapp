"use client";
import AboutSection from "../../../../components/(AboutSection)/About";
import Footer from "@/components/(LandingPage)/(Footer)/Footer";
import {  useAppSelector } from "@/lib/hooks";
const About = async () => {
  const updatedTheme = useAppSelector((state) => state.theme.theme);
  return (
    <div style={{background: updatedTheme === "dark"? "rgb(10, 20, 38)" : "white"}}>
      <AboutSection updatedTheme={updatedTheme} />
      <Footer updatedTheme={updatedTheme} />
    </div>
  );
};
export default About;
