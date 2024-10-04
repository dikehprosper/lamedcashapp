"use client";
import "./footer.css";
import Image from "next/image";
import image from "../../../../public/TikTok.svg";
import langDataEn from "@/messages/en/home.json";
import langDataFr from "@/messages/fr/home.json";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
const Footer = ({updatedTheme, updatedLang}: any) => {
   const getLangData = () => {
    return updatedLang === "en" ? langDataEn : langDataFr;
  };
  const t = getLangData();
  return (
    <div className='footer' style={{marginTop: "30px"}}>
      <h4 style={{color: updatedTheme === "dark" ? "white": "black"}}>{t.contact_us}</h4>
      <p>{t.contact_us_description}</p>

      <div className='footer-social-media-icons'>
        <div className='footer-img facebook'>
          <Image
            src='/Facebook.svg'
            loading='eager'
            fill
            style={{objectFit: "cover"}}
            alt='Picture of the author'
          />
        </div>
        <div className='footer-img whatsapp'>
          <Image
            src='/Whatsapp.svg'
            loading='eager'
            fill
            style={{objectFit: "cover"}}
            alt='Picture of the author'
          />
        </div>
        <div className='footer-img tiktok'>
          <Image
            src={image}
            loading='eager'
            fill
            style={{objectFit: "cover"}}
            alt='Picture of the author'
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
