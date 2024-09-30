/* eslint-disable */
// @ts-nocheck
"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReceiptModalProps } from "@/types";
import CompanyLogo from "../../../../public/Logo.webp";
import Image from "next/image";
import { TbPigMoney } from "react-icons/tb";
import formatDate from "../formatDate";
import { IoMdDownload } from "react-icons/io";
import html2canvas from "html2canvas";
import formatNumberWithCommasAndDecimal from "../formatNumber";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";
const Modal = ({
  active,
  receipt,
  containerStyles,
  containerStylesInner,
  containerStylesInnerLink,
  handleClick,
   updatedTheme,
   t
}: any) => {
const pathname = usePathname();
const handleChildClick = (event: React.MouseEvent) => {
  // Stop the event propagation to the parent (receiptModal)
  event.stopPropagation();
};
const spanRef = useRef<HTMLSpanElement>(null);

const handleCopyClick = () => {
  if (spanRef.current) {
    const range = document.createRange();
    range.selectNode(spanRef.current);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);

    try {
      document.execCommand("copy");
      toast.success(t.modal.copy_success);
    } catch (err) {
      toast.error(t.modal.copy_failure  );
    }

    window.getSelection()?.removeAllRanges();
  }
};
  return (
    <div className={` ${containerStyles}`} onClick={handleClick}>
      <div
        className={` ${containerStylesInner}`}
        id='receiptModal'
        onClick={handleChildClick}
          style={{gap: 10,  background:  updatedTheme === "dark" ? "": "white", boxShadow:  updatedTheme === "dark" ? "": "0px 4px 10px rgba(0, 0, 0, .2)", padding: "15px",}}
      >
       
        <div style={{ display: "flex", background: "rgba(120, 120, 120, 0.3)", borderRadius: "4px", width: '100%', flexDirection: "column", alignItems: "center", justifyContent: "center", paddingLeft: "12px", paddingRight: "12px", paddingTop: "17px", paddingBottom: "17px", }}>
         
        
          
            <div
              style={{
                fontWeight: "800",
                fontSize: "17px",
             color:  updatedTheme === "dark" ? "white": "black",
             marginBottom: "13px"
              }}
            >
          
             <span style={{fontWeight: '400'}}> XOF </span>
              {formatNumberWithCommasAndDecimal(receipt?.amount)}
            </div>

            {receipt?.status === "Failed" ? <>

               <div
              style={{
                fontWeight: "500",
                 marginBottom: "8px",
                fontSize: "11px",
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center',
                gap: "5px",
             color:  receipt?.status === "Successful" ? "rgba(73, 166, 106, 1)": receipt?.status === "Pending"? "rgba(120, 120, 120, 1)" : "red",
              }}
            >
          <span style={{minWidth: "20px", maxWidth: "20px",maxHeight: "20px",minHeight: "20px", borderRadius: "10px",  background: "rgba(256, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: 'center'}}>
                  <span style={{minWidth: "15px", maxWidth: "15px",maxHeight: "15px",minHeight: "15px", borderRadius: "7.5px",  background: "red", display: "flex", justifyContent: "center", alignItems: 'center', color: "white"}}>
                   X
                  </span>
                </span>  {receipt?.status} 
            </div>

             <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", paddingRight: "17px",  paddingLeft: "17px", marginBottom: "2px",}}>
              
                <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black", fontWeight: "500",
                fontSize: "12px"}}>
                  {receipt?.type === "deposits"? t.modal.deposit_failed: t.modal.withdrawal_failed}
                </span>
            </div>
           

             <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center",  marginBottom: "19px",}}>
                <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black", fontWeight: "500",
                fontSize: "13px", opacity: "0.7"}}>
                    {formatDate(receipt?.time)}
                </span>
            </div>
            
            
            
            
            </>: <>  
            
            <div
              style={{
                fontWeight: "500",
                 marginBottom: "8px",
                fontSize: "11px",
             color:  receipt?.status === "Successful" ? "rgba(73, 166, 106, 1)": receipt?.status === "Pending"? "rgba(120, 120, 120, 1)" : "red",
              }}
            >
           {receipt?.status === "Successful"? t.Successful: receipt?.status === "Pending"? t.Pending : t.Failed} 
           
            </div>
            <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", paddingRight: "30px",  paddingLeft: "30px", gap: "15px",  marginBottom: "4px",}}>
              <span style={{minWidth: "20px", maxWidth: "20px",maxHeight: "20px",minHeight: "20px", borderRadius: "10px",  background: "rgba(73, 166, 106, 0.6)", display: "flex", justifyContent: "center", alignItems: 'center' }}>
                 <span style={{minWidth: "15px", maxWidth: "15px",maxHeight: "15px",minHeight: "15px", borderRadius: "7.5px",  background: "rgba(73, 166, 106, 1)", display: "flex", justifyContent: "center", alignItems: 'center'}}>
                  <FaCheck color="white" fontSize="12px" />
                </span>
                 </span>
               <div style={{width: "100%", height: '2px', background: "rgba(73, 166, 106, 0.6)", display: "flex", justifyContent: "center", alignItems: 'center'}}>
                 </div>

                <span style={{minWidth: "20px", maxWidth: "20px",maxHeight: "20px",minHeight: "20px", borderRadius: "10px",  background: receipt?.status === "Successful"?  "rgba(73, 166, 106, .6)": receipt?.status === "Pending"? "rgba(120, 120, 120, .6)":"", display: "flex", justifyContent: "center", alignItems: 'center' }}>
                  <span style={{minWidth: "15px", maxWidth: "15px",maxHeight: "15px",minHeight: "15px", borderRadius: "7.5px", background: receipt?.status === "Successful"?  "rgba(73, 166, 106, 1)": receipt?.status === "Pending"? "rgba(120, 120, 120, 1)":"", display: "flex", justifyContent: "center", alignItems: 'center'}}>
                   <FaCheck color="white" fontSize="12px" />
                  </span>
                </span>
            </div>

             <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", paddingRight: "17px",  paddingLeft: "17px", marginBottom: "2px",}}>
              <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black",fontWeight: "500",
                fontSize: "11px",}}>
             {t.modal.initialize}
                 </span>
             

                <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black", fontWeight: "500",
                fontSize: "11px"}}>
                  {receipt?.type === "deposits"? t.modal.deposit : t.modal.withdrawals}
                </span>
            </div>

             <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", paddingRight: "17px",  paddingLeft: "17px", marginBottom: "4px",}}>
              <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black",fontWeight: "500",
                fontSize: "11px",}}>
               {receipt?.type === "deposits"? t.modal.deposit : t.modal.withdrawals}
                 </span>
             

                <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black", fontWeight: "500",
                fontSize: "11px"}}>
                

                      {receipt?.status === "Successful"? t.modal.Completed : receipt?.status === "Pending" ? t.Pending : null}
                 
                </span>
            </div>

             <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",  marginBottom: "19px",}}>
              <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black",fontWeight: "500",
                fontSize: "9px",opacity: "0.7"}}>
              {formatDate(receipt?.time)}
              
                 </span>
             

                <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black", fontWeight: "500",
                fontSize: "9px", opacity: "0.7"}}>
                    {formatDate(receipt?.time)}
                    
                </span>
            </div>

         </>} 

          <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black",fontWeight: "500",
                fontSize: "11px", opacity: "0.6", fontWeight: "800"}}>
                     {t.modal.Amount} {receipt?.type === "deposits"? t.modal.payed: t.modal.withdrawn}

                 </span>
             

                <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black", fontWeight: "500",
                fontSize: "11px", fontWeight: "800"}}>
              <span style={{fontWeight: '400'}}> XOF  &nbsp;</span>
                     {formatNumberWithCommasAndDecimal(receipt?.amount)}
                </span>
            </div>

            
        </div>

         <div style={{ display: "flex", background: "rgba(120, 120, 120, 0.3)", borderRadius: "4px", width: '100%', flexDirection: "column", alignItems: "center", justifyContent: "flex-start", paddingLeft: "12px", paddingRight: "12px", paddingTop: "13px", paddingBottom: "13px", height: "100%" }}>
         
      
             <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px"}}>
              <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black",fontWeight: "500",
                fontSize: "14px", opacity: "1", fontWeight: "900"}}>
                    {t.modal.Transaction}
                 </span>
             

                <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black", fontWeight: "500",
                fontSize: "11px", fontWeight: "800"}}>
                 
                </span>
            </div>

         

          <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px"}}>
              <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black",fontWeight: "500",
                fontSize: "12px", opacity: "0.6", fontWeight: "800"}}>
                     {t.modal.Payment}

                 </span>
             

                <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black", fontWeight: "500",
                fontSize: "11px", fontWeight: "500"}}>
               {receipt?.type === "deposits"? t.modal.deposit2 : t.modal.withdrawals}
                </span>
            </div>

              <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px"}}>
              <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black",fontWeight: "500",
                fontSize: "12px", opacity: "0.5", fontWeight: "800"}}>
                     {t.modal.Status}
                 </span>
             

                <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black", fontWeight: "500",
                fontSize: "11px", fontWeight: "500", color:  receipt?.status === "Successful" ? "rgba(73, 166, 106, 1)": receipt?.status === "Pending"? "rgba(120, 120, 120, 1)" : "red",}}>
             {receipt?.status === "Successful"? t.Successful: receipt?.status === "Pending"? t.Pending : t.Failed} 
                </span>
            </div>


              <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px"}}>
              <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black",fontWeight: "500",
                fontSize: "12px", opacity: "0.5", fontWeight: "800"}}>
                     ID
                 </span>
             

                <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black", fontWeight: "500",
                fontSize: "11px", fontWeight: "500"}}>
                {receipt?.betId}
                </span>
            </div>


             {receipt?.momoName && <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px"}}>
              <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black",fontWeight: "500",
                fontSize: "12px", opacity: "0.5", fontWeight: "800"}}>
                     {t.modal.Number}
                 </span>
             

                <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black", fontWeight: "500",
                fontSize: "11px", fontWeight: "500"}}>
                    {receipt?.momoName ? receipt?.momoName : receipt?.momoName}
                </span>
            </div>}

{receipt?.withdrawalCode && <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px"}}>
              <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black",fontWeight: "500",
                fontSize: "12px", opacity: "0.5", fontWeight: "800"}}>
                     {t.modal.Withdrawal_Code}
                 </span>
             

                <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black", fontWeight: "500",
                fontSize: "11px", fontWeight: "500", }}>
                    {receipt?.withdrawalCode}
                </span>
            </div>}

              {receipt?.momoNumber && <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px"}}>
              <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black",fontWeight: "500",
                fontSize: "12px", opacity: "0.5", fontWeight: "800"}}>
                    {t.modal.Number}
                 </span>
             

                <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black", fontWeight: "500",
                fontSize: "11px", fontWeight: "500"}}>
                    {receipt?.momoNumber}
                </span>
            </div>}







              {receipt?.time && <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px"}}>
              <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black",fontWeight: "500",
                fontSize: "12px", opacity: "0.5", fontWeight: "800"}}>
                     {t.modal.Transaction_Date}
                 </span>
             

                <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black", fontWeight: "500",
                fontSize: "11px", fontWeight: "500"}}>
                    {formatDate(receipt?.time)}
                </span>
            </div>}

            {receipt?.identifierId && <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px"}}>
              <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black",fontWeight: "500",
                fontSize: "12px", opacity: "0.5", fontWeight: "800"}}>
                     {t.modal.Transaction_ID}
                 </span>
             

                <span style={{ display: "flex", justifyContent: "center", alignItems: 'center',  color:  updatedTheme === "dark" ? "white": "black", fontWeight: "500",
                fontSize: "11px", fontWeight: "500"}}>
                    {receipt?.identifierId}
                </span>
            </div>}


            
            






        </div>



      
       
      
       
      </div>
    </div>
  );
};

export default Modal;
