"use client";
import {useRouter} from "next/navigation";
import {useParams} from "next/navigation";
import React, {useEffect, useState} from "react";
import "./kkkk.css";
import Feexpay from "@feexpay/react-sdk";
// const keyee = process.env.DOMAIN;

const Deposit = () => {
  const [amount, setAmount] = useState<any>();
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensure this runs on the client side
      const qs = decodeURIComponent(window.location.search.substring(1));
      const params = new URLSearchParams(qs);
      const amount = params.get("amount");
      console.log(amount, "vvvvv");
      setAmount(amount);
    }
  }, []);

  return (
    <div className='user_withdraw_container'>
      <div className='receiptModal'>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        ></div>
        <div
          className='receiptModal_inner-processing'
          id='receiptModal'
          style={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "29%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              paddingRight: "20px",
              paddingLeft: "20px",
              paddingTop: "10px",
              paddingBottom: "50px",
              height: "50%",
            }}
          >
            {/* <h6
                style={{
                  color: "white",
                  marginBottom: "13px",
                  width: "100%",
                  alignSelf: "center",
                  textAlign: "center",
                }}
              >
                Vous êtes sur le point d'effectuer un paiement de

              </h6> */}
            {/* <Feexpay
              token='fp_rbtFv0wBIzB4OzZUg1oJtFP3ITcfzaSh8wyOqetJkulyqpL0sATFu1iJMzGIyxhY'
              id='663beb50e13f3f8696c62799'
              amount={amount}
              description='DESCRIPTION'
              callback={() => {
                alert("Pay");
                // window.location.href = `http://localhost:3000/${locale}/deposit`;
              }}
              //  callback_url=`http://localhost:3000/${locale}/deposit`
              callback_info='CALLBACK_INFO'
              buttonText='Payer'
              buttonStyles={{
                background: "rgba(128, 128, 128, 1)",
              }}
              defaultValueField={{country_iban: "BJ"}}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
export const dynamic = "force-dynamic";
