/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { View } from 'react-native'
const MTN = [
  "97",
  "96",
  "91",
  "90",
  "57",
  "56",
  "54",
  "53",
  "52",
  "51",
  "50",
  "46",
  "42",
];
const MOOV = ["99", "98", "95", "94", "68", "65", "64", "55"];

const VerifyMobileNumber = ({numberPrefix}: any) => {
  const network: any[] = [];
  MTN.map((data) => {
    if (data === numberPrefix) {
      network.push("MTN");
    }
  });
  MOOV.map((data) => {
    if (data === numberPrefix) {
      network.push("MOOV");
    }
  });
  return network;
};

export default VerifyMobileNumber