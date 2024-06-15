// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import NavState from "@/components/(Navs)/NavState";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from "react-toastify";
// import LanguageToggle from "@/components/(LanguageToggle)/languageToggle";
// import { NextIntlClientProvider, useMessages } from "next-intl";
// import StoreProvider from "../StoreProvider";
// import axios from "axios";
// import { store } from "@/lib/store";
// import { setUser, fetchUser } from "@/lib/features/userSlice";
// const inter = Inter({ subsets: ["latin"] });
// export const metadata: Metadata = {
//   title: "Betfundr",
//   description: "Fund and withdraw your 1xBet account",
//   icons: {
//     icon: ["/favicon.ico?v=4"],
//     apple: ["/apple-touch-icon.png?v=4"],
//     shortcut: ["/apple-touch-icon.png"],
//   },
// };

// export default function RootLayout({
//   children,
//   params: { locale },
// }: {
//   children: React.ReactNode;
//   params: { locale: string };
// }) {
//   const messages = useMessages();
//   store.dispatch(fetchUser());
//   return (
//     <html lang={locale}>
      
//       <body className={inter.className}>
//         <ToastContainer
//           position="top-right"
//           autoClose={5000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="dark"
//         />
//         <NextIntlClientProvider messages={messages} locale={locale}>
//           <StoreProvider>
//             <NavState />
//             {/* <LanguageToggle /> */}
//             {children}
//           </StoreProvider>
//         </NextIntlClientProvider>
//       </body>
//     </html>
//   );
// }







import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavState from "@/components/(Navs)/NavState";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { NextIntlClientProvider, useMessages } from "next-intl";
import StoreProvider from "../StoreProvider";
import { store } from "@/lib/store";
import { fetchUser } from "@/lib/features/userSlice";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Betfundr",
  description: "Fund and withdraw your 1xBet account",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();
  store.dispatch(fetchUser());
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <StoreProvider>
            <NavState />
            {children}
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
