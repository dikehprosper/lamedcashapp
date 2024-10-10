/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PopInAnimation from "./AnimatedContent";
import { Color } from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
const currrency = "XOF";
const LanguageModal = ({
    setLanguage,
    choosenLanguage,
    setChoosenLanguage,
}: any) => {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;
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
            }}
        >
            <PopInAnimation
                scaleSpeed={0.9}
                opacitySpeed={200}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "95%",
                    backgroundColor: Colors.background,
                    position: "relative",
                    borderRadius: 13,
                    padding: 20,
                    paddingVertical: 30,
                }}
            >
                <View
                    style={{
                        // display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                        marginBottom: 40,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "500",
                            textAlign: "center",
                            width: "100%",
                            color: Colors.welcomeText,
                        }}
                    >
                        Choose Language / Choisissez la langue
                    </Text>
                </View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                        marginBottom: 18,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "500",
                            color: Colors.welcomeText,
                        }}
                    >
                        English
                    </Text>
                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onPress={() => setChoosenLanguage("english")}
                    >
                        {choosenLanguage !== "english" && (
                            <MaterialIcons
                                name="radio-button-off"
                                size={24}
                                color={Colors.welcomeText}
                            />
                        )}
                        {choosenLanguage === "english" && (
                            <Ionicons
                                name="radio-button-on"
                                size={24}
                                color={Colors.welcomeText}
                            />
                        )}
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "500",
                            color: Colors.welcomeText,
                        }}
                    >
                        Français
                    </Text>
                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onPress={() => setChoosenLanguage("french")}
                    >
                        {choosenLanguage !== "french" && (
                            <MaterialIcons
                                name="radio-button-off"
                                size={24}
                                color={Colors.welcomeText}
                            />
                        )}
                        {choosenLanguage === "french" && (
                            <Ionicons
                                name="radio-button-on"
                                size={24}
                                color={Colors.welcomeText}
                            />
                        )}
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={{
                        height: 45,
                        width: "80%",
                        borderRadius: 23,
                        backgroundColor: Colors.default1,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 48,
                    }}
                    onPress={() => setLanguage(choosenLanguage)}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "600",
                            color: "white",
                        }}
                    >
                        J'ai compris
                    </Text>
                </TouchableOpacity>
            </PopInAnimation>
        </View>
    );
};

export default LanguageModal;
