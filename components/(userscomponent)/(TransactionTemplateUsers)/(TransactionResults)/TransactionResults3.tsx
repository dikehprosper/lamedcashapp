/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import "./transactionResults.css";
import { TransactionResultsProps } from "@/types";
import formatNumberWithCommasAndDecimal from "../../../(Utils)/formatNumber";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";
import {
    AntDesign,
    Entypo,
    MaterialCommunityIcons,
    Octicons,
} from "@expo/vector-icons";
import Moment from "moment";
import { Color } from "@/constants/Colors";
import FormatDate from "@/components/(Utils)/formatedDateAndTime";
import FormatDateAndTime from "@/components/(Utils)/formatedDateAndTime";
import TruncatedText from "@/components/(Utils)/truncateText";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Language } from "@/constants/languages";
const image = require("@/assets/images/icon.png");

const getText = (
  type: any,
  betId: any,
  recipientTag: any,
  senderName: any,
  status: any
) => {
  const currentLanguage = useSelector(
    (state: RootState) => state.getUserData.currentLanguage
  );
  const languageText =
    currentLanguage === "english" ? Language.english : Language.french;

  let actionText;
  let additionalInfo;

  switch (type) {
    case "deposits":
      actionText = languageText.text53;
      // DEPOSIT
      additionalInfo = `${status === "Successful" ? languageText.text320 : status === "Failed" ? languageText.text321 : languageText.text322}`;
      break;
    case "withdrawals":
      actionText = languageText.text54;
      // WITHDRAW
      additionalInfo = `${status === "Successful" ? languageText.text320 : status === "Failed" ? languageText.text321 : languageText.text322}`;
      break;
    case "bonus":
      actionText = languageText.text55;
      // BONUS
      additionalInfo = languageText.text323;
      break;
    case "send":
      actionText = languageText.text324;
      // SEND
      additionalInfo = `${status === "Successful" ? languageText.text320 : status === "Failed" ? languageText.text321 : languageText.text322}`;
      break;
    default:
      actionText = languageText.text323;
      // RECEIVE
      additionalInfo = `${status === "Successful" ? languageText.text320 : status === "Failed" ? languageText.text321 : languageText.text322}`;
  }

  return `${actionText} ${additionalInfo}`;
};

// // Function to store data in local storage
// const storeData = (key, value) => {
//     try {
//         localStorage.setItem(key, value);
//     } catch (error) {
//         // Handle errors here
//         console.error('Error storing data:', error);
//     }
// };

// // Function to retrieve data from local storage
// const retrieveData = (key) => {
//     try {
//         return localStorage.getItem(key);
//     } catch (error) {
//         // Handle errors here
//         console.error('Error retrieving data:', error);
//         return null;
//     }
// };
const imageSource = {
  uri: image,
};

const TransactionResults = ({
  time,
  totalAmount,
  receipt,
  betId,
  status,
  type,
  recipientTag,
  senderName,
  showReceipt,
  momoName,
  momoNumber,
  withdrawalCode,
  identifierId,
  specificData,
  navigation,
  bonusBalance,
  amount,
  props,
  paymentConfirmation,
  customErrorCode,
  service,
}: any) => {
  const colorScheme = useSelector(
    (state: RootState) => state.getUserData.colorScheme
  );
  const Colors =
    parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

  const textToDisplay = getText(type, betId, recipientTag, senderName, status);

  function processNavigation() {
    const specificData = {
      fundingType: type,
      status: status,
      senderName: senderName,
      betId: betId,
      recipientTag: recipientTag,
      momoName: momoName,
      momoNumber: momoNumber,
      withdrawalCode: withdrawalCode,
      identifierId: identifierId,
      registrationDateTime: time,
      amount: amount,
      totalAmount: totalAmount,
      bonusBalance: bonusBalance,
      paymentConfirmation: paymentConfirmation,
      service: service,
      customErrorCode: customErrorCode,
    };
    props.navigation.push("walletHistorySpecific", specificData);
  }

  const currentLanguage = useSelector(
    (state: RootState) => state.getUserData.currentLanguage
  );
  const languageText =
    currentLanguage === "english" ? Language.english : Language.french;

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 10,
        marginTop: 5,
        paddingHorizontal: 10,
        backgroundColor: "rgba(120, 120, 120, 0.1)",
        paddingVertical: 10,
        borderRadius: 8,
      }}
    >
      <TouchableOpacity
        style={styles.transaction_result}
        onPress={processNavigation}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingRight: type === "deposits" ? 3.1 : 0,
            paddingLeft: type === "deposits" ? 0 : 4,
            position: "relative",
          }}
        >
          <Image
            source={image}
            style={{width: 20, height: 20, borderRadius: 5}}
          />
          <View style={{position: "absolute", top: -7, right: -2}}>
            <Octicons name='dot-fill' size={15} color='red' />
          </View>
        </View>

        <View style={styles.small_device_group}>
          <Text
            style={{
              color: Colors.welcomeText,
              fontWeight: "600",
              fontSize: 15,
            }}
          >
            <TruncatedText text={textToDisplay} maxLength={40} />
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.transaction_result}
        onPress={processNavigation}
      >
        <View style={styles.small_device_group}>
          <View>
            <Text
              style={{
                color: Colors.welcomeText,
                fontWeight: "500",
                fontSize: 13,
              }}
            >
              {type === "deposits" && status === "Successful"
                ? `${languageText.text325} ${totalAmount} ${languageText.text334}`
                : ""}
              {type === "deposits" && status === "Failed"
                ? `${languageText.text325} ${totalAmount} ${languageText.text336}`
                : ""}
              {type === "deposits" && status === "Pending"
                ? `${languageText.text325} ${totalAmount} ${languageText.text335}`
                : ""}
              {type === "withdrawals" && status === "Successful"
                ? `${languageText.text326} ${totalAmount} ${languageText.text334}`
                : ""}
              {type === "withdrawals" && status === "Failed"
                ? `${languageText.text326} ${totalAmount} ${languageText.text333}`
                : ""}
              {type === "withdrawals" && status === "Pending"
                ? `${languageText.text326} ${totalAmount} ${languageText.text332}`
                : ""}
              {type === "send" && status === "Successful"
                ? `${languageText.text327} ${totalAmount} ${languageText.text331} @${recipientTag}.`
                : ""}
              {type === "bonus" && status === "Successful"
                ? `${languageText.text329} ${totalAmount} ${languageText.text330}`
                : ""}
              {type !== "bonus" &&
              type !== "withdrawals" &&
              type !== "send" &&
              type !== "deposits" &&
              status === "Successful"
                ? `${languageText.text327} ${totalAmount} ${languageText.text328} ${senderName}.`
                : ""}
            </Text>
          </View>
          <Text
            style={{
              color: Colors.welcomeText,
              fontSize: 11,
              fontWeight: "500",
              opacity: 0.6,
              padding: 2.5,
              borderTopWidth: 7,
              borderTopColor: "blue",
              backgroundColor: "end",
              alignItems: "flex-end",
              display: "flex",
            }}
          >
            {FormatDateAndTime(time)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
    transaction_result: {
        gap: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    small_device_group: {
        display: "flex",
        flex: 1,
        gap: 5,
        flexDirection: "column",
        justifyContent: "center",
        // backgroundColor: "red",
        // whiteSpace: 'nowrap'
    },
    small_device_group_text1: {
        fontWeight: "900",
    },
});
export default TransactionResults;
