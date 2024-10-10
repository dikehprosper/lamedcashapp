"use client";
import "./example.css";
import {useRouter, usePathname, useParams} from "next/navigation"; // Remove unnecessary import
import React, {useState, useEffect} from "react";
import AnimateHeight from "react-animate-height";
import {TransactionTemplateProps} from "@/types";
import formatNumberWithCommasAndDecimal from "@/components/(Utils)/formatNumber";
import {FaCircle} from "react-icons/fa6";
import TransactionResultsCashdesk from "./pendingTransactionTemplate";
import {FaArrowRight} from "react-icons/fa";
import {IoMdArrowDropdown} from "react-icons/io";
import {IoMdArrowDropup} from "react-icons/io";
import Link from "next/link";
import {CgTrashEmpty} from "react-icons/cg";
import Modal from "@/components/(Utils)/(modals)/receiptModalWithdrawal";
import axios from "axios";
import {toast} from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
const TransactionTemplate = () => {
  const {locale} = useParams<{locale: string}>();
  const router = useRouter();
  const pathname = usePathname();
  const [data, setData] = useState<any>();
  const [isOnline, setIsOnline] = useState(true);
  const [loading, setLoading] = useState("two");
  const [isVisible, setIsVisible] = useState(false);
  const [receipt, setReceipt] = useState({});

  const getUserDetails = async () => {
    try {
      setLoading("one");
      const res = await axios.get("/api/getAllPendingTransaction");
      console.log(res.data.data, "this is the new pending data from admin");
      setData(res.data.data);
      setLoading("three");
    } catch (error: any) {
      if (error.response.status === 401) {
        setLoading("two");
        toast.error("user does not exist");
      router.replace("/signin");
      }  else if (error.response.status === 403) {
        setLoading("two");
        toast.error("Your session has expired");
           router.replace("/signin");
      } else {
        setLoading("two");
        toast.error("An error has occur");
      }
    }
  };
  useEffect(() => {
    getUserDetails()
  }, [])

   const handleClick = (value: string, transactionId: any) => {
    console.log(transactionId, "transactionId")
  setData((prevData: any[]) => {
    const updatedData = prevData.filter((transaction: {identifierId: any}) => {
      return transaction.identifierId !== transactionId;
    });
    return updatedData;
  });
  setIsVisible(false);
  };


  const showReceipt = (
     time: any,
  receiptId: any,
  betId: any,
  status: any,
  fundingType: any,
  withdrawalCode: any,
  momoName: any,
  momoNumber: any,
  identifierId: any,
  userEmail: any,
  totalAmount: any,
  bonusBalance: any,
  ) => {
    setIsVisible(true);
    setReceipt({
    time,
    receiptId,
    betId,
    status,
    fundingType,
    withdrawalCode,
    momoName,
    momoNumber,
    identifierId,
    userEmail,
    totalAmount,
    bonusBalance,
    });
  };

    const [currentValue, setCurrentValue] = useState("")
  const [debouncedValue, setDebouncedValue] = useState(currentValue);
  
   useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(currentValue);
    }, 500); // Wait for 500ms

    return () => {
      clearTimeout(handler);
    };
  }, [currentValue]);

  useEffect(() => {
    if (debouncedValue) {
      search(debouncedValue);
    }if (currentValue === "") {
      getUserDetails();
    }
  }, [debouncedValue]);

   async function search(debouncedValue: any) {
    try {
      const res = await axios.get("/api/getAllPendingTransaction");
      setData(res.data.result)
      res.data.result.map((data: any) => {
        if (data.withdrawalCode.startsWith(currentValue)) {
          setData([data]);
          console.log(data);
        }
      });
   
    } catch (error: any) {
     if (error.response.status === 401) {
        toast.error(
            "Vous vous êtes connecté ailleurs. Vous devez vous reconnecter ici."
          );

      toast.error("user does not exist");
    } else if (error.response.status === 403) {
        toast.error(
            "Votre session a expiré. Redirection vers la connexion..."
          );
  
        router.replace("/signin");
    } else {
 
        toast.error("An error has occur");
      }
    }
  }


   const updatedTheme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    // Dynamically add a style tag to the document head for placeholder styling
    const placeholderColor = updatedTheme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";
    const color = updatedTheme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)";
    const style = document.createElement('style');
    style.innerHTML = `
      .tablesearch::placeholder {
        color: ${placeholderColor};
      },
       .tablesearch {
        color: ${color} !important;
      },
    `;
    document.head.appendChild(style);

    // Clean up the style tag on component unmount
    return () => {
      document.head.removeChild(style);
    };
  }, [updatedTheme]);





  return updatedTheme === "dark" || updatedTheme === "light" ? loading === "one" ? (
    <div className='subadmin_dashboard_container_admin_admin-cashdesk' style={{
          background: updatedTheme === "dark" ? "rgb(10, 20, 38)" : "white",
        }}>
      <div className='transaction_template_container_header'>
        <span className='transaction_template_container_header_1'>
          <h2 style={{color: updatedTheme === "dark"? "white": "black" }}> Pending Withdrawals</h2>
        </span>
      </div>
      <div
        className='transaction_template_container'
        style={{
          background: "rgba(0, 0, 0, 0.5)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div id='container-signin-cashdesk'>
          <div id='html-spinner-signin-cashdesk'></div>
        </div>
      </div>
    </div>
  ) : loading === "two" ? (
    <div className='subadmin_dashboard_container_admin_admin-cashdesk' style={{
          background: updatedTheme === "dark" ? "rgb(10, 20, 38)" : "white",
        }}>
      <div className='transaction_template_container_header'>
        <span className='transaction_template_container_header_1'>
          <h2 style={{color: updatedTheme === "dark"? "white": "black" }}>Pending Withdrawals</h2>
        </span>
      </div>
      <div
        className='transaction_template_container'
        style={{
          background: "rgba(0, 0, 0, 0.5)",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={getUserDetails}
      >
        <h4 style={{cursor: "pointer",color: updatedTheme === "dark"? "white": "black" }}>Tap here to fetch history</h4>
      </div>
    </div>
  ) : (
    <div className='subadmin_dashboard_container_admin_admin-cashdesk' style={{
          background: updatedTheme === "dark" ? "rgb(10, 20, 38)" : "white",
        }}>
      <div className='transaction_template_container_header'>
        <span className='transaction_template_container_header_1'>
          <h2 style={{color: updatedTheme === "dark"? "white": "black" }}>Pending Withdrawals</h2>
        </span>
      </div>

      <div className='transaction_template_container' style={{
        background: updatedTheme === "dark" ? "rgb(10, 20, 38)" : "white", boxShadow: updatedTheme === "dark" ? "" : "0px 4px 10px rgba(0, 0, 0, .3)"
      }}>
         <div
          style={{
            width: "100%",
            height: "40px",
            gap: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            className='tablesearch'
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            placeholder='Input the ID to search for transactions'
             style={{
             color: updatedTheme === "dark" ? "white" : "black",
               }}
          />

          <button
            style={{
              height: "100%",
              fontWeight: "bold",
              width: "70px",
              borderRadius: "5px",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={search}
          >
            Search
          </button>
        </div>
        {isVisible && (
          <Modal
            containerStyles='receiptModal'
            containerStylesInner='receiptModal_inner'
            handleClick={handleClick}
            receipt={receipt}
            title='Montant du dépôt'
          />
        )}

        <div
          className='transaction_template_container_body_2 animate-pop-in'
      
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "flex-start",
            justifyContent: "flex-start",
                   background: updatedTheme === "dark" ? "rgb(10, 20, 38)" : "white", boxShadow: updatedTheme === "dark" ? "" : "0px 4px 10px rgba(0, 0, 0, .3)"
          }}
        >
          {data?.length < 1 ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingTop: "50px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {" "}
              <h2  style={{
             color: updatedTheme === "dark" ? "white" : "black",
               }}>No data to display</h2>
            </div>
          ) : (
            data
              ?.reverse()
              .map((filteredData: any, index: any) => (
                <TransactionResultsCashdesk
                  key={index}
                  time={filteredData.registrationDateTime}
                  receiptId={filteredData._id}
                  betId={filteredData.betId}
                  status={filteredData.status}
                  fundingType={filteredData.fundingType}
                  withdrawalCode={filteredData.withdrawalCode}
                  momoName={filteredData.momoName}
                  momoNumber={filteredData.momoNumber}
                  identifierId={filteredData.identifierId}
                  userEmail={filteredData.userEmail}
                  totalAmount={filteredData.totalAmount}
                  bonusBalance={filteredData.bonusBalance}
                  showReceipt={showReceipt}
                  updatedTheme={updatedTheme}
                />
              ))
          )}
        </div>
      </div>
    </div>
  ): null
};

export default TransactionTemplate;
