"use client";
import ResetPassword from "@/components/(resetpasswordSection)/resetpassword";
import React from "react";
import {  useAppSelector } from "@/lib/hooks";
const Forgotpassword = () => {
  const updatedTheme = useAppSelector((state) => state.theme.theme);
  return (updatedTheme === "dark" || updatedTheme === "light"?  <div>
      <ResetPassword updatedTheme={updatedTheme} />
    </div>: null
   
  );
};

export default Forgotpassword;
