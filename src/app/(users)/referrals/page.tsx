import React from "react";
import UserNav from "@/components/(Navs)/UserNav";
import axios from "axios"
const Referrals = () => {
  async function getAvailableCashdeskAddress() {
    try {
      const res = await axios.get("/api/getAvailableCashdeskWithdrawal");
      setCashdeskAddress(res.data.subadminWithLowestPendingCountAddress);
        console.log(res.data.subadminWithLowestPendingCountAddress);
      setUser({
        ...user,
        cashdeskId: res.data.subadminWithLowestPendingCountId,
      });
    } catch (error: any) {
      console.error(error.message);
    }
  }
getAvailableCashdeskAddress()
  return (
    <>
      {/* <UserNav /> */}
      Referrals
    </>
  );
};

export default Referrals;
