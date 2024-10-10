/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PopInAnimation from "./AnimatedContent";
import { Color } from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { Language } from "@/constants/languages";

const NoticeModalPage = ({
    closeNotice,
    customErrorCode,
    totalAmount,
    id,
}: any) => {
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

    return (
        <View
            style={{
                display: "flex",
                position: "absolute",
                flex: 1,
                zIndex: 20100000000,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                padding: 38,
                top: 0,
            }}
        >
            <PopInAnimation
                // startPositionY={0}
                // startPositionX={-200}
                // positionAnimationSpeed={700}
                scaleSpeed={0.9}
                opacitySpeed={200}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "95%",
                    backgroundColor: Colors.background,
                    position: "relative",
                    alignItems: "center",
                    borderRadius: 13,
                    padding: 20,
                    minHeight: 250,
                }}
            >
                <TouchableOpacity
                    //   onPress={
                    //     network.length === 1 ? closeNetworkModal2 : closeNetworkModal
                    //   }
                    style={{
                        position: "absolute",
                        top: -44,
                        right: -5,
                    }}
                    onPress={() => closeNotice()}
                >
                    <Text
                        style={{
                            fontWeight: "400",
                            color: "white",
                            fontSize: 26,
                        }}
                    >
                        X
                    </Text>
                </TouchableOpacity>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        justifyContent: "center",
                        marginBottom: 15,
                    }}
                >
                    <View
                        style={{
                            height: 30,
                            width: 30,
                            borderRadius: 15,
                            backgroundColor: "rgba(256, 0, 0, 0.4)",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <View
                            style={{
                                height: 20,
                                width: 20,
                                borderRadius: 10,
                                backgroundColor: "red",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    fontWeight: "900",
                                }}
                            >
                                X
                            </Text>
                        </View>
                    </View>
                    <Text
                        style={{
                            fontWeight: "700",
                            fontSize: 16,
                            color: "red",
                        }}
                    >
                   {languageText.text58}
                    </Text>
                </View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        width: "100%",
                        flex: 1,
                        gap: 30,
                        height: "20%",
                        marginBottom: 20,
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: "400",
                            textAlign: "center",
                            color: Colors.welcomeText,
                        }}
                    >
                        {customErrorCode === 300 &&
                            `${languageText.text231} ${totalAmount} ${languageText.text85} #${id}. ${languageText.text210}`}
                    </Text>

                    <TouchableOpacity
                        style={{
                            height: 45,
                            width: "80%",
                            borderRadius: 23,
                            backgroundColor: Colors.default1,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onPress={() => closeNotice()}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "600",
                                color: "white",
                            }}
                        >
                            {languageText.text230}
                        </Text>
                    </TouchableOpacity>
                </View>
            </PopInAnimation>
        </View>
    );
};

export default NoticeModalPage;
