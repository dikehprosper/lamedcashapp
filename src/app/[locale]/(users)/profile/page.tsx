"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./profile.css";
import Head from "@/components/(userscomponent)/(head)/head";
import { FaCircle } from "react-icons/fa";
import FooterMobile from "@/components/(Utils)/FooterMobile";
import data from "../../../../components/file";
import GetInitials from "../../../../components/(Utils)/getInitials";
import BasicModal from "./profileModal";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useTranslations } from "next-intl";
interface YourComponentProps {
  savedID: number[];
}
const Profile = () => {
  const t = useTranslations("dashboard");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [buttonDisabled1, setButtonDisabled1] = useState(true);
  const [savedID, setSavedID] = useState([]);
  const [activeBetId, setActiveBetId] = useState("");
  const [success, setSuccess] = useState(false);
  const [fullname, setFullname] = useState("");
  const [fedapayId, setFedapayId] = useState();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    fullname: "",
    email: "",
    mobileNumber: "",
    betId: "",
    oldPassword: "",
    password: "",
    confirmPassword: "",
    _id: "",
  });
  const router = useRouter();
  const [data, setData] = useState<any>();
  const [isOnline, setIsOnline] = useState(true);

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/getUserInfo");
      console.log(res.data.data.betID);
      setUser({
        ...user,
        firstName: res.data.data.fullname.split(" ")[0],
        lastName: res.data.data.fullname.split(" ")[1],
        fullname: res.data.data.fullname,
        email: res.data.data.email,
        mobileNumber: res.data.data.number,
        betId: res.data.data.betID[0],
        _id: res.data.data._id,
      });
      setFullname(res.data.data.fullname);
      setSavedID(res.data.data.betID);
      setActiveBetId(res.data.data.betID[0]);
      setFedapayId(res.data.data.fedapayId);
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
        } else if (error.response.status === 404) {
          toast.error("Votre compte a été désactivé");
          router.push("/signin");
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

  const handleChangeFirstName = (event: any) => {
    setButtonDisabled(false);
    setUser({
      ...user,
      firstName: event.target.value,
    });
  };

  const handleChangeLastName = (event: any) => {
    setButtonDisabled(false);
    setUser({
      ...user,
      lastName: event.target.value,
    });
  };

  const handleChangeEmail = (event: any) => {
    setButtonDisabled(false);
    setUser({
      ...user,
      email: event.target.value,
    });
  };

  const handlechangeMobileNumber = (event: any) => {
    setButtonDisabled(false);
    setUser({
      ...user,
      mobileNumber: event.target.value,
    });
  };

  const handlechangeBetID = (event: any) => {
    setUser({
      ...user,
      betId: event.target.value,
    });
  };

  const handlePassword = (event: any) => {
    setButtonDisabled1(false);
    setUser({
      ...user,
      password: event.target.value,
    });
  };
  const handleOldPassword = (event: any) => {
    setButtonDisabled1(false);
    setUser({
      ...user,
      oldPassword: event.target.value,
    });
  };

  const handleConfirmPassword = (event: any) => {
    setButtonDisabled1(false);
    setUser({
      ...user,
      confirmPassword: event.target.value,
    });
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading3(true);
    const updatedUser = {
      _id: user._id,
      fullname: `${user.firstName} ${user.lastName}`,
      email: user.email,
      mobileNumber: user.mobileNumber,
      fedapayId: fedapayId,
    };
    if (
      updatedUser.mobileNumber.length < 8 ||
      updatedUser.mobileNumber.length > 8
    ) {
      setLoading3(false);
      return toast.error(
        "le numéro de portable doit être composé de 8 chiffres"
      );
    } else {
      try {
        const res = await axios.post("/api/updateCurrentUserInfo", updatedUser);
        toast.success("le profil a été mis à jour avec succès");
        getUserDetails();
        setLoading3(false);
      } catch (error: any) {
        setLoading3(false);
        toast.error("échec de la mise à jour des informations utilisateur");
      }
    }
  }

  useEffect(() => {
    // Check network status before making the request
    if (isOnline) {
      getUserDetails();
    } else {
      toast.error(
        "No network connection. Please check your connection and try again."
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  async function addExtraId() {
    try {
      const updatedUser = {
        _id: user._id,
        betId: user.betId,
      };
      const res = await axios.post("/api/users/addBetId", updatedUser);
      setSavedID(res.data.res);
    } catch (error: any) {
      if (error.response.status === 401) {
        toast.error("betId de apuesta máximo agregado");
      } else if (error.response.status === 402) {
        toast.error("La apuesta ya existe.");
      } else if (error.response.status === 404) {
        toast.error("Votre compte a été désactivé");
        router.push("/signin");
      } else {
        toast.error("algo salió mal");
      }
    }
  }

  async function makeDefaultId(id: any) {
    try {
      const updatedUser = {
        _id: user._id,
        betId: id,
      };
      const res = await axios.post("/api/users/makeBetIdDefault", updatedUser);
      getUserDetails();
    } catch (error: any) {
      if (error.response.status === 404) {
        toast.error("Votre compte a été désactivé");
        router.push("/signin");
      } else {
        toast.error("algo salió mal");
      }
    }
  }
  async function deleteId(id: any) {
    try {
      const updatedUser = {
        _id: user._id,
        betId: id,
      };
      const res = await axios.post("/api/users/deleteBetId", updatedUser);
      getUserDetails();
    } catch (error: any) {
      if (error.response.status === 404) {
        toast.error("Votre compte a été désactivé");
        router.push("/signin");
      } else {
        toast.error("algo salió mal");
      }
    }
  }

  async function changePassword(e: { preventDefault: () => void }) {
    setLoading2(true);
    e.preventDefault();
    const updatedUser = {
      _id: user._id,
      password: user.password,
      oldPassword: user.oldPassword,
      confirmPassword: user.confirmPassword,
    };
    if (updatedUser.password !== updatedUser.confirmPassword) {
      setLoading2(false);
      return toast.error(
        "La confirmation du mot de passe ne correspond pas au mot de passe"
      );
    } else {
      try {
        console.log(updatedUser);
        const res = await axios.post("/api/changePassword", updatedUser);
        toast.success("votre mot de passe a été mis à jour avec succès");
        setLoading2(false);
      } catch (error: any) {
        if (error.response.status === 402) {
          setLoading2(false);
          toast.error("l'ancien mot de passe n'est pas correct");
        } else if (error.response.status === 404) {
          toast.error("Votre compte a été désactivé");
          router.push("/signin");
        } else {
          setLoading2(false);
          toast.error("algo salió mal");
        }
      }
    }
  }

  return (
    <div className="user_profile_container">
      <Head title={t("profile.title")} about={t("profile.about")} data={user} />

      <div className="user_profile_container_001">
        {fullname ? (
          <form className="profile-form-container">
            <div className="add-photo">
              <div className="add-photo-container appear">
                <GetInitials name={fullname} />
              </div>
            </div>
            <div>
              <label className="label">{t("profile.first_name")}</label>
              <input
                type="text"
                className="profile-form input-first-child"
                value={user.firstName}
                onChange={handleChangeFirstName}
                placeholder="Modifier votre prénom"
              />
            </div>
            <div>
              <label className="label">{t("profile.last_name")}</label>{" "}
              <input
                type="text"
                className="profile-form input-second-child"
                value={user.lastName}
                onChange={handleChangeLastName}
                placeholder="Modifier le nom de famille"
              />
            </div>
            <div>
              <label className="label">E-mail</label>
              <input
                type="email"
                className="profile-form"
                value={user.email}
                onChange={handleChangeEmail}
                placeholder="EntModifierrez l'e-mail"
              />
            </div>
            <div>
              <label className="label">{t("profile.mobile_number")}</label>
              <div style={{ position: "relative" }} className="profile-form4">
                <input
                  style={{ paddingLeft: "70px" }}
                  type="number"
                  className="profile-form3"
                  value={user.mobileNumber}
                  onChange={handlechangeMobileNumber}
                  placeholder="Modifier le numéro de téléphone"
                />
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "60px",
                    bottom: "0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "rgba(128, 128, 128, 1)",
                    background: "rgba(0, 0, 0, 0.1)",
                    borderRight: "2px solid rgba(256, 256, 256, 0.09)",
                  }}
                >
                  +229
                </div>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="submit-button-profile"
              style={{
                background: buttonDisabled
                  ? "rgba(128, 128, 128, 0.2)"
                  : "rgba(128, 128, 128, 1)",
                pointerEvents: buttonDisabled ? "none" : "auto",
                marginBottom: "20px",
                justifySelf: "flex-start",
              }}
            >
              {loading3 ? (
                <div id="container_customerid">
                  <div id="container_customerid_inner"></div>
                </div>
              ) : (
                t("profile.update_details")
              )}
            </button>

            <div className="betid-section" style={{ marginTop: "50px" }}>
              <label className="label">1XBET ID</label>
              <div className="saved_id_container_outer">
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
                {/* <div className="saved_id_container">
                  <BasicModal
                    savedID={savedID}
                    betId={user.betId}
                    makeDefaultId={makeDefaultId}
                    deleteId={deleteId}
                  />
                </div> */}
              </div>
              <input
                type="text"
                className="profile-form"
                value={user.betId}
                onChange={handlechangeBetID}
                placeholder="Entrez l'identifiant 1XBET"
              />
              <div
                className="submit-button1-profile"
                style={{
                  background: "rgba(128, 128, 128, 1)",
                  color: "black",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={addExtraId}
              >
                {loading ? (
                  <div id="container_customerid">
                    <div id="container_customerid_inner"></div>
                  </div>
                ) : (
                  t("profile.save_bet_id")
                )}
              </div>
            </div>

            <div
              className="password-section"
              style={{ marginTop: "60px", width: "100%" }}
            >
              <h3>{t("profile.reset_password")}</h3>
              <div
                style={{
                  color: "rgba(256, 256, 256, 0.5)",
                  width: "100%",
                  display: "flex",
                  margin: "15px 0px",
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
                  &nbsp; {t("profile.password_note")}
                </span>
              </div>
              <div>
                <label className="label">
                  {" "}
                  Entrez l&apos;ancien mot de passe
                </label>
                <input
                  type="text"
                  className="profile-form"
                  value={user.oldPassword}
                  onChange={handleOldPassword}
                  placeholder="entrez l'ancien mot de passe"
                />{" "}
              </div>
              <div style={{ marginTop: "20px" }}>
                <label className="label"> L&apos;ancien mot de passe</label>
                <input
                  type="text"
                  className="profile-form"
                  value={user.password}
                  onChange={handlePassword}
                  placeholder="entrez l'ancien mot de passe"
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <label className="label">{t("profile.new_password")}</label>
                <input
                  type="text"
                  className="profile-form"
                  value={user.confirmPassword}
                  onChange={handleConfirmPassword}
                  placeholder="Entrez un nouveau mot de passe"
                />
              </div>
            </div>

            <button
              onClick={changePassword}
              className="submit-button-profile"
              style={{
                background: buttonDisabled1
                  ? "rgba(128, 128, 128, 0.2)"
                  : "rgba(128, 128, 128, 1)",
                pointerEvents: buttonDisabled1 ? "none" : "auto",
                marginBottom: "20px",
                justifySelf: "flex-start",
                padding: "0px 10px",
                whiteSpace: "nowrap",
              }}
            >
              {loading2 ? (
                <div id="container_customerid">
                  <div id="container_customerid_inner"></div>
                </div>
              ) : (
                t("profile.reset_password")
              )}
            </button>
          </form>
        ) : (
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              id="container_customerid2"
              style={{ alignSelf: "center", justifySelf: "center" }}
            >
              <div id="container_customerid_inner"></div>
            </div>{" "}
          </div>
        )}
      </div>
      <FooterMobile />
    </div>
  );
};

export default Profile;
