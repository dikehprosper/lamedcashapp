"use client";
import "./about.css";
import React from "react";
import Image from "next/image";
import image from "../../../public/about-section.webp";
import {useTranslations} from "next-intl";
import {form1, form2} from "./form";
import langDataEn from "@/messages/en/about.json";
import langDataFr from "@/messages/fr/about.json";
import langDataEn2 from "@/messages/en/home.json";
import langDataFr2 from "@/messages/fr/home.json";
import langDataEn3 from "@/messages/en.json";
import langDataFr3 from "@/messages/fr.json";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const PrivacySection = ({updatedTheme, updatedLang}: any) => {



   const getLangData = () => {
    return updatedLang === "en" ? langDataEn : langDataFr;
  };
    const t = getLangData();

    
  const getLangData2 = () => {
    return updatedLang === "en" ? langDataEn2 : langDataFr2;
  };
    const getLangData3 = () => {
    return updatedLang === "en" ? langDataEn3 : langDataFr3;
  };




  const t2 = getLangData2();
 const t3 = getLangData3();
  // Define the URL for account deletion
  const accountDeletionLink = "https://forms.gle/BmwYVMmxtJ1cwi4b9";

  return (
    <div>
      <div className='AboutSection' >
        <h2 style={{color: updatedTheme === "dark"? "white": "black"}}>{t2.contact_us_description}</h2>
     <p style={{color: updatedTheme === "dark"? "white": "black"}}>
            {t2.contact_us_description.includes("Privacy policy")
              ? form1
              : form2}
          </p>
      </div>
    
      <div className='AboutSection3'>
        <div className='AboutSection3-text'>
          
         
        </div>
      </div>

  
     
    </div>
  );
};

export default PrivacySection;
