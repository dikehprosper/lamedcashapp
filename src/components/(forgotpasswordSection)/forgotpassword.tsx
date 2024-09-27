"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import image from "../../../public/loginBackground.webp";
import image1 from "../../../public/Facebook.svg";
import image2 from "../../../public/Whatsapp.svg";
import image3 from "../../../public/TikTok.svg";
import image4 from "../../../public/Google.svg";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import "./forgotpassword.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useTranslations } from "next-intl";
const ForgotPassword = ({updatedTheme}: any) => {
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [sent, setSent] = useState(false)
  const [user, setUser] = useState({
    email: "",
  });

   const t = useTranslations("forgotpassword");

  useEffect(() => {
    if (user.email) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user.email]);

  //collect value from login input
  const handleUserEmail = (event: any) => {
    setUser({
      ...user,
      email: event.target.value,
    });
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      setLoading(true);
      const email = user.email;
      console.log(email);
      const response = await axios.post("/api/users/forgotpassword", { email }); // Corrected the API endpoint
      setSent(true)
      console.log(response);
      setLoading(false);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        // Corrected the way to check the status code
        toast.error("User does not exists"); // Corrected the error message
      } else {
        toast.error("Error occurred"); // Moved this toast outside of the specific status code check
      }
      setLoading(false);
    }
  }

  useEffect(() => {
  // Dynamically add a style tag to the document head for placeholder and input styling
  const placeholderColor = updatedTheme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, .2)";
  const color = updatedTheme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)";
  
  const style = document.createElement('style');
  style.innerHTML = `
    .signin-form::placeholder {
      color: ${placeholderColor};
    }
    .signin-form {
      color: ${color};
    }
  `;

  document.head.appendChild(style);

  // Clean up the style tag on component unmount
  return () => {
    document.head.removeChild(style);
  };
}, [updatedTheme]);



  return (
    <div
      className='signin-container'
      style={{
        background: updatedTheme === "dark" ? "rgb(10, 20, 38)" : "white",
      }}
    >
      <div className='signin-header'>
        <h2 style={{ color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent"}}>{ t("forgotpassword.title")}</h2>
      </div>
      {/* first section */}
      <div className='signin-container_inner'>
        <div className='signin-container_inner_background_image'>
          <Image
            src={image}
            fill
            style={{
              objectFit: "cover",
            }}
            alt='Picture of the background'
            placeholder='blur'
            loading='eager'
          />
        </div>
        <form onSubmit={handleSubmit} className='signin-form-container'>
          <label  style={{ color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent", fontWeight: "bold", width: "100%"}}> E-mail</label>
          <input
            type='email'
            className='signin-form'
            value={user.email}
            onChange={handleUserEmail}
            placeholder={t("forgotpassword.placeholder")}
            style={{
              border:
                updatedTheme === "dark" ? "" : "2px solid rgba(0, 0, 0, 0.6)",
            }}
          />

          <div className='forgot-password1' style={{color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent"}}>
            
            <a href='/signin' className='forgot-password2'>
              {t("forgotpassword.signin")}
            </a>
            &nbsp; &nbsp; &nbsp;
            <a href='/signup' className='forgot-password3'>
              {t("forgotpassword.signup")}
            </a>
          </div>

          <button
            type='submit'
            className='submit-button-signin-special'
            style={{
              color: "black !important",
              fontWeight: "600 !important",
              cursor: "pointer",
              background: buttonDisabled
                ? "rgba(73, 166, 106, 1)"
                : "rgba(73, 166, 106, .7) ",
              pointerEvents: buttonDisabled ? "none" : "auto",
            }}
          >
            {loading ? (
              <div id='container-signin-signin-special'>
                <div id='html-spinner-signin-signin-special'></div>
              </div>
            ) : (
              t("forgotpassword.send_link")
            )}
          </button>
          {sent && (
            <div
              style={{
                background: "rgba(0, 128, 0, 0.18)",
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                height: "60px",
                width: "100%",
                borderRadius: "4px",
                border: ".5px solid rgba(0, 128, 0, 0.7)",
                 color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent"
              }}
            >
              
             { t("forgotpassword.successMessage")}
            </div>
          )}
        </form>

        <div className='welcome-section'>
          <div className='welcome-section-first'>
            <h2 className='welcome-section-first_h2' style={{color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent"}}>{ t("forgotpassword.title")}</h2>
          </div>
          <div className='welcome-section-second'>
            {/* <h5 className='welcome-section-second_h5'>Ou continuez avec</h5>
            <div className='signin-img google'>
              <Image
                src={image4}
                fill
                style={{
                  objectFit: "cover",
                }}
                alt='Picture of the author'
                loading='eager'
              />
            </div> */}
            <p className='welcome-section-second_p' style={{color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent"}}>
            { t("forgotpassword.question")}
              <span style={{color: "rgba(73, 166, 106, 1)", fontWeight: "500"}}>
                <a href='/signup'>  { t("forgotpassword.solution")}  </a>
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* last section */}
      <div className='signin-container_inner23'>
        <div className='welcome-section-mobile-password'>
          <div className='welcome-section-second-mobile'>
            {/* <h5 className='welcome-section-second_h5-mobile'>
              Ou continuez avec
            </h5>
            <div className='signin-img google'>
              <Image
                src={image4}
                loading='eager'
                fill
                style={{
                  objectFit: "cover",
                }}
                alt='Picture of the author'
              />
            </div> */}
            <p className='welcome-section-second_p-mobile'>
               { t("forgotpassword.question")}
              <span style={{color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent", fontWeight: "500"}}>
                <a href='/signup'>{ t("forgotpassword.solution")}</a>
              </span>
            </p>
          </div>
        </div>

        <div
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            margin: "20px 0px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent"
          }}
        >
          { t("forgotpassword.contact")}
        
        </div>
        <div className='signin-social-media-icons'>
          <div className='signin-img facebook'>
            <Image
              src={image1}
              loading='eager'
              fill
              style={{
                objectFit: "cover",
              }}
              alt='Picture of the author'
            />
          </div>
          <div className='signin-img whatsapp'>
            <Image
              src={image2}
              loading='eager'
              fill
              style={{
                objectFit: "cover",
              }}
              alt='Picture of the author'
            />
          </div>
          <div className='signin-img tiktok'>
            <Image
              src={image3}
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
    </div>
  );
};

export default ForgotPassword;
