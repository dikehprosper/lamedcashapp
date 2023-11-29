"use client";
import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./deposit.css";
import Head from "@/components/(userscomponent)/(head)/head";
import { FaCircle } from "react-icons/fa";
import FooterMobile from "@/components/(Utils)/FooterMobile";
import axios from "axios";
import { IoIosCopy } from "react-icons/io";
import data from "../../../components/file";
 const savedID = data.betId;
const Deposit = () => {
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [success, setSuccess] = useState(false);
  const [activeBetId, setActiveBetId] = useState(savedID[0])
    const [transactionId, setTransactionId] = useState("")
  const [user, setUser] = useState({
    betId: activeBetId,
    network: "",
    amount: "" ,
    ussdCode: "",
  });

  const [phoneDial, setPhoneDial] = useState("")

function initiatePhoneCall(phoneNumber: any) {
  // Check if the browser supports the tel protocol
  if ('href' in HTMLAnchorElement.prototype) {
    // Create an anchor element with the tel link
    var link = document.createElement('a');
    link.href = 'tel:' + phoneNumber;

    // Trigger a click on the link to open the default phone application
    link.click();
  } else {
    // Handle browsers that do not support the tel protocol
    console.error('Phone call initiation is not supported in this browser.');
  }
}
// useEffect(() => {
//     setUser({
//       ...user,
//       betId: activeBetId,
//     });
// }, [activeBetId, user])

// useEffect(() => {
//    savedID.map((id) => {
//     if (id === user.betId) {
//       setActiveBetId(id)
//     } else {
//         setActiveBetId(id);
//     }
//    })
// }, [user.betId])


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


  const handleChangeNetwork = (event: any) => {
    requestCall()
    setUser({
      ...user,
      network: event.target.value,
    });
  };


  function requestCall() {
    const amountValue = parseInt(user.amount, 10);
if (amountValue < 500) {
return toast.error("Le montant saisi ne doit pas être inférieur à 500");
} else if (user.betId === "") {
return toast.error("Entrez le betId à utiliser")
} else {
  setPhoneDial(`#180*345*44939959*${user.amount}#`);
 initiatePhoneCall(`#180*345*44939959*${user.amount}#`);

}
  }
  


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
    toast.success("Soumis! Votre demande sera traitée sous peu");
  };

  //check email and password state to determine ButtonDisabled state
  useEffect(() => {
    if (user.betId && user.ussdCode && user.amount && user.network) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);




   const handlePayment = async () => {
     console.log("users");
     try {
       const baseUrl = "/api/users/deposit";

       const response = await axios.post(baseUrl);

     const token =  `Bearer ${response.data.token}`;
     
     } catch (error) {
       console.error("An error occurred:", error);
     }
   };




useEffect(() => {
  console.log(phoneDial)
})



 const inputRef = useRef(null);

  const handleCopyClick = () => {
    // Select the text inside the input field
    inputRef.current.select();

    // Copy the selected text to the clipboard
    document.execCommand('copy');

    // Deselect the text (optional)
    window.getSelection().removeAllRanges();
    toast.success("USSD CODE successfully copied!")
  };

 
  return (
    <div className='user_withdraw_container'>
      <Head title='Dépôts' about='Effectuez vos dépôts sur votre 1XBET ici' />

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
            className='deposit-form'
            value={user.betId}
            onChange={handleChangeId}
            placeholder="Entrez l'identifiant 1XBET"
          />
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
            <option value='option1'> Mtn momo</option>
            <option value='option2'>Airtel</option>
            <option value='option3'>Glo</option>
          </select>
          <div
            className='submit-button-deposit'
            style={{
              background: "rgba(128, 128, 128, 1)",
              marginTop: "2px",
            }}
            onClick={requestCall}
          >
            {loading ? (
              <div id='container-signin'>
                <div id='html-spinner-signin'></div>
              </div>
            ) : (
              "Générer"
            )}
          </div>

          <label>USSD CODE</label>
          <div style={{display: 'flex', position: "relative", width: "100%"}}>
          <input
            type='text'
            className='deposit-form'
            value={phoneDial}
            key={phoneDial}
             ref={inputRef}
          />
          {phoneDial && 
           <span style={{position:"absolute", right: "18px", height: "100%", display: "flex",alignItems: 'center', fontWeight: '300', color: "green", fontSize: "14px"}} onClick={handleCopyClick}>
                <IoIosCopy />
                copier
              </span>
}
</div>
          <div
            style={{
              color: "rgba(256, 256, 256, 0.5)",
              width: "100%",
              display: "flex",
              marginTop: "45px",
            }}
          >
         <span style={{
              width: "100%",
            }}>   <span style={{ color: "red", fontWeight: 'bold' }}>Note:</span> &nbsp; Copiez votre
            identifiant de transaction et collez-le ci-dessous </span> 
          </div>
          <label>Transaction Id</label>
          <input
            type='number'
            className='deposit-form'
               value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="soumettre l'identifiant de la transaction"
          />
          <div
            className='submit-button-deposit'
            style={{
              background: buttonDisabled
                ? "rgba(128, 128, 128, 0.5)"
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
          </div>
        </form>
      </div>
      <FooterMobile />
    </div>
  );
};

export default Deposit;
