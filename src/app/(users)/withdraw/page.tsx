"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./withdraw.css";
import Head from "@/components/(userscomponent)/(head)/head";
import { FaCircle } from "react-icons/fa";
const Withdraw = () => {
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState({
    betId: "",
    withdrawalCode: "",
    amount: "",
    momoName: "",
    momoNumber: "",
  });

  const handleChangeId = (event: any) => {
    setUser({
      ...user,
      betId: event.target.value,
    });
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

  const savedID = [267898789, 87678767];
  return (
    <div className='user_withdraw_container'>

      <Head
        title='Retirer'
        about='Effectuez vos retraits depuis votre 1XBET ici'
      />
      
      <div className='user_withdraw_container_001'>
        <div style={{ color: "rgba(256, 256, 256, 0.5)", fontSize: "16px",fontWeight: "bold",width: "100%",display: "flex", margin: "15px 0px"}}>Use the address for your withdrawal</div>
        <div className='user_withdraw_container_002'>
          <div>City: Porto-Novo (Benin)</div>
          <div>Street: RechargeB Cashier 1</div>
        </div>
       <p style={{ color: "rgba(256, 256, 256, 0.5)", width: "100%", display: "flex",margin: "15px 0px 10px 0px"}} >Then proceed to submit your details here</p>
        <form onSubmit={handleSubmit} className='withdraw-form-container'>
            
          <div className='withdraw-form'>
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
              className='withdraw-form1'
              value={user.betId}
              onChange={handleChangeId}
              placeholder='Entrez 1XBET ID'
            />
          </div>

          <div className='withdraw-form'>
            <label>1XBET Withdrawal Code</label>
            <input
              type='text'
              className='withdraw-form1'
              value={user.withdrawalCode}
              onChange={handleWithdrawalCode}
              placeholder='Entrez le code de retrait 1xbet'
            />
          </div>

          <div className='withdraw-form'>
            <label>Amount</label>
            <input
              type='number'
              className='withdraw-form1'
              value={user.amount}
              onChange={handleChangeAmount}
              placeholder='Entrez le montant du dépôt'
            />
          </div>

          <div className='withdraw-form-momo'>
            <div className='withdraw-form'>
              <label> MoMo Name</label>
              <input
                type='text'
                className='withdraw-form1'
                value={user.momoName}
                onChange={handleMomoname}
                placeholder='Entrez le montant du dépôt'
              />
            </div>
            <div className='withdraw-form'>
              <label>MoMo Number</label>
              <input
                type='number'
                className='withdraw-form1'
                value={user.momoNumber}
                onChange={handleMomoNumber}
                placeholder='Entrez le montant du dépôt'
              />
            </div>
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
              "Soumettre ma demande"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Withdraw;
