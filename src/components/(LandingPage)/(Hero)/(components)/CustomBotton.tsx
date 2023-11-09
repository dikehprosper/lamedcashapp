"use client";
import React from "react";
import { CustomButtonProps } from "@/types";

const CustomBotton = ({
  title,
  containerStyles,
  handleClick,
}: CustomButtonProps) => {
  return (
    <button
      disabled={false}
      type={"button"}
      className={`custom-btn ${containerStyles}`}
      onClick={() => {
        handleClick;
      }}
    >
      <span className="custom-button">{title}</span>
    </button>
  );
};

export default CustomBotton;
