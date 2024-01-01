"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./referral.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CiCircleCheck } from "react-icons/ci";


const Referral = ({ data }: any) => {
  const [user, setUser] = useState("");
  const [id, setId] = useState<any>();
  const [isOnline, setIsOnline] = useState(true);
  const [referralLink, setReferralLink] = useState("");
  const router = useRouter();
  const [copied, setCopied] = useState("true");

  // Function to update the referral link based on the user's _id
  const updateReferralLink = () => {
    // @ts-ignore
    if (id) {
      // @ts-ignore
      const newReferralLink = `https://www.betfundr.com/signup/${id}`;
      setReferralLink(newReferralLink);
    }
  };

  // const getUserDetails = async () => {
  //   const res = await axios.get("/api/users/me");
  //   console.log(res.data.data);
  //   setUser(res.data.data);
  // };

  // useEffect(() => {
  //   getUserDetails();
  // }, []);

  // Use an effect to update the referral link whenever the user state changes
  useEffect(() => {
    updateReferralLink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Function to copy the referral link to the clipboard
  const copyContent = () => {
    // Get the content of the input element
    const inputElement = document.getElementById("address");

    // Check if the input element exists
    if (inputElement) {
      // @ts-ignore
      const referralLink = inputElement.value;

      if (referralLink) {
        // Copy the referral link to the clipboard
        navigator.clipboard
          .writeText(referralLink)
          .then(() => {
            setCopied("true3");

            toast.success("Referral Link copied to clipboard: " + referralLink);

            // Set to "true2" after 500 milliseconds (3 seconds)
            setTimeout(() => {
              setCopied("true2");
            }, 500);

            // Set to "true" after another 2000 milliseconds (3 seconds)
            setTimeout(() => {
              setCopied("true");
            }, 2000);
          })
          .catch((error) => {
            console.error("Copy to clipboard failed:", error);
          });
      }
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/getUserInfo");
      setId(res.data.data._id);
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

useEffect(() => {
console.log(data)
}, [data])

  return (
    <>
      {data._id ? (
        <div className='referral-body-espece'>
          <div
            style={{
              display: "flex",
              height: "50%",
              width: "100%",
              alignItems: "start",
              opacity: "0.3",
              fontWeight: "300",
              fontSize: "15px",
            }}
          >
            My Referral Link
          </div>
          <div
            style={{
              display: "flex",
              height: "50%",
              width: "100%",
              alignItems: "center",
              fontWeight: "300",
              fontSize: "14px",
            }}
          >
            <input
              style={{
                backgroundColor: "#0B1325",
                height: "39px",
                borderRadius: "4.5px 0px 0px 4.5px",
              }}
              className='signup-input-espece form3-espece source'
              id='address' // Added id to identify the input element
              type='text'
              value={referralLink || ""}
              readOnly // Add this attribute to make it non-editable
              placeholder={referralLink || ""}
            />
            <div
              className='referral-link-input-espece'
              onClick={copyContent} // Call the copyContent function on click
            >
              {copied === "true" && "Copy Referral Link"}

              {copied === "true2" && (
                <CiCircleCheck className='CiCircleCheck' />
              )}
              {copied === "true3" && (
                <div className='tag-container2-copy'>
                  {" "}
                  <div id='container_customerid-copy'>
                    <div id='container_customerid_inner-copy'></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className='referral-body-espece-referral1'>
          <div id='container-referral1'>
            <div id='html-spinner-referral1'></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Referral