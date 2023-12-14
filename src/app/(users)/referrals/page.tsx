import React from "react";
import UserNav from "@/components/(Navs)/UserNav";

async function getAvailableCashdeskAddress(): Promise<any> {
  const res = await fetch(
    `/api/getAvailableCashdeskWithdrawal?timestamp=${Date.now()}`,
    { cache: "no-store" }
  );
  // setCashdeskAddress(res.data.subadminWithLowestPendingCountAddress);
  return res.json();
  // setUser({
  //   ...user,
  //   cashdeskId: res.data.subadminWithLowestPendingCountId,
  // });
}
const Referrals = async () => {
  const [data] = await Promise.all([getAvailableCashdeskAddress()]);
  console.log([data]);
  return (
    <>
      {/* <UserNav /> */}
      Referrals
    </>
  );
};

export default Referrals;
