"use client";
import "./accountDelete.css";
import React from "react";
import Image from "next/image";
import image1_en from "../../../public/step1-en.png";
import image2_en from "../../../public/step2-en.png";
import image3_en from "../../../public/step3-en.png";
import image4_en from "../../../public/step4-en.png";
import {useTranslations} from "next-intl";
import langDataEn from "@/messages/en/about.json";
import langDataFr from "@/messages/fr/about.json";
import langDataEn2 from "@/messages/en/home.json";
import langDataFr2 from "@/messages/fr/home.json";
import langDataEn3 from "@/messages/en.json";
import langDataFr3 from "@/messages/fr.json";

import {useAppDispatch, useAppSelector} from "@/lib/hooks";

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
      <div className='AboutSection'>
        <h2
          style={{
            color: updatedTheme === "dark" ? "white" : "black",
            width: "100%",
            paddingBottom: "8px",
            borderBottom:
              updatedTheme === "dark" ? "2px solid white" : "2px solid black",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          Delete Policy
        </h2>
        <p
          style={{
            color: updatedTheme === "dark" ? "white" : "black",
            lineHeight: "25px",
            fontSize: "16px",
          }}
        >
          We sincerely regret your departure from our app. Your presence has
          been valued, and we appreciate the time you spent with us. If there’s
          any feedback or concerns you’d like to share, we’d be grateful for the
          opportunity to improve and potentially welcome you back in the future.
          <b style={{fontWeight: "700"}}>
            {" "}
            Follow below steps to delete your account.
          </b>
        </p>
      </div>

      <div
        className='divbox-parent'
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
          padding: "12px",
        }}
      >
        <div
          className='divbox-child1'
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            border:
              updatedTheme === "dark" ? "1.2px solid grey" : "1.2px solid grey",
            height: "450px",
            width: "100%",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <h4 style={{color: updatedTheme === "dark" ? "white" : "black"}}>
            STEP: 1
          </h4>
          <p
            style={{
              fontSize: "13px",
              marginTop: "5px",
              color: updatedTheme === "dark" ? "white" : "black",
            }}
          >
            {" "}
            At first you need to click on Settings option under Profile option.
          </p>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "30px",
            }}
          >
            <div style={{position: "relative"}}>
              <div
                style={{
                  height: "25px",
                  width: "150px",
                  border: "2px solid red",
                  position: "absolute",
                  top: 205,
                  right: 25,
                }}
              ></div>
              <Image
                src={image1_en}
                style={{objectFit: "contain", width: "200px", height: "330px"}}
                loading='eager'
                alt='background'
              />
            </div>
          </div>
        </div>
        <div
          className='divbox-child1'
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            border:
              updatedTheme === "dark" ? "1.2px solid grey" : "1.2px solid grey",
            height: "450px",
            width: "100%",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <h4 style={{color: updatedTheme === "dark" ? "white" : "black"}}>
            STEP : 2
          </h4>
          <p
            style={{
              fontSize: "13px",
              marginTop: "5px",
              color: updatedTheme === "dark" ? "white" : "black",
            }}
          >
            {" "}
            Click on "Account Deletion" to continue
          </p>
           <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "30px",
            }}
          >
            <div style={{position: "relative"}}>
              <div
                style={{
                  height: "25px",
                  width: "150px",
                  border: "2px solid red",
                  position: "absolute",
                  top: 69,
                  right: 25,
                }}
              ></div>
              <Image
                src={image2_en}
                style={{objectFit: "contain", width: "200px", height: "330px"}}
                loading='eager'
                alt='background'
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className='divbox-parent'
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
          padding: "12px",
        }}
      >
        <div
          className='divbox-child1'
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            border:
              updatedTheme === "dark" ? "1.2px solid grey" : "1.2px solid grey",
            height: "450px",
            width: "100%",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <h4 style={{color: updatedTheme === "dark" ? "white" : "black"}}>STEP : 3</h4>
          <p style={{fontSize: "13px", marginTop: "5px", color: updatedTheme === "dark" ? "white" : "black",}}>
            {" "}
          After inputing you email and password, Click on 'Submit My request'
          </p>
       
     
           <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "30px",
            }}
          >
            <div style={{position: "relative"}}>
              <div
                style={{
                  height: "40px",
                  width: "150px",
                  border: "2px solid red",
                  position: "absolute",
                  top: 168,
                  right: 25,
                }}
              ></div>
              <Image
              src={image3_en}
                style={{objectFit: "contain", width: "200px", height: "330px"}}
                loading='eager'
                alt='background'
              />
            </div>
          </div>
        </div>
        <div
          className='divbox-child1'
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            border:
              updatedTheme === "dark" ? "1.2px solid grey" : "1.2px solid grey",
            height: "450px",
            width: "100%",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <h4  style={{color: updatedTheme === "dark" ? "white" : "black"}}>STEP : 4</h4>
          <p style={{fontSize: "13px", marginTop: "5px", color: updatedTheme === "dark" ? "white" : "black",}}>
            {" "}
           Click on "Proceed" to finalise or Click "Cancel" to stop the process
          </p>
        
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "30px",
            }}
          >
            <div style={{position: "relative"}}>
              <div
                style={{
                  height: "33px",
                  width: "150px",
                  border: "2px solid red",
                  position: "absolute",
                  top: 180,
                  right: 25,
                }}
              ></div>
              <Image
                src={image4_en}
                style={{objectFit: "contain", width: "200px", height: "330px"}}
                loading='eager'
                alt='background'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
