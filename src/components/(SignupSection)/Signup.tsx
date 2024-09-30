"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";
import image from "../../../public/loginBackground.webp";
import image1 from "../../../public/Facebook.svg";
import image2 from "../../../public/Whatsapp.svg";
import image3 from "../../../public/TikTok.svg";
import image4 from "../../../public/Google.svg";
import { ImCheckmark } from "react-icons/im";
import "./signup.css";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/app/firebase/firebaseConfig";
import axios from "axios";
import { usePathname } from "next/navigation";

import CountryPicker from "../(CountryPicker)/CountryPicker";
import langDataEn from "@/messages/en.json";
import langDataFr from "@/messages/fr.json";
const SignUp = ({updatedTheme, updatedLang}: any) => {
  const pathname = usePathname();
  const [user, setUser] = useState({
    fullname: "",
    betId: "",
    number: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
  });
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [IsChecked, setIsChecked] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userDetailsVerified, setUserDetailsVerified] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [countryCode, setCountryCode] = useState("+229");

  const toggleIsChecked = () => {
    setIsChecked(!IsChecked);
    setIsCheckedError(false);
  };

  //check email and password state to determine ButtonDisabled state

  //Submit details
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const url = pathname;

      // Use a regular expression to extract the value
      const match = url.match(/\/signup\/([^\/]+)$/);

      // Extracted value is in match[1]
      const referrerId = match ? match[1] : null;
      setLoading(true);
      const signupVerificationResult = SignupVerification();

      if (signupVerificationResult?.isValid) {
        localStorage.setItem("rememberedEmailForEspece", user.email);
        localStorage.setItem("rememberedPasswordForEspece", user.password);
        const updatedUser = {
          fullname: user.fullname,
          betId: user.betId,
          number: user.number,
          email: user.email,
          password: user.password,
          confirmPassword: user.confirmPassword,
          profileImage: user.profileImage,
          referrerId: referrerId ? referrerId : "",
        };
        const response = await axios.post("/api/users/signup", updatedUser);
        toast.success(
          "vous vous êtes inscrit avec succès... vous avez été redirigé vers le tableau de bord"
        );
        router.push(`${updatedLang}/dashboard`);
        setLoading(false);
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        return toast.error("l'utilisateur existe déjà");
      } else if (error.response.status === 500) {
        return toast.error("échec de l'inscription");
      } else {
        console.log(error);
        return toast.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(userDetailsVerified);
  }, [setUserDetailsVerified, userDetailsVerified]);

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
  const handleUserPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const [emailError, setEmailError] = useState(false);
  const [betIdError, setBetIdError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [fullNameError, setFullNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [isCheckedError, setIsCheckedError] = useState(false);

  const SignupVerification = () => {
    setEmailError(false);
    setBetIdError(false);
    setPhoneNumberError(false);
    setFullNameError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setIsCheckedError(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(user.email);
    const hasMoreThanFourLetters = user.password.length >= 4;
    const passwordMatch = user.password === user.confirmPassword;
    const isValidFullname = user.fullname.length > 0;
    const isValidBetId = user.betId.length >= 4;
    const isValidPhoneNumber = /^\d{8}$/.test(user.number);

    if (
      isValidEmail &&
      hasMoreThanFourLetters &&
      passwordMatch &&
      isValidFullname &&
      isValidBetId &&
      isValidPhoneNumber &&
      IsChecked
    ) {
      return {isValid: true};
    } else {
      // Display error messages for invalid input
      if (!isValidFullname) {
        setFullNameError(true);
        console.error("Invalid fullname:", user.fullname);
        setLoading(false);
      }
      if (!isValidBetId) {
        setBetIdError(true);
        console.error("BetId should have at least 4 characters:", user.betId);
        setLoading(false);
      }
      if (!isValidPhoneNumber) {
        setPhoneNumberError(true);
        console.error(t.sign_up.errors.invalid_phone_number, user.number);
        setLoading(false);
      }
      if (!isValidEmail) {
        setEmailError(true);
        console.error("Invalid email address:", user.email);
        setLoading(false);
      }
      if (!hasMoreThanFourLetters) {
        setPasswordError(true);
        console.error(
          "Password should have more than 4 letters:",
          user.password
        );
        setLoading(false);
      }
      if (!passwordMatch) {
        setConfirmPasswordError(true);
        console.error("Password and Confirm Password do not match");
      }
      if (!IsChecked) {
        setIsCheckedError(true);
        console.error("Password and Confirm Password do not match");
        setLoading(false);
      }

      setUserDetailsVerified(false);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      return;
    }
  };

  const SignupReVerification = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(user.email);
    const hasMoreThanFourLetters = user.password.length >= 4;
    const passwordMatch = user.password === user.confirmPassword;
    const isValidFullname = user.fullname.length > 0;
    const isValidBetId = user.betId.length >= 4;
    const isValidPhoneNumber = /^\d{8}$/.test(user.number);

    if (fullNameError) {
      if (isValidFullname) {
        setFullNameError(false);
        setLoading(false);
      }
    }
    if (betIdError) {
      if (isValidBetId) {
        setBetIdError(false);
        console.error("BetId should have at least 4 characters:", user.betId);
        setLoading(false);
      }
    }

    if (phoneNumberError) {
      if (isValidPhoneNumber) {
        setPhoneNumberError(false);
        setLoading(false);
      }
    }

    if (emailError) {
      if (isValidEmail) {
        setEmailError(false);
        setLoading(false);
      }
    }
    if (passwordError) {
      if (hasMoreThanFourLetters) {
        setPasswordError(false);
        setLoading(false);
      }
    }

    if (passwordError) {
      if (passwordMatch) {
        setConfirmPasswordError(false);
      }
    }

    setTimeout(() => {
      setLoading(false);
    }, 3000);
    return;
  };

  //Submit login details
  const handleSubmitForGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser({
          ...user,
          fullname: result.user.displayName || "",
          email: result.user.email || "",
          profileImage: result.user.photoURL || "",
          number: result.user.phoneNumber || "",
        });
        toast.success("Succesful!!..Please complete your details to proceed!");
        console.log(result);
      })
      .catch((error: any) => {
        toast.error("An error occured");
      });
  };

  useEffect(() => {
    // Dynamically add a style tag to the document head for placeholder and input styling
    const placeholderColor =
      updatedTheme === "dark"
        ? "rgba(255, 255, 255, 0.2)"
        : "rgba(0, 0, 0, .2)";
    const color =
      updatedTheme === "dark" ? "rgba(255, 255, 255, .2)" : "rgba(0, 0, 0, .2)";

    const style = document.createElement("style");
    style.innerHTML = `
    .signup-form::placeholder {
      color: ${placeholderColor};
    }
    .signup-form111::placeholder {
      color: ${placeholderColor};
    }
    .signup-form {
      color: ${color};
    }
  `;

    document.head.appendChild(style);

    // Clean up the style tag on component unmount
    return () => {
      document.head.removeChild(style);
    };
  }, [updatedTheme]);

  const getLangData = () => {
    return updatedLang === "en" ? langDataEn : langDataFr;
  };

  const t = getLangData();

  return (
    <div
      className='signup-container'
      style={{
        background: updatedTheme === "dark" ? "rgb(10, 20, 38)" : "white",
      }}
    >
      <div className='signup-header'>
        <h2 style={{color: updatedTheme === "dark" ? "white" : "black"}}>
          {t.sign_up.signup.join_us}
        </h2>
      </div>
      {/* first section */}
      <div className='signup-container_inner'>
        <div className='signup-container_inner_background_image'>
          <Image
            src={image}
            fill
            loading='eager'
            style={{
              objectFit: "cover",
            }}
            alt='Picture of the background'
            placeholder='blur'
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className='signup-form-container big-screens'
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              gap: "10px",
              flexDirection: "column",
            }}
          >
            <input
              type='text'
              className='signup-form'
              value={user.fullname}
              onChange={(e) => {
                handleFullname(e);
                SignupReVerification();
              }}
              placeholder={t.sign_up.signup.enter_fullname}
              style={{
                borderColor: fullNameError ? "red" : "",
                color: updatedTheme === "dark" ? "white" : "black",
                border:
                  updatedTheme === "dark" ? "" : "2px solid rgba(0, 0, 0, 0.6)",
              }}
            />
            {fullNameError && (
              <p
                style={{
                  color: "red",
                  alignSelf: "start",
                  paddingLeft: "14px",
                  fontSize: "13px",
                }}
              >
  
              {t.sign_up.signup.update7}
              </p>
            )}
          </div>
          <div style={{display: "flex", gap: "20px", width: "100%"}}>
            <div
              style={{
                display: "flex",
                width: "100%",
                gap: "10px",
                flexDirection: "column",
              }}
            >
              <input
                type='text'
                className='signup-form'
                value={user.betId}
                onChange={(e) => {
                  handleBetId(e);
                  SignupReVerification();
                }}
                placeholder={t.sign_up.signup.bet_id}
                style={{
                  borderColor: betIdError ? "red" : "",
                  transition: betIdError ? "1s border-color ease-in-out" : "",
                  color: updatedTheme === "dark" ? "white" : "black",
                  border:
                    updatedTheme === "dark"
                      ? ""
                      : "2px solid rgba(0, 0, 0, 0.6)",
                }}
              />
              {betIdError && (
                <p
                  style={{
                    color: "red",
                    alignSelf: "start",
                    paddingLeft: "14px",
                    fontSize: "13px",
                  }}
                  className='animate-pop-in'
                >
            
                {t.sign_up.signup.update6}
                </p>
              )}
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                gap: "10px",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <div className='signup-form1111' style={{position: "relative"}}>
                {showCountryPicker && (
                  <CountryPicker
                    setShow={setShowCountryPicker}
                    setCountryCode={setCountryCode}
                    countryCode={countryCode}
                  />
                )}
                <div
                  onClick={() => setShowCountryPicker(true)}
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "60px",
                    cursor: "pointer",
                    bottom: "0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "rgba(128, 128, 128, 1)",
                    background: "rgba(0, 0, 0, 0.1)",
                    borderRight: "2px solid rgba(256, 256, 256, 0.09)",
                  }}
                >
                  {countryCode}
                </div>
                <input
                  type='number'
                  className='signup-form111'
                  value={user.number}
                  onChange={(e) => {
                    handleNumber(e);
                    SignupReVerification();
                  }}
                  placeholder={t.sign_up.signup.whatsapp_number}
                  style={{
                    borderColor: phoneNumberError ? "red" : "",
                    paddingLeft: "65px",
                    color: updatedTheme === "dark" ? "white" : "black",
                    border:
                      updatedTheme === "dark"
                        ? ""
                        : "2px solid rgba(0, 0, 0, 0.6)",
                  }}
                />
              </div>
              {phoneNumberError && (
                <p
                  style={{
                    color: "red",
                    alignSelf: "start",
                    paddingLeft: "14px",
                    fontSize: "13px",
                  }}
                  className='animate-pop-in'
                >
                  {" "}
                  {t.sign_up.errors.invalid_phone_number}
                </p>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              gap: "10px",
              flexDirection: "column",
            }}
          >
            <input
              type='email'
              className='signup-form'
              value={user.email}
              onChange={(e) => {
                handleUserEmail(e);
                SignupReVerification();
              }}
              placeholder={t.sign_up.signup.enter_email}
              style={{
                borderColor: emailError ? "red" : "",
                color: updatedTheme === "dark" ? "white" : "black",
                border:
                  updatedTheme === "dark" ? "" : "2px solid rgba(0, 0, 0, 0.6)",
              }}
            />
            {emailError && (
              <p
                style={{
                  color: "red",
                  alignSelf: "start",
                  paddingLeft: "14px",
                  fontSize: "13px",
                }}
                className='animate-pop-in'
              >
                {" "}
                {t.sign_up.errors.invalid_email}
              </p>
            )}
          </div>

          <div style={{display: "flex", gap: "20px", width: "100%"}}>
            <div
              style={{
                display: "flex",
                width: "100%",
                gap: "10px",
                flexDirection: "column",
              }}
            >
              <input
                type='password'
                className='signup-form'
                value={user.password}
                onChange={(e) => {
                  handleUserPassword(e);
                  SignupReVerification();
                }}
                placeholder={t.sign_up.signup.enter_password}
                style={{
                  borderColor: passwordError ? "red" : "",
                  color: updatedTheme === "dark" ? "white" : "black",
                  border:
                    updatedTheme === "dark"
                      ? ""
                      : "2px solid rgba(0, 0, 0, 0.6)",
                }}
              />
              {passwordError && (
                <p
                  style={{
                    color: "red",
                    alignSelf: "start",
                    paddingLeft: "14px",
                    fontSize: "13px",
                  }}
                  className='animate-pop-in'
                >
                  {" "}
                  {t.sign_up.errors.password_length}
                </p>
              )}
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                gap: "10px",
                flexDirection: "column",
              }}
            >
              <input
                type='password'
                className='signup-form'
                value={user.confirmPassword}
                onChange={(e) => {
                  handleUserConfirmPassword(e);
                  SignupReVerification();
                }}
                placeholder={t.sign_up.signup.confirm_password}
                style={{
                  borderColor: confirmPasswordError ? "red" : "",
                  color: updatedTheme === "dark" ? "white" : "black",
                  border:
                    updatedTheme === "dark"
                      ? ""
                      : "2px solid rgba(0, 0, 0, 0.6)",
                }}
              />
              {confirmPasswordError && (
                <p
                  style={{
                    color: "red",
                    alignSelf: "start",
                    paddingLeft: "14px",
                    fontSize: "13px",
                  }}
                  className='animate-pop-in'
                >
                  
                  
                  {t.sign_up.signup.update8}
                </p>
              )}
            </div>
          </div>
          <div className='signup-condition'>
            <span
              className='signup-condition-checkbox'
              onClick={toggleIsChecked}
              style={{
                background: IsChecked ? "rgba(73, 166, 106, 1)" : "transparent",
                borderColor: isCheckedError ? "red" : "rgba(73, 166, 106, 1)",
              }}
            >
              {IsChecked ? (
                <ImCheckmark className='BiCheck' color='black' />
              ) : null}
            </span>
            <p
              className='signup-condition-checkbox-p'
              style={{color: updatedTheme === "dark" ? "white" : "black"}}
            >
              {t.sign_up.signup.accept_conditions}
              {/* <span style={{ color: "#FCBB45", fontWeight: "500" }}>
                ( DÉCONSEILLÉ AUX MOINS DE 18 ANS )
              </span> */}
            </p>
          </div>
          {isCheckedError && (
            <p
              style={{
                color: "red",
                alignSelf: "start",
                paddingLeft: "14px",
                fontSize: "13px",
              }}
              className='animate-pop-in'
            >
              {" "}
              {t.sign_up.errors.accept_conditions}
            </p>
          )}
          <button
            type='submit'
            className='submit-button-signup'
            style={{
              background: "rgba(73, 166, 106, 1)",
              color: "black !important",
            }}
            onClick={handleSubmit}
          >
            {loading ? (
              <div id='container-signup-signup'>
                <div id='html-spinner-signup-special'></div>
              </div>
            ) : (
              t.sign_up.signup.register
            )}
          </button>
        </form>

        <form
          onSubmit={handleSubmit}
          className='signup-form-container small-screens'
        >
          <input
            type='text'
            className='signup-form'
            value={user.fullname}
            onChange={(e) => {
              handleFullname(e);
              SignupReVerification();
            }}
            placeholder={t.sign_up.signup.enter_fullname}
            style={{
              borderColor: fullNameError ? "red" : "",
              color: updatedTheme === "dark" ? "white" : "black",
              border:
                updatedTheme === "dark" ? "" : "2px solid rgba(0, 0, 0, 0.6)",
            }}
          />
          {fullNameError && (
            <p
              style={{
                color: "red",
                alignSelf: "start",
                paddingLeft: "14px",
                fontSize: "10px",
              }}
            >
             
              
              {t.sign_up.signup.update7}
            </p>
          )}
          <input
            type='text'
            className='signup-form'
            value={user.betId}
            onChange={(e) => {
              handleBetId(e);
              SignupReVerification();
            }}
            placeholder={t.sign_up.signup.bet_id}
            style={{
              borderColor: betIdError ? "red" : "",
              color: updatedTheme === "dark" ? "white" : "black",
              border:
                updatedTheme === "dark" ? "" : "2px solid rgba(0, 0, 0, 0.6)",
            }}
          />
          {betIdError && (
            <p
              style={{
                color: "red",
                alignSelf: "start",
                fontSize: "10px",
                paddingLeft: "14px",
              }}
              className='animate-pop-in'
            >
             
            
               {t.sign_up.signup.update6}
            </p>
          )}
          <div className='signup-form1111' style={{position: "relative"}}>
            {showCountryPicker && (
              <CountryPicker
                setShow={setShowCountryPicker}
                setCountryCode={setCountryCode}
                countryCode={countryCode}
              />
            )}
            <div
              onClick={() => setShowCountryPicker(true)}
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "60px",
                cursor: "pointer",
                bottom: "0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "rgba(128, 128, 128, 1)",
                background: "rgba(0, 0, 0, 0.1)",
                borderRight: "2px solid rgba(256, 256, 256, 0.09)",
              }}
            >
              {countryCode}
            </div>
            <input
              type='number'
              className='signup-form111'
              value={user.number}
              onChange={(e) => {
                handleNumber(e);
                SignupReVerification();
              }}
              placeholder={t.sign_up.signup.whatsapp_number}
              style={{
                borderColor: phoneNumberError ? "red" : "",
                paddingLeft: "65px",
                color: updatedTheme === "dark" ? "white" : "black",
                border:
                  updatedTheme === "dark" ? "" : "2px solid rgba(0, 0, 0, 0.6)",
              }}
            />
          </div>
          {phoneNumberError && (
            <p
              style={{
                color: "red",
                alignSelf: "start",
                fontSize: "10px",
                paddingLeft: "14px",
              }}
              className='animate-pop-in'
            >
              Number must be 8 digits
            </p>
          )}
          <input
            type='email'
            className='signup-form'
            value={user.email}
            onChange={(e) => {
              handleUserEmail(e);
              SignupReVerification();
            }}
            placeholder={t.sign_up.signup.enter_email}
            style={{
              borderColor: emailError ? "red" : "",
              color: updatedTheme === "dark" ? "white" : "black",
              border:
                updatedTheme === "dark" ? "" : "2px solid rgba(0, 0, 0, 0.6)",
            }}
          />
          {emailError && (
            <p
              style={{
                color: "red",
                alignSelf: "start",
                fontSize: "10px",
                paddingLeft: "14px",
              }}
              className='animate-pop-in'
            >
   
             
                {t.sign_up.signup.update5}
            </p>
          )}
          <input
            type='password'
            className='signup-form'
            value={user.password}
            onChange={(e) => {
              handleUserPassword(e);
              SignupReVerification();
            }}
            placeholder={t.sign_up.signup.enter_password}
            style={{
              borderColor: passwordError ? "red" : "",
              color: updatedTheme === "dark" ? "white" : "black",
              border:
                updatedTheme === "dark" ? "" : "2px solid rgba(0, 0, 0, 0.6)",
            }}
          />
          {passwordError && (
            <p
              style={{
                color: "red",
                alignSelf: "start",
                fontSize: "10px",
                paddingLeft: "14px",
              }}
              className='animate-pop-in'
            >
              {" "}
              
                  {t.sign_up.signup.update4}
            </p>
          )}
          <input
            type='password'
            className='signup-form'
            value={user.confirmPassword}
            onChange={(e) => {
              handleUserConfirmPassword(e);
              SignupReVerification();
            }}
            placeholder={t.sign_up.signup.confirm_password}
            style={{
              borderColor: confirmPasswordError ? "red" : "",
              color: updatedTheme === "dark" ? "white" : "black",
              border:
                updatedTheme === "dark" ? "" : "2px solid rgba(0, 0, 0, 0.6)",
            }}
          />
          {confirmPasswordError && (
            <p
              style={{
                color: "red",
                alignSelf: "start",
                fontSize: "10px",
                paddingLeft: "14px",
              }}
              className='animate-pop-in'
            >
              {" "}
              {t.sign_up.signup.update}
            </p>
          )}
          <div className='signup-condition'>
            <span
              className='signup-condition-checkbox'
              onClick={toggleIsChecked}
              style={{
                background: IsChecked ? "rgba(73, 166, 106, 1)" : "transparent",
                borderColor: isCheckedError ? "red" : "rgba(73, 166, 106, 1)",
              }}
            >
              {IsChecked ? (
                <ImCheckmark className='BiCheck' color='black' />
              ) : null}
            </span>
            <p
              className='signup-condition-checkbox-p'
              style={{
                color: updatedTheme === "dark" ? "white" : "rgba(0, 0, 0, 0.8)",
              }}
            >
              {t.sign_up.signup.accept_conditions}
              {/* <span style={{ color: "#FCBB45", fontWeight: "500" }}>
                ( DÉCONSEILLÉ AUX MOINS DE 18 ANS )
              </span> */}
            </p>
          </div>
          {isCheckedError && (
            <p
              style={{
                color: "red",
                alignSelf: "start",
                fontSize: "10px",
                paddingLeft: "14px",
              }}
              className='animate-pop-in'
            >
              {" "}
               {t.sign_up.signup.update2}
              
            </p>
          )}
          <button
            type='submit'
            className='submit-button-signup'
            style={{
              background: "rgba(73, 166, 106, 1)",
              color: "black !important",
            }}
          >
            {loading ? (
              <div id='container-signup-signup'>
                <div id='html-spinner-signup-special'></div>
              </div>
            ) : (
              t.sign_up.signup.register
            )}
          </button>
        </form>

        <div className='welcome-section'>
          <div className='welcome-section-first'>
            <h2
              className='welcome-section-first_h2'
              style={{
                color: updatedTheme === "dark" ? "white" : "rgba(0, 0, 0, 0.8)",
              }}
            >
              {t.sign_up.signup.join_us}
            </h2>
          </div>
          <div className='welcome-section-second'>
            {/* <h5 className='welcome-section-second_h5'>
              {t("signup.continue_with")}
            </h5>
            <div className='signup-img google' onClick={handleSubmitForGoogle}>
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
            <p
              className='welcome-section-second_p'
              style={{
                color: updatedTheme === "dark" ? "white" : "rgba(0, 0, 0, 0.8)",
              }}
            >
              {t.sign_up.signup.already_have_account} &nbsp;
              <span
                style={{
                  color:
                    updatedTheme === "dark"
                      ? "rgba(73, 166, 106, 1)"
                      : "rgba(73, 166, 106, 1)",
                  fontWeight: "500",
                }}
              >
                <a href='/signin'>{t.sign_up.signup.sign_in}</a>
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* last section */}
      <div className='signup-container_inner23'>
        <div className='welcome-section-mobile'>
          <div className='welcome-section-second-mobile'>
            <h5
              className='welcome-section-second_h5-mobile'
              style={{color: updatedTheme === "dark" ? "white" : "black"}}
            >
              {t.sign_up.signup.continue_with}
            </h5>
            {/* <div className='signup-img google' onClick={handleSubmitForGoogle}>
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
            <p
              className='welcome-section-second_p-mobile'
              style={{color: updatedTheme === "dark" ? "white" : "black"}}
            >
              {t.sign_up.signup.already_have_account} &nbsp;
              <span
                style={{
                  color:
                    updatedTheme === "dark"
                      ? "rgba(73, 166, 106, 1)"
                      : "rgba(73, 166, 106, 1)",
                  fontWeight: "500",
                }}
              >
                <a href='/signin'>&nbsp; 
                    {t.sign_up.signup.update3}
           
                
                </a>
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
            color: updatedTheme === "dark" ? "white" : "black",
          }}
        >
          {t.sign_up.signup.contact_us}
        </div>
        <div className='signup-social-media-icons'>
          <div className='signup-img facebook'>
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
          <div className='signup-img whatsapp'>
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
          <div className='signup-img tiktok'>
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

export default SignUp;
