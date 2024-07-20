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
import { useTranslations } from "next-intl";
import CountryPicker from "../(CountryPicker)/CountryPicker";
const SignUp = () => {
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
  const t = useTranslations("sign-up");
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
        router.push("/dashboard");
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
      return { isValid: true };
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
        console.error(t("errors.invalid_phone_number"), user.number);
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

  return (
    <div className='signup-container'>
      <div className='signup-header'>
        <h2>{t("signup.join_us")}</h2>
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
              placeholder={t("signup.enter_fullname")}
              style={{borderColor: fullNameError ? "red" : ""}}
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
                placeholder={t("signup.bet_id")}
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
                  placeholder={t("signup.whatsapp_number")}
                  style={{
                    borderColor: phoneNumberError ? "red" : "",
                    paddingLeft: "65px",
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
                  {t("errors.invalid_phone_number")}
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
              placeholder={t("signup.enter_email")}
              style={{borderColor: emailError ? "red" : ""}}
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
                {t("errors.invalid_email")}
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
                placeholder={t("signup.enter_password")}
                style={{borderColor: passwordError ? "red" : ""}}
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
                  {t("errors.password_length")}
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
                placeholder={t("signup.confirm_password")}
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
              {t("signup.accept_conditions")}
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
              {t("errors.accept_conditions")}
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
              t("signup.register")
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
            placeholder={t("signup.enter_fullname")}
            style={{borderColor: fullNameError ? "red" : ""}}
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
            placeholder={t("signup.bet_id")}
            style={{borderColor: betIdError ? "red" : ""}}
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
              Fill in your ID
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
              placeholder={t("signup.whatsapp_number")}
              style={{
                borderColor: phoneNumberError ? "red" : "",
                paddingLeft: "65px",
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
            placeholder={t("signup.enter_email")}
            style={{borderColor: emailError ? "red" : ""}}
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
            placeholder={t("signup.enter_password")}
            style={{borderColor: passwordError ? "red" : ""}}
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
            placeholder={t("signup.confirm_password")}
            style={{borderColor: confirmPasswordError ? "red" : ""}}
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
              {t("signup.accept_conditions")}
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
              t("signup.register")
            )}
          </button>
        </form>

        <div className='welcome-section'>
          <div className='welcome-section-first'>
            <h2 className='welcome-section-first_h2'>{t("signup.join_us")}</h2>
          </div>
          <div className='welcome-section-second'>
            <h5 className='welcome-section-second_h5'>
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
            </div>
            <p className='welcome-section-second_p'>
              {t("signup.already_have_account")}
              <span style={{color: "#FCBB45", fontWeight: "500"}}>
                <a href='/signin'>{t("signup.sign_in")}</a>
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
            </div>
            <p className='welcome-section-second_p-mobile'>
              {t("signup.already_have_account")}
              <span style={{color: "#FCBB45", fontWeight: "500"}}>
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
          {t("signup.contact_us")}
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
