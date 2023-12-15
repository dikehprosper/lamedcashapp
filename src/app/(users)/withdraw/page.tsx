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
import axios from "axios";
import { useRouter } from "next/navigation";
import Modal from "@/components/(Utils)/(modals)/receiptModalWithdrawal";

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
   const [data, setData] = useState({
fullname: "",
betId: ""
  })
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [savedID, setSavedID] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [success, setSuccess] = useState(false);
  const [activeBetId, setActiveBetId] = useState("");
  const [cashdeskAddress, setCashdeskAddress] = useState<any>({});
  const [cashdeskId, setCashdeskId] = useState<any>({});
  const [isOnline, setIsOnline] = useState(true);
  const [user, setUser] = useState({
    _id: "",
    betId: savedID[0],
    withdrawalCode: "",
    amount: "",
    momoName: "",
    momoNumber: "",
    cashdeskId: "",
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
      const res = await axios.get("/api/getUserInfo");
        setUser({
        ...user,
        _id: res.data.data._id,
        betId: res.data.data.betID[0],
        momoName: res.data.data.fullname,
        momoNumber: res.data.data.number,
      });
      setSavedID(res.data.data.betID);
      setActiveBetId(res.data.data.betID[0]);
   
      setData({
        ...data,
        fullname: res.data.data.fullname,
         betId: res.data.data.betId,
      })
    
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



  async function getAvailableCashdeskAddress() {
    try {
      const res = await axios.post("/api/getAvailableCashdeskWithdrawal", newTimestamp);
      setCashdeskAddress(res.data.subadminWithLowestPendingCountAddress);
      setCashdeskId(res.data.subadminWithLowestPendingCountId);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    // Check network status before making the request
    if (isOnline) {
      getUserDetails();
      getAvailableCashdeskAddress();
    } else {
      toast.error(
        "No network connection. Please check your connection and try again."
      );
    }
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleChangeId = (event: any) => {
    setActiveBetId(event.target.value);
    const newValue = event.target.value;
    setUser((prevUser) => ({ ...prevUser, betId: newValue }));
  };

  const changeBetId = (id: any) => {
    setActiveBetId(id);
    const newValue = id;
    setUser((prevUser) => ({ ...prevUser, betId: newValue }));
  };

  const handleWithdrawalCode = (event: any) => {
    setUser({
      ...user,
      withdrawalCode: event.target.value,
    });
  };

  const handleChangeAmount = (event: any) => {
    setUser({
      ...user,
      amount: event.target.value,
    });
  };

  const handleMomoname = (event: any) => {
    setUser({
      ...user,
      momoName: event.target.value,
    });
  };
  const handleMomoNumber = (event: any) => {
    setUser({
      ...user,
      momoNumber: event.target.value,
    });
  };

  //check email and password state to determine ButtonDisabled state
  useEffect(() => {
    if (
      user.betId &&
      user.withdrawalCode &&
      user.amount &&
      user.momoName &&
      user.momoNumber
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }
    setLoading(true);

    const amountValue = parseInt(user.amount, 10);
    if (isNaN(amountValue)) {
      // Handle the case where user.amount is not a valid number
      return toast.error("Vous n'avez pas saisi de montant");
    }

    if (amountValue < 1) {
      return toast.error("Veuillez entrer un montant valide");
    } else if (user.betId === "") {
      return toast.error("Entrez le betId à utiliser");
    } else if (user.withdrawalCode === "") {
      return toast.error("Entrez votre code de retrait");
    } else {
      try {
        setIsSubmitting(true);

        // Update user with the new values
        const updatedUser = {
          ...user,
          betId: activeBetId,
          withdrawalCode: user.withdrawalCode,
          amount: user.amount,
          momoName: user.momoName,
          momoNumber: user.momoNumber,
          cashdeskId: cashdeskId,
        };

        // Send the updated user to the server
        const res = await axios.post("/api/users/withdraw", updatedUser);
        setReceipt(res.data.userTransaction);
        setIsVisible(true);
        toast.success("withdraw request Submitted");
      } catch (error: any) {
        console.log(error);
        return toast.error("error");
      } finally {
        setLoading(false);
        setIsSubmitting(false);
      }
    }
  }

  const handleClick = () => {
    router.push("/dashboard");
    setIsVisible(false);
  };



  return (
    <div className='user_withdraw_container'>
      {isVisible && (
        <Modal
          containerStyles='receiptModal'
          containerStylesInner='receiptModal_inner'
          handleClick={handleClick}
          receipt={receipt}
          title='Montant du dépôt'
        />
      )}
      <Head
        title='Retirer'
        about='Effectuez vos retraits depuis votre 1XBET ici'
         data={data}
      />

      <div className='user_withdraw_container_001'>
        <form onSubmit={handleSubmit} className='withdraw-form-container'>
          <div className='detail'>
            Utilisez cette adresse pour votre retrait
          </div>
          <div className='user_withdraw_container_002 animate-pop-in'>
            {!cashdeskAddress || Object.keys(cashdeskAddress).length === 0 ? (
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
            )}
          </div>
          <p
            style={{
              color: "white",
              width: "100%",
              display: "flex",
              margin: "20px 0px 0px 0px",
            }}
          >
            Ensuite, soumettez vos coordonnées ici
          </p>
          <label>1XBET ID</label>
          <div className='saved_id_container_outer'>
            <div
              style={{
                color: "rgba(256, 256, 256, 0.5)",
                width: "100%",
                display: "flex",
              }}
            >
              Enregistrez 2 identifiants 1XBET différents dans votre profil pour
              les afficher ici{" "}
            </div>
            <div className='saved_id_container'>
              {savedID.length > 0 ? (
                <>
                  {savedID.map((id, index) => (
                    <div
                      className='saved_id_container-inner'
                      key={index}
                      onClick={() => changeBetId(id)}
                      style={{
                        border:
                          activeBetId === id
                            ? "2px solid white"
                            : "2px solid rgba(256, 256, 256, 0.2)",
                        color:
                          activeBetId === id
                            ? "white"
                            : "rgba(256, 256, 256, 0.2)",
                        cursor: "pointer",
                      }}
                    >
                      {id}{" "}
                      {activeBetId === id ? (
                        <FaCircle color='white' />
                      ) : (
                        <FaCircle color='rgba(256, 256, 256, 0.2)' />
                      )}{" "}
                      <span
                        style={{
                          fontSize: "8px",
                          fontWeight: "light",
                          color: "rgba(256, 256, 256, 0.5)",
                        }}
                      ></span>
                    </div>
                  ))}
                </>
              ) : (
                <div id='container-withdraw2'>
                  <div id='html-spinner-withdraw2'></div>
                </div>
              )}
            </div>
          </div>
          <input
            type='text'
            className='withdraw-form'
            value={user.betId}
            onChange={handleChangeId}
            placeholder="Entrez l'identifiant 1XBET"
          />
          <label>Code de retrait 1XBET</label>
          <input
            type='text'
            className='withdraw-form'
            value={user.withdrawalCode}
            onChange={handleWithdrawalCode}
            placeholder='Entrez le code de retrait 1XBET'
          />
          <label>Montant</label>
          <input
            type='number'
            className='withdraw-form'
            value={user.amount}
            onChange={handleChangeAmount}
            placeholder='Entrez le montant du retrait'
          />
          <label>Nom MoMo</label>
          <input
            type='text'
            className='withdraw-form'
            value={user.momoName}
            onChange={handleMomoname}
            placeholder='Entrez le nom de Momo'
          />
          <label>Numéro MoMo</label>
          <input
            type='number'
            className='withdraw-form'
            value={user.momoNumber}
            onChange={handleMomoNumber}
            placeholder='Entrez le numéro Momo'
          />
          <button
            type='submit'
            className='submit-button-withdraw'
            style={{
              background: buttonDisabled
                ? "rgba(128, 128, 128, 0.2)"
                : "rgba(128, 128, 128, 1)",
              pointerEvents: buttonDisabled ? "none" : "auto",
            }}
          >
            {loading ? (
              <div id='container-withdraw'>
                <div id='html-spinner-withdraw'></div>
              </div>
            ) : (
              "Soumettre ma demande"
            )}
          </button>
        </form>
      </div>
      <FooterMobile />
    </div>
  );
};

export default Withdraw;

export const dynamic = 'force-dynamic'