"use client";
import "./about.css";
import React from "react";
import Image from "next/image";
import image from "../../../public/about-section.webp";
import { useTranslations } from "next-intl";
const AboutSection = () => {
  const t = useTranslations("about");
  return (
    <>
      <div className="AboutSection">
        <h2>{t`about_us`}</h2>
        <p>{t("mission")}</p>
      </div>
      <div className="AboutSection2">
        <Image
          fill
          src={image}
          style={{ objectFit: "cover" }}
          loading="eager"
          alt="background"
        />
        <div className="AboutSection2-text">
          <h3>{t`our_services`}</h3>
          <p>
            1. <b>{t`financing.title`}</b>: {t("financing.description")}
          </p>
          <p>
            2. <b>{t`withdrawal.title`}</b>: {t`withdrawal.description`}
          </p>
          <p>
            3. <b>{t("support.title")}</b>: {t("support.description")}
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutSection;
