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
import "./resetpassword.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useTranslations } from "next-intl";

const ResetPassword = ({updatedTheme}: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState({
    token: "",
    password: "",
  });
  const [confirmpassword, setConfirmpassword] = useState("");
 const t = useTranslations("resetpassword");
  useEffect(() => {
    if (user.password && confirmpassword) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [confirmpassword, user.password]);

  //collect value from login input
  const handleUserPassword = (event: any) => {
    setUser({
      ...user,
      password: event.target.value,
    });
  };

  const handleUserConfirmPassword = (event: any) => {
    setConfirmpassword(event.target.value);
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setUser({
      ...user,
      token: urlToken,
    });
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isSubmitting) {
        return;
      }
      if (user.password !== confirmpassword) {
        return toast.error("Le mot de passe ne correspond pas");
      }

      setLoading(true);

      const userData = {
        password: user.password,
        token: user.token,
      };

      const response = await axios.post("/api/users/resetpassword", userData);
      if (response.data && response.data.success) {
        toast.success("Password reset successful");
      }
      router.push("/signin");
      setLoading(false);
      setIsSubmitting(false);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error("Password reset Link expired");
      } else {
        toast.error("Error occurred. Please try again."); // Moved this toast outside of the specific status code check
      }
      setLoading(false);
      setIsSubmitting(false);
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
    <div className='signin-container'  style={{
        background: updatedTheme === "dark" ? "rgb(10, 20, 38)" : "white",
      }}>
      <div className='signin-header'>
        <h2 style={{color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent"}}>{ t("resetpassword.title")}</h2>
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
          <label style={{color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent"}}>{ t("resetpassword.password")}</label>
          <input
            type='text'
            className='signin-form last'
            value={user.password}
            onChange={handleUserPassword}
            placeholder={t("resetpassword.placeholder")}
              style={{
              border:
                updatedTheme === "dark" ? "" : "2px solid rgba(0, 0, 0, 0.6)",
            }}
            
          />

          <label style={{color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent"}}>{ t("resetpassword.confirm")}</label>
          <input
            type='text'
            className='signin-form'
            value={confirmpassword}
            onChange={handleUserConfirmPassword}
            placeholder={t("resetpassword.placeholder2")}
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
           {t("resetpassword.signin")}
            </a>
            &nbsp; &nbsp; &nbsp;
            <a href='/signup' className='forgot-password3'>
              {t("resetpassword.signup")}
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
                ? "rgba(73, 166, 106, .7)"
                : "rgba(73, 166, 106, 1) ",
              pointerEvents: buttonDisabled ? "none" : "auto",
            }}
          >
            {loading ? (
              <div id='container-signin-signin-special'>
                <div id='html-spinner-signin-signin-special'></div>
              </div>
            ) : (
             t("resetpassword.send_link")
            )}
          </button>
        </form>
        <div className='welcome-section'>
          <div className='welcome-section-first'>
            <h2 className='welcome-section-first_h2' style={{color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent"}}>{ t("resetpassword.title")}</h2>
          </div>
          <div className='welcome-section-second'>
            <div className='signin-img google'></div>
            <p className='welcome-section-second_p' style={{color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent"}}>
             { t("resetpassword.question")}  &nbsp;
              <span style={{color: "rgba(73, 166, 106, 1)", fontWeight: "500"}}>
                <a href='/signup'>{ t("resetpassword.solution")} </a>
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* last section */}
      <div className='signin-container_inner23'>
        <div className='welcome-section-mobile'>
          <div className='welcome-section-second-mobile'>
            <p className='welcome-section-second_p-mobile' style={{color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent"}}>
              { t("resetpassword.question")}  &nbsp;
              <span style={{color: "rgba(73, 166, 106, 1)", fontWeight: "500"}}>
                <a href='/signup'>{ t("resetpassword.solution")}</a>
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
         { t("resetpassword.contact")}
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

export default ResetPassword;
