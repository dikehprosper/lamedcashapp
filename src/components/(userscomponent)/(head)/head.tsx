"use-client";
import React, { useRef } from "react";
import { IoIosCopy } from "react-icons/io";
import "./head.css";
import GetInitials from "../../(Utils)/getInitials";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import LanguageToggle from "@/components/(LanguageToggle)/languageToggle";
import Image from "next/image";
const Head = ({title, about, data}: any) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const t = useTranslations("dashboard");

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

  const imageUrl = data.image === ""?  "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/Untitled%20design%20(4)%20(1).png?alt=media&token=7f06a2ba-e4c5-49a2-a029-b6688c9be61d" : data.image

  return (
    <>
      <div className='head-container big'>
        <div className='title-container'>
          <h2 className='title-container-h2'>{title}</h2>
          <p className='title-container-p'>{about}</p>
        </div>
        <div className='tag'>
          {data?.fullname ? (
            <div className='tag-container animate-pop-in '>
              <div className='tag-container-icon'>
                <Image
                  src={imageUrl}
                  style={{objectFit: "contain", borderRadius: 25}}
                  alt='background'
                  width={50}
                  height={50}
                />
              </div>
              <span className='tag-container-name'>
                {" "}
                {data?.fullname ? (
                  data?.fullname
                ) : (
                  <div id='container_outoffunds'>
                    <div id='container_outoffunds_inner'></div>
                  </div>
                )}
              </span>
              <span className='tag-container-online-container'>
                {t("online")}{" "}
                <span className='tag-container-online-logo'> </span>{" "}
              </span>
              <span className='tag-container-id'>
                <span className='tag-container-id-span1'>
                  <span style={{fontWeight: "300"}}>1XBet Id:</span> &nbsp;
                  <span onClick={handleCopyClick} ref={spanRef}>
                    {" "}
                    {data?.betId}{" "}
                  </span>
                </span>
                <span
                  className='tag-container-id-span2'
                  onClick={handleCopyClick}
                  style={{cursor: "pointer"}}
                >
                  <IoIosCopy />
                  copier
                </span>
              </span>
              <div style={{marginLeft: "5px"}}></div>
              <LanguageToggle />
            </div>
          ) : (
            <div className='tag-container2'>
              {" "}
              <div id='container_customerid'>
                <div id='container_customerid_inner'></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='head-container small'>
        <div className='tag'>
          <span className='tag-container-id'>
            {data?.fullname ? (
              <>
                <span className='tag-container-id-span1'>
                  <span className='tag-container-id-span3'>1XBet Id: </span>
                  <span onClick={handleCopyClick} ref={spanRef}>
                    {" "}
                    {data?.betId}{" "}
                  </span>
                </span>
                <span
                  className='tag-container-id-span2'
                  onClick={handleCopyClick}
                >
                  <IoIosCopy />
                  copier
                </span>{" "}
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
        <div className='title-container'>
          <h2 className='title-container-h2'>{title}</h2>
          <p className='title-container-p'>{about}</p>
        </div>
      </div>
    </>
  );
};

export default Head;

