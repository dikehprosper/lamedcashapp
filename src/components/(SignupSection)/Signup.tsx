"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import image from "../../../public/loginBackground.png";
import image1 from "../../../public/Facebook.svg";
import image2 from "../../../public/Whatsapp.svg";
import image3 from "../../../public/TikTok.svg";
import image4 from "../../../public/Google.svg";
import { ImCheckmark } from "react-icons/im";
import "./signup.css";
const SignUp = () => {
  const [user, setUser] = useState({
    fullname: "",
    betId: "",
    number: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [IsChecked, setIsChecked] = useState(false);

  const toggleIsChecked = () => {
    setIsChecked(!IsChecked);
  };

  //collect value from login input
  const handleFullname = (event: any) => {
    setUser({
      ...user,
      fullname: event.target.value,
    });
  };
  const handleBetId = (event: any) => {
    setUser({
      ...user,
      betId: event.target.value,
    });
  };

  const handleNumber = (event: any) => {
    setUser({
      ...user,
      number: event.target.value,
    });
  };
  const handleUserEmail = (event: any) => {
    setUser({
      ...user,
      email: event.target.value,
    });
  };
  const handleUserPassword = (event: any) => {
    setUser({
      ...user,
      password: event.target.value,
    });
  };

  const handleUserConfirmPassword = (event: any) => {
    setUser({
      ...user,
      confirmPassword: event.target.value,
    });
  };

  //Submit login details
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    // localStorage.setItem("rememberedEmailForEspece", user.email);
    // localStorage.setItem("rememberedPasswordForEspece", user.password);
    console.log(user);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  //check email and password state to determine ButtonDisabled state
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="signup-container">
      <div className="signup-header">
        <h2>Rejoignez-nous</h2>
      </div>
      {/* first section */}
      <div className="signup-container_inner">
        <div className="signup-container_inner_background_image">
          <Image
            src={image}
            fill
            loading="lazy"
            style={{
              objectFit: "cover",
            }}
            alt="Picture of the background"
            placeholder="blur"
          />
        </div>
        <form onSubmit={handleSubmit} className="signup-form-container">
          <input
            type="text"
            className="signup-form"
            value={user.fullname}
            onChange={handleFullname}
            // placeholder="Entrez votre nom complet"
          />

          <input
            type="text"
            className="signup-form"
            value={user.betId}
            onChange={handleBetId}
            // placeholder="1Numéro d’identification XBET"
          />
          {/* <input
            type="number"
            className="signup-form"
            value={user.number}
            onChange={handleNumber}
            placeholder="Numéro Whatsapp/mobile"
          /> */}

          {/* <input
            type="email"
            className="signup-form"
            value={user.email}
            onChange={handleUserEmail}
            placeholder="Entrez votre adresse email"
          />
          <input
            type="password"
            className="signup-form"
            value={user.password}
            onChange={handleUserPassword}
            placeholder="Entrer le mot de passe"
          />
          <input
            type="password"
            className="signup-form"
            value={user.confirmPassword}
            onChange={handleUserConfirmPassword}
            placeholder="Confirmez le mot de passe"
          /> */}

          <div className="signup-condition">
            <span
              className="signup-condition-checkbox"
              onClick={toggleIsChecked}
              style={{
                background: IsChecked ? "rgba(189, 255, 5, 1)" : "transparent",
              }}
            >
              {IsChecked ? (
                <ImCheckmark className="BiCheck" color="black" />
              ) : null}
            </span>
            <p className="signup-condition-checkbox-p">
              J&apos;accepte les conditions{" "}
              <span style={{ color: "#FCBB45", fontWeight: "500" }}>
                ( DÉCONSEILLÉ AUX MOINS DE 18 ANS )
              </span>
            </p>
          </div>
          <button
            type="submit"
            className="submit-button"
            style={{
              background: buttonDisabled
                ? "rgba(189, 255, 5, .7)"
                : "rgba(189, 255, 5, 1)",
              pointerEvents: buttonDisabled ? "none" : "auto",
            }}
          >
            {loading ? (
              <div id="container-signup">
                <div id="html-spinner-signup"></div>
              </div>
            ) : (
              "S'inscrire"
            )}
          </button>
        </form>
        <div className="welcome-section">
          <div className="welcome-section-first">
            <h2 className="welcome-section-first_h2">Rejoignez-nous</h2>
          </div>
          <div className="welcome-section-second">
            <h5 className="welcome-section-second_h5">Ou continuez avec</h5>
            <div className="signup-img google">
              <Image
                src={image4}
                loading="lazy"
                fill
                style={{ objectFit: "cover" }}
                alt="Picture of the author"
              />
            </div>
            <p className="welcome-section-second_p">
              Vous avez déjà un compte?{" "}
              <span style={{ color: "#FCBB45", fontWeight: "500" }}>
                <a href="/signin">S&apos;identifier!</a>
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* last section */}
      <div className="signup-container_inner23">
        <div className="welcome-section-mobile">
          <div className="welcome-section-second-mobile">
            <h5 className="welcome-section-second_h5-mobile">
              Ou continuez avec
            </h5>
            <div className="signup-img google">
              <Image
                src={image4}
                loading="lazy"
                fill
                style={{ objectFit: "cover" }}
                alt="Picture of the author"
              />
            </div>
            <p className="welcome-section-second_p-mobile">
              Vous avez déjà un compte?{" "}
              <span style={{ color: "#FCBB45", fontWeight: "500" }}>
                <a href="/signin">S&apos;identifier!</a>
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
        <div className="signup-social-media-icons">
          <div className="signup-img facebook">
            <Image
              src={image1}
              loading="lazy"
              fill
              style={{ objectFit: "cover" }}
              alt="Picture of the author"
            />
          </div>
          <div className="signup-img whatsapp">
            <Image
              src={image2}
              loading="lazy"
              fill
              style={{ objectFit: "cover" }}
              alt="Picture of the author"
            />
          </div>
          <div className="signup-img tiktok">
            <Image
              src={image3}
              loading="lazy"
              fill
              style={{ objectFit: "cover" }}
              alt="Picture of the author"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
