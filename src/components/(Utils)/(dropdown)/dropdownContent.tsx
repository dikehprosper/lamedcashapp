import React, { useState } from "react";
import "./dropdownContent.css";
import AnimateHeight from "react-animate-height";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";

const DropdownContent = ({ state, select, setState, setLoading }: any) => {
  const [height, setHeight] = useState(0);
  function adjustHeight() {
    setHeight((prev): any => {
      if (prev === 0) {
        return "auto";
      } else {
        return 0;
      }
    });
  }

  function changeState(select: any) {
    setLoading(true);
    setState(select);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }
  function checkHeight() {
    if (height === 0) {
      return null
    } else {
      return  <div
          style={{
            position: "fixed",
            zIndex: 80,
            width: "100vw",
            height: "100vh",
            background: "",
            top: 0,
            left: 0,
            right: 0,
          }}
        ></div>
    }
  }

  return (
    <div
      className='dropdown-content-configure'
      aria-expanded={height !== 0}
      aria-controls='example-panel'
      onClick={adjustHeight}
    >
      {state}&nbsp; {height === 0 ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
    {checkHeight()}
      <AnimateHeight
        id='example-panel'
        duration={300}
        height={height}
        style={{
          background: "black",
          position: "absolute",
          top: "100%",
          zIndex: 90,
          width: "inherit",
        }}
      >
        <div className='dropdown-content-configure-container'>
          {select.map((select: any, index: any) => {
            return (
              <div
                className='dropdown-content-configure-container_1'
                onClick={() => changeState(select)}
                key={index}
                style={{
                  background: state === select ? "rgba(256, 256, 256, 0.3)" : "",
                  color: state === select ? "black" : "",
                }}
              >
                {select}
              </div>
            );
          })}
        </div>
      </AnimateHeight>
    </div>
  );
};

export default DropdownContent;
