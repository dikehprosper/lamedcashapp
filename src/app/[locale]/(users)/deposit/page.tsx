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
import Image from "next/image";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import langDataEn from "@/messages/en.json";
import langDataFr from "@/messages/fr.json";
import Cookies from "js-cookie";

const DOMAIN = process.env.DOMAIN;

const Deposit = () => {

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
          router.replace(`/${updatedLang}/signin`); // Replace '/login' with your actual login route
        } else if (error.response.status === 402) {
          toast.error(
            "Votre session a expiré. Redirection vers la connexion..."
          );
          await axios.get("/api/users/logout");
          router.replace(`/${updatedLang}/signin`); // Replace '/login' with your actual login route
        } else if (error.response.status === 404) {
          toast.error("Votre compte a été désactivé");
          await axios.get("/api/users/logout");
          router.replace(`/${updatedLang}/signin`);
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


   const handleClick = () => {
    router.push(`/${updatedLang}/dashboard`);
    setIsVisible(false);
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
          
          "https://3777-102-89-34-185.ngrok-free.app/api/usersWithoutToken/deposit2",
          // "https://dev.api.betfundr.com/api/usersWithoutToken/deposit2",
          updatedUser
        );
        setProcessing(false);
        console.log(res.data.success, "jhbvkabvjkbkjv");
        if (res.data.success === 211) {
          setProcessing3(true);
          setTimeout(() => {
            router.push(`/${updatedLang}/dashboard`);
            setProcessing3(false);
          }, 900);
        } else if (res.data.success === 209) {
          setProcessing4(true);
          setTimeout(() => {
            setProcessing4(false);
          }, 1000);
        } else {
          setProcessing2(true);
           const result = res.data.userTransaction
         showReceipt(result?.registrationDateTime,
    result?.totalAmount,
    result?.identifierId,
    result?.betId,
    result?.status,
    result?.fundingType,
    result?.momoName,
   result?.momoNumber,
    result?.withdrawalCode)
            setProcessing2(false);
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          toast.error("Utilisateur non trouvé");
          await axios.get("/api/users/logout");
          router.push(`/${updatedLang}/signin`);
        } else if (error.response.status === 402) {
          toast.error("L'utilisateur est désactivé");
          await axios.get("/api/users/logout");
          router.push(`/${updatedLang}/signin`);
        } else if (error.response.status === 403) {
          await axios.get("/api/users/logout");
          router.push(`/${updatedLang}/signin`);
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
    Cookies.set("locale", currentLang, { expires: 365 }); // Set cookie to last 1 year
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
      .deposit-form::placeholder {
        color: ${placeholderColor};
      }
    `;
    document.head.appendChild(style);

    // Clean up the style tag on component unmount
    return () => {
      document.head.removeChild(style);
    };
  }, [updatedTheme]);



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



  return ( updatedTheme === "dark" || updatedTheme === "light" && updatedLang === "en" || updatedLang === "fr" ?
    <div className='user_withdraw_container'  style={{
          background: updatedTheme === "dark" ? "rgb(10, 20, 38)" : "white",
        }}>
      <Head
        title={t.dashboard.deposit_page.title}
        about={t.dashboard.deposit_page.about}
        data={data}
        display={false}
        updatedTheme={updatedTheme}
        t={t.dashboard.copy}
      />
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
              ? "white" : updatedTheme === "light"? "black"
              : "transparent",
                  marginBottom: "13px",
                  width: "100%",
                  alignSelf: "center",
                  textAlign: "center",
                }}
              >
                  {t.dashboard.deposit_page.update} {user.amount}
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
          title={t.dashboard.amount_deposit}
          t={t}
        />
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

      {processing4 && (
        <Modal4
          containerStyles='receiptModal'
          containerStylesInner='receiptModal_inner-processing'
          title={t.dashboard.amount_deposit}
          updatedTheme={updatedTheme}
          t={t}
        />
      )}
    
      <div className='user_deposit_container_001'  style={{
            background: updatedTheme === "dark" ? "" : "white",
            color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent",
              boxShadow: 
              updatedTheme === "dark"
              ? "" : updatedTheme === "light"? " 0px 4px 10px rgba(0, 0, 0, .3)"
              : "transparent",
          }}>
            
        <form onSubmit={submitDetails} className='deposit-form-container'>
           <div
            style={{
              width: "100%",
              borderWidth: "2px",
              border: "1px solid rgba(73, 166, 106, 1)",
              background: "rgba(73, 166, 106, 0.3)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              paddingLeft: "10px",
              paddingRight: "10px",
              paddingTop: "5px",
              paddingBottom: "5px",
        
            }}
          >
            <div className='detail' style={{fontWeight: "bold"}}>{t.dashboard.deposit_page.use_address}</div>
            <div className='detail_2' style={{textAlign: "center", fontWeight: 600, fontSize: "13px"}}>
              {t.dashboard.deposit_page.use_address_info}
            </div>
            
          </div>
          <label style={{  color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent",   paddingTop: "7px", opacity: "0.7"}}>ID</label>

          <input
            type='text'
            className='deposit-form'
            value={user.betId}
            onChange={handleChangeId}
            placeholder={t.dashboard.deposit_page.placeholder_1xbet_id}
            style={{       border: 
              updatedTheme === "dark"
              ? "" : updatedTheme === "light"? "2px solid grey"
              : "transparent", color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent",}}
     
             
        
          />

          <label style={{  color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent",  paddingTop: "7px", opacity: "0.7"}}>{t.dashboard.deposit_page.amount}</label>
          <input
            type='number'
            className='deposit-form'
            value={user.amount}
            onChange={handleChangeAmount}
            placeholder={t.dashboard.deposit_page.placeholder_amount}
            style={{       border: 
              updatedTheme === "dark"
              ? "" : updatedTheme === "light"? "2px solid grey"
              : "transparent", color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent"}}
          />

          <label style={{  color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent", paddingTop: "7px", opacity: "0.7"}}>{t.dashboard.deposit_page.momo_number}</label>
          <input
            type='number'
            className='deposit-form'
            value={user.momoNumber}
            onChange={handleChangeMomoNumber}
            placeholder='Entrez le numéro Momo'
            style={{       border: 
              updatedTheme === "dark"
              ? "" : updatedTheme === "light"? "2px solid grey"
              : "transparent", color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent"}}
          />

          <label htmlFor='network' style={{  color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent", paddingTop: "7px", opacity: "0.7"}}>{t.dashboard.deposit_page.network}</label>




          <div style={{display: 'flex', marginTop: "10px", alignSelf: "flex-start", flexDirection: 'row',  minWidth: '200px',  width: "100%", maxWidth: '800px', flex: 1,  padding: "5px", alignItems: 'center', justifyContent: "space-evenly"}}>
              <div 
              onClick={ () => setUser({
      ...user,
      network: "MTN",
    })}
     style={{ display: "flex",  flexDirection: "row", alignItems: 'center', justifyContent: 'space-evenly', height: "40px", width: "100px", borderRadius: "3px",border: user.network === "MTN" ? "2px solid rgba(73, 166, 106, 1)": "" }}> 
                <Image
          src="https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/MTN-Mobile-Money-Senegal-Logo-1-550x298.webp?alt=media&token=6c70d498-35e3-4054-a2fd-e42a3138f3fb"
          style={{ objectFit: "cover", borderRadius: 15}}
          alt="background"
          width={30}
          height={30}
        /> 
        <h6>MTN</h6>
        </div>

         <div 
         onClick={ () => setUser({
      ...user,
      network: "MOOV",
    })} 
    style={{ display: "flex", flexDirection: "row", alignItems: 'center', justifyContent: 'space-evenly', height: "40px", width: "100px", borderRadius: "3px", border: user.network === "MOOV" ? "2px solid rgba(73, 166, 106, 1)": "" }}> 
          <Image
          src="https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/Moov_Africa_logo.png?alt=media&token=281df10d-fe29-4eeb-83ef-bcb1f3ee2121"
          style={{ objectFit: "cover", borderRadius: 15, }}
          alt="background"
           width={30}
          height={30}
        />
        <h6>MOOV</h6>
        </div>
        </div>







          {/* <select
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
 */}



          

          <div
            className='submit-button-deposit'
            style={{
              background: buttonDisabled
                ? "rgba(73, 166, 106, 0.5)"
                : "rgba(73, 166, 106, 1)",
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
              t.dashboard.deposit_page.proceed
            )}
          </div>
        </form>
      </div>
      <FooterMobile updatedTheme={updatedTheme} />
    </div>: null
  );
};

export default Deposit;
export const dynamic = "force-dynamic";
