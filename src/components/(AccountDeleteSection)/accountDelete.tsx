"use client";
import "./accountDelete.css";
import React from "react";
import Image from "next/image";
import image1_en from "../../../public/step1-en.png";
import image2_en from "../../../public/step2-en.png";
import image3_en from "../../../public/step3-en.png";
import image4_en from "../../../public/step4-en.png";
import image1_fr from "../../../public/step1-fr.png";
import image2_fr from "../../../public/step2-fr.png";
import image3_fr from "../../../public/step3-fr.png";
import image4_fr from "../../../public/step4-fr.png";
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
          {t.account_deletion.Delete_Policy}
        </h2>
        <p
          style={{
            color: updatedTheme === "dark" ? "white" : "black",
            lineHeight: "25px",
            fontSize: "16px",
          }}
        >
         {t.account_deletion.delete_policy_description}
          <b style={{fontWeight: "700"}}>
            {" "}
            {t.account_deletion.delete_policy_description2}
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
            {t.account_deletion.delete_policy_description3}
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
                src={updatedLang === "en" ? image1_en: image1_fr}
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
            {t.account_deletion.delete_policy_description4}
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
               src={updatedLang === "en" ? image2_en: image2_fr}
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
          <h4 style={{color: updatedTheme === "dark" ? "white" : "black"}}>
            STEP : 3
          </h4>
          <p
            style={{
              fontSize: "13px",
              marginTop: "5px",
              color: updatedTheme === "dark" ? "white" : "black",
            }}
          >

            {t.account_deletion.delete_policy_description5}
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
             src={updatedLang === "en" ? image3_en: image3_fr}
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
            STEP : 4
          </h4>
          <p
            style={{
              fontSize: "13px",
              marginTop: "5px",
              color: updatedTheme === "dark" ? "white" : "black",
            }}
          >
          
            {t.account_deletion.delete_policy_description6}
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
               src={updatedLang === "en" ? image4_en: image4_fr}
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



 

  

      // "delete_policy_description": " Nous regrettons sincèrement votre départ de notre application. Votre présence a été appréciée et nous apprécions le temps que vous avez passé avec nous. Si vous avez des commentaires ou des préoccupations que vous souhaitez partager, nous serions reconnaissants de nous offrir l'opportunité de nous améliorer et de vous accueillir à nouveau à l'avenir.",
      //  "delete_policy_description2": "Suivez les étapes ci-dessous pour supprimer votre compte.",
      //   "delete_policy_description3": "Tout d’abord, vous devez cliquer sur l’option Paramètres sous l’option Profil de l’application.",
      //    "delete_policy_description4": "Cliquez sur 'Suppression du compte' pour continuer",
      //    "delete_policy_description5": "Après avoir saisi votre email et votre mot de passe, cliquez sur Soumettre ma demande",
      //      "delete_policy_description6": "Cliquez sur 'Continuer' pour finaliser ou cliquez sur 'Annuler' pour arrêter le processus"






       //  "delete_policy_description2": "Follow below steps to delete your account.",
        //  "delete_policy_description3": "At first you need to Click on Settings option under Profile option on the App.",
        //  "delete_policy_description4": "Click on 'Account Deletion' to continue",
        //  "delete_policy_description5": "After inputing you email and password, Click on Submit My request",
        //  "delete_policy_description6": "Click on 'Proceed' to finalise or Click 'Cancel' to stop the process"