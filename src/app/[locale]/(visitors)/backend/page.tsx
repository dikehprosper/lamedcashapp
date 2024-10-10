/* eslint-disable react/no-unescaped-entities */
"use client";
import {useEffect, useState} from "react";
import Feexpay from "@feexpay/react-sdk";
import {useParams} from "next/navigation";

const Redirect = () => {
  const {locale} = useParams();
  const [amount, setAmount] = useState<any>(null);

  useEffect(() => {
    const handleRedirect = () => {
      const links = document.querySelectorAll("a");
      let baseUri = "exp://wg-qka.notbrent.app.exp.direct";

      // Take the uri from the params
      const qs = decodeURIComponent(window.location.search.substring(1));
      const params = new URLSearchParams(qs);

      const linkingUri = params.get("linkingUri");
      const amount = params.get("amount");

      if (linkingUri) {
        baseUri = linkingUri;
      }

      if (amount) setAmount(amount);

      // Update the link urls
      links.forEach((link) => {
        link.href = link.href.replace("exp://REPLACE_ME/", baseUri);
      });
    };

    handleRedirect();
  }, []);

  return (
    <div
      style={{
        flex: 1,
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{padding: 30, backgroundColor: "rgba(120, 120, 120, 0.2)"}}>
        <p style={{marginBottom: "15px"}}>
          You are about to make a payment of {amount}.
        </p>
        {/* <Feexpay
          token='fp_rbtFv0wBIzB4OzZUg1oJtFP3ITcfzaSh8wyOqetJkulyqpL0sATFu1iJMzGIyxhY'
          id='663beb50e13f3f8696c62799'
          amount={amount}
          description='DESCRIPTION'
          callback={() => {
            alert("Pay");
            // window.location.href = `http://localhost:3000/${locale}/deposit`;
          }}
          fieldsToHide={["email", "full_name"]}
          callback_info='CALLBACK_INFO'
          buttonText='Payer'
          buttonStyles={{
            background: "rgba(128, 128, 128, 1)",
          }}
          defaultValueField={{
            country_iban: "BJ",
            network: "MOOV",
            
          }}
        /> */}
      </div>
    </div>
  );
};

export default Redirect;
