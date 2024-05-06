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
import useTranslation from "next-translate/useTranslation";

const Referrals = () => {
  const pathname = usePathname();
  const { t, lang } = useTranslation("dashboard");
  const router = useRouter();
  const [data, setData] = useState<any>([]);
  const [isOnline, setIsOnline] = useState(true);

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/getUser");
      setData(res.data.data);
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

  if ("referrals" in data) {
    if (!submitting) {
      getReferrals();
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

  const [referrals, setReferrals] = useState([]);

  if ("referrals" in data) {
    if (!submitting) {
      getReferrals();
    }
  }

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

  return (
    <div className="user-referral-container">
      <Head
        title={t("referral_page.title")}
        about={t("referral_page.about")}
        data={data}
      />

      <Referral data={data} />

      <div className="user-referral-container2">
        <div className="user-referral-container2-inner1">
          <div
            className="user-referral-container2-inner2"
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
            <span style={{ zIndex: "10" }}>
              {t("referral_page.how_it_works")}
            </span>
          </div>
          <div
            className="user-referral-container2-inner2"
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
            <span style={{ zIndex: "10" }}>{t("referral_page.title")}</span>
          </div>
        </div>

        {active === "user-referral-container2-inner3" ||
        active === "user-referral-container2-inner5" ? (
          <div className="user-referral-container2-inner1-inner2">
            <p
              style={{
                textTransform: "capitalize",
                color: "rgba(256, 256, 256, 0.7)",
              }}
            >
              <span style={{ color: "red" }}>*</span>{" "}
              {t("referral_page.copyReferralLink")}
            </p>
            <p
              style={{
                textTransform: "capitalize",
                color: "rgba(256, 256, 256, 0.7)",
              }}
            >
              {" "}
              <span style={{ color: "red" }}>*</span>{" "}
              {t("referral_page.10_percent")}
            </p>
            <p
              style={{
                textTransform: "capitalize",
                color: "rgba(256, 256, 256, 0.7)",
              }}
            >
              <span style={{ color: "red", textTransform: "capitalize" }}>
                *
              </span>{" "}
              {t("referral_page.exceed")}
            </p>
          </div>
        ) : null}

        {active === "user-referral-container2-inner4" ||
        active === "user-referral-container2-inner6" ? (
          <div className="user-referral-container2-inner1-inner">
            <div className="user-referral-display">
              <Display
                count={totalCount}
                title={t("deposit")}
                term={1}
                data={data?.transactionHistory}
                allData={data}
                style={{
                  color: "#658900",
                  background: "rgba(128, 128, 128, 0.2)",
                  icon: <TbPigMoney />,
                }}
              />
              <Display
                term={2}
                title={t("withdraw")}
                amount={total}
                data={data?.transactionHistory}
                allData={data}
                style={{
                  color: "#0076B8",
                  background: "rgba(128, 128, 128, 0.2)",
                  icon: <RiMoneyDollarCircleLine />,
                }}
              />
            </div>
            <div style={{ fontSize: "10px", color: "grey", margin: "10px" }}>
              <span style={{ color: "red", fontWeight: "bold" }}>
                Note: &nbsp; &nbsp;
              </span>
              {t("referral_page.earningsNote")}{" "}
            </div>
            <div
              className="withdraw-button-retirer"
              style={{
                background:
                  total >= 20000
                    ? "rgba(128, 128, 128, 0.9)"
                    : "rgba(128, 128, 128, 0.2)",
                color: total >= 20000 ? "black" : "rgba(128, 128, 128, 0.8)",
                pointerEvent: total >= 20000 ? "auto" : "none",
              }}
            >
              {t("referral_page.withdraw")}
              <div
                style={{
                  position: "absolute",
                  right: "10px",
                  height: "100%",
                  width: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {total < 20000 ? <TiCancel fontSize="45px" /> : null}
              </div>
            </div>
            <div className="body-referral-count">
              <div className="body-referral-count2">
                {referrals.length > 0 ? (
                  referrals.map((referral): any => {
                    const number = referral.SuccesfulDepositCountusers;
                    const threePercent = (3 / 100) * number;
                    const result = (5 / 100) * threePercent;
                    const number2 = referral.SuccesfulWithdrawalCountusers;
                    const threePercent2 = (3 / 100) * number2;
                    const result2 = (5 / 100) * threePercent2;
                    const total = result + result2;

                    return (
                      // eslint-disable-next-line react/jsx-key
                      <>
                        <div className="body-referral-count3">
                          <div className="body-referral-count4">
                            {t("referral_page.name")}
                          </div>
                          <div className="body-referral-count4">E-mail</div>
                          <div className="body-referral-count4">
                            {t("transaction_page.amount")}
                          </div>
                        </div>
                        <div className="body-referral-count5">
                          <div className="body-referral-count6">
                            {referral.name}
                          </div>
                          <div className="body-referral-count6">
                            {referral.email}
                          </div>
                          <div className="body-referral-count6">
                            XOF &nbsp; {formatNumberWithCommasAndDecimal(total)}
                          </div>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <div
                    className="no-result animate-pop-in"
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
                    <CgTrashEmpty fontSize="60px" />
                    <h5>{t("referral_page.noReferrals")}</h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Referrals;
