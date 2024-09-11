"use client";
import React from "react";
import {AiFillThunderbolt} from "react-icons/ai";
import {BsShieldLock} from "react-icons/bs";
import Image from "next/image";
import {MdOutlineSupportAgent} from "react-icons/md";
import "./FifthSection.css";
import Link from "next/link";
import {useTranslations} from "next-intl";
import image from "../../../../public/app-image.png";

const FifthSection = () => {
  const t = useTranslations("home");
  return (
    <div className='FifthSection-container'>
      <h2>{t("Download")}</h2>
      <div className='FifthSection-box'>
        <div className='hero-img-fifth'>
     <Image
  src={image}

  loading="eager"
  style={{
    objectFit: "cover",
    height: "107%", 
    width: "114%"
  }}
  alt="Picture of the background"
/>
        </div>
        <div className='FifthSection-box-inner animate-pop-in '>

           <p>{t("download description")}</p>
            <div className=' FifthSection-box-inner-inner'>
          <h5>{t("Download-now")}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FifthSection;
