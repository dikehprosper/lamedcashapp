"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./profile.css";
import Head from "@/components/(userscomponent)/(head)/head";
import { FaCircle } from "react-icons/fa";
import FooterMobile from "@/components/(Utils)/FooterMobile";
import data from "../../../components/file";
import GetInitials from "../../../components/(Utils)/getInitials"
import BasicModal from "./profileModal"
import { useRouter } from "next/navigation";
import axios from "axios";
interface YourComponentProps {
  savedID: number[];
}
const Profile = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [buttonDisabled1, setButtonDisabled1] = useState(true);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    betID: '',
    password: "",
    confirmPassword: "",
  });
   const router = useRouter();
    const [data, setData] = useState<any>();
    const [isOnline, setIsOnline] = useState(true);


     const getUserDetails = async () => {
      try {
        const res = await axios.get("/api/getUser");
        setUser({
          ...user,
          firstName: res.data.data.fullname.split(" ")[0],
          lastName: res.data.data.fullname.split(" ")[1],
          email: res.data.data.email,
          mobileNumber: res.data.data.number,
          betID: res.data.data.betId,
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

  useEffect(() => {
    if (user.betID) {
      setButtonDisabled1(false);
    } else {
      setButtonDisabled1(true);
    }
  }, [user.betID]);

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

  const savedID = [267898789, 876787767]

   

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




  return (
    <div className='user_profile_container'>
      <Head title='Profil' about='Modifiez vos informations personnelles ici' />

      <div className='user_profile_container_001'>
        <form onSubmit={handleSubmit} className='profile-form-container'>
          <div className='add-photo'>
            <div className='add-photo-container appear'>
              <GetInitials name={data?.fullname} />
            </div>
          </div>
          <div>
            <label className='label'>Prénom</label>
            <input
              type='text'
              className='profile-form input-first-child'
              value={user.firstName}
              onChange={handleChangeFirstName}
              placeholder='Modifier votre prénom'
            />
          </div>
          <div>
            <label className='label'>Nom de famille</label>{" "}
            <input
              type='text'
              className='profile-form input-second-child'
              value={user.lastName}
              onChange={handleChangeLastName}
              placeholder='Modifier le nom de famille'
            />
          </div>
          <div>
            <label className='label'>E-mail</label>
            <input
              type='email'
              className='profile-form'
              value={user.email}
              onChange={handleChangeEmail}
              placeholder="EntModifierrez l'e-mail"
            />
          </div>
          <div>
            <label className='label'>Numéro de portable</label>
            <input
              type='number'
              className='profile-form'
              value={user.mobileNumber}
              onChange={handlechangeMobileNumber}
              placeholder='Modifier le numéro de téléphone'
            />
          </div>
          <div className='betid-section'>
            <label className='label'>1XBET ID</label>
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
                <BasicModal savedID={savedID} />             
              </div>
            </div>
            <input
              type='text'
              className='profile-form'
              value={user.betID}
              onChange={handlechangeBetID}
              placeholder="Entrez l'identifiant 1XBET"
            />
            <div
              className='submit-button1-profile'
              style={{
                background: "rgba(128, 128, 128, 1)",
                color: "black",
                fontWeight: 'bold',
                cursor: "pointer"
              }}
            >
              {loading ? (
                <div id='container-signin'>
                  <div id='html-spinner-signin'></div>
                </div>
              ) : (
                "Sauvegarder BetID"
              )}
            </div>
          </div>

          <div>
        <label className='label'> L&apos;ancien mot de passe</label>
            <input
              type='text'
              className='profile-form'
              value={user.password}
              onChange={handlePassword}
              placeholder="entrez l'ancien mot de passe"
            />
          </div>
          <div>
            <label className='label'>Nouveau mot de passe</label>
            <input
              type='text'
              className='profile-form'
              value={user.confirmPassword}
              onChange={handleConfirmPassword}
              placeholder='Entrez un nouveau mot de passe'
            />
          </div>
              
           <div
            style={{
              color: "rgba(256, 256, 256, 0.5)",
              width: "100%",
              display: "flex",
              marginTop: "15px",
            }}
          >
         <span style={{
              width: "100%",
            }}>   <span style={{ color: "red", fontWeight: 'bold' }}>Note:</span> &nbsp;    Pour mettre à jour votre mot de passe... entrez l&apos;ancien mot de passe 
                 et le nouveau que vous souhaitez utiliser </span> 
          </div>
          
          <button
            type='submit'
            className='submit-button-profile'
            style={{
              background: buttonDisabled
                ? "rgba(128, 128, 128, 0.2)"
                : "rgba(128, 128, 128, 1)",
              pointerEvents: buttonDisabled ? "none" : "auto",
              justifySelf: "flex-end"
            }}
          >
            {loading ? (
              <div id='container-signin'>
                <div id='html-spinner-signin'></div>
              </div>
            ) : (
              "Mise à jour"
            )}
          </button>
        </form>
      </div>
      <FooterMobile />
    </div>
  );
};

export default Profile;