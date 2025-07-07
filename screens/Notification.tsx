/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ExploreHeader from "@/components/ExploreHeader";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, StatusBar } from "react-native";
import {
    Feather,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";

import NotificationTemplate from "@/components/(userscomponent)/(TransactionTemplateUsers)/TransactionTemplateHistory2";
import Spinner from "react-native-loading-spinner-overlay";
import ExploreHeader3 from "@/components/ExploreHeader3";
import { Color } from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { Language } from "@/constants/languages";
import { getUser } from "@/state/userData/getUserData";
import AsyncStorage from "@react-native-async-storage/async-storage";
<MaterialCommunityIcons name="hand-wave-outline" size={24} color="black" />;
const screenHeight = Dimensions.get("window").height;
const percentageHeight = screenHeight * 0.375;
interface Token {
    token: string;
}
const AllNotification = (props: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.getUserData.data);
  const colorScheme = useSelector(
    (state: RootState) => state.getUserData.colorScheme
  );
  const Colors =
    parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;
  const currentLanguage = useSelector(
    (state: RootState) => state.getUserData.currentLanguage
  );
  const languageText =
    currentLanguage === "english" ? Language.english : Language.french;

  const [loading, setLoading] = useState(true);

  // // Filter deposit transactions
  // const allDeposits = data?.transactionHistory?.filter(
  //   (transaction: any) => transaction.fundingType === "deposits"
  // );

  // const totalDeposits = allDeposits
  //   ?.filter((data: {status: string}) => data.status === "Successful")
  //   .reduce((total: any, transaction: any) => {
  //     return (total += transaction.amount);
  //   }, 0);

  // // Filter withdrawal transactions
  // const allWithdrawals = data?.transactionHistory?.filter(
  //   (transaction: any) => transaction.fundingType === "withdrawals"
  // );

  // const totalWithdrawals = allWithdrawals
  //   ?.filter((data: {status: string}) => data.status === "Successful")
  //   .reduce((total: any, transaction: any) => {
  //     return (total += transaction.amount);
  //   }, 0);

  // // Filter deposit transactions with status "pending"
  // const pendingDeposits = data?.transactionHistory.filter(
  //   (transaction: any) =>
  //     transaction.fundingType === "deposits" && transaction.status === "Pending"
  // );

  // // Filter withdrawal transactions with status "pending"
  // const pendingWithdrawals = data?.transactionHistory?.filter(
  //   (transaction: any) =>
  //     transaction.fundingType === "withdrawals" &&
  //     transaction.status === "Pending"
  // );

  // Calculate total cost of pending deposits

  // const totalPendingDepositAmount = pendingDeposits?.reduce(
  //   (total: any, transaction: any) => {
  //     return (total += transaction.amount);
  //   },
  //   0
  // );

  // // Calculate total cost of pending withdrawals
  // const totalPendingWithdrawalAmount = pendingWithdrawals?.reduce(
  //   (total: any, transaction: any) =>
  //     return (total += transaction.amount);
  //   },
  //   0
  // );

  const [receipt, setReceipt] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  function showReceipt(
    time: any,
    amount: any,
    identifierId: any,
    betId: any,
    status: any,
    type: any,
    momoName: any,
    momoNumber: any,
    withdrawalCode: any
  ) {
    setIsVisible(true);
    setReceipt({
      time,
      amount,
      identifierId,
      betId,
      status,
      type,
      momoName,
      momoNumber,
      withdrawalCode,
    });
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        paddingLeft: 5,
        paddingRight: 5,
      }}
    >
      <ExploreHeader3 />
      <StatusBar backgroundColor={Colors.background} />

      {!data?.transactionHistory ? (
        <View style={styles.container3}>
          <Spinner
            visible={loading}
            textContent={"Loading..."}
            textStyle={{color: "#FFF"}}
          />
        </View>
      ) : (
        <View style={styles.container3}>
          <NotificationTemplate
            props={props}
            navigation={props.navigation}
            title={{
              name: languageText.text267,
              //  "Notification History"

              icon: (
                <MaterialIcons
                  name='arrow-back-ios-new'
                  size={21}
                  color={Colors.welcomeText}
                />
              ),
              icon2: (
                <Feather name='filter' size={22} color={Colors.welcomeText} />
              ),
            }}
            select={{
              firstSelect: {big: "Voir tout", small: "Tout"},
              secondSelect: {
                big: "Voir les Dépôts",
                small: "Dépôts",
              },
              thirdSelect: {
                big: "Afficher les Retraits",
                small: "Retraits",
              },
            }}
            // totalWithdrawals={totalWithdrawals}
            // totalDeposits={totalDeposits}
            // data={data?.transactionHistory}
            // allData={data}
            showReceipt={showReceipt}
          />
        </View>
      )}
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     display: "flex",
//   gap: 15,
//   padding: 15,
//   border-radius: 20,
//   background: "rgba(0, 0, 0, 0.4)",
//     marginTop : 40
//   },

//   flexDirection: "row",
//     margin: 9,
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
// })

const styles = StyleSheet.create({
    container: {
        display: "flex",
        gap: 10,
        padding: 10,
        backgroundColor: "transparent",
        borderRadius: 8,
        height: percentageHeight,
    },
    container2: {
        display: "flex",
        gap: 10,
        padding: 10,
        borderRadius: 8,
        marginTop: 60,
        height: 45,
        flexDirection: "row",
        alignItems: "center",
    },
    container3: {
        display: "flex",
        borderRadius: 8,
        flex: 1,
        paddingBottom: 13,
    },
    xxxx: {
        fontWeight: "800",

        fontSize: 20,
    },
});

export default AllNotification;
