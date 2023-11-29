"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./withdraw.css";
import Head from "@/components/(userscomponent)/(head)/head";
import { FaCircle } from "react-icons/fa";
import FooterMobile from "@/components/(Utils)/FooterMobile";
import data from "../../../components/file";
const savedID = data.betId;
const Withdraw = () => {
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [success, setSuccess] = useState(false);
   const [activeBetId, setActiveBetId] = useState(savedID[0]);
   const [user, setUser] = useState({
     betId: activeBetId,
     withdrawalCode: "",
     amount: "",
     momoName: data.fullname,
     momoNumber: data.number,
   });

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

   const handleSubmit = (event: React.FormEvent) => {
     event.preventDefault();
     setLoading(true);
     console.log(user);
     setTimeout(() => {
       setLoading(false);
     }, 1000);
     toast.success("Withdrawal request submitted!");
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

 
  return (
    <div className='user_withdraw_container'>
      <Head
        title='Retirer'
        about='Effectuez vos retraits depuis votre 1XBET ici'
      />

      <div className='user_withdraw_container_001'>
        <form onSubmit={handleSubmit} className='withdraw-form-container'>
          <div className='detail'>Utilisez cette adresse pour votre retrait</div>
          <div className='user_withdraw_container_002 animate-pop-in'>
            <div>City: Porto-Novo (Benin)</div>
            <div>Street: RechargeB Cashier 1</div>
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
                      activeBetId === id ? "white" : "rgba(256, 256, 256, 0.2)",
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
              ))}
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
              <div id='container-signin'>
                <div id='html-spinner-signin'></div>
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
