import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavState from '@/components/(Navs)/NavState';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import StoreProvider from '../StoreProvider';
import { store } from '@/lib/store';
import { fetchUser } from '@/lib/features/userSlice';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "LamedCash",
  description: "Swift Deposit and withdrawal operations",
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

  store.dispatch(fetchUser());

  return (
    <html lang="en">
      <body className={inter.className} >
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='dark'
        />

          <StoreProvider>
       
             
                <NavState />
                {children}

          </StoreProvider>

      </body>
    </html>
  );
}
