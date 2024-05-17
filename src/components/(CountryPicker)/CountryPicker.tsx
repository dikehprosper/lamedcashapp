/* eslint-disable react/jsx-key */
"use client";
import { BiCheck } from "react-icons/bi";
import "./CountryPicker.css";

export default function CountryPicker({
  setShow,
  setCountryCode,
  countryCode,
}: {
  setShow: any;
  setCountryCode: any;
  countryCode: string;
}) {
  const countries = {
    Benin: "+229",
    "Burkina Faso": "+226",
    "Cote d'Ivoire": "+225",
    Mali: "+223",
    Niger: "+227",
    Senegal: "+221",
    Togo: "+228",
  };

  const handleClick = (code: string) => {
    setCountryCode(code);
    setShow(false);
  };
  return (
    <div className="country-picker">
      {Object.keys(countries).map((item, key) => (
        <div
          className="country-picker-item"
          onClick={() => handleClick(countries[item as keyof object])}
        >
          <span
            style={{ width: "20px", display: "flex", justifyContent: "center" }}
          >
            <BiCheck
              style={{
                display:
                  countryCode === countries[item as keyof object]
                    ? "block"
                    : "none",
              }}
            />
          </span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}
