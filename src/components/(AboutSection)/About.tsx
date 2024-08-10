"use client";
import "./about.css";
import React from "react";
import Image from "next/image";
import image from "../../../public/about-section.webp";
import { useTranslations } from "next-intl";
import {form1, form2} from "./form"


const AboutSection = () => {
  const t = useTranslations("about");
  const t2 = useTranslations("home");
  return (
    <div>
      <div className='AboutSection'>
        <h2>{t(`about_us`)}</h2>
        <p>{t("mission")}</p>
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
          <h3>{t(`our_services`)}</h3>
          <p>
            1. <b>{t(`financing.title`)}</b>: {t("financing.description")}
          </p>
          <p>
            2. <b>{t(`withdrawal.title`)}</b>: {t(`withdrawal.description`)}
          </p>
          <p>
            3. <b>{t("support.title")}</b>: {t("support.description")}
          </p>
        </div>
      </div>
      <div className='AboutSection3'>
        <div className='AboutSection3-text'>
          <h3>{t2("contact us description")}</h3>
          <p>
            {t2("contact us description").includes("Privacy policy")
              ? form1
              : form2}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
