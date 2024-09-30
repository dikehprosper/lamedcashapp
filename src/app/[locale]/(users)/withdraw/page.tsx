/* eslint-disable */
// @ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./withdraw.css";
import Head from "@/components/(userscomponent)/(head)/head";
import { FaCircle } from "react-icons/fa";
import FooterMobile from "@/components/(Utils)/FooterMobile";
import data from "../../../../components/file";
import Modal2 from "@/components/(Utils)/(modals)/processingModals2";
import Modal3 from "@/components/(Utils)/(modals)/processingModals3";
import axios from "axios";
import {useRouter} from "next/navigation";
import Modal from "@/components/(Utils)/(modals)/receiptModalForUsers";
import {useTranslations} from "next-intl";
import {useParams, usePathname} from "next/navigation";
import langDataEn from "@/messages/en.json";
import langDataFr from "@/messages/fr.json";
import Cookies from "js-cookie";
  import { useAppDispatch, useAppSelector } from "@/lib/hooks";
type ShowReceiptFunction = (
  time: string,
  amount: number,
  transactionId: string,
  identifierId: string,
  betId: string,
  status: string,
  type: string,
  username: string,
  userNumber: number
) => void;

const Withdraw = () => {
    const data = useAppSelector((state: any) => state.user.value);
    const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [savedID, setSavedID] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [success, setSuccess] = useState(false);
  const [activeBetId, setActiveBetId] = useState("");
  // const [cashdeskAddress, setCashdeskAddress] = useState<any>({});
  const [isOnline, setIsOnline] = useState(true);


  const [user, setUser] = useState({
    _id: "",
    betId: savedID[0],
    withdrawalCode: "",
    amount: "",
    momoName: "",
    momoNumber: "",
    confirmMomoNumber: "",
    fullname: "",
  });

  const [receipt, setReceipt] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  // useEffect(() => {
  //   // Check initial network status
  //   setIsOnline(window.navigator.onLine);

  //   // Add event listeners for online/offline changes
  //   const handleOnline = () => setIsOnline(true);
  //   const handleOffline = () => setIsOnline(false);

  //   window.addEventListener("online", handleOnline);
  //   window.addEventListener("offline", handleOffline);

  //   // Clean up event listeners on component unmount
  //   return () => {
  //     window.removeEventListener("online", handleOnline);
  //     window.removeEventListener("offline", handleOffline);
  //   };
  // });

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/getUser");
      dispatch(setUser(res.data.data));
    } catch (error: any) {
      if (error.response) {
        // Handle token expiration
        if (error.response.status === 401) {
          toast.error(
            "Vous vous êtes connecté ailleurs. Vous devez vous reconnecter ici."
          );
          router.push(`/${updatedLang}/signin`); // Replace '/login' with your actual login route
        } else if (error.response.status === 402) {
          toast.error(
            "Votre session a expiré. Redirection vers la connexion..."
          );
          router.push(`/${updatedLang}/signin`); // Replace '/login' with your actual login route
        } else if (error.response.status === 404) {
          toast.error("Votre compte a été désactivé");
          router.push(`/${updatedLang}/signin`);
        } else {
          // Handle other errors
          toast.error(
            "Une erreur s'est produite. Veuillez réessayer plus tard."
          );
        }
      }
    }
  };

  function generateTimestamp() {
    return Date.now();
  }

  // Example usage:
  const newTimestamp = generateTimestamp();

  // useEffect(() => {
  //   if (isOnline) {
  //     getUserDetails();
  //     // getAvailableCashdeskAddress();
  //   } else {
  //     toast.error(
  //       "No network connection. Please check your connection and try again."
  //     );
  //   }
  // }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleChangeId = (event: any) => {
    setActiveBetId(event.target.value);
    const newValue = event.target.value;
    setUser((prevUser) => ({...prevUser, betId: newValue}));
  };

  const changeBetId = (id: any) => {
    setActiveBetId(id);
    const newValue = id;
    setUser((prevUser) => ({...prevUser, betId: newValue}));
  };

  const handleWithdrawalCode = (event: any) => {
    setUser({
      ...user,
      withdrawalCode: event.target.value,
    });
  };

  const handleMomoNumber = (event: any) => {
    setUser({
      ...user,
      momoNumber: event.target.value,
    });
  };
  const handleConfirmMomoNumber = (event: any) => {
    setUser({
      ...user,
      confirmMomoNumber: event.target.value,
    });
  };

  //check email and password state to determine ButtonDisabled state
  useEffect(() => {
    if (user.betId && user.withdrawalCode && user.momoNumber) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [processing2, setProcessing2] = useState(false);
  const [processing3, setProcessing3] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    if (user.betId === "") {
      return toast.error("Entrez le betId à utiliser");
    } else if (user.withdrawalCode === "") {
      return toast.error("Entrez votre code de retrait");
    } else if (user.momoNumber !== user.confirmMomoNumber) {
      return toast.error("les chiffres ne correspondent pas");
    } else {
      try {
        setLoading(true);
        setIsSubmitting(true);

        // Update user with the new values
        const updatedUser = {
          ...user,
          betId: activeBetId,
          withdrawalCode: user.withdrawalCode,
          momoName: user.momoName,
          momoNumber: user.momoNumber,
          email: data.email,
        };
        setProcessing(true);

        // Send the updated user to the server
        const res = await axios.post("/api/users/withdraw", updatedUser);
        setProcessing3(true);
        const result = res.data.userTransaction
      
     setProcessing3(false);
          showReceipt(result.time,
    result.amount,
    result.identifierId,
    result.betId,
    result.status,
    result.type,
    result.momoName,
   result.momoNumber,
    result.withdrawalCode)
          
       

        setLoading(false);
        toast.success("withdraw request Submitted");
      } catch (error: any) {
        if (error.response.status === 401) {
          toast.error("Utilisateur non trouvé");
          setLoading(false);
        } else if (error.response.status === 402) {
          toast.error("L'utilisateur est désactivé");
          setLoading(false);
          router.push(`${updatedLang}/signin`);
        } else if (error.response.status === 403) {
          setLoading(false);
          router.push(`/${updatedLang}/signin`);

          toast.error("Votre session a expiré");
        } else if (error.response.status === 504) {
          setLoading(false);

          toast.error("Actuellement en maintenance");
        } else if (error.response.status === 508) {
          setLoading(false);
          toast.error(
            "vous venez d'effectuer une transaction du même montant avec le même identifiant, réessayez dans cinq minutes"
          );
        } else if (error.response.status === 509) {
          setLoading(false);
          toast.error("Le jeton a expiré. Veuillez vous reconnecter.");
        } else if (error.response.status === 500) {
          setLoading(false);
          toast.error("La transaction n'a pas été entièrement finalisée");
        } else {
          setLoading(false);
          console.log(error.response.status);
          toast.error("Erreur inconnue");
        }
        console.log(error);
        return toast.error("error");
      } finally {
        setLoading(false);
        setLoading(false);
        setIsSubmitting(false);
        setProcessing(false);
        setButtonDisabled(true);
      }
    }
  }


  function showReceipt(
    time: any,
    amount: any,
    identifierId: any,
    betId: any,
    status: any,
    type: any,
    momoName: any,
    momoNumber: any,
    withdrawalCode: any
  ) {
    setIsVisible(true);
    setReceipt({
      time,
      amount,
      identifierId,
      betId,
      status,
      type,
      momoName,
      momoNumber,
      withdrawalCode,
    });
  }

  const handleClick = () => {
    router.push(`/${updatedLang}/dashboard`);
    setIsVisible(false);
  };

  function closeModal() {
    setProcessing(false);
  }

  const updatedTheme = useAppSelector(
    (state: any) => (state.theme as any)?.theme
  );
  //Language settings
 const getCurrentLangFromPath = (): string => {
  // Check if window is defined (to handle server-side rendering)
  if (typeof window !== "undefined") {
    const currentPath = window.location.pathname; // Use window.location.pathname instead of router.asPath
    const currentLang = currentPath.split("/")[1]; // Extract the first part of the path
    // Return the current language or default to 'fr' if not 'en' or 'fr'
    return (currentLang === "fr" || currentLang === "en") ? currentLang : "fr"; 
  }
  // Default return value for server-side rendering
  return "fr"; // or any default language you want to use
};
  useEffect(() => {
    const currentLang = getCurrentLangFromPath();

    // Check if the cookie is already set to the current language in the path
    const cookieLang = Cookies.get("locale");

    if (cookieLang !== currentLang) {
      // If the cookie is not set to the current language, update the cookie
      Cookies.set("locale", currentLang, {expires: 365}); // Set cookie to last 1 year
    }
  }, [window.location.pathname]); // Update dependency to window.location.pathname

  const updatedLang = getCurrentLangFromPath();

  const getLangData = () => {
    return updatedLang === "en" ? langDataEn : langDataFr;
  };

  const t = getLangData();


    useEffect(() => {
    // Dynamically add a style tag to the document head for placeholder styling
    const placeholderColor = updatedTheme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";
    const color = updatedTheme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)";
    const style = document.createElement('style');
    style.innerHTML = `
      .withdraw-form::placeholder {
        color: ${placeholderColor};
      }
    `;
    document.head.appendChild(style);

    // Clean up the style tag on component unmount
    return () => {
      document.head.removeChild(style);
    };
  }, [updatedTheme]);



  return updatedTheme === "dark" ||
    (updatedTheme === "light" && updatedLang === "en") ||
    updatedLang === "fr" ? (
    <div
      className='user_withdraw_container'
      style={{
        background: updatedTheme === "dark" ? "rgb(10, 20, 38)" : "white",
      }}
    >
      {isVisible && (
        <Modal
          containerStyles='receiptModal'
          containerStylesInner='receiptModal_inner'
          handleClick={handleClick}
          receipt={receipt}
          title='Montant du retirer'
          updatedTheme={updatedTheme}
          t={t.dashboard}
        />
      )}
      <Head
        title={t.dashboard.withdraw_page.title}
        about={t.dashboard.withdraw_page.about}
        data={data}
        display={false}
        updatedTheme={updatedTheme}
        t={t.dashboard.copy}
      />

      <div
        className='user_withdraw_container_001'
        style={{
          background: updatedTheme === "dark" ? "" : "white",
          color:
            updatedTheme === "dark"
              ? "white"
              : updatedTheme === "light"
              ? "black"
              : "transparent",
          boxShadow:
            updatedTheme === "dark"
              ? ""
              : updatedTheme === "light"
              ? " 0px 4px 10px rgba(0, 0, 0, .3)"
              : "transparent",
        }}
      >
        {processing && (
          <div className='receiptModal'>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              onClick={closeModal}
            ></div>
            <div
              className='receiptModal_inner-processing'
              id='receiptModal'
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "29%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  paddingRight: "20px",
                  paddingLeft: "20px",
                  paddingTop: "10px",
                  paddingBottom: "50px",
                  height: "50%",
                }}
              >
                <h6
                  style={{
                    color:
                      updatedTheme === "dark"
                        ? "white"
                        : updatedTheme === "light"
                        ? "black"
                        : "transparent",
                    marginBottom: "13px",
                    width: "100%",
                    alignSelf: "center",
                    textAlign: "center",
                  }}
                >
                  {t.dashboard.withdraw_page.update} {user.amount}
                </h6>
                <div id='container-deposit2'>
                  <div id='html-spinner-deposit2'></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {processing3 && (
          <Modal3
            containerStyles='receiptModal'
            containerStylesInner='receiptModal_inner-processing'
            title={t.dashboard.amount_deposit}
            updatedTheme={updatedTheme}
              t={t}
          />
        )}
        <form onSubmit={handleSubmit} className='withdraw-form-container'>
          <div
            style={{
              width: "100%",
              borderWidth: "2px",
              border: "1px solid rgba(120, 120, 120, 1)",
              background: "rgba(120, 120, 120, .4)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              paddingLeft: "10px",
              paddingRight: "10px",
              paddingTop: "5px",
              paddingBottom: "5px",
              gap: "9px",
            }}
          >
            <div
              className='detail'
              style={{
                color:
                  updatedTheme === "dark"
                    ? "white"
                    : updatedTheme === "light"
                    ? "black"
                    : "transparent",
              }}
            >
              {t.dashboard.withdraw_page.use_address}
            </div>
            <div
              className='detail_2'
              style={{
                color:
                  updatedTheme === "dark"
                    ? "white"
                    : updatedTheme === "light"
                    ? "black"
                    : "transparent",
              }}
            >
              {t.dashboard.withdraw_page.use_address_info}
            </div>
            <div className='user_withdraw_container_002 animate-pop-in'>
              {/* {!cashdeskAddress || Object.keys(cashdeskAddress).length === 0 ? (
              <div id='container-withdraw'>
                <div id='html-spinner-withdraw'></div>
              </div>
            ) : (
              <div>City: {cashdeskAddress?.city}</div>
            )}

            {!cashdeskAddress || Object.keys(cashdeskAddress).length === 0 ? (
              <div id='container-withdraw'>
                <div id='html-spinner-withdraw'></div>
              </div>
            ) : (
              <div>Street: {cashdeskAddress?.street}</div>
            )} */}
              <div
                style={{
                  color:
                    updatedTheme === "dark"
                      ? "white"
                      : updatedTheme === "light"
                      ? "black"
                      : "transparent",
                }}
              >
                {t.dashboard.withdraw_page.use_address_city}: &nbsp; Porto-Novo
              </div>
              <div
                style={{
                  color:
                    updatedTheme === "dark"
                      ? "white"
                      : updatedTheme === "light"
                      ? "black"
                      : "transparent",
                }}
              >
                {t.dashboard.withdraw_page.use_address_street}: &nbsp; Betfundr
              </div>
            </div>
          </div>

          <label
            style={{
              color:
                updatedTheme === "dark"
                  ? "white"
                  : updatedTheme === "light"
                  ? "black"
                  : "transparent",
              paddingTop: "7px",
              opacity: "0.7",
              marginBottom: "3px",
            }}
          >
            {" "}
            ID
          </label>

          <input
            type='text'
            className='withdraw-form'
            value={user.betId}
            onChange={handleChangeId}
            placeholder={t.dashboard.withdraw_page.enter_bet_id}
            style={{
              border:
                updatedTheme === "dark"
                  ? ""
                  : updatedTheme === "light"
                  ? "2px solid grey"
                  : "transparent",
              color:
                updatedTheme === "dark"
                  ? "white"
                  : updatedTheme === "light"
                  ? "black"
                  : "transparent",
            }}
          />
          <label
            style={{
              color:
                updatedTheme === "dark"
                  ? "white"
                  : updatedTheme === "light"
                  ? "black"
                  : "transparent",
              paddingTop: "7px",
              opacity: "0.7",
              marginBottom: "3px",
            }}
          >
            {t.dashboard.withdraw_page.withdrawal_code}
          </label>
          <input
            type='text'
            className='withdraw-form'
            value={user.withdrawalCode}
            onChange={handleWithdrawalCode}
            placeholder={t.dashboard.withdraw_page.empty_withdrawal_code}
            style={{
              border:
                updatedTheme === "dark"
                  ? ""
                  : updatedTheme === "light"
                  ? "2px solid grey"
                  : "transparent",
              color:
                updatedTheme === "dark"
                  ? "white"
                  : updatedTheme === "light"
                  ? "black"
                  : "transparent",
            }}
          />

          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: "15px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{display: "flex", flexDirection: "column", width: "100%"}}
            >
              <label
                style={{
                  color:
                    updatedTheme === "dark"
                      ? "white"
                      : updatedTheme === "light"
                      ? "black"
                      : "transparent",
                  paddingTop: "7px",
                  opacity: "0.7",
                  marginBottom: "3px",
                }}
              >
                {t.dashboard.deposit_page.momo_number}
              </label>
              <input
                type='number'
                className='withdraw-form'
                value={user.momoNumber}
                onChange={handleMomoNumber}
                placeholder={t.dashboard.withdraw_page.enter_momo_number}
                style={{
                  border:
                    updatedTheme === "dark"
                      ? ""
                      : updatedTheme === "light"
                      ? "2px solid grey"
                      : "transparent",
                  color:
                    updatedTheme === "dark"
                      ? "white"
                      : updatedTheme === "light"
                      ? "black"
                      : "transparent",
                }}
              />
            </div>
            <div
              style={{display: "flex", flexDirection: "column", width: "100%"}}
            >
              <label
                style={{
                  color:
                    updatedTheme === "dark"
                      ? "white"
                      : updatedTheme === "light"
                      ? "black"
                      : "transparent",
                  paddingTop: "7px",
                  opacity: "0.7",
                  marginBottom: "3px",
                }}
              >
                {t.dashboard.deposit_page.confirm_momo_number}
              </label>
              <input
                type='number'
                className='withdraw-form'
                value={user.confirmMomoNumber}
                onChange={handleConfirmMomoNumber}
                placeholder={
                  t.dashboard.withdraw_page.enter_confirm_momo_number
                }
                style={{
                  border:
                    updatedTheme === "dark"
                      ? ""
                      : updatedTheme === "light"
                      ? "2px solid grey"
                      : "transparent",
                  color:
                    updatedTheme === "dark"
                      ? "white"
                      : updatedTheme === "light"
                      ? "black"
                      : "transparent",
                }}
              />
            </div>
          </div>

          <button
            type='submit'
            className='submit-button-withdraw'
            style={{
              background: buttonDisabled
                ? "rgba(128, 128, 128, 0.2)"
                : "rgba(128, 128, 128, 1)",
              pointerEvents: buttonDisabled ? "none" : "auto",
              marginTop: "35px",
              marginBottom: "30px",

              color:
                updatedTheme === "dark"
                  ? "white"
                  : updatedTheme === "light"
                  ? "black"
                  : "transparent",
            }}
            onClick={handleSubmit}
          >
            {loading ? (
              <div id='container-withdraw'>
                <div id='html-spinner-withdraw'></div>
              </div>
            ) : (
              t.dashboard.withdraw_page.submit_button
            )}
          </button>
        </form>
      </div>
      <FooterMobile />
    </div>
  ) : null;
};

export default Withdraw;

export const dynamic = "force-dynamic";
