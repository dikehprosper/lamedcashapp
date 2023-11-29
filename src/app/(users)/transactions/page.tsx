import React from "react";
import "./transactionPage.css";
import Head from "@/components/(userscomponent)/(head)/head";
import TransactionTemplate from "@/components/(userscomponent)/(TransactionTemplateUsers)/TransactionTemplate";
import { LuHistory } from "react-icons/lu";
import data from "../../../components/file";
const Transactions = () => {
  // Filter deposit transactions
  const allDeposits = data.transactionHistory.filter(
    (transaction) => transaction.type === "deposits"
  );

  const totalDeposits = allDeposits.reduce((total, transaction) => {
    return (total += transaction.amount);
  }, 0);

  // Filter withdrawal transactions
  const allWithdrawals = data.transactionHistory.filter(
    (transaction) => transaction.type === "withdrawals"
  );

  const totalWithdrawals = allWithdrawals.reduce((total, transaction) => {
    return (total += transaction.amount);
  }, 0);
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
        data={data.transactionHistory}
      />
    </div>
  );
};

export default Transactions;
