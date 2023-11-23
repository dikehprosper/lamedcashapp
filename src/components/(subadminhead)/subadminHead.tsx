import React from "react";
import { IoIosCopy } from "react-icons/io";
import "./subadminHead.css";
const SubadminHead = ({ title, about }: any) => {
  return (
    <>
      <div className='subadmin-head-container big'>
        <div className='subadmin-title-container'>
          <h2 className='subadmin-title-container-h2'>{title}</h2>
          <p className='subadmin-title-container-p'>{about}</p>
        </div>
        <div className='subadmin-tag'>
          <div className='subadmin-tag-container'>
            <span className='subadmin-tag-container-name'>Vincent</span>
            <span className='subadmin-tag-container-online-container'>
              Online{" "}
              <span className='subadmin-tag-container-online-logo'> </span>{" "}
            </span>
            <span className='subadmin-tag-container-id'>
             Out Of Funds
            </span>
          </div>
        </div>
      </div>
      <div className='subadmin-head-container small'>
        <div className='subadmin-tag'>
          <span className='subadmin-tag-container-id'>
            Out Of Funds
          </span>
        </div>
        <div className='subadmin-title-container'>
          <h2 className='subadmin-title-container-h2'>{title}</h2>
          <p className='subadmin-title-container-p'>{about}</p>
        </div>
      </div>
    </>
  );
};

export default SubadminHead;
