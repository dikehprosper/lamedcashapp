import React from "react";
import { IoIosCopy } from "react-icons/io";
import "./head.css";
const Head = ({ title, about }: any) => {
  return (
    <>
      <div className='head-container big'>
        <div className='title-container'>
          <h2 className='title-container-h2'>{title}</h2>
          <p className='title-container-p'>{about}</p>
        </div>
        <div className='tag'>
          <div className='tag-container'>
            <div className='tag-container-icon'>DJ</div>
            <span className='tag-container-name'>dexter.j</span>
            <span className='tag-container-online-container'>
              En ligne <span className='tag-container-online-logo'> </span>{" "}
            </span>
            <span className='tag-container-id'>
              <span className='tag-container-id-span1'>
                <span style={{ fontWeight: "300" }}>1XBet Id:</span> &nbsp;
                823478798
              </span>
              <span className='tag-container-id-span2'>
                <IoIosCopy />
                copier
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className='head-container small'>
        <div className='tag'>
          <div className='tag-container'>
            <div className='tag-container-icon'>
              Dj
              <span className='tag-container-online-logo-mobile'> </span>
            </div>
            <span className='tag-container-name'>dexter.j</span>
            <span className='tag-container-online-container'>
              En ligne <span className='tag-container-online-logo'> </span>{" "}
            </span>
            <span className='tag-container-id'>
              <span className='tag-container-id-span1'>
                <span style={{ fontWeight: "300" }}>1XBet Id:</span> &nbsp;
                823478798
              </span>
              <span className='tag-container-id-span2'>
                <IoIosCopy />
                copier
              </span>
            </span>
          </div>
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
