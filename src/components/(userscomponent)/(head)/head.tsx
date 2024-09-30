"use-client";
import React, { useRef } from "react";
import { IoIosCopy } from "react-icons/io";
import "./head.css";
import GetInitials from "../../(Utils)/getInitials";
import { toast } from "react-toastify";

import LanguageToggle from "@/components/(LanguageToggle)/languageToggle";
import Image from "next/image";
import image from "../../../../public/wavingHand.png";

const Head = ({title, about, data,display, updatedTheme, t}: any) => {
  const spanRef = useRef<HTMLSpanElement>(null);


  const handleCopyClick = () => {
    if (spanRef.current) {
      const range = document.createRange();
      range.selectNode(spanRef.current);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);

      try {
        document.execCommand("copy");
        toast.success("Text successfully copied!");
      } catch (err) {
        toast.error("Oops! Unable to copy text.");
      }

      window.getSelection()?.removeAllRanges();
    }
  };

  const imageUrl = data?.image === "" ? "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/Untitled%20design%20(4)%20(1).png?alt=media&token=7f06a2ba-e4c5-49a2-a029-b6688c9be61d" : data?.image

  return (
    <>
      <div className='head-container big' style={{background: 
              updatedTheme === "dark"
              ? "" : updatedTheme === "light"? "white"
              : "transparent" }}>
        <div className='title-container'>
          <h2 className='title-container-h2' style={{color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent"}}>{title}</h2>
          <p className='title-container-p' style={{color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent"}}>{about}</p>
        </div>
      
      </div>

      <div className='head-container small'>
        <div className='tag'>
          <span className='tag-container-id'  style={{boxShadow: 
              updatedTheme === "dark"
              ? "" : updatedTheme === "light"? " 0px 4px 10px rgba(0, 0, 0, 1)"
              : "transparent", background: 
              updatedTheme === "dark"
              ? "" : updatedTheme === "light"? "rgba(256, 256, 256, 0.3)"
              : "transparent"}}>
            {data?.fullname ? (
              <>
                <span className='tag-container-id-span1' >
                  <span className='tag-container-id-span3' style={{color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent"}}> </span>
                  <span onClick={handleCopyClick} ref={spanRef} style={{color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent"}}>
                    {" "}
                    {data?.betId}{" "}
                  </span>
                </span>
                <span
                  className='tag-container-id-span2'
                  onClick={handleCopyClick}
                  style={{color: "rgba(73, 166, 106, 1)"}}
                >
                  <IoIosCopy />
                  {t}
                </span>
              </>
            ) : (
              <span className='tag-container-id2'>
                <div id='container_customerid'>
                  <div id='container_customerid_inner'></div>
                </div>
              </span>
            )}
          </span>
        </div>
        <div className='title-container' style={{color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent"}}> {data?.fullname?  <> <h3 className='title-container-h2'>{title} &nbsp;
                  {display && data?.fullname} &nbsp;
            {display && <Image
          src={image}
          style={{ objectFit: "contain"}}
          alt="background"
           width={20}
          height={40}
        />} 
          </h3>
          <p className='title-container-p' style={{color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent"}}>{about}</p></>:
           <span className='tag-container-id2'>
                <div id='container_customerid'>
                  <div id='container_customerid_inner'></div>
                </div>
              </span>}
         
        </div>
      </div>
    </>
  );
};

export default Head;

