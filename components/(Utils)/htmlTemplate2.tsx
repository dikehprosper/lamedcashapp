/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// PrintFunctions.ts
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import formatNumberWithCommasAndDecimal from "./formatNumber";
import { FormatDateAndTime2 } from "./formatedDateAndTime";
import { Color } from "@/constants/Colors";
import { colorScheme } from "@/components/(userscomponent)/(TransactionTemplateUsers)/data";
const color: any = colorScheme.state;
const Colors = color === 2 ? Color.darkMode : Color.lightMode;
const Currency = "XOF";
const email = "support@lamedcash.com";
const img =
    "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/Logo.webp?alt=media&token=ad27ad8f-3d2d-4d59-8f0c-ccc3451242ec";

export const generateHtmlContent = (type: any) => {
    return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      </head>
      <body style="padding: 25">
      <div style=" height: 33px; margin-bottom: 50px; display: flex; justify-content: space-between; align-items: center">
       <img
          src='${img}'
          style="width: 24vw;" 
         />
     <h4 style="font-size: 20px; font-weight: bold;  font-family: Helvetica Neue; ">
    Détails de la transaction
        </h4>
          </div>
      <div style=" height: 30px; margin-bottom: 30px; gap: 10; width: 100%; display: flex; justify-content: center; align-items: center">
  
       <h3 style="font-size: 39px; font-family: Helvetica Neue; ">
       ${Currency}
        </h3>
        <h1 style="font-size: 39px; font-weight: bold; font-family: Helvetica Neue; margin-left: 10px  ">
        ${formatNumberWithCommasAndDecimal(parseFloat(type.totalAmount))}
        </h1>
     </div>
        <div style=" height: 30px; margin-bottom: 12px; width: 100%;  display: flex; justify-content: center; align-items: center">
         <h2 style="font-size: 29px; font-weight: bold; font-family: Helvetica Neue; color:   ${type.status === "Successful" ? "rgba(73, 220, 106, 1)" : type.status === "Pending" ? "rgba(90, 90, 90, 1)" : null} ">
      ${type.status === "Successful" ? "SUCCÈS" : type.status === "Pending" ? "EN ATTENTE" : null}
        </h2>
     </div>

    <div style=" height: 50px; margin-bottom: 60px; width: 100%;  display: flex; justify-content: center; align-items: center">
    <div style=" width: 90%; height: 50px; border-bottom: 2px solid grey;  display: flex; justify-content: center; align-items: center">
        <h3 style="font-size: 19px; font-weight: 500; opacity: 0.5; font-family: Helvetica Neue; ">
        ${FormatDateAndTime2(type.registrationDateTime)}
        </h3>
    </div>
     </div>
    <div style=" height: 55px; margin-bottom: 12px; width: 100%; display: flex; justify-content: space-between; align-items: center; ">
     <h3 style="font-size: 21px;opacity: 0.5; font-family: Helvetica Neue; font-weight: 500; ">
   Mode de paiement
        </h3>
    <h3 style="font-size: 21px;  font-family: Helvetica Neue; font-weight: 500; ">
        Pour dépôt ${type.service}
    </h3>
 </div>




  <div style=" height: 55px; margin-bottom: 12px; width: 100%; display: flex; justify-content: space-between; align-items: center; ">
    <h3 style="font-size: 21px; opacity: 0.5; font-family: Helvetica Neue; font-weight: 500; ">
  Nombre
        </h3>
<h3 style="font-size: 21px;  font-family: Helvetica Neue; font-weight: 500;  ">
   ${type.momoNumber}
</h3>
 </div>


<div style=" height: 55px; margin-bottom: 12px; width: 100%; display: flex; justify-content: space-between; align-items: center; ">
    <h3 style="font-size: 21px; opacity: 0.5; font-family: Helvetica Neue; font-weight: 500;  ">
     Bet ID
        </h3>
<h3 style="font-size: 21px;  font-family: Helvetica Neue; font-weight: 500;  ">
   ${type.betId}
</h3>
 </div>




   <div style=" height: 55px; margin-bottom: 160px; width: 100%; display: flex; justify-content: space-between; align-items: center; ">

                       <h3 style="font-size: 21px; opacity: 0.5; font-family: Helvetica Neue; font-weight: 500;   ">
     Id de transaction
        </h3>
                  <h3 style="font-size: 21px;  font-family: Helvetica Neue; font-weight: 500;  ">
   ${type.identifierId}
        </h3>
 </div>




   <div style=" height: 20px; margin-bottom: 12px; width: 100%; display: flex; justify-content: center; align-items: center; ">

                       <h3 style="font-size: 18px; opacity: 0.5; font-family: Helvetica Neue; font-weight: 500;  ">
Soutien
        </h3>
           
 </div>
  <div style=" height: 40px; margin-bottom: 12px;border-bottom: 1.5px dashed black; width: 100%; display: flex; justify-content: center; align-items: center; ">

                       <h3 style="font-size: 18px;  font-family: Helvetica Neue; font-weight: 500; color: rgba(40, 40, 256, 0.9)">
    ${email}
        </h3>
           
 </div>

 <div style=" height: 40px; margin-bottom: 12px; width: 100%; display: flex; justify-content: center; align-items: center; ">

                       <h3 style="font-size: 18px; opacity: ; font-family: Helvetica Neue; font-weight: 500;  ">
    Profitez d'une transaction rapide et gagnez des références et des bonus.
        </h3>
           
 </div>




      
       
      
      </body>
    </html>
  `;
};
export const generateHtmlContent2 = (type: any) => {
    return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      </head>
      <body style="padding: 25">
      <div style=" height: 33px; margin-bottom: 50px; display: flex; justify-content: space-between; align-items: center">
       <img
          src='${img}'
          style="width: 24vw;" 
         />
     <h4 style="font-size: 20px;  font-weight: bold; font-family: Helvetica Neue; ">
     Détails de la transaction
        </h4>
          </div>
      <div style=" height: 30px; margin-bottom: 30px; width: 100%; gap: 10; display: flex; justify-content: center; align-items: center">
       <h3 style="font-size: 39px; font-family: Helvetica Neue; ">
       ${Currency}
        </h3>
        <h1 style="font-size: 39px; font-weight: bold; font-family: Helvetica Neue; margin-left: 10px ">
     ${formatNumberWithCommasAndDecimal(parseFloat(type.totalAmount))}
        </h1>
     </div>
        <div style=" height: 30px; margin-bottom: 12px; width: 100%;  display: flex; justify-content: center; align-items: center">
         <h2 style="font-size: 29px; font-weight: bold; font-family: Helvetica Neue; color:   ${type.status === "Successful" ? "rgba(73, 220, 106, 1)" : type.status === "Pending" ? "rgba(90, 90, 90, 1)" : null} ">
      ${type.status === "Successful" ? "SUCCÈS" : type.status === "Pending" ? "EN ATTENTE" : null}
        </h2>
     </div>

    <div style=" height: 50px; margin-bottom: 60px; width: 100%;  display: flex; justify-content: center; align-items: center">
    <div style=" width: 90%; height: 50px; border-bottom: 2px solid grey;  display: flex; justify-content: center; align-items: center">
        <h3 style="font-size: 19px; font-weight: 500; opacity: 0.5; font-family: Helvetica Neue; ">
        ${FormatDateAndTime2(type.registrationDateTime)}
        </h3>
    </div>
     </div>
    <div style=" height: 55px; margin-bottom: 12px; width: 100%; display: flex; justify-content: space-between; align-items: center; ">
     <h3 style="font-size: 21px;opacity: 0.5; font-family: Helvetica Neue; font-weight: 500; ">
   Mode de paiement
        </h3>
    <h3 style="font-size: 21px;  font-family: Helvetica Neue; font-weight: 500; ">
        Pour le retrait
    </h3>
 </div>



 <div style=" height: 55px; margin-bottom: 12px; width: 100%; display: flex; justify-content: space-between; align-items: center; ">
    <h3 style="font-size: 21px; opacity: 0.5; font-family: Helvetica Neue; font-weight: 500;  ">
     Bet ID
        </h3>
<h3 style="font-size: 21px;  font-family: Helvetica Neue; font-weight: 500;  ">
   ${type.betId}
</h3>
 </div>


 <div style=" height: 55px; margin-bottom: 12px; width: 100%; display: flex; justify-content: space-between; align-items: center; ">
    <h3 style="font-size: 21px; opacity: 0.5; font-family: Helvetica Neue; font-weight: 500;  ">
   Service
        </h3>
<h3 style="font-size: 21px;  font-family: Helvetica Neue; font-weight: 500;  ">
   ${type.service}
</h3>
 </div>



  <div style=" height: 55px; margin-bottom: 12px; width: 100%; display: flex; justify-content: space-between; align-items: center; ">
    <h3 style="font-size: 21px; opacity: 0.5; font-family: Helvetica Neue; font-weight: 500; ">
  Nombre
        </h3>
<h3 style="font-size: 21px;  font-family: Helvetica Neue; font-weight: 500;  ">
   ${type.momoNumber}
</h3>
 </div>










  <div style=" height: 55px; margin-bottom: 12px; width: 100%; display: flex; justify-content: space-between; align-items: center; ">
    <h3 style="font-size: 21px; opacity: 0.5; font-family: Helvetica Neue; font-weight: 500; ">
     withdrawal Code
        </h3>
<h3 style="font-size: 21px;  font-family: Helvetica Neue; font-weight: 500; ">
   ${type.withdrawalCode}
</h3>
 </div>

   <div style=" height: 55px; margin-bottom: 70px; width: 100%; display: flex; justify-content: space-between; align-items: center; ">

                       <h3 style="font-size: 21px; opacity: 0.5; font-family: Helvetica Neue; font-weight: 500;   ">
     Id de transaction
        </h3>
                  <h3 style="font-size: 21px;  font-family: Helvetica Neue; font-weight: 500;  ">
   ${type.identifierId}
        </h3>
 </div>




   <div style=" height: 20px; margin-bottom: 12px; width: 100%; display: flex; justify-content: center; align-items: center; ">

                       <h3 style="font-size: 18px; opacity: 0.5; font-family: Helvetica Neue; font-weight: 500;  ">
   Soutien
        </h3>
           
 </div>
  <div style=" height: 40px; margin-bottom: 12px;border-bottom: 1.5px dashed black; width: 100%; display: flex; justify-content: center; align-items: center; ">

                       <h3 style="font-size: 18px;  font-family: Helvetica Neue; font-weight: 500; color: rgba(40, 40, 256, 0.9)">
    ${email}
        </h3>
           
 </div>

 <div style=" height: 40px; margin-bottom: 12px; width: 100%; display: flex; justify-content: center; align-items: center; ">

                       <h3 style="font-size: 18px; opacity: ; font-family: Helvetica Neue; font-weight: 500;  ">
    Profitez d'une transaction rapide et gagnez des références et des bonus.
        </h3>
           
 </div>




      
       
      
      </body>
    </html>
  `;
};
export const generateHtmlContent2A = (type: any) => {
    return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      </head>
      <body style="padding: 25">
      <div style=" height: 33px; margin-bottom: 50px; display: flex; justify-content: space-between; align-items: center">
       <img
          src='${img}'
          style="width: 24vw;" 
         />
     <h4 style="font-size: 20px;  font-weight: bold; font-family: Helvetica Neue; ">
     Détails de la transaction
        </h4>
          </div>
      <div style=" height: 30px; margin-bottom: 30px; width: 100%; gap: 10; display: flex; justify-content: center; align-items: center">
       <h3 style="font-size: 39px; font-family: Helvetica Neue; ">
       ${Currency}
        </h3>
        <h1 style="font-size: 39px; font-weight: bold; font-family: Helvetica Neue; margin-left: 10px ">
     ${formatNumberWithCommasAndDecimal(parseFloat(type.totalAmount))}
        </h1>
     </div>
        <div style=" height: 30px; margin-bottom: 12px; width: 100%;  display: flex; justify-content: center; align-items: center">
         <h2 style="font-size: 29px; font-weight: bold; font-family: Helvetica Neue; color:   ${type.status === "Successful" ? "rgba(73, 220, 106, 1)" : type.status === "Pending" ? "rgba(90, 90, 90, 1)" : null} ">
      ${type.status === "Successful" ? "SUCCÈS" : type.status === "Pending" ? "EN ATTENTE" : null}
        </h2>
     </div>

    <div style=" height: 50px; margin-bottom: 60px; width: 100%;  display: flex; justify-content: center; align-items: center">
    <div style=" width: 90%; height: 50px; border-bottom: 2px solid grey;  display: flex; justify-content: center; align-items: center">
        <h3 style="font-size: 19px; font-weight: 500; opacity: 0.5; font-family: Helvetica Neue; ">
        ${FormatDateAndTime2(type.registrationDateTime)}
        </h3>
    </div>
     </div>
    <div style=" height: 55px; margin-bottom: 12px; width: 100%; display: flex; justify-content: space-between; align-items: center; ">
     <h3 style="font-size: 21px;opacity: 0.5; font-family: Helvetica Neue; font-weight: 500; ">
   Mode de paiement
        </h3>
    <h3 style="font-size: 21px;  font-family: Helvetica Neue; font-weight: 500; ">
        Pour le retrait
    </h3>
 </div>





  <div style=" height: 55px; margin-bottom: 12px; width: 100%; display: flex; justify-content: space-between; align-items: center; ">
    <h3 style="font-size: 21px; opacity: 0.5; font-family: Helvetica Neue; font-weight: 500; ">
  Nombre
        </h3>
<h3 style="font-size: 21px;  font-family: Helvetica Neue; font-weight: 500;  ">
   ${type.momoNumber}
</h3>
 </div>




   <div style=" height: 55px; margin-bottom: 70px; width: 100%; display: flex; justify-content: space-between; align-items: center; ">

                       <h3 style="font-size: 21px; opacity: 0.5; font-family: Helvetica Neue; font-weight: 500;   ">
     Id de transaction
        </h3>
                  <h3 style="font-size: 21px;  font-family: Helvetica Neue; font-weight: 500;  ">
   ${type.identifierId}
        </h3>
 </div>




   <div style=" height: 20px; margin-bottom: 12px; width: 100%; display: flex; justify-content: center; align-items: center; ">

                       <h3 style="font-size: 18px; opacity: 0.5; font-family: Helvetica Neue; font-weight: 500;  ">
   Soutien
        </h3>
           
 </div>
  <div style=" height: 40px; margin-bottom: 12px;border-bottom: 1.5px dashed black; width: 100%; display: flex; justify-content: center; align-items: center; ">

                       <h3 style="font-size: 18px;  font-family: Helvetica Neue; font-weight: 500; color: rgba(40, 40, 256, 0.9)">
    ${email}
        </h3>
           
 </div>

 <div style=" height: 40px; margin-bottom: 12px; width: 100%; display: flex; justify-content: center; align-items: center; ">

                       <h3 style="font-size: 18px; opacity: ; font-family: Helvetica Neue; font-weight: 500;  ">
    Profitez d'une transaction rapide et gagnez des références et des bonus.
        </h3>
           
 </div>




      
       
      
      </body>
    </html>
  `;
};
export const generateHtmlContent3 = (type: any) => {
    return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      </head>
      <body style="padding: 25">
      <div style=" height: 33px; margin-bottom: 50px; display: flex; justify-content: space-between; align-items: center">
       <img
          src='${img}'
          style="width: 24vw;" 
         />
     <h4 style="font-size: 20px;  font-weight: bold; font-family: Helvetica Neue; ">
     Détails de la transaction
        </h4>
          </div>
      <div style=" height: 30px; margin-bottom: 30px; width: 100%; gap: 10; display: flex; justify-content: center; align-items: center">
        
       <h3 style="font-size: 39px; font-family: Helvetica Neue; ">
       ${Currency}
        </h3>
        <h1 style="font-size: 39px; font-weight: bold; font-family: Helvetica Neue; margin-left: 10px ">
 ${formatNumberWithCommasAndDecimal(type.amount)}
        </h1>
     </div>
        <div style=" height: 30px; margin-bottom: 12px; width: 100%;  display: flex; justify-content: center; align-items: center">
         <h2 style="font-size: 29px; font-weight: bold; font-family: Helvetica Neue; color:   ${type.status === "Successful" ? "rgba(73, 220, 106, 1)" : type.status === "Pending" ? "rgba(90, 90, 90, 1)" : null} ">
      ${type.status === "Successful" ? "SUCCÈS" : type.status === "Pending" ? "EN ATTENTE" : null}
        </h2>
     </div>

    <div style=" height: 50px; margin-bottom: 60px; width: 100%;  display: flex; justify-content: center; align-items: center">
    <div style=" width: 90%; height: 50px; border-bottom: 2px solid grey;  display: flex; justify-content: center; align-items: center">
        <h3 style="font-size: 19px; font-weight: 500; opacity: 0.5; font-family: Helvetica Neue; ">
        ${FormatDateAndTime2(type.registrationDateTime)}
        </h3>
    </div>
     </div>








  <div style=" height: 55px; margin-bottom: 12px; width: 100%; display: flex; justify-content: space-between; align-items: center; ">
    <h3 style="font-size: 21px; opacity: 0.5; font-family: Helvetica Neue; font-weight: 500; ">
 Détails du destinataire
        </h3>
<h3 style="font-size: 21px;  font-family: Helvetica Neue; font-weight: 500;  ">
    Toi
</h3>
 </div>






  <div style=" height: 55px; margin-bottom: 12px; width: 100%; display: flex; justify-content: space-between; align-items: center; ">
    <h3 style="font-size: 21px; opacity: 0.5; font-family: Helvetica Neue; font-weight: 500; ">
     Mode de paiement
        </h3>
<h3 style="font-size: 21px;  font-family: Helvetica Neue; font-weight: 500; ">
  Crédit bonus
</h3>
 </div>




  

   <div style=" height: 55px; margin-bottom: 180px; width: 100%; display: flex; justify-content: space-between; align-items: center; ">

                       <h3 style="font-size: 21px; opacity: 0.5; font-family: Helvetica Neue; font-weight: 500;   ">
     Id de transaction
        </h3>
                  <h3 style="font-size: 21px;  font-family: Helvetica Neue; font-weight: 500;  ">
   ${type.identifierId}
        </h3>
 </div>




   <div style=" height: 20px; margin-bottom: 12px; width: 100%; display: flex; justify-content: center; align-items: center; ">

                       <h3 style="font-size: 18px; opacity: 0.5; font-family: Helvetica Neue; font-weight: 500;  ">
   Soutien
        </h3>
           
 </div>
  <div style=" height: 40px; margin-bottom: 12px;border-bottom: 1.5px dashed black; width: 100%; display: flex; justify-content: center; align-items: center; ">

                       <h3 style="font-size: 18px;  font-family: Helvetica Neue; font-weight: 500; color: rgba(40, 40, 256, 0.9)">
    ${email}
        </h3>
           
 </div>

 <div style=" height: 40px; margin-bottom: 12px; width: 100%; display: flex; justify-content: center; align-items: center; ">

                       <h3 style="font-size: 18px; opacity: ; font-family: Helvetica Neue; font-weight: 500;  ">
    Profitez d'une transaction rapide et gagnez des références et des bonus.
        </h3>
           
 </div>

      </body>
    </html>
  `;
};

export const generateHtmlContent4 = (type: any) => {
    return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      </head>
      <body style="padding: 25">
      <div style=" height: 33px; margin-bottom: 50px; display: flex; justify-content: space-between; align-items: center">
       <img
          src='${img}'
          style="width: 24vw;" 
         />
     <h4 style="font-size: 20px;  font-weight: bold; font-family: Helvetica Neue; ">
     Détails de la transaction
        </h4>
          </div>
      <div style=" height: 30px; margin-bottom: 30px; width: 100%; gap: 10; display: flex; justify-content: center; align-items: center">
        
       <h3 style="font-size: 39px; font-family: Helvetica Neue; ">
       ${Currency}
        </h3>
        <h1 style="font-size: 39px; font-weight: bold; font-family: Helvetica Neue; margin-left: 10px ">
 ${formatNumberWithCommasAndDecimal(parseFloat(type.amount))}
        </h1>
     </div>
        <div style=" height: 30px; margin-bottom: 12px; width: 100%;  display: flex; justify-content: center; align-items: center">
         <h2 style="font-size: 29px; font-weight: bold; font-family: Helvetica Neue; color:   ${type.status === "Successful" ? "rgba(73, 220, 106, 1)" : type.status === "Pending" ? "rgba(90, 90, 90, 1)" : null} ">
      ${type.status === "Successful" ? "SUCCÈS" : type.status === "Pending" ? "EN ATTENTE" : null}
        </h2>
     </div>

    <div style=" height: 50px; margin-bottom: 60px; width: 100%;  display: flex; justify-content: center; align-items: center">
    <div style=" width: 90%; height: 50px; border-bottom: 2px solid grey;  display: flex; justify-content: center; align-items: center">
        <h3 style="font-size: 19px; font-weight: 500; opacity: 0.5; font-family: Helvetica Neue; ">
        ${FormatDateAndTime2(type.registrationDateTime)}
        </h3>
    </div>
     </div>








  <div style=" height: 55px; margin-bottom: 12px; width: 100%; display: flex; justify-content: space-between; align-items: center; ">
    <h3 style="font-size: 21px; opacity: 0.5; font-family: Helvetica Neue; font-weight: 500; ">
 Détails du destinataire
        </h3>
        <div style="display: flex">
<h3 style="font-size: 21px;  font-family: Helvetica Neue; font-weight: 500; textWrap: wrap ">
    ${type.recipientName}  &nbsp;
                     
</h3>
<h3 style="font-size: 21px;  font-family: Helvetica Neue; font-weight: 500; textWrap: wrap ; opacity: 0.5">
  
                     || @${type.recipientTag}
</h3>
</div>
 </div>






  <div style=" height: 55px; margin-bottom: 12px; width: 100%; display: flex; justify-content: space-between; align-items: center; ">
    <h3 style="font-size: 21px; opacity: 0.5; font-family: Helvetica Neue; font-weight: 500; ">
     Mode de paiement
        </h3>
<h3 style="font-size: 21px;  font-family: Helvetica Neue; font-weight: 500; ">
     Du solde wallet
</h3>
 </div>




  

   <div style=" height: 55px; margin-bottom: 180px; width: 100%; display: flex; justify-content: space-between; align-items: center; ">

                       <h3 style="font-size: 21px; opacity: 0.5; font-family: Helvetica Neue; font-weight: 500;   ">
     Id de transaction
        </h3>
                  <h3 style="font-size: 21px;  font-family: Helvetica Neue; font-weight: 500;  ">
   ${type.identifierId}
        </h3>
 </div>




   <div style=" height: 20px; margin-bottom: 12px; width: 100%; display: flex; justify-content: center; align-items: center; ">

                       <h3 style="font-size: 18px; opacity: 0.5; font-family: Helvetica Neue; font-weight: 500;  ">
   Soutien
        </h3>
           
 </div>
  <div style=" height: 40px; margin-bottom: 12px;border-bottom: 1.5px dashed black; width: 100%; display: flex; justify-content: center; align-items: center; ">

                       <h3 style="font-size: 18px;  font-family: Helvetica Neue; font-weight: 500; color: rgba(40, 40, 256, 0.9)">
    ${email}
        </h3>
           
 </div>

 <div style=" height: 40px; margin-bottom: 12px; width: 100%; display: flex; justify-content: center; align-items: center; ">

                       <h3 style="font-size: 18px; opacity: ; font-family: Helvetica Neue; font-weight: 500;  ">
    Profitez d'une transaction rapide et gagnez des références et des bonus.
        </h3>
           
 </div>

      </body>
    </html>
  `;
};

export const generateHtmlContent5  = (type: any) => {
    return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      </head>
      <body style="padding: 25">
      <div style=" height: 33px; margin-bottom: 50px; display: flex; justify-content: space-between; align-items: center">
       <img
          src='${img}'
          style="width: 24vw;" 
         />
     <h4 style="font-size: 20px;  font-weight: bold; font-family: Helvetica Neue; ">
     Détails de la transaction
        </h4>
          </div>
      <div style=" height: 30px; margin-bottom: 30px; width: 100%; gap: 10; display: flex; justify-content: center; align-items: center">
        
       <h3 style="font-size: 39px; font-family: Helvetica Neue; ">
       ${Currency}
        </h3>
        <h1 style="font-size: 39px; font-weight: bold; font-family: Helvetica Neue; margin-left: 10px ">
 ${formatNumberWithCommasAndDecimal(parseFloat(type.amount))}
        </h1>
     </div>
        <div style=" height: 30px; margin-bottom: 12px; width: 100%;  display: flex; justify-content: center; align-items: center">
         <h2 style="font-size: 29px; font-weight: bold; font-family: Helvetica Neue; color:   ${type.status === "Successful" ? "rgba(73, 220, 106, 1)" : type.status === "Pending" ? "rgba(90, 90, 90, 1)" : null} ">
      ${type.status === "Successful" ? "SUCCÈS" : type.status === "Pending" ? "EN ATTENTE" : null}
        </h2>
     </div>

    <div style=" height: 50px; margin-bottom: 60px; width: 100%;  display: flex; justify-content: center; align-items: center">
    <div style=" width: 90%; height: 50px; border-bottom: 2px solid grey;  display: flex; justify-content: center; align-items: center">
        <h3 style="font-size: 19px; font-weight: 500; opacity: 0.5; font-family: Helvetica Neue; ">
        ${FormatDateAndTime2(type.registrationDateTime)}
        </h3>
    </div>
     </div>








  <div style=" height: 55px; margin-bottom: 12px; width: 100%; display: flex; justify-content: space-between; align-items: center; ">
    <h3 style="font-size: 21px; opacity: 0.5; font-family: Helvetica Neue; font-weight: 500; ">
 Détails du destinataire
        </h3>
        <div style="display: flex">
<h3 style="font-size: 21px;  font-family: Helvetica Neue; font-weight: 500; textWrap: wrap ">
  
                     toi
</h3>

</div>
 </div>






  <div style=" height: 55px; margin-bottom: 12px; width: 100%; display: flex; justify-content: space-between; align-items: center; ">
    <h3 style="font-size: 21px; opacity: 0.5; font-family: Helvetica Neue; font-weight: 500; ">
     Mode de paiement
        </h3>
<h3 style="font-size: 21px;  font-family: Helvetica Neue; font-weight: 500; ">
   reçu
</h3>
 </div>




  

   <div style=" height: 55px; margin-bottom: 180px; width: 100%; display: flex; justify-content: space-between; align-items: center; ">

                       <h3 style="font-size: 21px; opacity: 0.5; font-family: Helvetica Neue; font-weight: 500;   ">
     Id de transaction
        </h3>
                  <h3 style="font-size: 21px;  font-family: Helvetica Neue; font-weight: 500;  ">
   ${type.identifierId}
        </h3>
 </div>




   <div style=" height: 20px; margin-bottom: 12px; width: 100%; display: flex; justify-content: center; align-items: center; ">

                       <h3 style="font-size: 18px; opacity: 0.5; font-family: Helvetica Neue; font-weight: 500;  ">
   Soutien
        </h3>
           
 </div>
  <div style=" height: 40px; margin-bottom: 12px;border-bottom: 1.5px dashed black; width: 100%; display: flex; justify-content: center; align-items: center; ">

                       <h3 style="font-size: 18px;  font-family: Helvetica Neue; font-weight: 500; color: rgba(40, 40, 256, 0.9)">
    ${email}
        </h3>
           
 </div>

 <div style=" height: 40px; margin-bottom: 12px; width: 100%; display: flex; justify-content: center; align-items: center; ">

                       <h3 style="font-size: 18px; opacity: ; font-family: Helvetica Neue; font-weight: 500;  ">
    Profitez d'une transaction rapide et gagnez des références et des bonus.
        </h3>
           
 </div>

      </body>
    </html>
  `;
};

export const printToFile = async (specificData: any) => {
    console.log(specificData.fundingType);

    const chooseGenerateHtmlContent =
        specificData.fundingType === "deposits"
            ? generateHtmlContent(specificData)
            : specificData.fundingType === "withdrawals" &&
                specificData.bonusBalance
              ? generateHtmlContent2A(specificData)
              : specificData.fundingType === "withdrawals"
                ? generateHtmlContent2(specificData)
                : specificData.fundingType === "bonus"
                  ? generateHtmlContent3(specificData)
                  : specificData.fundingType === "send"
                    ? generateHtmlContent4(specificData)
                    : generateHtmlContent5(specificData);

    const html = chooseGenerateHtmlContent;
    const { uri } = await Print.printToFileAsync({ html });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
};

