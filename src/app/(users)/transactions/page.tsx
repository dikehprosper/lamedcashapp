"use client";
import React, { useState, useEffect } from "react";
import "./transactionPage.css";
import Head from "@/components/(userscomponent)/(head)/head";
import TransactionTemplate from "@/components/(userscomponent)/(TransactionTemplateUsers)/TransactionTemplate";
import { LuHistory } from "react-icons/lu";
import axios from "axios";

const Transactions = () => {
  const [data, setData] = useState<any>();
  // Filter deposit transactions
  const allDeposits = data?.transactionHistory?.filter(
    (transaction: any) => transaction.fundingType === "deposits"
  );

  const getUserDetails = async () => {
    const res = await axios.get("/api/getUser");
 setData(res.data.data);
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  const totalDeposits = allDeposits?.filter((data )=> data.status === "Successful").reduce((total: any, transaction: any) => {
    return (total += transaction.amount);
  }, 0);

  // Filter withdrawal transactions
  const allWithdrawals = data?.transactionHistory?.filter(
    (transaction: any) => transaction.fundingType === "withdrawals"
  );

  const totalWithdrawals = allWithdrawals?.filter((data )=> data.status === "Successful").reduce(
    (total: any, transaction: any) => {
      return (total += transaction.amount);
    },
    0
  );

  return (
    <div className='transactionPage_container'>
      <Head
        title='Transactions'
        about="Afficher et suivre l'historique de vos transactions"
      />
      <TransactionTemplate
        title={{ name: "Historique des Transactions", icon: <LuHistory /> }}
        select={{
          firstSelect: { big: "Voir tout", small: "Tout" },
          secondSelect: { big: "Voir les Dépôts", small: "Dépôts" },
          thirdSelect: { big: "Afficher les Retraits", small: "Retraits" },
        }}
        totalWithdrawals={totalWithdrawals}
        totalDeposits={totalDeposits}
        data={data?.transactionHistory}
        allData={data}
      />
    </div>
  );
};

export default Transactions;
