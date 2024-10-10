/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PopInAnimation from "./AnimatedContent";
import { Color } from "@/constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

const NoticeModalPage = ({ closeNotice }: any) => {
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
                    minHeight: 400,
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
                            fontSize: 23,
                            fontWeight: "800",
                            color: Colors.welcomeText,
                        }}
                    >
                        Comment se retirer
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            fontWeight: "400",
                            textAlign: "center",
                            color: Colors.welcomeText,
                        }}
                    >
                        {/* Les fonds de votre bonus seraient ajoutés à la
                        transaction. */}
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
                            J'ai compris
                        </Text>
                    </TouchableOpacity>
                </View>
            </PopInAnimation>
        </View>
    );
};

export default NoticeModalPage;
