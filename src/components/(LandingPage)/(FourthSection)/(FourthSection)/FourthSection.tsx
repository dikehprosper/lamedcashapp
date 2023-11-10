"use client";
import React, { useState } from "react";
import "./fourthSection.css";
import FirstQuestion from "../(components)/(FirstQuestion)/FirstQuestion";
import SecondQuestion from "../(components)/(SecondQuestion)/SecondQuestion";

const FourthSection = () => {
  const [height, setHeight] = useState(0);
  const [height2, setHeight2] = useState(0);

  function adjustHeight() {
    setHeight2(0);
    setHeight((prev): any => {
      if (prev === 0) {
        return "auto";
      } else {
        return 0;
      }
    });
  }
  function adjustHeight2() {
    setHeight(0);
    setHeight2((prev): any => {
      if (prev === 0) {
        return "auto";
      } else {
        return 0;
      }
    });
  }
  return (
    <div className="component_400">
      <h2>Questions fréquemment posées</h2>
      <div className="body_400">
        <FirstQuestion height={height} adjustHeight={adjustHeight} />
        <SecondQuestion height={height2} adjustHeight={adjustHeight2} />
      </div>
    </div>
  );
};
export default FourthSection;
