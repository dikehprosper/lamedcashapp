import React from "react";
import Image from "next/image";
import image from "../../public/Logo.png";
const loading = () => {
  return  <div
          style={{
            width: "100%",
            minHeight: "800px",
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <div
            className="logo"
            style={{ height: "70px", width: "70px", objectFit: "cover" }}
          >
            <Image
              src={image} // Use the imported image URL
              alt="Description of the image"
              layout="responsive"
              objectFit="cover"
              objectPosition="center center"
              priority
            />
          </div>
        </div>
};

export default loading;




