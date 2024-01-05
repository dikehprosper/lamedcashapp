/* eslint-disable */
// @ts-nocheck
"use client";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "./deposit.css";
import Head from "@/components/(userscomponent)/(head)/head";
import { FaCircle } from "react-icons/fa";
import FooterMobile from "@/components/(Utils)/FooterMobile";
import axios from "axios";
import { IoIosCopy } from "react-icons/io";
import { useRouter } from "next/navigation";
import { FedaPay } from "fedapay";
import Modal from "@/components/(Utils)/(modals)/processingModal";
// import App from "../pay";
const Deposit = () => {
  const [loading, setLoading] = useState(false);
  const [savedID, setSavedID] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [success, setSuccess] = useState(false);
  const [activeBetId, setActiveBetId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRequestingCall, setIsRequestingCall] = useState(false);
  const [cashdesk, setCashdeskId] = useState();
  const [user, setUser] = useState({
    email: "",
    amount: "",
    network: "",
    betId: savedID[0],
    momoNumber: "",
  });
  const router = useRouter();
  const [phoneDial, setPhoneDial] = useState("");
  const [isOnline, setIsOnline] = useState(true);

  function generateTimestamp() {
    return Date.now();
  }

  // Example usage:
  const newTimestamp = generateTimestamp();

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/getUserInfo");

      setUser({
        ...user,
        _id: res.data.data._id,
        betId: res.data.data.betID[0],
        momoName: res.data.data.fullname,
        momoNumber: res.data.data.number,
        fullname: res.data.data.fullname,
        fedapayId: res.data.data.fedapayId,
        email: res.data.data.email,
      });
      setSavedID(res.data.data.betID);
      setActiveBetId(res.data.data.betID[0]);

      setData({
        ...data,
        fullname: res.data.data.fullname,
        betId: res.data.data.betId,
      });
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
      } else if (error.request) {
        // Handle network errors (no connection)
        setIsOnline(false);
      }
    }
  };

  useEffect(() => {
    // Check network status before making the request
    if (isOnline) {
      getUserDetails();
    } else {
      toast.error(
        "No network connection. Please check your connection and try again."
      );
    }
  }, [isOnline]);

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
  }, []);

  // setUser((prevUser) => ({ ...prevUser, _id: res.data.data._id, betId: res.data.data.betID[0]}));
  function initiatePhoneCall(phoneNumber: any) {
    // Check if the browser supports the tel protocol
    if ("href" in HTMLAnchorElement.prototype) {
      // Create an anchor element with the tel link
      var link = document.createElement("a");
      link.href = "tel:" + phoneNumber;

      // Trigger a click on the link to open the default phone application
      link.click();
    } else {
      // Handle browsers that do not support the tel protocol
      console.error("Phone call initiation is not supported in this browser.");
    }
  }

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

  const changeTransactionId = (event: any) => {
    const newValue = event.target.value;
    setUser((prevUser) => ({ ...prevUser, transactionId: newValue }));
  };

  const handleChangeNetwork = (event: any) => {
    setUser({
      ...user,
      network: event.target.value,
    });
  };

  const [processing, setProcessing] = useState(false);

  async function submitDetails() {
    if (isSubmitting) {
      return;
    }

    const amountValue = parseInt(user.amount, 10);
    if (isNaN(amountValue)) {
      // Handle the case where user.amount is not a valid number
      return toast.error("Vous n'avez pas saisi de montant");
    }

    if (amountValue < 500) {
      return toast.error("Le montant saisi ne doit pas être inférieur à 500");
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
          fedapayId: user.fedapayId,
          momoName: user.fullname,
        };
        setProcessing(true);

        const res = await axios.post("/api/users/deposit", updatedUser);

        router.push("/dashboard");
        setProcessing(false);
        toast.success("deposit request Submitted");
        setLoading(false);
      } catch (error: any) {
        if (error.response.status === 400) {
          return toast.error("Utilisateur non trouvé");
        } else if (error.response.status === 401) {
          return toast.error("Impossible de lancer la transaction");
        } else {
          return toast.error("error");
        }
      } finally {
        setLoading(false);
        setIsSubmitting(false);
        setProcessing(false);
      }
    }
  }

  async function submitDetails1() {
    try {
      const res = await axios.post("/api/webhook", updatedUser);
      // router.push("/dashboard");
      console.log(res);
      toast.success("deposit request Submitted");
    } catch (error: any) {
      return toast.error("error");
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

    setTimeout(() => {
      setLoading(false);
    }, 1000);
    toast.success("Soumis! Votre demande sera traitée sous peu");
  };

  useEffect(() => {
    setButtonDisabled(!(user.amount && user.network));
  }, [user]);

  useEffect(() => {
    console.log(user.network);
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

  // Example using fetch
  const createTransaction = async () => {
    if (isSubmitting) {
      return;
    }

    const amountValue = parseInt(user.amount, 10);
    if (isNaN(amountValue)) {
      // Handle the case where user.amount is not a valid number
      return toast.error("Vous n'avez pas saisi de montant");
    }

    if (amountValue < 500) {
      return toast.error("Le montant saisi ne doit pas être inférieur à 500");
    } else if (user.betId === "") {
      return toast.error("Entrez le betId à utiliser");
    } else {
      try {
        const response = await axios.post("/api/users/deposit2", user); // Replace with your actual route
        const data = response.data.url1;
        console.log(data);
        window.location.href = data;
      } catch (error) {
        console.error("Error creating transaction:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const createTransaction2 = async () => {
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
      try {
        setLoading(true);
        const response = await axios.post("/api/users/deposit3", user); // Replace with your actual route
        console.log(response);
      } catch (error) {
        console.error("Error creating transaction:", error);
      } finally {
        setLoading(false);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className='user_withdraw_container'>
      <Head
        title='Dépôts'
        about='Effectuez vos dépôts sur votre 1XBET ici'
        data={user}
      />
      {processing && (
        <Modal
          containerStyles='receiptModal'
          containerStylesInner='receiptModal_inner-processing'
          title='Montant du dépôt'
        />
      )}
      <div className='user_deposit_container_001'>
        <form onSubmit={handleSubmit} className='deposit-form-container'>
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
              {!savedID.length > 0 ? (
                <div id='container-deposit'>
                  <div id='html-spinner-deposit'></div>
                </div>
              ) : (
                savedID?.map((id, index) => (
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
                      <FaCircle color='rgba(256, 256, 256, 0.2' />
                    )}
                    <span
                      style={{
                        fontSize: "8px",
                        fontWeight: "light",
                        color: "rgba(256, 256, 256, 0.5)",
                      }}
                    ></span>
                  </div>
                ))
              )}
            </div>
          </div>
          <input
            type='text'
            className='deposit-form'
            value={user.betId}
            onChange={handleChangeId}
            placeholder="Entrez l'identifiant 1XBET"
          />
          <div
            style={{
              color: "rgba(256, 256, 256, 0.5)",
              width: "100%",
              display: "flex",
              marginTop: "15px",
            }}
          >
            <span
              style={{
                width: "100%",
              }}
            >
              {" "}
              <span style={{ color: "red", fontWeight: "bold" }}>
                Note:
              </span>{" "}
              &nbsp; Le montant de la transaction ne doit pas être inférieur à
              500
            </span>
          </div>
          <label>Montant</label>
          <input
            type='number'
            className='deposit-form'
            value={user.amount}
            onChange={handleChangeAmount}
            placeholder='Entrez le montant du dépôt'
          />

          <label htmlFor='network'>Réseau</label>
          <select
            id='network'
            className='deposit-form' // Apply the same class as the input for styling
            value={user.network}
            onChange={handleChangeNetwork}
          >
            <option value='' disabled hidden>
              -- Choose Network --
            </option>{" "}
            <option value='mtn'> Mtn Benin</option>
            <option value='moov'>Moov Benin</option>
          </select>

          <label>Numéro momo</label>
          <input
            type='number'
            className='deposit-form'
            value={user.momoNumber}
            onChange={handleChangeMomoNumber}
            placeholder='Entrez le numéro Momo'
          />
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
              "Procéder"
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
