"use-client";
import React, { useRef } from "react";
import { IoIosCopy } from "react-icons/io";
import "./head.css";
import GetInitials from "../../(Utils)/getInitials";
import { toast } from "react-toastify";
const Head = ({ title, about, data }: any) => {
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
  return (
    <>
      <div className='head-container big'>
        <div className='title-container'>
          <h2 className='title-container-h2'>{title}</h2>
          <p className='title-container-p'>{about}</p>
        </div>
        <div className='tag'>
          {data?._id ? (
            <div className='tag-container animate-pop-in '>
              <div className='tag-container-icon'>
                <GetInitials name={data?.fullname} />
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
                En ligne <span className='tag-container-online-logo'> </span>{" "}
              </span>
              <span className='tag-container-id'>
                <span className='tag-container-id-span1'>
                  <span style={{ fontWeight: "300" }}>1XBet Id:</span> &nbsp;
                  <span onClick={handleCopyClick} ref={spanRef}>
                    {" "}
                    {data?.betId}{" "}
                  </span>
                </span>
                <span
                  className='tag-container-id-span2'
                  onClick={handleCopyClick}
                  style={{ cursor: "pointer" }}
                >
                  <IoIosCopy />
                  copier
                </span>
              </span>
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
            {data?._id ? (
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
