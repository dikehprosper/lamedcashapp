"use client";
import "../subadminDepositDashboard.css";
import DropdownContent from "@/components/(Utils)/(dropdown)/dropdownContent";
import React, { useState } from "react";
import { AiOutlineCluster } from "react-icons/ai";
import { TbPigMoney } from "react-icons/tb";
import formatNumberWithCommasAndDecimal from "@/components/(Utils)/formatNumber";

export default function SubadminDepositDashboardDisplay({ orders }: any) {
  const [state, setState] = useState("Today");
  const [state2, setState2] = useState("Today");
  const select = ["Today", "7 days", "2 weeks", "1 month"];

  const sum = orders.openOrders.reduce(
    (acc: any, obj: any) => acc + obj.amount,
    0
  );

  const sum2 = orders.completedOrders.reduce(
    (acc: any, obj: any) => acc + obj.amount,
    0
  );
  console.log(sum); // Output: 60

  return (
    <div className='subadmin_dashboard_container-display'>
      <div className='subadmin_dashboard_container-display-children'>
        <div className='display-body-300'>
          <div>
            <TbPigMoney fontSize='30px' />
          </div>{" "}
        </div>
        <h3>Open Orders</h3>
        <h1>{orders.openOrders.length}</h1>
        <h5>XOF {formatNumberWithCommasAndDecimal(sum)}</h5>
      </div>
      <div className='subadmin_dashboard_container-display-children'>
        <div className='display-body-300'>
          <div>
            <AiOutlineCluster fontSize='30px' />
          </div>{" "}
          <div>
            <DropdownContent
              state={state}
              select={select}
              setState={setState}
            />
          </div>
        </div>
        <h3>Completed Orders</h3>
        <h1>{orders.completedOrders.length}</h1>
        <h5>XOF {formatNumberWithCommasAndDecimal(sum)}</h5>
      </div>
      <div className='subadmin_dashboard_container-display-children'>
        <div className='display-body-300'>
          <div></div>{" "}
          <div>
            <DropdownContent
              state={state2}
              select={select}
              setState={setState2}
            />
          </div>
        </div>
        <h3>Total Orders</h3>
        <h1>{orders.openOrders.length + orders.completedOrders.length}</h1>
        <h5>XOF {formatNumberWithCommasAndDecimal(sum + sum2)}</h5>
      </div>
    </div>
  );
}
