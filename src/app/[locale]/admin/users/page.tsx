/* eslint-disable */
// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./users.css";
import AdminHead from "@/components/(adminHead)/adminHead";
import { toast } from "react-toastify";
import axios from "axios";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import Image from "next/image";
import formatNumberWithCommasAndDecimal from "@/components/(Utils)/formatNumber";
function Page() {
  const router = useRouter();
  const [data, setData] = useState<any>();
  const [data2, setData2] = useState<any>();
  const [data3, setData3] = useState<any>();
  const [data4, setData4] = useState<any>();
  const [isOnline, setIsOnline] = useState(true);
  const [height, setHeight] = useState(0);
   const [userData, setAllUserData] = useState<any>(null);

   const getUserDetails = async () => {
     try {
       const res = await axios.get("/api/getAllSubadminDetails");
       setData(res.data.data.user4);
       setData3(res.data.data.user3);
       console.log(res.data.data.user4);
     } catch (error: any) {
       if (error.response) {
         // Handle token expiration
         if (error.response.status === 401) {
          toast.error("L'utilisateur n'existe pas");
           router.replace("/signin");
         } else if (error.response.status === 403) {
           toast.error(
             "Votre session a expiré. Redirection vers la connexion..."
           );
           router.replace("/signin");
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
   const [index1, setIndex1] = useState();
   const [index2, setIndex2] = useState();
   function changeHeight(index) {
     setIndex1((prev) => {
       if (index === prev) {
         return null;
       } else {
         return index;
       }
     });
   }


   const [referrals, setReferrals] = useState([]);
   const [isSubmitting, setIsSubmitting] = useState(false);

   // async function getReferrals(id) {
   //   try {
   //     const res = await axios.post("/api/getSpecificUserReferral", {
   //       referrals: id,
   //     });
   //     setReferrals(res.data.usersSuccesfulCountusers);
   //   } catch (error: any) {
   //     console.error("Error fetching referrals:", error);
   //     toast.error("An error occurred while fetching referrals.");
   //   }
   // }

   

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
     }
   }, [debouncedValue]);

   async function search(debouncedValue: any) {
     try {
       setData(null);
       setLoading(true);
       const res = await axios.get("/api/getAllSubadminDetails");
       const filteredData = res.data.data.user4.filter((data: any) =>
         data.email.startsWith(currentValue)
       );
       setAllUserData(res.data.data.user4);
       setData(filteredData);
       console.log(filteredData);
       setLoading(false);
     } catch (error: any) {
       if (error.response.status === 401) {
         toast.error("L'utilisateur n'existe pas");
         setLoading(false);
         toast.error("user does not exist");
       } else if (error.response.status === 403) {
         toast.error(
           "Votre session a expiré. Redirection vers la connexion..."
         );
         setLoading(false);
         router.replace("/signin");
       } else {
         setLoading(false);
         toast.error("An error has occur");
       }
     }
   }

   const [loading, setLoading] = useState(false);

   async function changeActivationStatus(id) {
     try {
       setLoading(true);
       const res = await axios.post("/api/changeActivationStatus2", {id: id});
        setData((prevData: any[]) => {
    const updatedData = prevData.map((transaction: any) => {
      if (transaction._id === id) {
        return {
          ...transaction,
          isActivated: !transaction.isActivated,
        };
      }
      return transaction;
    });

    return updatedData;
  });
   
     } catch (error) {
       if (error.response.status === 401) {
         toast.error("L'utilisateur n'existe pas");
         setLoading(false);
         toast.error("user does not exist");
       } else if (error.response.status === 403) {
         toast.error(
           "Votre session a expiré. Redirection vers la connexion..."
         );
         setLoading(false);
         router.replace("/signin");
       } else {
         toast.error("An error occurred");
       }
     } finally {
       // Set loading back to false, whether the request was successful or not
       setLoading(false);
     }
   }




  //    const handleClick = (value: string, transactionId: any) => {
  //   console.log(transactionId, "transactionId")
  // setData((prevData: any[]) => {
  //   const updatedData = prevData.filter((transaction: {identifierId: any}) => {
  //     return transaction.identifierId !== transactionId;
  //   });
  //   return updatedData;
  // });
  // setIsVisible(false);
  // };

   return (
     <div className='subadmin_dashboard_container_admin_admin_admin'>
       <AdminHead
         title='Tableau de bord'
         about='Voir toutes les transactions ici'
         data={data3}
       />

       <div className='subadmin_dashboard_container_admin_admin_admin1'>
         <div className='subadmin_dashboard_container_admin_admin_admin2'>
           <div
             style={{
               width: "100%",
               padding: "0px 10px 0px 10px",
               display: "flex",
               justifyContent: "space-between",
             }}
           >
             {" "}
             <h3>All Users</h3>
           </div>
           <div
             style={{
               width: "100%",
               height: "40px",
               gap: "10px",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               marginBottom: "20px",
             }}
           >
             <input
               className='tablesearch'
               value={currentValue}
               onChange={(e) => setCurrentValue(e.target.value)}
               placeholder='Input email to search for user'
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
           {!data ? (
             <div className='tag-container2'>
               <div id='container_customerid'>
                 <div id='container_customerid_inner'></div>
               </div>
             </div>
           ) : (
             data?.map((data, index) => {
               const successfulDeposits = data.transactionHistory.filter(
                 (transaction: {status: string; fundingType: string}) =>
                   transaction.status === "Successful" &&
                   transaction.fundingType === "deposits"
               );

               const totalSuccessfulDeposits = successfulDeposits.reduce(
                 (total: number, transaction: any) =>
                   total + parseFloat(transaction.totalAmount),
                 0
               );

               const successfulWithdrawals = data.transactionHistory.filter(
                 (transaction: {status: string; fundingType: string}) =>
                   transaction.status === "Successful" &&
                   transaction.fundingType === "withdrawals"
               );

               const totalSuccessfulWithdrawals = successfulWithdrawals.reduce(
                 (total: number, transaction: any) =>
                   total + parseFloat(transaction.totalAmount),
                 0
               );

               const imageUrl = data.image === ""?  "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/Untitled%20design%20(4)%20(1).png?alt=media&token=7f06a2ba-e4c5-49a2-a029-b6688c9be61d" : data.image


               return (
                 <div
                   className='subadmin_dashboard_container_admin_admin_admin5-1'
                   key={index}
                   style={{
                     height: index === index1 ? "590px" : "40px",
                     transition: "height .5s ease-out",
                   }} // Adjust the height as needed
                 >
                   <div className='subadmin_dashboard_container_admin_admin_admin5'>
                     <div
                       style={{
                         width: "155px",
                         gap: "10px",
                         height: "100%",
                         display: "flex",
                         alignItems: "center",
                       }}
                     >
                    
                       <span
                         style={{
                           minWidth: "8px",
                           maxWidth: "8px",
                           background: "rgba(120, 120, 120, 1)",
                           height: "100%",
                           borderRadius: "5px",
                         }}
                       ></span>
                        <div className="add-photo-container appear" style={{border: '1px solid rgba(120, 120, 120, 1)', height: "100%", width: 30, height: 30, borderRadius: 15}}>
                  <Image
                src={imageUrl}
                style={{ objectFit: "contain", borderRadius: 15 }}
                alt="background"
              width={28}
                height={28}
                 /> 
              </div>
                       
                      <span style={{
  whiteSpace: "nowrap",
  fontWeight: "bold",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100px", // Set the desired maximum width
  display: "inline-block",
}}>
  {data.fullname}
</span>
                     </div>
                     <div
                       className='view-activities'
                       onClick={(e) => changeHeight(index)}
                     >
                       View Activities
                       {index === index1 ? (
                         <IoMdArrowDropup fontSize='18px' />
                       ) : (
                         <IoMdArrowDropdown fontSize='18px' />
                       )}
                     </div>
                   </div>

                   {index === index1 && (
                     <div
                       style={{
                         display: "flex",
                         flexDirection: "column",
                         padding: "10px 0px",
                         width: "100%",
                         height: "100%",
                       }}
                     >
                       <div
                         style={{
                           height: "35px",
                           width: "100%",
                           borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                           borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                           padding: "0px 9px",
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                         }}
                       >
                         <span
                           className='span1'
                           style={{fontWeight: "bold", opacity: "0.65"}}
                         >
                           Name:
                         </span>{" "}
                         <span className='span2'>{data.fullname}</span>
                       </div>

                       <div
                         style={{
                        height: "35px",
                           width: "100%",
                           borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                           borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                           padding: "0px 9px",
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                         }}
                       >
                         <span
                           style={{fontWeight: "bold", opacity: "0.65"}}
                           className='span1'
                         >
                           Email:
                         </span>{" "}
                         <span className='span2'>{data.email}</span>
                       </div>

                       <div
                         style={{
                            height: "35px",
                           width: "100%",
                           borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                           borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                           padding: "0px 9px",
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                         }}
                       >
                         <span
                           className='span1'
                           style={{fontWeight: "bold", opacity: "0.65"}}
                         >
                           Logged in:
                         </span>{" "}
                         <span
                           className='span2'
                           style={{color: data.isLoggedIn ? "green" : "red"}}
                         >
                           {data.isLoggedIn ? "Yes" : "No"}
                         </span>
                       </div>

                       <div
                         style={{
                           height: "25px",
                           width: "100%",
                           borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                           borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                           padding: "0px 9px",
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                         }}
                       >
                         <span
                           className='span1'
                           style={{fontWeight: "bold", opacity: "0.65"}}
                           className='span1'
                         >
                           Successful Deposits:
                         </span>{" "}
                         <span className='span2'>
                           XOF &nbsp;{" "}
                           {formatNumberWithCommasAndDecimal(
                             totalSuccessfulDeposits
                           )}
                         </span>
                       </div>
                       <div
                         style={{
                          height: "35px",
                           width: "100%",
                           borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                           borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                           padding: "0px 9px",
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                         }}
                       >
                         <span
                           className='span1'
                           style={{fontWeight: "bold", opacity: "0.65"}}
                         >
                           S.D Count:
                         </span>{" "}
                         <span className='span2'>
                           {successfulDeposits?.length}
                         </span>
                       </div>
                       <div
                         style={{
                             height: "35px",
                           width: "100%",
                           borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                           borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                           padding: "0px 9px",
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                         }}
                       >
                         <span
                           className='span1'
                           style={{fontWeight: "bold", opacity: "0.65"}}
                         >
                           Successful Withdrawals:
                         </span>{" "}
                         <span className='span2'>
                           XOF &nbsp;{" "}
                           {formatNumberWithCommasAndDecimal(
                             totalSuccessfulWithdrawals
                           )}
                         </span>
                       </div>

                       <div
                         style={{
                             height: "35px",
                           width: "100%",
                           borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                           borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                           padding: "0px 9px",
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                         }}
                       >
                         <span
                           className='span1'
                           style={{fontWeight: "bold", opacity: "0.65"}}
                         >
                           S.W Count:
                         </span>{" "}
                         <span className='span2'>
                           {successfulWithdrawals?.length}
                         </span>
                       </div>

                       <div
                         style={{
                             height: "35px",
                           width: "100%",
                           borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                           borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                           padding: "0px 9px",
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                         }}
                       >
                         <span
                           className='span1'
                           style={{fontWeight: "bold", opacity: "0.65"}}
                         >
                           Transaction History:
                         </span>
                         <span
                           className='span2'
                           style={{
                             padding: "1px 8px",
                             borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                             borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                             padding: "0px 9px",
                             borderRadius: "5px",
                             color: "black",
                             background: "grey",
                             cursor: "pointer",
                           }}
                           onClick={() =>
                             router.push(`/admin/users/${data._id}`)
                           }
                         >
                           view
                         </span>
                       </div>

                       <div
                         style={{
                             height: "35px",
                           width: "100%",
                           borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                           borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                           padding: "0px 9px",
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                         }}
                       >
                         <span
                           className='span1'
                           style={{fontWeight: "bold", opacity: "0.65"}}
                         >
                           View Referrals:
                         </span>
                         <span
                           className='span2'
                           style={{
                             padding: "1px 8px",
                             borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                             borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                             padding: "0px 9px",
                             borderRadius: "5px",
                             color: "black",
                             background: "grey",
                             cursor: "pointer",
                           }}
                           onClick={() =>
                             router.push(`/admin/users/referral/${data._id}`)
                           }
                         >
                           view
                         </span>
                       </div>

                       <div
                         style={{
                             height: "35px",
                           width: "100%",
                           borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                           borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                           padding: "0px 9px",
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                         }}
                       >
                         <span
                           className='span1'
                           style={{fontWeight: "bold", opacity: "0.65"}}
                         >
                           Bonus Balances:
                         </span>{" "}
                         <span className='span2'>
                           XOF &nbsp; {formatNumberWithCommasAndDecimal(data.bonusBalance)}
                         </span>
                       </div>
                        <div
                         style={{
                             height: "35px",
                           width: "100%",
                           borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                           borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                           padding: "0px 9px",
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                         }}
                       >
                         <span
                           className='span1'
                           style={{fontWeight: "bold", opacity: "0.65"}}
                         >
                           Disbursed Bonuses:
                         </span>{" "}
                         <span className='span2'>
                           XOF &nbsp; {formatNumberWithCommasAndDecimal(data.disbursedBonusBalance)}
                         </span>
                       </div>



                        <div
                         style={{
                             height: "35px",
                           width: "100%",
                           borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                           borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                           padding: "0px 9px",
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                         }}
                       >
                         <span
                           className='span1'
                           style={{fontWeight: "bold", opacity: "0.65"}}
                         >
                           Restricted Bonuses:
                         </span>{" "}
                         <span className='span2'>
                           XOF &nbsp; {formatNumberWithCommasAndDecimal(data.restrictedBonusBalance)}
                         </span>
                       </div>



                       <div
                         style={{
                            height: "35px",
                           width: "100%",
                           borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                           borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                           padding: "0px 9px",
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                         }}
                       >
                         <span
                           className='span1'
                           style={{fontWeight: "bold", opacity: "0.65"}}
                         >
                           Total Referrals:
                         </span>{" "}
                         <span className='span2'>{data.referrals.length}</span>
                       </div>

                       <div
                         style={{
                            height: "35px",
                           width: "100%",
                           borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                           borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                           padding: "0px 9px",
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                         }}
                       >
                         <span
                           className='span1'
                           style={{fontWeight: "bold", opacity: "0.65"}}
                         >
                           Status:
                         </span>
                         <span className='span2'>
                           {data.isActivated ? "Active" : "Not Active"}
                         </span>
                       </div>

                       <div
                         style={{
                             height: "38px",
                           width: "100%",
                           borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                           borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                           padding: "0px 9px",
                           display: "flex",
                           justifyContent: "flex-end",
                           alignItems: "center",
                           gap: "9px",
                         }}
                       >
                         <span
                           className='span2'
                           style={{
                             padding: "1px 8px",
                             borderRadius: "5px",
                             color: data.isActivated
                               ? "rgba(0, 128, 0, 0.9)"
                               : "rgba(128, 0, 0, 0.9)",
                             cursor: "pointer",
                           }}
                         >
                           {data.isActivated ? "Activated" : "Deactivated"}
                         </span>{" "}
                         &nbsp; &nbsp;{" "}
                         <span
                           className='span2'
                           style={{
                             display: "flex",
                             justifyContent: "center",
                             alignItems: "center",
                             padding: "1px 8px",
                             width: "100px",
                             height: "25px",
                             border: ".3px solid rgba(128, 128, 128, 0.5)",
                             borderRadius: "5px",
                             background: data.isActivated
                               ? "rgba(128, 0, 0, 0.6)"
                               : "rgba(0, 128, 0, 0.7)",
                             cursor: "pointer",
                           }}
                           onClick={(e) => changeActivationStatus(data._id)}
                         >
                           {loading ? (
                             <div id='container-deposit-1'>
                               <div id='html-spinner-deposit-1'></div>
                             </div>
                           ) : data.isActivated ? (
                             "Deactivate"
                           ) : (
                             "Activate"
                           )}
                         </span>
                       </div>
                     </div>
                   )}
                 </div>
               );
             })
           )}
         </div>
       </div>
     </div>
   );
}

export default Page;


