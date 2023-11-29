import React from "react";
import Head from "@/components/(userscomponent)/(head)/head";
import Display from "@/components/(userscomponent)/(display)/display";
import "./dash.css";
import { TbPigMoney } from "react-icons/tb";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import TransactionTemplate from "@/components/(userscomponent)/(TransactionTemplateUsers)/TransactionTemplate";
import { LuHistory } from "react-icons/lu";
import data from "../../../components/file";

const Dashboard = async () => {
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


  // Filter deposit transactions with status "pending"
  const pendingDeposits = data.transactionHistory.filter(
    (transaction) =>
      transaction.type === "deposits" && transaction.status === "pending"
  );

  // Filter withdrawal transactions with status "pending"
  const pendingWithdrawals = data.transactionHistory.filter(
    (transaction) =>
      transaction.type === "withdrawals" && transaction.status === "pending"
  );

  // Calculate total cost of pending deposits
  console.log(pendingDeposits);
  const totalPendingDepositAmount = pendingDeposits.reduce(
    (total, transaction) => {
      return (total += transaction.amount);
    },
    0
  );

  // Calculate total cost of pending withdrawals
  const totalPendingWithdrawalAmount = pendingWithdrawals.reduce(
    (total, transaction) => {
      return (total += transaction.amount);
    },
    0
  );

  return (
    <div className='user_dashboard_container'>
      <Head
        title='Bienvenue'
        about="Faites l'expérience de dépôts et de retraits rapides"
      />
      <div className='user-dashboard-display'>
        <Display
          count={pendingDeposits.length}
          title='Dépôt'
          term={1}
          amount={totalPendingDepositAmount}
          data={data.transactionHistory}
          style={{
            color: "#658900",
            background: "rgba(101, 137, 0, 0.4)",
            icon: <TbPigMoney />,
          }}
        />
        <Display
          count={pendingWithdrawals.length}
          term={2}
          title='Retirer'
          amount={totalPendingWithdrawalAmount}
          data={data.transactionHistory}
          style={{
            color: "#0076B8",
            background: "rgba(0, 118, 184, .4)",
            icon: <RiMoneyDollarCircleLine />,
          }}
        />
      </div>
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

export default Dashboard;
