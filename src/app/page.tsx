"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import image from "../../public/Logo.png";
import Hero from "@/components/(LandingPage)/(Hero)/(Hero)/Hero";
import SecondSection from "@/components/(LandingPage)/(SecondSection)/SecondSection";
import ThirdSection from "@/components/(LandingPage)/(ThirdSection)/(ThirdSection)/ThirdSection";
import FourthSection from "@/components/(LandingPage)/(FourthSection)/(FourthSection)/FourthSection";
import Footer from "@/components/(LandingPage)/(Footer)/Footer";

export default function Home() {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 1000);
      return () => clearTimeout(timer);
    }, []);

  return (
    <>   {showContent ? (
        <div className="main">
      <div className="main-img"></div>
      <Hero />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <Footer />
    </div>
      ) : (
   
    
    
    
    
    
      <div
          style={{
            width: "100%",
            minHeight: "800px",
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <div
            className="logo"
            style={{ height: "70px", width: "70px", objectFit: "cover" }}
          >
            <Image
              src={image} // Use the imported image URL
              alt="Description of the image"
              layout="responsive"
              objectFit="cover"
              objectPosition="center center"
              priority
            />
          </div>
        </div>)}</>
  );
}
