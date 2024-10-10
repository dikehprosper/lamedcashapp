"use client";
import React, {useEffect, useState} from "react";
import { IoMoonOutline, IoMoonSharp } from "react-icons/io5";

export default function ThemeToggle({updatedTheme, toggleTheme }: any) {
  return (
    <div
      onClick={toggleTheme}
      className='p-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded cursor-pointer'
    >
      {updatedTheme === "light" ? <IoMoonOutline color="black" /> : updatedTheme === "dark"?  <IoMoonSharp color="white" />: null}
    </div>
  );
}
