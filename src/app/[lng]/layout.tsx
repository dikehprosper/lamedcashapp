import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavState from "@/components/(Navs)/NavState";
import "react-toastify/dist/ReactToastify.css";
import { dir } from "i18next";
import { ToastContainer, toast } from "react-toastify";
import { languages } from "../i18n/settings";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}
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
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
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
