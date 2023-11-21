import React from "react";
import Image from "next/image";
import FacebookLogo from "../../../public/Facebook.svg";
import WhatsappLogo from "../../../public/Whatsapp.svg";
import TiktokLogo from "../../../public/TikTok.svg";
import { MdLogout } from "react-icons/md";
import Link from "next/link";
const FooterMobile = () => {
  return (
    <div className='user-nav-social-media-all'>
      <h4>Follow</h4>
      <div className='user-nav-social-media-icons'>
        <div className='user-nav-logo-all facebook'>
          <Image
            src={FacebookLogo}
            loading='eager'
            fill
            style={{
              objectFit: "cover",
            }}
            alt='Picture of the author'
          />
        </div>
        <div className='user-nav-logo-all whatsapp'>
          <Image
            src={WhatsappLogo}
            loading='eager'
            fill
            style={{
              objectFit: "cover",
            }}
            alt='Picture of the author'
          />
        </div>
        <div className='user-nav-logo-all tiktok'>
          <Image
            src={TiktokLogo}
            loading='eager'
            fill
            style={{
              objectFit: "cover",
            }}
            alt='Picture of the author'
          />
        </div>
      </div>
    </div>
  );
};

export default FooterMobile;
