"use client";
import "./footer.css";
import Link from "next/link";
import Image from "next/image";
import image from "../../../../public/TikTok.svg";
import {useTranslations} from "next-intl";

const PrivacyFooter = () => {
  const t = useTranslations("home");
  return (
    <div className='footer2'>
      <p className='footer2-text'>
        © 2024 Betfundr. All rights reserved.
        {/* {t("contact us description")} */}
      </p>
      <div className='footer2-div'>
        <Link
          className='footer2-text'
          // className={` ${pathname === "/logout" ? "active" : ""}`}
          href='/about'
        >
          {t("contact us description")}
        </Link>
      </div>
    </div>
  );
};

export default PrivacyFooter;
