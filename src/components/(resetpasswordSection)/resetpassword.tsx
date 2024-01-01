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

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmpassword:""
  });

  useEffect(() => {
    if (user.password && user.password === user.confirmpassword) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user.confirmpassword, user.password]);

  //collect value from login input
  const handleUserPassword = (event: any) => {
    setUser({
      ...user,
      password: event.target.value,
    });
  };

  const handleUserConfirmPassword = (event: any) => {
    setUser({
      ...user,
      confirmpassword: event.target.value,
    });
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      setLoading(true);
      const email = user.email;
      console.log(email);
      const response = await axios.post("/api/users/forgotpassword", { email }); // Corrected the API endpoint
      console.log(response);
      setLoading(false);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        // Corrected the way to check the status code
        toast.error("User already exists"); // Corrected the error message
      } else {
        toast.error("Error occurred"); // Moved this toast outside of the specific status code check
      }
      setLoading(false);
    }
  }

  return (
    <div className='signin-container'>
      <div className='signin-header'>
        <h2>Mot de passe oublié</h2>
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
          <label>Mot de passe</label>
          <input
            type='text'
            className='signin-form'
            value={user.password}
            onChange={handleUserPassword}
            placeholder='Entrez un nouveau mot de passe'
          />
          <label>Confirmez le mot de passe</label>
          <input
            type='text'
            className='signin-form'
            value={user.confirmpassword}
            onChange={handleUserConfirmPassword}
            placeholder='Entrez Confirmer le mot de passe'
          />

          <div className='forgot-password1'>
            {" "}
            <a href='/signin' className='forgot-password2'>
              Allez à La Connexion
            </a>{" "}
            &nbsp; &nbsp; &nbsp;
            <a href='/signup' className='forgot-password3'>
              Allez à L&apos;Inscription
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
                ? "rgba(189, 255, 5, .7) !important;"
                : "rgba(189, 255, 5, 1) !important;",
              pointerEvents: buttonDisabled ? "none" : "auto",
            }}
          >
            {loading ? (
              <div id='container-signin-signin-special'>
                <div id='html-spinner-signin-signin-special'></div>
              </div>
            ) : (
              "envoyer un lien"
            )}
          </button>
        </form>
        <div className='welcome-section'>
          <div className='welcome-section-first'>
            <h2 className='welcome-section-first_h2'>Mot de passe oublié</h2>
          </div>
          <div className='welcome-section-second'>
            <h5 className='welcome-section-second_h5'>Ou continuez avec</h5>
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
            </div>
            <p className='welcome-section-second_p'>
              Vous n&apos;avez pas de compte?,{" "}
              <span style={{ color: "#FCBB45", fontWeight: "500" }}>
                <a href='/signup'>Créez un compte !</a>
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* last section */}
      <div className='signin-container_inner23'>
        <div className='welcome-section-mobile'>
          <div className='welcome-section-second-mobile'>
            <h5 className='welcome-section-second_h5-mobile'>
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
            </div>
            <p className='welcome-section-second_p-mobile'>
              Vous n&apos;avez pas de compte?,{" "}
              <span style={{ color: "#FCBB45", fontWeight: "500" }}>
                <a href='/signup'>Créez un compte !</a>
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
          }}
        >
          Contactez-nous
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
