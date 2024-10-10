/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from "react";
import {UserDashboardDisplayProps} from "@/types";
import formatNumberWithCommasAndDecimal from "@/components/(Utils)/formatNumber";
// import Spinner from "react-native-loading-spinner-overlay";
// import "./display.css";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import {Color} from "@/constants/Colors";
import {colorScheme} from "@/components/(userscomponent)/(TransactionTemplateUsers)/data";
import { Language } from "@/constants/languages";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
const color: any = colorScheme.state;
const Colors = color === 2 ? Color.darkMode : Color.lightMode;

const display = ({
    count,
    term,
    title,
    amount,
    style,
    total,
    data,
    allData,
    props,
}: any) => {
    const currentLanguage = useSelector(
        (state: RootState) => state.getUserData.currentLanguage,
    );
    const languageText =
        currentLanguage === "english" ? Language.english : Language.french;

    return (
        <View
            style={[
                styles.container1,
                { backgroundColor: style?.background, position: "relative" },
            ]}
        >
            <View style={styles.displayrecent1}>
                <Text style={styles.displayrecent1h1}>
                    {languageText.text49}
                    {/* Pending  */}
                    &nbsp; {style?.icon}
                </Text>
                <Text style={styles.displayrecent1h2}>
                    {count === undefined ? 0 : count}
                </Text>
            </View>

            <View style={styles.displayrecent2}>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "400",
                            marginBottom: 5,
                            color: style?.color,
                            fontSize: 15,
                        }}
                    >
                        {`${title} ${languageText.text47}`}
                    </Text>
                    <Text
                        style={{
                            fontWeight: "800",
                            marginBottom: 5,
                            color: Colors.primary1,
                            fontSize: 16,
                            textAlign: "center",
                        }}
                    >
                        {title === "Dépôt"
                            ? `XOF  ${formatNumberWithCommasAndDecimal(
                                  total === undefined ? 0 : parseFloat(total),
                              )}`
                            : `XOF  ${formatNumberWithCommasAndDecimal(
                                  total === undefined ? 0 : parseFloat(total),
                              )}`}
                    </Text>
                </View>
                <View
                    style={{
                        width: "93%",
                        backgroundColor: style.color2,
                        // borderWidth: 2,
                        // borderColor: "white",
                        borderRadius: 4,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingBottom: 2,
                        paddingTop: 2,
                    }}
                >
                    <TouchableOpacity
                        onPress={() =>
                            term === 1
                                ? props.navigation.push("deposit")
                                : props.navigation.push("withdraw")
                        }
                        style={{
                            display: "flex",
                            width: "95%",
                            paddingBottom: 4,
                            paddingTop: 4,
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: "800",
                                alignSelf: "center",
                                color: style.color3,
                            }}
                        >
                            {" "}
                            {title}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/*   {allData.pendingDeposit.length >= 1 && title === "Dépôt" && (
        <div
          style={{
            position: "absolute",
            background: "rgba(0, 0, 0, 0.7)",
            padding: "1px 5px",
            top: "3px",
            right: "14px",
            fontSize: "8px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontWeight: "bold",
              fontSize: "12px",
              color: "rgba(101, 256, 0, 0.7)",
            }}
          >
            {allData.pendingDeposit.length}
          </span>{" "}
          &nbsp; &nbsp;Les transactions attendent l &apos; approbation
          &nbsp;&nbsp;
          <div className='ellipses-container'>
            <div className='ellipses'></div>
            <div className='ellipses'></div>
            <div className='ellipses'></div>
          </div>
        </div>
      )} */}
        </View>
    );
};

const styles = StyleSheet.create({
    container1: {
        display: "flex",
        paddingTop: 10,
        paddingRight: 10,

        borderRadius: 6,
        borderWidth: 0.5,
        height: 143,
        borderColor: "rgba(0, 245, 0, 0.1)",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        alignItems: "center",
        justifyContent: "center",
        color: Colors.primary1,
        flexDirection: "row",
    },
    displayrecent1: {
        width: "40%",
        gap: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 10,
        justifyContent: "center",
    },
    displayrecent1h1: {
        fontSize: 18,
        display: "flex",
        alignItems: "center",
        gap: 8,
        color: Colors.primary1,
        fontWeight: "800",
    },

    displayrecent1h2: {
        fontSize: 45,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        width: "100%",
        color: Colors.primary1,
        fontWeight: "800",
        textAlign: "center",
    },
    displayrecent2: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: 19,
        paddingBottom: 10,
        flex: 1,
        alignItems: "center",
        height: "100%",
    },
});

export default display;
