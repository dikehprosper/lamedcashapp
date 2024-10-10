"use client";
import { FedaPay, Transaction, Customer } from "fedapay";
import React, { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import axios from "axios";
FedaPay.setApiKey(process.env.FEDAPAY_KEY!);
/* Specify whenever you are willing to execute your request in test or live mode */
FedaPay.setEnvironment("sandbox");
const ExtractId = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    async function getStatus() {
      const url = `${pathname}?${searchParams}`;
      const params = new URLSearchParams(searchParams);
      const id = params.get("id");

      if (id) {
        try {
          const parsedId = parseInt(id, 10);
          console.log(parsedId);

          // Assuming `Transaction.retrieve` returns a Promise, await directly
          const transaction = await Transaction.retrieve(parsedId);
          const res = await transaction.json();
          console.log(res);

          if (transaction.status === "approved") {
            console.log("Payment approved");
          } else {
            console.log("Payment pending");
          }
        } catch (error) {
          console.error("Error retrieving transaction:", error);
        }
      }
    }

    getStatus();
  }, [pathname, searchParams]);

  return (
    <div>
      <p>
        This component does not render anything. Check the console for the
        extracted id value.
      </p>
    </div>
  );
};

export default ExtractId;
