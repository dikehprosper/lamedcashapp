import React from "react";
import "./subadminDepositDashboard.css";
import SubadminHead from "@/components/(subadminhead)/subadminHead";
import { FaCheckCircle } from "react-icons/fa";
import SubadminDepositDashboardDisplay from "./(components)/SubadminDepositDashboardDisplay";
import SubadminTransactionTemplate from "@/components/(TransactionTemplateSubadmin)/transactionTemplateSubadmin";
import { LuHistory } from "react-icons/lu";

const orders = {
  openOrders: [
    {
      id: 11,
      amount: 45000789,
    },
    {
      id: 12,
      amount: 45000789,
    },
    {
      id: 12,
      amount: 45000789,
    },
    {
      id: 12,
      amount: 45000789,
    },
  ],
  completedOrders: [
    {
      id: 11,
      amount: 45000789,
    },
    {
      id: 12,
      amount: 45000789,
    },
    {
      id: 12,
      amount: 45000789,
    },
    {
      id: 12,
      amount: 45000789,
    },
  ],
};

function SubadminDepositDashboard() {
  return (
    <div className='subadmin_dashboard_container'>
      <SubadminHead
        title='Cashdesk Deposits'
        about='Manage All Deposit Order Request Here'
      />
      <SubadminDepositDashboardDisplay orders={orders} />
      <SubadminTransactionTemplate
        title={{ name: "Transaction History", icon: <LuHistory /> }}
        select={{
          firstSelect: { big: "View All", small: "All" },
          secondSelect: { big: "Pending Orders", small: "Pending Orders" },
          thirdSelect: { big: "Successful Orders", small: "Successful Orders" },
          fourthSelect: { big: "Failed Orders", small: "Failed Orders" },
        }}
      />
    </div>
  );
}

export default SubadminDepositDashboard;
