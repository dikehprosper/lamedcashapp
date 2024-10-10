// import React, { useEffect } from "react";
// import { FedaCheckoutButton, FedaCheckoutContainer } from "fedapay-reactjs";

// const App = () => {
//   const PUBLIC_KEY = "sk_sandbox_rlZQIN8rnovgkg2TCOeVSCxp";

//   const checkoutButtonOptions = {
//     public_key: PUBLIC_KEY,
//     transaction: {
//       amount: 100,
//       description: "Airtime",
//     },
//     currency: {
//       iso: "XOF",
//     },
//     button: {
//       class: "btn btn-primary",
//       text: "Payer 100 FCFA",
//     },
//     onComplete(resp) {
//       const FedaPay = window["FedaPay"];
//       if (resp.reason === FedaPay.DIALOG_DISMISSED) {
//         alert("Vous avez fermé la boite de dialogue");
//       } else {
//         alert("Transaction terminée: " + resp.reason);
//       }

//       console.log(resp.transaction);
//     },
//   };

//   const checkoutEmbedOptions = {
//     public_key: PUBLIC_KEY,
//     transaction: {
//       amount: 100,
//       description: "Airtime",
//     },
//     currency: {
//       iso: "XOF",
//     },
//   };

//   useEffect(() => {
//     // You can perform any side effects here if needed
//     // For example, you might want to initialize something when the component mounts
//   }, []);

//   return (
//     <div>
//       <FedaCheckoutButton options={checkoutButtonOptions} />
//       <FedaCheckoutContainer
//         options={checkoutEmbedOptions}
//         style={{ height: 500, width: 500, backgroundColor: "#eee" }}
//       />
//     </div>
//   );
// };

// export default App;
