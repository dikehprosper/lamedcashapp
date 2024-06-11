/* eslint-disable */
// @ts-nocheck
"use client";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "./kkkk.css";
import Head from "@/components/(userscomponent)/(head)/head";
import { FaCircle } from "react-icons/fa";
import FooterMobile from "@/components/(Utils)/FooterMobile";
import axios from "axios";
import { IoIosCopy } from "react-icons/io";
import { useRouter } from "next/navigation";
import { FedaPay } from "fedapay";
import Modal from "@/components/(Utils)/(modals)/processingModal";
import Modal2 from "@/components/(Utils)/(modals)/processingModals2";
import { useTranslations } from "next-intl";
import Feexpay from '@feexpay/react-sdk'
import { useParams, usePathname } from "next/navigation";



const keyee = process.env.DOMAIN;



const Deposit = () => {
  

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
                    <div className='receiptModal_inner-processing' id='receiptModal' style={{
                        width: "80%",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: "center",
                        justifyContent: "center",
                        height: "29%",
                    }}>
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
                            <h6
                                style={{
                                    color: "white",
                                    marginBottom: "13px",
                                    width: "100%",
                                    alignSelf: "center",
                                    textAlign: "center",
                                }}
                            >
                                Vous êtes sur le point d'effectuer un paiement de
                                 {/* {user.amount} */}
                            </h6>
                            <Feexpay
                                token='fp_rbtFv0wBIzB4OzZUg1oJtFP3ITcfzaSh8wyOqetJkulyqpL0sATFu1iJMzGIyxhY'
                                id='663beb50e13f3f8696c62799'
                                // amount={user.amount}
                                 amount={9000}
                                description='DESCRIPTION'
                                callback={() => {
                                    alert("Pay");
                                    window.location.href = `http://localhost:3000/${locale}/deposit`;
                                }}
                                //  callback_url=`http://localhost:3000/${locale}/deposit`
                                callback_info='CALLBACK_INFO'
                                buttonText='Payer'
                                buttonStyles={ "rgba(128, 128, 128, 1)"
                                }
                                defaultValueField={{ country_iban: "BJ", network:
                                //  user.network 
                                "MOOV"
                                }}
                            />
                        </div>
                    </div>
                </div>
            
          
        </div>
    );
};

export default Deposit;
export const dynamic = "force-dynamic";
