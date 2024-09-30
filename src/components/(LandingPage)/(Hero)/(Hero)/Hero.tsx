/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import Image from "next/image";
import CustomButton from "../(components)/CustomBotton";
import mainBackgroundMobile from "../../../../../public/mainBackgroundMobile.webp";
import image from "../../../../../public/app-image.png";
import image2 from "../../../../../public/111111111111111.webp";
import "./hero.css";
import LanguageToggle from "@/components/(LanguageToggle)/languageToggle";
import Banner from "@/components/Banner/Banner";
import langDataEn from "@/messages/en/home.json";
import langDataFr from "@/messages/fr/home.json";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from 'next/link';

const Hero = ({updatedTheme, updatedLang}: any) => {

   const getLangData = () => {
    return updatedLang === "en" ? langDataEn : langDataFr;
  };

  const t = getLangData();

  return (
    <>
      <div
        className='hero large-device'
        style={{
          background: updatedTheme === "dark" ? "" : "rgba(250, 250, 250, 1)",
          color: updatedTheme === "dark" ? "white" : "rgba(0, 0, 0, 1)",
        }}
      >
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
              <span
                className='hero-span'
                style={{
                  color:
                    updatedTheme === "dark"
                      ? "rgba(73, 166, 106, 1)"
                      : "rgba(73, 166, 106, 1)",
                  marginRight: "3px",
                }}
              >
                {t.hero_span_1}
              </span>
              {t.hero_span_2}
              <span
                className='hero-span'
                style={{
                  color:
                    updatedTheme === "dark"
                      ? "rgba(73, 166, 106, 1)"
                      : "rgba(73, 166, 106, 1)",
                }}
              >
                {" "}
                {t.hero_span_3}
              </span>
              .
            </h1>
            <p className='hero-subtitle animate-pop-in'>{t.hero_description}</p>
            <div className='hero_button_container'>
              <Link
                href='https://expo.dev/accounts/prosper1234567890/projects/betfundr/builds/a12fce85-0262-4cf8-a0de-094d2c10d509'
                passHref
              >
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
              </Link>
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
      <div
        className='small-device'
        style={{color: updatedTheme === "dark" ? "" : "rgba(0, 0, 0, 1)"}}
      >
        <div className='small-device-hero'>
          <div
            style={{
              position: "fixed",
              top: 30,
              left: 30,
              right: 30,
              height: "44%",
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
              marginTop: "150px",
              height: "40%",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              justifyContent: "center",
              zIndex: 2,
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                alignItems: "center",
                marginTop: "70px",
              }}
            >
              <h1 className='hero-title animate-pop-in'>
                <span
                  className='hero-span'
                  style={{
                    color:
                      updatedTheme === "dark"
                        ? "rgba(73, 166, 106, 1)"
                        : "rgba(73, 166, 106, 1)",
                    marginRight: "3px",
                  }}
                >
                  {t.hero_span_1}
                </span>
                {t.hero_span_2}
                <span
                  className='hero-span'
                  style={{
                    color:
                      updatedTheme === "dark"
                        ? "rgba(73, 166, 106, 1)"
                        : "rgba(73, 166, 106, 1)",
                  }}
                >
                  {" "}
                  {t.hero_span_3}
                </span>
                .
              </h1>
              <p className='hero-subtitle animate-pop-in'>
                {t.hero_description}
              </p>
            </div>

            <div className='hero_button_container'>
              <Link
                href='https://expo.dev/accounts/prosper1234567890/projects/betfundr/builds/a12fce85-0262-4cf8-a0de-094d2c10d509'
                passHref
              >
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
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
