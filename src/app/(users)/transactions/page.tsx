import React from "react";
import "./transactionPage.css";
import Head from "@/components/(userscomponent)/(head)/head";
import TransactionTemplate from "@/components/(userscomponent)/(TransactionTemplateUsers)/TransactionTemplate";
import { LuHistory } from "react-icons/lu";

const Transactions = () => {
  return (
    <div className='transactionPage_container'>
      <Head
        title='Transactions'
        about="Afficher et suivre l'historique de vos transactions"
      />
      <TransactionTemplate
        title={{ name: "Transaction History", icon: <LuHistory /> }}
        select={{
          firstSelect: { big: "View All", small: "All" },
          secondSelect: { big: "View Deposits", small: "Deposits" },
          thirdSelect: { big: "View Withdrawals", small: "Withdrawals" },
        }}
      />
    </div>
  );
};

export default Transactions;
