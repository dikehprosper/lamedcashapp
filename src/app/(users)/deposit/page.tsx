"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./deposit.css";
import Head from "@/components/(userscomponent)/(head)/head";
import { FaCircle } from "react-icons/fa";


const Deposit = () => {
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState({
    betId: "",
    network: "",
    amount: "",
    ussdCode: "",
  });

  const handleChangeId = (event: any) => {
    setUser({
      ...user,
      betId: event.target.value,
    });
  };

  const handleChangeNetwork = (event: any) => {
    setUser({
      ...user,
      network: event.target.value,
    });
  };

  const handleChangeAmount = (event: any) => {
    setUser({
      ...user,
      amount: event.target.value,
    });
  };

    const handleUssdCode = (event: any) => {
    setUser({
      ...user,
      ussdCode: event.target.value,
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

  const savedID = [267898789, 87678767];
  return (
    <div className='user_deposit_container'>
      <Head title='Dépôts' about='Effectuez vos dépôts sur votre 1XBET ici' />

      <div className='user_deposit_container_001'>
        <form onSubmit={handleSubmit} className='deposit-form-container'>
          <div className='deposit-form'>
            <label>1XBET ID</label>
            <div className='saved_id_container_outer'>
              <div
                style={{
                  color: "rgba(256, 256, 256, 0.5)",
                  width: "100%",
                  display: "flex",
                  margin: "0px 0px 10px 0px",
                }}
              >
          Enregistrez 2 identifiants 1XBET différents dans votre profil pour les afficher ici </div>
              <div className='saved_id_container'>
                {savedID.map((id, index) => (
                  <div className='saved_id_container-inner' key={index}>
                    {id}{" "}
                    <FaCircle color="white" />
                    <span
                      style={{
                        fontSize: "8px",
                        fontWeight: "light",
                        color: "rgba(256, 256, 256, 0.5)",
                      }}
                    >
                      {" "}
                      X{" "}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <input
              type='text'
              className='deposit-form1'
              value={user.betId}
              onChange={handleChangeId}
              placeholder='Entrez 1XBET ID'
            />
          </div>

          <div className='deposit-form'>
            <label>Amount</label>
            <input
              type='number'
              className='deposit-form1'
              value={user.amount}
              onChange={handleChangeAmount}
              placeholder='Entrez le montant du dépôt'
            />
          </div>

          <div className='deposit-form'>
            <label>Network</label>
            <input
              type='text'
              className='deposit-form1'
              value={user.network}
              onChange={handleChangeNetwork}
              placeholder='Entrez le code de retrait 1xbet'
            />
          </div>
            <div className='deposit-form'>
            <label>USSD CODE</label>
            <input
              type='text'
              className='deposit-form1 only-laptop'
              value={user.ussdCode}
              onChange={handleUssdCode}
              placeholder='Entrez le code de retrait 1xbet'
            />
          </div>

       
          <button
            type='submit'
            className='submit-button'
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
              "Procéder"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Deposit;
