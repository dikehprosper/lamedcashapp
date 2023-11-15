import React from "react";
import { CustomButtonProps } from "@/types";
import Link from "next/link";

const CustomButton = ({
  title,
  containerStyles,
  handleClick,
}: CustomButtonProps) => {

  return (
    <div className={` ${containerStyles}`}>
      <Link href='/signin'>
        <div
        style={{width: "100%", height: "100%"}}

          className='custom-button'
        >
          {title}
        </div>
      </Link>
    </div>
  );
};

export default CustomButton;
