/* eslint-disable */
// @ts-nocheck
"use client";
import React, {useState, useEffect, useRef} from "react";
import {toast} from "react-toastify";
import "./deposit.css";
import Head from "@/components/(userscomponent)/(head)/head";
import {FaCircle} from "react-icons/fa";
import FooterMobile from "@/components/(Utils)/FooterMobile";
import axios from "axios";
import {IoIosCopy} from "react-icons/io";
import {useRouter} from "next/navigation";
import {FedaPay} from "fedapay";
import Modal from "@/components/(Utils)/(modals)/receiptModalForUsers";
import Modal2 from "@/components/(Utils)/(modals)/processingModals2";
import Modal3 from "@/components/(Utils)/(modals)/processingModals3";
import Modal4 from "@/components/(Utils)/(modals)/processingModal4";
import {useTranslations} from "next-intl";
import {useParams, usePathname} from "next/navigation";
  import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setUser } from "@/lib/features/userSlice";

const DOMAIN = process.env.DOMAIN;

const Deposit = () => {
  const t = useTranslations("dashboard");
  const data = useAppSelector((state: any) => state.user.value);
  const dispatch = useAppDispatch();
  const {locale} = useParams<{locale: string}>();
  const [loading, setLoading] = useState(false);
  const [savedID, setSavedID] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [success, setSuccess] = useState(false);
  const [activeBetId, setActiveBetId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [user, setUser] = useState({
    email: data?.email,
    amount: "",
    network: "",
    betId: savedID[0],
    momoNumber: data?.number,
    betId: data?.betId
  });

  const router = useRouter();
  const [phoneDial, setPhoneDial] = useState("");
  const [isOnline, setIsOnline] = useState(true);

  function generateTimestamp() {
    return Date.now();
  }

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
          await axios.get("/api/users/logout");
          router.replace("/signin"); // Replace '/login' with your actual login route
        } else if (error.response.status === 402) {
          toast.error(
            "Votre session a expiré. Redirection vers la connexion..."
          );
          await axios.get("/api/users/logout");
          router.replace("/signin"); // Replace '/login' with your actual login route
        } else if (error.response.status === 404) {
          toast.error("Votre compte a été désactivé");
          await axios.get("/api/users/logout");
          router.replace("/signin");
        } else {
          // Handle other errors
          toast.error(
            "Une erreur s'est produite. Veuillez réessayer plus tard."
          );
        }
      } else if (error.request) {
        // Handle network errors (no connection)
        setIsOnline(false);
      }
    }
  };

  // useEffect(() => {
  //   // Check network status before making the request
  //   if (isOnline) {
  //     getUserDetails();
  //   } else {
  //     toast.error(
  //       "No network connection. Please check your connection and try again."
  //     );
  //   }
  // }, [isOnline]);

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
  // }, []);

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

  const changeTransactionId = (event: any) => {
    const newValue = event.target.value;
    setUser((prevUser) => ({...prevUser, transactionId: newValue}));
  };

  const handleChangeNetwork = (event: any) => {
    setUser({
      ...user,
      network: event.target.value,
    });
  };

  const [processing, setProcessing] = useState(false);
  const [processing2, setProcessing2] = useState(false);
    const [processing3, setProcessing3] = useState(false);
const [processing4, setProcessing4] = useState(false);

  const [receipt, setReceipt] = useState({});
  const [isVisible, setIsVisible] = useState(false);


  async function submitDetails() {
    if (isSubmitting) {
      return;
    }

    const amountValue = parseInt(user.amount, 10);
    if (isNaN(amountValue)) {
      // Handle the case where user.amount is not a valid number
      return toast.error("Vous n'avez pas saisi de montant");
    }

    if (amountValue < 100) {
      return toast.error("Le montant saisi ne doit pas être inférieur à 100");
    } else if (user.betId === "") {
      return toast.error("Entrez le betId à utiliser");
    } else {
      setLoading(true);
      try {
        setIsSubmitting(true);
        const updatedUser = {
          _id: user._id,
          betId: user.betId,
          amount: user.amount,
          network: user.network,
          email: user.email,
          momoNumber: user.momoNumber,
          momoName: user.fullname,
          service: "1xbet",
        };
        console.log("done");
        setProcessing(true);
        // Make the API request
        const res = await axios.post(
          "https://dev.api.betfundr.com/api/usersWithoutToken/deposit2",
          updatedUser
        );
        setProcessing(false);
        console.log(res.data.success, "jhbvkabvjkbkjv");
        if (res.data.success === 211) {
          setProcessing3(true);
          setTimeout(() => {
            router.push("/dashboard");
            setProcessing3(false);
          }, 900);
        } else if (res.data.success === 209) {
          setProcessing4(true);
          setTimeout(() => {
            setProcessing4(false);
          }, 1000);
        } else {
          setProcessing2(true);
          setTimeout(() => {
            router.push("/dashboard");
            setProcessing2(false);
          }, 900);
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          toast.error("Utilisateur non trouvé");
          await axios.get("/api/users/logout");
          router.push("/signin");
        } else if (error.response.status === 402) {
          toast.error("L'utilisateur est désactivé");
          await axios.get("/api/users/logout");
          router.push("/signin");
        } else if (error.response.status === 403) {
          await axios.get("/api/users/logout");
          router.push("/signin");
          toast.error("Votre session a expiré");
        } else if (error.response.status === 504) {
          toast.error("Actuellement en maintenance");
        } else if (error.response.status === 508) {
          toast.error(
            "vous venez d'effectuer une transaction du même montant avec le même identifiant, réessayez dans cinq minutes"
          );
        } else if (error.response.status === 509) {
          toast.error("Le jeton a expiré. Veuillez vous reconnecter.");
        } else {
          toast.error("Erreur inconnue");
        }
      } finally {
        // Set processing state to false
        setProcessing(false);
        setLoading(false);
        setIsSubmitting(false);
      }
    }
  }

  const handleChangeAmount = (event: any) => {
    setUser({
      ...user,
      amount: event.target.value,
    });
  };

  const handleChangeMomoNumber = (event: any) => {
    setUser({
      ...user,
      momoNumber: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setProcessing(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    // toast.success("Soumis! Votre demande sera traitée sous peu");
  };

  function closeModal() {
    setProcessing(false);
  }

  useEffect(() => {
    setButtonDisabled(!(user.amount && user.network));
  }, [user]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopyClick = () => {
    if (inputRef.current) {
      // Select the text inside the input field
      inputRef.current.select();

      // Copy the selected text to the clipboard
      document.execCommand("copy");
    }
    toast.success("USSD CODE successfully copied!");
  };

  // // Example using fetch
  // const createTransaction = async () => {
  //   if (isSubmitting) {
  //     return;
  //   }

  //   const amountValue = parseInt(user.amount, 10);
  //   if (isNaN(amountValue)) {
  //     // Handle the case where user.amount is not a valid number
  //     return toast.error("Vous n'avez pas saisi de montant");
  //   }

  //   if (amountValue < 100) {
  //     return toast.error("Le montant saisi ne doit pas être inférieur à 100");
  //   } else if (user.betId === "") {
  //     return toast.error("Entrez le betId à utiliser");
  //   } else {
  //     try {
  //       const response = await axios.post("/api/users/deposit2", user); // Replace with your actual route
  //       const data = response.data.url1;

  //       window.location.href = data;
  //     } catch (error) {
  //       console.error("Error creating transaction:", error);
  //     } finally {
  //       setIsSubmitting(false);
  //     }
  //   }
  // };

  useEffect(() => {
    console.log(data, "hvbhvvds");
  }, [data]);

  function handleClick() {

  }

  return (
    <div className='user_withdraw_container'>
      <Head
        title={t("deposit_page.title")}
        about={t("deposit_page.about")}
        data={data}
      />
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
                Vous êtes sur le point d'effectuer un paiement de {user.amount}
              </h6>
               <div id='container-deposit2'>
                <div id='html-spinner-deposit2'></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {processing2 && (
        <Modal2
          containerStyles='receiptModal'
          containerStylesInner='receiptModal_inner-processing'
          title={t("amount_deposit")}
        />
      )}
      {processing3 && (
        <Modal3
          containerStyles='receiptModal'
          containerStylesInner='receiptModal_inner-processing'
          title={t("amount_deposit")}
        />
      )}

      {processing4 && (
        <Modal4
          containerStyles='receiptModal'
          containerStylesInner='receiptModal_inner-processing'
          title={t("amount_deposit")}
        />
      )}
    
      <div className='user_deposit_container_001'>
        <form onSubmit={submitDetails} className='deposit-form-container'>
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
            <div className='detail' style={{fontWeight: "bold"}}>{t("withdraw_page.use_address")}</div>
            <div className='detail_2' style={{textAlign: "center", fontWeight: 500}}>
              {t("withdraw_page.use_address_info")}
            </div>
            
          </div>
          <label>ID</label>

          <input
            type='text'
            className='deposit-form'
            value={user.betId}
            onChange={handleChangeId}
            placeholder={t("deposit_page.placeholder_1xbet_id")}
          />

          <label>{t("deposit_page.amount")}</label>
          <input
            type='number'
            className='deposit-form'
            value={user.amount}
            onChange={handleChangeAmount}
            placeholder={t("deposit_page.placeholder_amount")}
          />

          <label>{t("deposit_page.momo_number")}</label>
          <input
            type='number'
            className='deposit-form'
            value={user.momoNumber}
            onChange={handleChangeMomoNumber}
            placeholder='Entrez le numéro Momo'
          />

          <label htmlFor='network'>{t("deposit_page.network")}</label>
          <select
            id='network'
            className='deposit-form' // Apply the same class as the input for styling
            value={user.network}
            onChange={handleChangeNetwork}
          >
            <option value='' disabled hidden>
              -- Choose Network --
            </option>
            <option value='MTN'> Mtn Benin</option>
            <option value='MOOV'>Moov Benin</option>
          </select>

          <div
            className='submit-button-deposit'
            style={{
              background: buttonDisabled
                ? "rgba(128, 128, 128, 0.5)"
                : "rgba(128, 128, 128, 1)",
              pointerEvents: buttonDisabled ? "none" : "auto",
              cursor: "pointer",
            }}
            onClick={submitDetails}
          >
            {loading ? (
              <div id='container-deposit'>
                <div id='html-spinner-deposit'></div>
              </div>
            ) : (
              t("deposit_page.proceed")
            )}
          </div>
        </form>
      </div>
      <FooterMobile />
    </div>
  );
};

export default Deposit;
export const dynamic = "force-dynamic";
