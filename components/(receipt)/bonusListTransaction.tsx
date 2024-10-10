/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {TouchableOpacity, View, Text, StyleSheet} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import formatNumberWithCommasAndDecimal from "@/components/(Utils)/formatNumber";

import TruncatedText from "@/components/(Utils)/truncateText";
import {Color} from "@/constants/Colors";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { Language } from "@/constants/languages";
const currency = "XOF";
const BonusListTransaction = ({ specificData, navigation }: any) => {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    const currentLanguage = useSelector(
        (state: RootState) => state.getUserData.currentLanguage,
    );
    const languageText =
        currentLanguage === "english" ? Language.english : Language.french;

    function processNavigation() {
        navigation.push("walletHistorySpecific", specificData);
    }

    return (
        <TouchableOpacity
            style={{
                paddingTop: 5,
                paddingBottom: 5,
                gap: 8,
                display: "flex",
                justifyContent: "center",
            }}
            onPress={processNavigation}
        >
            <View
                style={[
                    styles.transaction_result,
                    {
                        backgroundColor:
                            specificData.fundingType === "bonus"
                                ? "transparent"
                                : "rgba(120, 120, 120, .2)",
                    },
                ]}
                // onClick={handleClick}
            >
                <View
                    style={{
                        backgroundColor:
                            specificData.fundingType === "bonus" ||
                            specificData.fundingType === "receive"
                                ? "rgba(73, 166, 106, .2)"
                                : "rgba(120, 120, 120, .2)",
                        width: 40,
                        height: 40,
                        borderRadius: 5,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingRight:
                            specificData.fundingType === "deposits" ? 3.1 : 0,
                        paddingLeft:
                            specificData.fundingType === "deposits" ? 0 : 4,
                    }}
                >
                    {specificData.fundingType === "bonus" ||
                    specificData.fundingType === "deposits" ||
                    specificData.fundingType === "receive" ? (
                        <MaterialCommunityIcons
                            name="login"
                            size={24}
                            color={
                                specificData.fundingType === "deposits"
                                    ? "#4BC240"
                                    : specificData.fundingType === "send"
                                      ? Colors.welcomeText
                                      : specificData.fundingType === "bonus"
                                        ? "#4BC240"
                                        : specificData.fundingType === "receive"
                                          ? "#4BC240"
                                          : Colors.welcomeText
                            }
                        />
                    ) : (
                        <MaterialCommunityIcons
                            name="logout"
                            size={24}
                            color="rgba(120, 120, 120, 1)"
                        />
                    )}
                </View>

                <View style={styles.small_device_group}>
                    <Text
                        style={{
                            color:
                                specificData.fundingType === "deposits"
                                    ? Colors.welcomeText
                                    : specificData.fundingType === "send"
                                      ? Colors.welcomeText
                                      : specificData.fundingType === "bonus"
                                        ? Colors.welcomeText
                                        : Colors.welcomeText,
                            fontWeight: "900",
                            fontSize: 14,
                        }}
                    >
                        {specificData.fundingType === "deposits"
                            ? languageText.text53
                            : specificData.fundingType === "send"
                              ? languageText.text93
                              : specificData.fundingType === "bonus"
                                ? languageText.text94
                                : specificData.fundingType === "receive"
                                  ? languageText.text57
                                  : languageText.text54}
                    </Text>

                    <Text
                        style={{
                            color: Colors.welcomeText,
                            fontSize: 13,
                            fontWeight: "400",
                            opacity: 0.6,
                            padding: 2.5,
                        }}
                    >
                        {specificData.fundingType === "deposits" ? (
                            <TruncatedText
                                text={languageText.text95}
                                maxLength={12}
                            />
                        ) : specificData.fundingType === "send" ? (
                            <TruncatedText
                                text={`${languageText.text96} ${specificData.recipientTag}`}
                                maxLength={12}
                            />
                        ) : specificData.fundingType === "receive" ? (
                            <TruncatedText
                                text={`${languageText.text97} ${specificData.senderName}`}
                                maxLength={12}
                            />
                        ) : specificData.fundingType === "bonus" ? (
                            <TruncatedText
                                text={languageText.text98}
                                maxLength={12}
                            />
                        ) : (
                            <TruncatedText
                                text={languageText.text99}
                                maxLength={12}
                            />
                        )}
                    </Text>
                </View>

                <View
                    style={{
                        display: "flex",
                        gap: 3,
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <View style={{ flexDirection: "column", gap: 3 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                gap: 2,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: "500",
                                    color:
                                        specificData.fundingType === "deposits"
                                            ? Colors.welcomeText
                                            : specificData.fundingType ===
                                                "send"
                                              ? Colors.welcomeText
                                              : specificData.fundingType ===
                                                  "bonus"
                                                ? "#4BC240"
                                                : Colors.welcomeText,
                                }}
                            >
                                {" "}
                                {specificData.fundingType === "deposits" &&
                                specificData.status === "Successful"
                                    ? "-"
                                    : specificData.fundingType === "deposits" &&
                                        specificData.status === "Pending"
                                      ? "-"
                                      : specificData.fundingType ===
                                              "deposits" &&
                                          specificData.status === "Failed"
                                        ? null
                                        : specificData.fundingType === "bonus"
                                          ? "+"
                                          : specificData.fundingType === "send"
                                            ? "-"
                                            : specificData.fundingType ===
                                                "receive"
                                              ? "+"
                                              : "-"}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: "500",
                                    gap: 3,
                                    color:
                                        specificData.fundingType === "deposits"
                                            ? Colors.welcomeText
                                            : specificData.fundingType ===
                                                "send"
                                              ? Colors.welcomeText
                                              : specificData.fundingType ===
                                                  "bonus"
                                                ? "#4BC240"
                                                : Colors.welcomeText,
                                }}
                            >
                                {currency}{" "}
                                {specificData.fundingType === "deposits"
                                    ? formatNumberWithCommasAndDecimal(
                                          parseFloat(specificData.bonusBalance),
                                      )
                                    : specificData.fundingType === "send"
                                      ? formatNumberWithCommasAndDecimal(
                                            parseFloat(specificData.amount),
                                        )
                                      : specificData.fundingType === "bonus"
                                        ? formatNumberWithCommasAndDecimal(
                                              parseFloat(specificData.amount),
                                          )
                                        : specificData.fundingType === "receive"
                                          ? formatNumberWithCommasAndDecimal(
                                                parseFloat(specificData.amount),
                                            )
                                          : formatNumberWithCommasAndDecimal(
                                                parseFloat(
                                                    specificData.bonusBalance,
                                                ),
                                            )}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                gap: 10,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontWeight: "500",
                                    color:
                                        specificData.status === "Failed"
                                            ? "red"
                                            : specificData.status ===
                                                "Successful"
                                              ? Colors.default1
                                              : specificData.status ===
                                                  "Pending"
                                                ? "rgba(120, 120, 120, 1)"
                                                : "red",
                                }}
                            >
                                {specificData.status === "Successful"
                                    ? languageText.text59
                                    : specificData.status === "Failed"
                                      ? languageText.text58
                                      : languageText.text60}
                            </Text>
                            <Text
                                style={{
                                    color: Colors.welcomeText,
                                    fontSize: 11,
                                    fontWeight: "400",
                                }}
                            >
                                {formatTime(specificData.registrationDateTime)}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  container3: {

    paddingHorizontal: 15,
  },
  transaction_result: {
    gap: 8,
    display: "flex",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 3,
    paddingHorizontal: 15,
  },
  small_device_group: {
    display: "flex",
    flex: 1,
    gap: 3,
    flexDirection: "column",
    justifyContent: "center",
    // backgroundColor: "red",
    // whiteSpace: 'nowrap'
  },
});

export default BonusListTransaction;

const formatTime = (inputDate: string): string => {
    
    // Create a Date object from the inputDate
    const date = new Date(inputDate);

    // Format the time to 12-hour format with AM/PM
    const options: any = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    };

    return date.toLocaleTimeString("en-US", options).toLowerCase(); // Format and convert to lowercase
};






