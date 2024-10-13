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
} from "react-native";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import Moment from "moment";
import { Color } from "@/constants/Colors";
import FormatDate from "@/components/(Utils)/formatedDateAndTime";
import FormatDateAndTime from "@/components/(Utils)/formatedDateAndTime";
import TruncatedText from "@/components/(Utils)/truncateText";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Language } from "@/constants/languages";

const getText = (betId: any, type: any, recipientTag: any, senderName: any) => {
  const currentLanguage = useSelector(
    (state: RootState) => state.getUserData.currentLanguage
  );
  const languageText =
    currentLanguage === "english" ? Language.english : Language.french;

  let actionText;
  let additionalInfo;

  switch (type) {
    case "deposits":
      actionText = betId;
      // DEPOSIT
      additionalInfo = `|| ${languageText.text53}`;
      break;
    case "withdrawals":
      actionText = betId;
      // WITHDRAW
      additionalInfo = `|| ${languageText.text54}`;
      break;
    case "bonus":
      actionText = languageText.text55;
      // BONUS
      additionalInfo = "toi";
      break;
    case "send":
      actionText = languageText.text56;
      // SEND
      additionalInfo = `|| @${recipientTag}`;
      break;
    default:
      actionText = languageText.text57;
      // RECEIVE
      additionalInfo = `|| ${senderName}`;
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

  const textToDisplay = getText(betId, type, recipientTag, senderName);

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
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.transaction_result}
          onPress={processNavigation}
        >
          <View
            style={{
              backgroundColor:
                type === "receive" || type === "bonus"
                  ? "rgba(73, 166, 106, .2)"
                  : "rgba(120, 120, 120, .2)",
              width: 40,
              height: 40,
              borderRadius: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingRight: type === "deposits" ? 3.1 : 0,
              paddingLeft: type === "deposits" ? 0 : 4,
            }}
          >
            {type === "receive" || type === "bonus" ? (
              <MaterialCommunityIcons
                name='login'
                size={24}
                color='rgba(73, 166, 106, 1)'
              />
            ) : type === "deposits" ? (
              <MaterialCommunityIcons
                name='login'
                size={24}
                color='rgba(73, 166, 106, 1)'
              />
            ) : (
              <MaterialCommunityIcons
                name='logout'
                size={24}
                color='rgba(120, 120, 120, 1)'
              />
            )}
          </View>

          <View style={styles.small_device_group}>
            <Text
              style={{
                color: Colors.welcomeText,
                fontWeight: "900",
                fontSize: 14,
              }}
            >
              <TruncatedText text={textToDisplay} maxLength={12} />
            </Text>

            <Text
              style={{
                color: Colors.welcomeText,
                fontSize: 11,
                fontWeight: "500",
                opacity: 0.6,
                padding: 2.5,
              }}
            >
              {FormatDateAndTime(time)}
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              gap: 5,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <View>
              <Text
                style={{
                  color: Colors.welcomeText,
                  fontWeight: "500",
                  fontSize: 15,
                }}
              >
                XOF {formatNumberWithCommasAndDecimal(parseFloat(totalAmount))}
              </Text>
            </View>

            <View
              style={{
                width: 80,
                height: 17,
                borderRadius: 3,
                backgroundColor:
                  status === "Pending"
                    ? "rgba(0, 0, 0, 1)"
                    : status === "Successful"
                      ? "transparent"
                      : "transparent",

                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "500",
                  color:
                    status === "Pending"
                      ? "rgba(256, 256, 256, 1)"
                      : status === "Successful"
                        ? "rgba(0, 186, 0, 1)"
                        : "#FF0000",
                }}
              >
                {status === "Pending"
                  ? languageText.text60
                  : status === "Failed"
                    ? languageText.text58
                    : languageText.text59}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
    transaction_result: {
        gap: 8,
        display: "flex",
        height: 70,
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

