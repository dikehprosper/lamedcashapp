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

const AboutSection = ({updatedTheme, updatedLang}: any) => {



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
        <h2 style={{color: updatedTheme === "dark"? "white": "black"}}>{t.about_us}</h2>
        <p style={{color: updatedTheme === "dark"? "white": "black"}}>{t.mission}</p>
      </div>
      {/* <div className='AboutSection2'>
        <Image
          fill
          src={image}
          style={{objectFit: "cover"}}
          loading='eager'
          alt='background'
        />
        <div className='AboutSection2-text'>
          <h3 style={{color: updatedTheme === "dark"? "white": "black"}}>{t.our_services}</h3>
          <p style={{color: updatedTheme === "dark"? "white": "black"}}>
            1. <b>{t.financing.title}</b>: {t.financing.description}
          </p>
          <p style={{color: updatedTheme === "dark"? "white": "black"}}> 
            2. <b>{t.withdrawal.title}</b>: {t.withdrawal.description}
          </p>
          <p style={{color: updatedTheme === "dark"? "white": "black"}}>
            3. <b>{t.support.title}</b>: {t.support.description}
          </p>
        </div>
      </div> */}
     

  
     
    </div>
  );
};

export default AboutSection;
