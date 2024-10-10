"use client";
import { Provider } from "react-redux";
import { store } from "../lib/store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}



// "use client";
// import React from "react";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { store, persistor } from "../lib/store";

// const StoreProvider = ({ children }: { children: React.ReactNode }) => (
//   <Provider store={store}>
//     <PersistGate persistor={persistor}>
//       {children}
//     </PersistGate>
//   </Provider>
// );

// export default StoreProvider;