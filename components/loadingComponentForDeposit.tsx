/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { View, Text } from "react-native";
import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Color } from "@/constants/Colors";
import PopInAnimation from "./(Utils)/AnimatedContent";
import { Language } from "@/constants/languages";

const LoadingComponent = () => {
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

                zIndex: 1000,
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "transparent",
                justifyContent: "center",
                alignItems: "center",
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
                    width: "90%",
                    backgroundColor: "transparent",
                    position: "relative",
                    alignItems: "center",
                    borderRadius: 13,
                    padding: 20,
                    height: 300,
                    justifyContent: "center",
                }}
            >
                <View
                    style={{
                        position: "absolute",
                        top: -60,
                        width: "80%",
                        backgroundColor: Colors.toastText,
                        paddingTop: 40,
                        paddingHorizontal: 20,
                        borderRadius: 10,
                        height: 230,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            color: Colors.welcomeText,
                            textAlign: "center",
                            top: 0,
                            bottom: 0,
                            fontWeight: "500",
                        }}
                    >
                        {languageText.text337}
                    </Text>
                </View>

                <LottieView
                    source={require(".././assets/images/loading.json")}
                    style={{
                        width: 240,
                        height: 270,
                        marginLeft: 120,
                        marginTop: 30,
                    }}
                    autoPlay
                    loop
                />
            </PopInAnimation>
        </View>
    );
};

export default LoadingComponent;
