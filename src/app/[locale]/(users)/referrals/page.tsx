/* eslint-disable react/no-unescaped-entities */
/* eslint-disable */
// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import UserNav from "@/components/(Navs)/UserNav";
import Head from "@/components/(userscomponent)/(head)/head";
import "./referrals.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { TbPigMoney } from "react-icons/tb";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import Display from "@/components/(userscomponent)/(display)/display2";
import { usePathname } from "next/navigation";
import Referral from "@/components/(referral)/referral";
import formatNumberWithCommasAndDecimal from "@/components/(Utils)/formatNumber";
import { CgTrashEmpty } from "react-icons/cg";
import { TiCancel } from "react-icons/ti";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import langDataEn from "@/messages/en.json";
import langDataFr from "@/messages/fr.json";
import Cookies from "js-cookie";
const Referrals = () => {
  const pathname = usePathname();

 const updatedTheme = useAppSelector(
    (state: any) => (state.theme as any)?.theme
  );

  const router = useRouter();
 
  const [isOnline, setIsOnline] = useState(true);
  const data = useAppSelector((state: any) => state.user.value);

  const transactions = useAppSelector(
    (state: any) => state.user.pendingTransactions
  );
  const dispatch = useAppDispatch();

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/getUser");
   dispatch(setUser(res.data.data));
    } catch (error: any) {
      if (error.response) {
        // Handle token expiration
        if (error.response.status === 401) {
          toast.error(
            "Vous vous êtes connecté ailleurs. Vous devez vous reconnecter ici."
          );
          router.push(`${updatedLang}/signin`); // Replace '/login' with your actual login route
        } else if (error.response.status === 402) {
          toast.error(
            "Votre session a expiré. Redirection vers la connexion..."
          );
          router.push(`/${updatedLang}/signin`); // Replace '/login' with your actual login route
        } else if (error.response.status === 404) {
          toast.error("Votre compte a été désactivé");
          router.push(`${updatedLang}/signin`);
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
  const [submitting, setSubmitting] = useState(false);

  async function getReferrals() {
    try {
      setSubmitting(true);
      const referrals = data.referrals;
      const res = await axios.post("/api/getTotalReferral", referrals);
      setReferrals(res.data.usersSuccesfulCountusers);
      setSubmitting(false);
    } catch (error: any) {
      toast.error("error ");
    }
  }

  

  useEffect(() => {
    getReferrals();
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

  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    console.log(referrals, "kkkkkkkkk");
  });

  async function getReferrals() {
    try {
      setSubmitting(true);
      const referrals = data.referrals;
      const res = await axios.post("/api/getTotalReferral", referrals);
      setReferrals(res.data.usersSuccesfulCountusers);
      setSubmitting(false);
    } catch (error: any) {
      toast.error("error ");
    }
  }

  const amountsArray = referrals?.map((obj) => obj?.SuccesfulDepositCountusers);
  const totalAmount = amountsArray?.reduce(
    (acc, SuccesfulDepositCountusers) => acc + SuccesfulDepositCountusers,
    0
  );

  const amountsArray2 = referrals?.map(
    (obj) => obj?.SuccesfulWithdrawalCountusers
  );
  const totalAmount2 = amountsArray2?.reduce(
    (acc, SuccesfulWithdrawalCountusers) => acc + SuccesfulWithdrawalCountusers,
    0
  );

  const result = totalAmount + totalAmount2;
  const threePercent = (3 / 100) * result;
  const total = (5 / 100) * threePercent;
  const totalCount = referrals?.length;

  const [active, setActive] = useState("user-referral-container2-inner5");
 
  useEffect(() => {
    // Dynamically add a style tag to the document head for placeholder styling
    const placeholderColor =
      updatedTheme === "dark"
        ? "rgba(255, 255, 255, 0.2)"
        : "rgba(0, 0, 0, 0.2)";
    const color =
      updatedTheme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)";
    const style = document.createElement("style");
    style.innerHTML = `
      .withdraw-form::placeholder {
        color: ${placeholderColor};
      }
    `;
    document.head.appendChild(style);

    // Clean up the style tag on component unmount
    return () => {
      document.head.removeChild(style);
    };
  }, [updatedTheme]);

 
  //Language settings
  const getCurrentLangFromPath = (): string => {
    const currentPath = window.location.pathname; // Use window.location.pathname instead of router.asPath
    const currentLang = currentPath.split("/")[1]; // Extract the first part of the path
    return currentLang === "fr" || currentLang === "en" ? currentLang : "fr"; // Default to 'fr' if not 'en' or 'fr'
  };

  useEffect(() => {
    const currentLang = getCurrentLangFromPath();

    // Check if the cookie is already set to the current language in the path
    const cookieLang = Cookies.get("locale");

    if (cookieLang !== currentLang) {
      // If the cookie is not set to the current language, update the cookie
      Cookies.set("locale", currentLang, {expires: 365}); // Set cookie to last 1 year
    }
  }, [window.location.pathname]); // Update dependency to window.location.pathname

  const updatedLang = getCurrentLangFromPath();

  const getLangData = () => {
    return updatedLang === "en" ? langDataEn : langDataFr;
  };

  const t = getLangData();

  return updatedTheme === "dark" ||
    (updatedTheme === "light" && updatedLang === "en") ||
    updatedLang === "fr" ? (
    <div
      className='user-referral-container'
      style={{
        background: updatedTheme === "dark" ? "rgb(10, 20, 38)" : "white",
      }}
    >
      <Head
        title={t.referral_page.title}
        about={t.referral_page.about}
        data={data}
        updatedTheme={updatedTheme}
        display={false}
        t={t.dashboard.copy}
      />

      <Referral data={data}    updatedTheme={updatedTheme} t={t} />

      <div className='user-referral-container2'>
        <div className='user-referral-container2-inner1'>
          <div
            className='user-referral-container2-inner2'
            onClick={() => setActive("user-referral-container2-inner3")}
            style={{
              color:
                active === "user-referral-container2-inner3" ? "black" : "",
            }}
          >
            <div
              className={
                active === "user-referral-container2-inner4" ||
                active === "user-referral-container2-inner6"
                  ? "user-referral-container2-inner8"
                  : active
              }
            ></div>
            <span style={{zIndex: "10"}}>
              {t.referral_page.how_it_works}
            </span>
          </div>
          <div
            className='user-referral-container2-inner2'
            onClick={() => setActive("user-referral-container2-inner4")}
            style={{
              color:
                active === "user-referral-container2-inner4" ? "black" : "",
            }}
          >
            <div
              className={
                active === "user-referral-container2-inner3" ||
                active === "user-referral-container2-inner5"
                  ? "user-referral-container2-inner7"
                  : active
              }
            ></div>
            <span style={{zIndex: "10"}}>
              {t.referral_page.title}
              </span>
          </div>
        </div>

        {active === "user-referral-container2-inner3" ||
        active === "user-referral-container2-inner5" ? (
          <div className='user-referral-container2-inner1-inner2'>
            <p
              style={{
                textTransform: "capitalize",
                color: updatedTheme === "dark" ? "white" : "black",
              }}
            >
              {t.referral_page.copyReferralLink}
            </p>
          </div>
        ) : null}

        {active === "user-referral-container2-inner4" ||
        active === "user-referral-container2-inner6" ? (
          <div className='user-referral-container2-inner1-inner'>
            <div
              className='body-referral-count'
              style={{
                background: updatedTheme === "dark" ? "" : "white",
                borderRadius: "3px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className='body-referral-count2'>
                <div className='body-referral-count3'>
                  <div
                    className='body-referral-count4'
                    style={{color: updatedTheme === "dark" ? "white" : "black"}}
                  >
                    {t.transaction_page.image}
                  </div>
                  <div
                    className='body-referral-count4'
                    style={{color: updatedTheme === "dark" ? "white" : "black"}}
                  >
                    {t.referral_page.name}
                  </div>
                  <div
                    className='body-referral-count4'
                    style={{color: updatedTheme === "dark" ? "white" : "black"}}
                  >
                    {" "}
                    {t.referral_page.email}
                  </div>
                </div>
                {referrals ? (
                  referrals.length > 0 ? (
                    referrals.map((referral): any => {
                      const number = referral.SuccesfulDepositCountusers;
                      const threePercent = (3 / 100) * number;
                      const result = (5 / 100) * threePercent;
                      const number2 = referral.SuccesfulWithdrawalCountusers;
                      const threePercent2 = (3 / 100) * number2;
                      const result2 = (5 / 100) * threePercent2;
                      const total = result + result2;
                      const imageUrl =
                        referral.image === ""
                          ? "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/Untitled%20design%20(4)%20(1).png?alt=media&token=7f06a2ba-e4c5-49a2-a029-b6688c9be61d"
                          : referral.image;
                      return (
                        <div className='body-referral-count5'>
                          <div className='body-referral-count6'>
                            <Image
                              src={imageUrl}
                              style={{objectFit: "contain", borderRadius: 15}}
                              alt='background'
                              width={30}
                              height={30}
                            />
                          </div>
                          <div
                            className='body-referral-count6'
                            style={{
                              color:
                                updatedTheme === "dark" ? "white" : "black",
                            }}
                          >
                            {referral.name}
                          </div>
                          <div
                            className='body-referral-count6'
                            style={{
                              color:
                                updatedTheme === "dark" ? "white" : "black",
                            }}
                          >
                            {referral.email}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div
                      className='no-result animate-pop-in'
                      style={{
                        display: "flex",
                        width: "100%",
                        height: "100%",
                        flex: "1",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "30px",
                        flexDirection: "column",
                        textAlign: "center",
                        alignSelf: "center",
                        marginTop: "50px",
                      }}
                    >
                      <CgTrashEmpty
                        fontSize='60px'
                        style={{
                          color: updatedTheme === "dark" ? "white" : "black",
                        }}
                      />
                      <h5
                        style={{
                          color: updatedTheme === "dark" ? "white" : "black",
                        }}
                      >
                        {t.referral_page.noReferrals}
                      </h5>
                    </div>
                  )
                ) : (
                  "loading"
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
};

export default Referrals;
