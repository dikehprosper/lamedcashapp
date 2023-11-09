"use client";
import React, { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();
import "./fourthSection.css";
import FirstQuestion from "../(components)/(FirstQuestion)/FirstQuestion";
import SecondQuestion from "../(components)/(FirstQuestion)/FirstQuestion";
import "./fourthSection.css";

const FourthSection = () => {
  const [height, setHeight] = useState(0);

  function adjustHeight() {
    setHeight((prev): any => {
      if (prev === 0) {
        return 245;
      } else {
        return 0;
      }
    });
  }

  return (
    <div className="component_400">
      <h2 data-aos="fade-in" data-aos-duration="500">
        Questions fréquemment posées
      </h2>
      <div className="body_400">
        <FirstQuestion />
        <SecondQuestion />
      </div>
    </div>
  );
};
export default FourthSection;
