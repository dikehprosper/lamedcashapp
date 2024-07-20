/* eslint-disable */
// @ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./withdraw.css";
import Head from "@/components/(userscomponent)/(head)/head";
import { FaCircle } from "react-icons/fa";
import FooterMobile from "@/components/(Utils)/FooterMobile";
import data from "../../../components/file";
import Modal2 from "@/components/(Utils)/(modals)/processingModals2";
import Modal3 from "@/components/(Utils)/(modals)/processingModals3";
import axios from "axios";
import { useRouter } from "next/navigation";
import Modal from "@/components/(Utils)/(modals)/receiptModalWithdrawal";
import { useTranslations } from "next-intl";
import {useParams, usePathname} from "next/navigation";
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
  const t = useTranslations("dashboard");
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

  useEffect(() => {
    // Check initial network status
    setIsOnline(window.navigator.onLine);

    // Add event listeners for online/offline changes
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  });

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
          router.push("/signin"); // Replace '/login' with your actual login route
        } else if (error.response.status === 402) {
          toast.error(
            "Votre session a expiré. Redirection vers la connexion..."
          );
          router.push("/signin"); // Replace '/login' with your actual login route
        } else if (error.response.status === 404) {
          toast.error("Votre compte a été désactivé");
          router.push("/signin");
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

  useEffect(() => {
    if (isOnline) {
      getUserDetails();
      // getAvailableCashdeskAddress();
    } else {
      toast.error(
        "No network connection. Please check your connection and try again."
      );
    }
  }, []); // Empty dependency array means this effect runs once when the component mounts

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
    }  else if (user.momoNumber !== user.confirmMomoNumber) {
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
          email: data.email
        };
         setProcessing(true);
     
        // Send the updated user to the server
        const res = await axios.post("/api/users/withdraw", updatedUser);
      setProcessing3(true);
         setTimeout(() => {
       router.push("/dashboard");
        setProcessing3(false);
      }, 900)
    
       setLoading(false);
        toast.success("withdraw request Submitted");
      } catch (error: any) {
         if (error.response.status === 401) {
          toast.error("Utilisateur non trouvé");
 setLoading(false);

        } else if (error.response.status === 402) {
          toast.error("L'utilisateur est désactivé");
           setLoading(false);
          router.push("/signin");
         
        } else if (error.response.status === 403) {
           setLoading(false);
          router.push("/signin");
       
          toast.error("Votre session a expiré");
        } else if (error.response.status === 504) {
           setLoading(false);
         
          toast.error("Actuellement en maintenance");
        } else if (error.response.status === 508) {
           setLoading(false);
          toast.error("vous venez d'effectuer une transaction du même montant avec le même identifiant, réessayez dans cinq minutes");
        } else if (error.response.status === 509) {
           setLoading(false);
          toast.error("Le jeton a expiré. Veuillez vous reconnecter.");
        }  else if (error.response.status === 500) {
           setLoading(false);
          toast.error("La transaction n'a pas été entièrement finalisée");
        } else {
           setLoading(false);
          console.log(error.response.status)
          toast.error("Erreur inconnue");
        }
        console.log(error);
        return toast.error("error");
      } finally {
         setLoading(false);
        setLoading(false);
        setIsSubmitting(false);
        setProcessing(false)
        setButtonDisabled(true)
      }
    }
  }

  const handleClick = () => {
    router.push("/dashboard");
    setIsVisible(false);
  };


  function closeModal() {
    setProcessing(false);
  }

  return (
    <div className='user_withdraw_container'>
      {isVisible && (
        <Modal
          containerStyles='receiptModal'
          containerStylesInner='receiptModal_inner'
          handleClick={handleClick}
          receipt={receipt}
          title='Montant du retirer'
        />
      )}
      <Head
        title={t("withdraw_page.title")}
        about={t("withdraw_page.about")}
        data={data}
      />

      <div className='user_withdraw_container_001'>
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
                  color: "white",
                  marginBottom: "13px",
                  width: "100%",
                  alignSelf: "center",
                  textAlign: "center",
                }}
              >
                Vous êtes sur le point d'effectuer un retrait de {user.amount}
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
          title={t("amount_deposit")}
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
            <div className='detail'>{t("withdraw_page.use_address")}</div>
            <div className='detail_2'>
              {t("withdraw_page.use_address_info")}
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
              <div>{t("withdraw_page.use_address_city")}: &nbsp; Porto-Novo</div>
              <div>
                {t("withdraw_page.use_address_street")}: &nbsp; Betfundr
              </div>
            </div>
          </div>


          <label> ID</label>

          <input
            type='text'
            className='withdraw-form'
            value={user.betId}
            onChange={handleChangeId}
            placeholder={t("withdraw_page.enter_bet_id")}
          />
          <label>{t("withdraw_page.withdrawal_code")}</label>
          <input
            type='text'
            className='withdraw-form'
            value={user.withdrawalCode}
            onChange={handleWithdrawalCode}
            placeholder={t("withdraw_page.empty_withdrawal_code")}
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
            <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
              {" "}
              <label style={{marginBottom: "10px"}}>
                {t("deposit_page.momo_number")}
              </label>
              <input
                type='number'
                className='withdraw-form'
                value={user.momoNumber}
                onChange={handleMomoNumber}
                placeholder={t("withdraw_page.enter_momo_number")}
              />
            </div>
            <div style={{display: "flex", flexDirection: "column", width: '100%'}}>
              <label style={{marginBottom: "10px"}}>
                {t("deposit_page.confirm_momo_number")}
              </label>
              <input
                type='number'
                className='withdraw-form'
                value={user.confirmMomoNumber}
                onChange={handleConfirmMomoNumber}
                placeholder={t("withdraw_page.enter_confirm_momo_number")}
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
            }}
            onClick={handleSubmit}
          >
            {loading ? (
              <div id='container-withdraw'>
                <div id='html-spinner-withdraw'></div>
              </div>
            ) : (
              t("withdraw_page.submit_button")
            )}
          </button>
        </form>
      </div>
      <FooterMobile />
    </div>
  );
};

export default Withdraw;

export const dynamic = "force-dynamic";
