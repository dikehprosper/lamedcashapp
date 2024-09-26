"use client";
import "./footer.css";
import Image from "next/image";
import image from "../../../../public/TikTok.svg";
import { useTranslations } from "next-intl";

const Footer = ({updatedTheme}: any) => {
  const t = useTranslations("home");
  return (
    <div className='footer' style={{marginTop: "30px"}}>
      <h4 style={{color: updatedTheme === "dark" ? "white": "black"}}>{t("contact us")}</h4>
      <p>{t("contact us description")}</p>

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
