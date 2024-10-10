/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Color } from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { Language } from "@/constants/languages";
import PopInAnimation from "../(Utils)/AnimatedContent";
import { changeModalState } from "@/state/userData/getUserData";

const WalletModal2 = (props: any, { details }: any) => {
    const dispatch = useDispatch<AppDispatch>();
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

    function closeNotice() {
        dispatch(changeModalState())
            .then(async (result: any) => {
                console.log(result.payload, "hvdfhjvcdhjcv");
                props.hideModal();
            })
            .catch((err: any) => console.log(err));
    }

    return (
        <View
            style={{
                display: "flex",
                position: "absolute",
                flex: 1,
                zIndex: 20100000000,
                backgroundColor: "rgba(0, 0, 0, 0.6)",
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
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    borderRadius: 13,
                    padding: 15,
                    minHeight: 150,
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
                        flexDirection: "column",
                        gap: 5,
                        width: "100%",
                        minHeight: 150,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "600",
                            textAlign: "center",
                            marginBottom: 20,
                            color: Colors.welcomeText,
                        }}
                    >
                        {languageText.text181}
                    </Text>
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: "400",
                            textAlign: "center",
                            color: Colors.welcomeText,
                        }}
                    >
                        {languageText.text182}
                    </Text>
                </View>
                <TouchableOpacity
                    style={{
                        height: 45,
                        width: "80%",
                        borderRadius: 23,
                        backgroundColor: Colors.default1,
                        alignItems: "center",
                        justifyContent: "center",
                        marginVertical: 10,
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
            </PopInAnimation>
        </View>
    );
};

export default WalletModal2;
