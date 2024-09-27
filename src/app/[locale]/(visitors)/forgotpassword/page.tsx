"use client";
import ForgotPassword from "@/components/(forgotpasswordSection)/forgotpassword";
import React from "react";
import {  useAppSelector } from "@/lib/hooks";
const Forgotpassword = () => {
   const updatedTheme = useAppSelector((state) => state.theme.theme);
  return (!updatedTheme? "": 
    <div>
      <ForgotPassword updatedTheme={updatedTheme} />
    </div>
  );
};

export default Forgotpassword;
