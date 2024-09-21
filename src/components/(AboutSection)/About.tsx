"use client";
import "./about.css";
import React from "react";
import Image from "next/image";
import image from "../../../public/about-section.webp";
import {useTranslations} from "next-intl";
import {form1, form2} from "./form";

const AboutSection = () => {
  const t = useTranslations("about");
  const t2 = useTranslations("home");

  // Define the URL for account deletion
  const accountDeletionLink = "https://forms.gle/BmwYVMmxtJ1cwi4b9";

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

      {/* Add Account Deletion Link Section */}
      <div className='AccountDeletion' style={{display: "flex", flexDirection: 'column', width: '100%', gap: "2px",height: "100px", justifyContent: 'center', alignItems: 'center', marginBottom: '50px'}}>
        <h2>{t("account_deletion_title")}</h2>
        <p>{t("account_deletion_description")}</p>
        <a href={accountDeletionLink} target='_blank' rel='noopener noreferrer' style={{padding: "10px", borderRadius: "3px", background: "rgba(120, 120, 120, 0.4)", marginTop: "10px"}}>
          {t("account_deletion_link_text")}
        </a>
      </div>
    </div>
  );
};

export default AboutSection;
