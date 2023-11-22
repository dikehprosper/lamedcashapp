"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./profile.css";
import Head from "@/components/(userscomponent)/(head)/head";
import { FaCircle } from "react-icons/fa";
import FooterMobile from "@/components/(Utils)/FooterMobile";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    betID: "",
    password: "",
    confirmPassword: "",
  });

  //check email and password state to determine ButtonDisabled state
  useEffect(() => {
    if (
      user.firstName &&
      user.lastName &&
      user.email &&
      user.mobileNumber &&
      user.betID &&
      user.password &&
      user.confirmPassword
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const handleChangeFirstName = (event: any) => {
    setUser({
      ...user,
      firstName: event.target.value,
    });
  };

  const handleChangeLastName = (event: any) => {
    setUser({
      ...user,
      lastName: event.target.value,
    });
  };

  const handleChangeEmail = (event: any) => {
    setUser({
      ...user,
      email: event.target.value,
    });
  };

  const handlechangeMobileNumber = (event: any) => {
    setUser({
      ...user,
      mobileNumber: event.target.value,
    });
  };

  const handlechangeBetID = (event: any) => {
    setUser({
      ...user,
      betID: event.target.value,
    });
  };

  const handlePassword = (event: any) => {
    setUser({
      ...user,
      password: event.target.value,
    });
  };

  const handleConfirmPassword = (event: any) => {
    setUser({
      ...user,
      confirmPassword: event.target.value,
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

  const savedID = [267898789, 87678767];
  return (
    <div className='user_profile_container'>
      <Head title='Profil' about='Edit your Personal details Here' />

      <div className='user_profile_container_001'>
        <form onSubmit={handleSubmit} className='profile-form-container'>
          <div className='add-photo'>
            <div className='add-photo-container'></div>
            <div className='add-photo-button'>+ change photo</div>
          </div>
          <div>
            <label className='label-first-child'>First Name</label>
            <input
              type='text'
              className='profile-form input-first-child'
              value={user.firstName}
              onChange={handleChangeFirstName}
              placeholder='Entrez le montant du dépôt'
            />
          </div>
          <div>
            <label className='label-second-child'>Last Name</label>{" "}
            <input
              type='text'
              className='profile-form input-second-child'
              value={user.lastName}
              onChange={handleChangeLastName}
              placeholder='Entrez le montant du dépôt'
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type='text'
              className='profile-form'
              value={user.email}
              onChange={handleChangeEmail}
              placeholder='Entrez le montant du dépôt'
            />
          </div>
          <div>
            <label>mobileNumber</label>
            <input
              type='text'
              className='profile-form'
              value={user.mobileNumber}
              onChange={handlechangeMobileNumber}
              placeholder='Entrez le montant du dépôt'
            />
          </div>
          <div className="betid-section">
            <label>1XBET ID</label>
            <div className='saved_id_container_outer'>
              <div
                style={{
                  color: "rgba(256, 256, 256, 0.5)",
                  width: "100%",
                  display: "flex",
                }}
              >
                Enregistrez 2 identifiants 1XBET différents dans votre profil
                pour les afficher ici{" "}
              </div>
              <div className='saved_id_container'>
                {savedID.map((id, index) => (
                  <div className='saved_id_container-inner' key={index}>
                    {id} <FaCircle color='white' />
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
              className='profile-form'
              value={user.betID}
              onChange={handlechangeBetID}
              placeholder="Entrez l'identifiant 1XBET"
            />
          </div>
          <div>
            <label> Password</label>
            <input
              type='number'
              className='profile-form'
              value={user.password}
              onChange={handlePassword}
              placeholder='Entrez le montant du dépôt'
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type='text'
              className='profile-form'
              value={user.confirmPassword}
              onChange={handleConfirmPassword}
              placeholder='choisir le réseau'
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
      <FooterMobile />
    </div>
  );
};

export default Profile;
