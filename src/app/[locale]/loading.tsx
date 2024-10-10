"use client";
import React from "react";
import Image from "next/image";
import image from "../../../public/Logo.webp";
import image1 from "../../../public/Logo1.webp";
import {  useAppSelector } from "@/lib/hooks";
const Loading = () => {
  const updatedTheme = useAppSelector((state) => state.theme.theme);
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        background: updatedTheme === "light" ? "white" : updatedTheme === "dark" ? "rgba(10, 20, 38)" : "transparent"
      }}
    >
      <div
        className="logo"
        style={{ height: "43px", width: "140px", objectFit: "cover" }}
      >
       
          { updatedTheme === "light" ? (
            <Image
              src={image1}
              loading='eager'
              fill
              style={{objectFit: "contain"}}
              alt='Picture of the author'
            />
          ) :  updatedTheme === "dark" ?
           ( <Image
              src={image}
              loading='eager'
              fill
              style={{objectFit: "contain"}}
              alt='Picture of the author'
            />
          ): null}
      </div>
    </div>
  );
};

const loading = () => {

  return (
<Loading />
  );
};

export default loading;
