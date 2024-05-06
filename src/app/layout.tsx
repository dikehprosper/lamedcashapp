import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavState from "@/components/(Navs)/NavState";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      {/* <Head>
        <Script src="/scripts/translation.js" strategy="beforeInteractive" />
        {process.env.GOOGLE_TRANSLATION_CONFIG && (
          <Script
            src="https://translate.google.com/translate_a/element.js?cb=TranslateInit"
            strategy="afterInteractive"
          />
        )}
      </Head> */}
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
        <NavState />
        {children}
        {/* <NextScript /> */}
      </body>
    </html>
  );
}
