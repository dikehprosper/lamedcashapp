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

const SignUp = () => {
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

  const toggleIsChecked = () => {
    setIsChecked(!IsChecked);
    setIsCheckedError(false);
  };

  //Submit details
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
   const signupVerificationResult = SignupVerification();

      if (signupVerificationResult?.isValid) {
        localStorage.setItem("rememberedEmailForEspece", user.email);
        localStorage.setItem("rememberedPasswordForEspece", user.password);
        const response = await axios.post("/api/users/signup", user);
        toast.success("successful");
        router.push("/dashboard")
        setLoading(false);
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        return toast.error("User already exist");
      } else if (error.response.status === 500) {
        return toast.error("Signup failed");
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
    return {isValid : true}
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
        console.error("Number must be 8 digits:", user.number);
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

  //check email and password state to determine ButtonDisabled state

  return (
    <div className='signup-container'>
      <div className='signup-header'>
        <h2>Rejoignez-nous</h2>
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
              placeholder='Entrez votre nom complet'
              style={{ borderColor: fullNameError ? "red" : "" }}
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
                {" "}
                please enter your name
              </p>
            )}
          </div>
          <div style={{ display: "flex", gap: "20px", width: "100%" }}>
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
                placeholder='1Numéro d’identification XBET'
                style={{
                  borderColor: betIdError ? "red" : "",
                  transition: betIdError ? "1s border-color ease-in-out" : "",
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
                  {" "}
                  Fill in your BET ID
                </p>
              )}
            </div>
            <div
          
              style={{
                display: "flex",
                width: "100%",
                gap: "10px",
                flexDirection: "column",
                position: 'relative',
               
              }}
            >
              <div    className='signup-form1111' style={{position: "relative"}}>
              <div style={{position: "absolute", top: "0", left: "0", width: "60px", bottom: "0", display: 'flex', justifyContent: "center", alignItems: 'center', color: "rgba(128, 128, 128, 1)", background: "rgba(0, 0, 0, 0.1)",  borderRight: "2px solid rgba(256, 256, 256, 0.09)" }}>+229</div>
              <input
                type='number'
                className='signup-form111'
                value={user.number}
                onChange={(e) => {
                  handleNumber(e);
                  SignupReVerification();
                }}
                placeholder='Numéro Whatsapp/mobile'
                style={{
                  borderColor: phoneNumberError ? "red" : "",
                  paddingLeft: "65px"
                }}
              /></div>
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
                  Number must be 8 digits
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
              placeholder='Entrez votre adresse email'
              style={{ borderColor: emailError ? "red" : "" }}
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
                Please input a valid mail
              </p>
            )}
          </div>

          <div style={{ display: "flex", gap: "20px", width: "100%" }}>
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
                placeholder='Entrer le mot de passe'
                style={{ borderColor: passwordError ? "red" : "" }}
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
                  Password must be more than four(4) characters
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
                placeholder='Confirmez le mot de passe'
                style={{
                  borderColor: confirmPasswordError ? "red" : "",
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
                  {" "}
                  The password field confirmation does not match
                </p>
              )}
            </div>
          </div>
          <div className='signup-condition'>
            <span
              className='signup-condition-checkbox'
              onClick={toggleIsChecked}
              style={{
                background: IsChecked ? "rgba(189, 255, 5, 1)" : "transparent",
                borderColor: isCheckedError ? "red" : "",
              }}
            >
              {IsChecked ? (
                <ImCheckmark className='BiCheck' color='black' />
              ) : null}
            </span>
            <p className='signup-condition-checkbox-p'>
              J&apos;accepte les conditions{" "}
              <span style={{ color: "#FCBB45", fontWeight: "500" }}>
                ( DÉCONSEILLÉ AUX MOINS DE 18 ANS )
              </span>
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
              click the check button to continue
            </p>
          )}
          <button
            type='submit'
            className='submit-button-signup'
            style={{
              background: "rgba(189, 255, 5, 1) !important",
              color: "black !important",
            }}
            onClick={handleSubmit}
          >
            {loading ? (
              <div id='container-signup-signup'>
                <div id='html-spinner-signup-special'></div>
              </div>
            ) : (
              "S'inscrire"
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
            placeholder='Entrez votre nom complet'
            style={{ borderColor: fullNameError ? "red" : "" }}
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
              {" "}
              please enter your name
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
            placeholder='1Numéro d’identification XBET'
            style={{ borderColor: betIdError ? "red" : "" }}
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
              {" "}
              Fill in your BET ID
            </p>
          )}
           <div    className='signup-form1111' style={{position: "relative"}}>
              <div style={{position: "absolute", top: "0", left: "0", width: "60px", bottom: "0", display: 'flex', justifyContent: "center", alignItems: 'center', color: "rgba(128, 128, 128, 1)", background: "rgba(0, 0, 0, 0.1)",  borderRight: "2px solid rgba(256, 256, 256, 0.09)" }}>+229</div>
          <input
            type='number'
            className='signup-form111'
            value={user.number}
            onChange={(e) => {
              handleNumber(e);
              SignupReVerification();
            }}
            placeholder='Numéro Whatsapp/mobile'
            style={{ borderColor: phoneNumberError ? "red" : "", paddingLeft: "65px" }}
          /></div>
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
            placeholder='Entrez votre adresse email'
            style={{ borderColor: emailError ? "red" : "" }}
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
              {" "}
              Please input a valid mail
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
            placeholder='Entrer le mot de passe'
            style={{ borderColor: passwordError ? "red" : "" }}
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
              Password must be more than four(4) characters
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
            placeholder='Confirmez le mot de passe'
            style={{ borderColor: confirmPasswordError ? "red" : "" }}
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
              The password field confirmation does not match
            </p>
          )}
          <div className='signup-condition'>
            <span
              className='signup-condition-checkbox'
              onClick={toggleIsChecked}
              style={{
                background: IsChecked ? "rgba(189, 255, 5, 1)" : "transparent",
                borderColor: isCheckedError ? "red" : "",
              }}
            >
              {IsChecked ? (
                <ImCheckmark className='BiCheck' color='black' />
              ) : null}
            </span>
            <p className='signup-condition-checkbox-p'>
              J&apos;accepte les conditions{" "}
              <span style={{ color: "#FCBB45", fontWeight: "500" }}>
                ( DÉCONSEILLÉ AUX MOINS DE 18 ANS )
              </span>
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
              click the check button to continue
            </p>
          )}
          <button
            type='submit'
            className='submit-button-signup'
            style={{
              background: "rgba(189, 255, 5, 1) !important",
              color: "black !important",
            }}
          >
            {loading ? (
              <div id='container-signup-signup'>
                <div id='html-spinner-signup-special'></div>
              </div>
            ) : (
              "S'inscrire"
            )}
          </button>
        </form>

        <div className='welcome-section'>
          <div className='welcome-section-first'>
            <h2 className='welcome-section-first_h2'>Rejoignez-nous</h2>
          </div>
          <div className='welcome-section-second'>
            <h5 className='welcome-section-second_h5'>Ou continuez avec</h5>
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
            </div>
            <p className='welcome-section-second_p'>
              Vous avez déjà un compte?{" "}
              <span style={{ color: "#FCBB45", fontWeight: "500" }}>
                <a href='/signin'>S&apos;identifier!</a>
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* last section */}
      <div className='signup-container_inner23'>
        <div className='welcome-section-mobile'>
          <div className='welcome-section-second-mobile'>
            <h5 className='welcome-section-second_h5-mobile'>
              Ou continuez avec
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
            </div>
            <p className='welcome-section-second_p-mobile'>
              Vous avez déjà un compte?{" "}
              <span style={{ color: "#FCBB45", fontWeight: "500" }}>
                <a href='/signin'>S&apos;identifier!</a>
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
