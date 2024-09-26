"use client"; // Mark this as a client-side component

import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchUser} from "@/lib/features/userSlice";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientWrapper({children}: {children: React.ReactNode}) {
  const dispatch = useDispatch();

  // Fetch the user on component mount
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
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
      {children}
    </>
  );
}
