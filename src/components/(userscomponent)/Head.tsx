import React from "react";
import { IoIosCopy } from "react-icons/io";
const Head = () => {
  return (
    <>
      <div className='head-container big'>
        <div className='title-container'>
          <h2 className='title-container-h2'>Welcome</h2>
          <p className='title-container-p'>
            Experience fast deposits and withdrawals
          </p>
        </div>
        <div className='tag'>
          <div className='tag-container'>
            <div className='tag-container-icon'></div>
            <span className='tag-container-name'>dexter.j</span>
            <span className='tag-container-online-container'>
              Online <span className='tag-container-online-logo'> </span>{" "}
            </span>
            <span className='tag-container-id'>
              <span className='tag-container-id-span1'>
                <span style={{ fontWeight: "300" }}>1XBet Id:</span> &nbsp;
                8234787984
              </span>
              <span className='tag-container-id-span2'>
                <IoIosCopy />
                copy code
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className='head-container small'>
        <div className='tag'>
          <div className='tag-container'>
            <div className='tag-container-icon'>
              <span className='tag-container-online-logo-mobile'> </span>
            </div>
            <span className='tag-container-name'>dexter.j</span>
            <span className='tag-container-online-container'>
              Online <span className='tag-container-online-logo'> </span>{" "}
            </span>
            <span className='tag-container-id'>
              <span className='tag-container-id-span1'>
                <span style={{ fontWeight: "300" }}>1XBet Id:</span> &nbsp;
                8234787984
              </span>
              <span className='tag-container-id-span2'>
                <IoIosCopy />
                copy code
              </span>
            </span>
          </div>
        </div>
        <div className='title-container'>
          <h2 className='title-container-h2'>Welcome</h2>
          <p className='title-container-p'>
            Experience fast deposits and withdrawals
          </p>
        </div>
      </div>
    </>
  );
};

export default Head;
