"use client";
import "./footer.css";
import React, { useState } from "react";
import Image from "next/image";
import image from "../../../../public/TikTok.svg";

const Footer = () => {

 
  return (
    <div className="footer">
      <h4>PRENEZ CONTACT AVEC NOUS</h4>
      <p>
        Si vous avez un problème ou des questions pertinentes, utilisez les
        liens ci-dessous pour nous contacter
      </p>
     

      <div style={{fontSize: "18px", fontWeight: 'bold', margin: "20px 0px"}}>OR</div> 
      <div className="footer-social-media-icons">
        <div className="footer-img facebook">
          <Image
            src="/Facebook.svg"
            loading="lazy"
            fill
            style={{ objectFit: "cover" }}
            alt="Picture of the author"
          />
        </div>
        <div className="footer-img whatsapp">
          <Image
            src="/Whatsapp.svg"
            loading="lazy"
            fill
            style={{ objectFit: "cover" }}
            alt="Picture of the author"
          />
        </div>
        <div className="footer-img tiktok">
          <Image
            src={image}
            loading="lazy"
            fill
            style={{ objectFit: "cover" }}
            alt="Picture of the author"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
