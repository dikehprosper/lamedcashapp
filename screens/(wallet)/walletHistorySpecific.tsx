/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {Text, TouchableOpacity, View, Clipboard, Platform} from "react-native";
import {Color} from "@/constants/Colors";
import {colorScheme} from "@/components/(userscomponent)/(TransactionTemplateUsers)/data";
import Button from "@/components/(Utils)/button";
import {MaterialIcons} from "@expo/vector-icons";
import formatNumberWithCommasAndDecimal from "@/components/(Utils)/formatNumber";
import FormatDateAndTime from "@/components/(Utils)/formatedDateAndTime";
import * as Haptics from "expo-haptics";

import ToastNotification from "@/components/(Utils)/toastNotification";
import {AntDesign} from "@expo/vector-icons";
import DepositReceipt from "@/components/(receipt)/depositReceipt";
import {useState} from "react";
import WithdrawalReceipt from "@/components/(receipt)/withdrawalReceipt";
import SentReceipt from "@/components/(receipt)/sentReceipt";
import * as Sharing from "expo-sharing";
import React from "react";
import {shareAsync} from "expo-sharing";
import * as Print from "expo-print";
import BonusReceiveReceipt from "@/components/(receipt)/bonusReceiveReceipt";
import { printToFile } from "@/components/(Utils)/htmlTemplate2";
import ReceiveReceipt from "@/components/(receipt)/receiveReceipt";

const image = require("@/assets/images/Logo.webp");
const image1 = require("@/assets/images/Logo.webp");

const WalletHistorySpecific = ({ route }: any) => {
    const specificData = route.params;

    // const specificData = {
    //   _id: 2,
    //   amount: 3000,
    //   type: "deposits",
    //   time: "2024-04-19T13:24:00.000Z",
    //   transactionId: "123456787654221132345678876",
    // };

    //FOR TOAstNotification
    const [show, setShow] = useState(true);
    function displayNotification(text: string) {
        Clipboard.setString(text);
        setShow(false);
        triggerHapticFeedback();
        setTimeout(() => {
            setShow(true);
        }, 3800);
    }
    const triggerHapticFeedback = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };

    function onPress(type: any) {
        printToFile(type);
    }

    const [selectedPrinter, setSelectedPrinter] = React.useState();

    //  const print = async () => {
    //    // On iOS/android prints the given html. On web prints the HTML from the current page.
    //    await Print.printAsync({
    //      html,
    //      printerUrl: selectedPrinter?.url, // iOS only
    //    });
    //  };

    //  const selectPrinter = async () => {
    //    const printer = await Print.selectPrinterAsync(); // iOS only
    //    setSelectedPrinter(printer);
    //  };


    return specificData.fundingType === "send" ? (
        <SentReceipt specificData={specificData} onPress={onPress} />
    ) : specificData.fundingType === "bonus" ? (
        <BonusReceiveReceipt specificData={specificData} onPress={onPress} />
    ) : specificData.fundingType === "deposits" ? (
        <DepositReceipt specificData={specificData} onPress={onPress} />
    ) : specificData.fundingType === "receive" ? (
        <ReceiveReceipt specificData={specificData} onPress={onPress} />
    ) : (
        <WithdrawalReceipt specificData={specificData} onPress={onPress} />
    );
};

export default WalletHistorySpecific;
