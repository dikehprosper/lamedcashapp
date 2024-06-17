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
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateUser } from "@/lib/features/userSlice";
import { setUser } from "@/lib/features/userSlice";
interface YourComponentProps {
  savedID: number[];
}
const Profile = () => {
  const t = useTranslations("dashboard");
  const [open, setOpen] = useState(false);``
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [buttonDisabled1, setButtonDisabled1] = useState(true);
  const [savedID, setSavedID] = useState([]);
  const [activeBetId, setActiveBetId] = useState("");
  const [success, setSuccess] = useState(false);
 const data = useAppSelector((state: any) => state.user.value);
  const dispatch = useAppDispatch();
  const [user, setUser1] = useState({
firstName: data.fullname.split(' ')[0],
    lastName: data.fullname.split(' ')[1],
    fullname: data.fullname,
    email: data.email,
    mobileNumber: data.number,
    betId: "",
    oldPassword: "",
    password: "",
    confirmPassword: "",
    _id: data._id,
  });
  const router = useRouter();
 
   const [isOnline, setIsOnline] = useState(true);
  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/getUser");
      dispatch(setUser(res.data.data))
    } catch (error: any) {
      if (error.response) {
        // Handle token expiration
        if (error.response.status === 401) {
          toast.error(t("token_expired") as string);
          router.push("/signin"); // Replace '/login' with your actual login route
        } else if (error.response.status === 402) {
          toast.error(t("session_expired") as string);
          router.push("/signin"); // Replace '/login' with your actual login route
        } else if (error.response.status === 404) {
          toast.error(t("account_disabled") as string);
          router.push("/signin"); // Replace '/login' with your actual login route
        } else {
          // Handle other errors
          toast.error(t("unknown_error"));
        }
      } else if (error.request) {
        // Handle network errors (no connection)
        setIsOnline(false);
      }
    }
  }

    useEffect(() => {
 
      getUserDetails();

  }, []);

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




  const handleChangeFirstName = (event: any) => {
    setButtonDisabled(false);
    setUser1({
      ...user,
      firstName: event.target.value,
    });
  };

  const handleChangeLastName = (event: any) => {
    setButtonDisabled(false);
    setUser1({
      ...user,
      lastName: event.target.value,
    });
  };

  const handleChangeEmail = (event: any) => {
    setButtonDisabled(false);
    setUser1({
      ...user,
      email: event.target.value,
    });
  };

  const handlechangeMobileNumber = (event: any) => {
    console.log("documenting")
    setButtonDisabled(false);
    setUser1({
      ...user,
      mobileNumber: event.target.value,
    });
  };

 
  const handlePassword = (event: any) => {
    setButtonDisabled1(false);
    setUser1({
      ...user,
      password: event.target.value,
    });
  };
  const handleOldPassword = (event: any) => {
    setButtonDisabled1(false);
    setUser1({
      ...user,
      oldPassword: event.target.value,
    });
  };

  const handleConfirmPassword = (event: any) => {
    setButtonDisabled1(false);
    setUser1({
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
    };
    if (
      updatedUser?.mobileNumber?.length < 8 ||
      updatedUser?.mobileNumber?.length > 8
    ) {
      setLoading3(false);
      return toast.error(
        "le numéro de portable doit être composé de 8 chiffres"
      );
    } else {
      try {
        const res = await axios.post("/api/updateCurrentUserInfo", updatedUser);
        toast.success("le profil a été mis à jour avec succès");
        dispatch(updateUser(res.data.resultData));
        setLoading3(false);
      } catch (error: any) {
        setLoading3(false);
        toast.error("échec de la mise à jour des informations utilisateur");
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



const imageUrl = data.image === ""?  "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/Untitled%20design%20(4)%20(1).png?alt=media&token=7f06a2ba-e4c5-49a2-a029-b6688c9be61d" : data.image

  return (
    <div className="user_profile_container">
      <Head title={t("profile.title")} about={t("profile.about")} data={data} />

      <div className="user_profile_container_001">
        {data ? (
          <form className="profile-form-container">
            <div className="add-photo">
              <div className="add-photo-container appear">
                 <Image
          src={imageUrl}
          style={{ objectFit: "contain", borderRadius: 40 }}
          alt="background"
           width={80}
        height={80}
        />
      
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

            {/* <div className="betid-section" style={{ marginTop: "50px" }}>
              <label className="label">1XBET ID</label>
              <div className="saved_id_container_outer">
                <div
                  style={{
                    color: "rgba(256, 256, 256, 0.5)",
                    width: "100%",
                    display: "flex",
                  }}
                >
                  {t("withdraw_page.saved_id_info")}
                </div>
                {/* <div className="saved_id_container">
                  <BasicModal
                    savedID={savedID}
                    betId={user.betId}
                    makeDefaultId={makeDefaultId}
                    deleteId={deleteId}
                  />
                </div> 
              </div>
              <input
                type="text"
                className="profile-form"
                value={user.betId}
                onChange={handlechangeBetID}
                placeholder={t("withdraw_page.enter_bet_id")}
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
            </div> */}

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
                  {t("profile.enter_old_password")}
                </label>
                <input
                  type="text"
                  className="profile-form"
                  value={user.oldPassword}
                  onChange={handleOldPassword}
                  placeholder={t("profile.enter_old_password")}
                />{" "}
              </div>
              <div style={{ marginTop: "20px" }}>
                <label className="label">{t("profile.old_password")}</label>
                <input
                  type="text"
                  className="profile-form"
                  value={user.password}
                  onChange={handlePassword}
                  placeholder={t("profile.enter_old_password")}
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <label className="label">
                  {t("profile.enter_new_password")}
                </label>
                <input
                  type="text"
                  className="profile-form"
                  value={user.confirmPassword}
                  onChange={handleConfirmPassword}
                  placeholder={t("profile.new_password")}
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
