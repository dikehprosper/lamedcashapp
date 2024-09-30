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
      <div className='AboutSection2'>
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
      </div>
      <div className='AboutSection3'>
        <div className='AboutSection3-text'>
          <h3 style={{color: updatedTheme === "dark"? "white": "black"}}>{t2.contact_us_description}</h3>
          <p style={{color: updatedTheme === "dark"? "white": "black"}}>
            {t2.contact_us_description.includes("Privacy policy")
              ? form1
              : form2}
          </p>
        </div>
      </div>

      {/* Add Account Deletion Link Section */}
      <div
        className='AccountDeletion'
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "2px",
          minHeight: "100px",
          justifyContent: "center",
          alignItems: "center",
            marginTop: "20px",
          marginBottom: "20px",
          textAlign: 'center'
        }}
      >
        <h2 className="AccountDeletion_1" style={{color: updatedTheme === "dark"? "white": "black"}}>{t3.about.account_deletion_title}</h2>
        <p className="AccountDeletion_2" style={{color: updatedTheme === "dark"? "white": "black"}}>{t3.about.account_deletion_description}</p>
        <a
          href={accountDeletionLink}
          target='_blank'
          rel='noopener noreferrer'
          style={{
            padding: "10px",
            borderRadius: "3px",
            background: "rgba(120, 120, 120, 0.5)",
            marginTop: "14px",
            fontSize: "13px",
            color: updatedTheme === "dark"? "white": "black"
          }}
        >
          {t3.about.account_deletion_link_text}
        </a>
      </div>
    </div>
  );
};

export default AboutSection;
