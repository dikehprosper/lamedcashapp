import React from "react";
import "./transactionPage.css";
import Head from "@/components/(userscomponent)/(head)/head";
import TransactionTemplate from "@/components/(userscomponent)/(TransactionTemplate)/TransactionTemplate";

const Transactions = () => {
  return (
    <div className='transactionPage_container'>
      <Head
        title='Transaction'
        about='View and Track your Transaction history'
      />
      <TransactionTemplate title='' />
    </div>
  );
};

export default Transactions;
