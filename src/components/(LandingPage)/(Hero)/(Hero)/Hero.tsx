/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import Image from "next/image";
import CustomButton from "../(components)/CustomBotton";
import mainBackgroundMobile from "../../../../../public/mainBackgroundMobile.webp";
import image from "../../../../../public/app-image.png";
import image2 from "../../../../../public/Google_Play_Store_badge_EN.svg.png";
import { useTranslations } from "next-intl";
import "./hero.css";
import LanguageToggle from "@/components/(LanguageToggle)/languageToggle";
import Banner from "@/components/Banner/Banner";
const Hero = () => {
  const t = useTranslations("home");
  return (
    <>
      <div className='hero large-device'>
        <div
          style={{
            width: "70%",
            height: "80%",
            position: "relative",
            paddingLeft: "50px",
          }}
        >
          <section className='hero-text'>
            <h1 className='hero-title animate-pop-in'>
              <span className='hero-span'>{t("hero span 1")}</span>{" "}
              {t("hero span 2")}
              <span className='hero-span'> {t("hero span 3")}</span>.
            </h1>
            <p className='hero-subtitle animate-pop-in'>
              {t("hero description")}
            </p>
            <div className='hero_button_container'>
              <Image
            src={image2}
            loading='eager'
            style={{
              objectFit: "contain",
              height: "100%",
              width: "100%",
            }}
            alt='Picture of the background'
          />
            </div>
          </section>
        </div>
        <div className='hero-img'>
          {/* <Image
            src={image}
            fill
            loading='eager'
            style={{
              objectFit: "cover",
            }}
            sizes='(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw'
            alt='Picture of the background'
            placeholder='blur'
          /> */}
          <Image
            src={image}
            loading='eager'
            style={{
              objectFit: "contain",
              height: "100%",
              width: "100%",
            }}
            alt='Picture of the background'
          />
        </div>
      </div>
      <div className='small-device'>
        <div className='small-device-hero'>
           <div
            style={{
              position: "fixed",
              top: 20,
              left: 30,
              right: 30,
              height: "40%",
              width: "100%",
              alignItems: "flex-end",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              justifyContent: "end",
              zIndex: 2,
            }}
          >
        
            <Image
              src={image}
              fill
              loading='eager'
              style={{
                objectFit: "contain",
              }}
          
              alt='Picture of the background'
            />
          </div>
          <div
            style={{
             marginTop: "50px",
              height: "40%",
              alignItems: "flex-end",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              justifyContent: "end",
              zIndex: 2,
            }}
          >
           
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <h1 className='hero-title animate-pop-in'>
                <span className='hero-span'>{t("hero span 1")}</span>{" "}
                {t("hero span 2")}
                <span className='hero-span'> {t("hero span 3")}</span>.
              </h1>
              <p className='hero-subtitle animate-pop-in'>
                {t("hero description")}
              </p>
              <div className='hero_button_container'>
                <Image
                  src={image2}
                  fill
                  loading='eager'
                  style={{
                    objectFit: "contain",
                  }}
                
                  alt='Picture of the background'
                />
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </>
  );
};

export default Hero;
