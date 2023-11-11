"use client"
import "./footer.css";
import React, {useState} from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import Image from "next/image";
import image from "../../../../public/TikTok.svg"
import TextField from "@mui/material/TextField";

const Footer = () => {
  const [inputValue, setInputValue] = useState("");
const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setInputValue(event.target.value);
};

  return (
    <div className="footer">
      <h4>PRENEZ CONTACT AVEC NOUS</h4>
      <p>
        Si vous avez un problème ou des questions pertinentes, utilisez les
        liens ci-dessous pour nous contacter
      </p>
      <form>
        <TextField
          label="Type something"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      {/* <div className="styled-input-container">
        <input
          type="text"
          className="styled-input"
          placeholder="Send us a message..."
        />
        <div className="footer-FaLongArrowAltRight">
          {" "}
          <FaLongArrowAltRight />
        </div>
      </div>

      <div style={{fontSize: "18px", fontWeight: 'bold', margin: "20px 0px"}}>OR</div> */}
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
