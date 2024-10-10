/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import PopInAnimation from "@/components/(Utils)/AnimatedContent";
const image = require("@/assets/images/Logo.webp");
const image1 = require("@/assets/images/Logo.webp");
import { Color } from "@/constants/Colors";
import ExploreHeader from "@/components/ExploreHeader4";
import NumberPad from "@/components/numberPad";
import { Ionicons } from "@expo/vector-icons";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import * as Haptics from "expo-haptics";
import { Language } from "@/constants/languages";

const SetAuthScreen3 = ({ navigation }: any) => {
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

    const data = useSelector((state: RootState) => state.getUserData.data);
    const [pinCount, setPinCount] = useState(0);
    const [pin, setPin] = useState<any>([]);
    const totalPins = 6;

    useEffect(() => {
        if (pinCount === totalPins) {
            navigation.push("SetAuthScreen4", { pin });
            setPin([]);
            setPinCount(0);
        }
    }, [pinCount]);

    function renderPins() {
        const pins = [];

        for (let x = 1; x <= totalPins; x++) {
            pins.push(
                x <= pinCount ? (
                    <View
                        key={x}
                        style={{
                            width: 16,
                            height: 16,
                            borderRadius: 8,
                            alignItems: "center",
                            borderColor: Colors.welcomeText,
                            borderWidth: 1,
                            justifyContent: "center",
                        }}
                    >
                        <View
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: Colors.welcomeText,
                            }}
                        ></View>
                    </View>
                ) : (
                    <View
                        key={x}
                        style={{
                            width: 16,
                            height: 16,
                            borderRadius: 8,
                            alignItems: "center",
                            borderColor: Colors.welcomeText,
                            borderWidth: 1,
                            justifyContent: "center",
                        }}
                    ></View>
                ),
            );
        }
        return pins;
    }

    const onPress = (item: any, index: any) => {
        triggerHapticFeedback();
        if (index != 10) {
            pin.push(item);
        } else {
            pin.pop();
        }

        setPinCount((prev) => {
            return index != 10 ? prev + 1 : prev - 1;
        });
    };

    const triggerHapticFeedback = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };

    const imageSource =
        data.image !== ""
            ? { uri: data.image }
            : {
                  uri: "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/Untitled%20design%20(4)%20(1).png?alt=media&token=7f06a2ba-e4c5-49a2-a029-b6688c9be61d",
              };

    return (
        <View
            style={{
                flex: 1,
                paddingTop: 50,
                backgroundColor: Colors.background,
                alignItems: "center",
            }}
        >
            <ExploreHeader />
            <StatusBar backgroundColor={Colors.background} />
            <View style={{ alignItems: "center" }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                        paddingHorizontal: 15,
                        marginTop: 19,
                    }}
                >
                    <View style={{}}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons
                                name="chevron-back-outline"
                                size={26}
                                color={Colors.welcomeText}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text></Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <View
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            marginBottom: 17,
                            //   backgroundColor: "green",
                        }}
                    >
                        {/* <PopInAnimation
                            scaleSpeed={0.4}
                            opacitySpeed={950}
                            style={{ position: "relative" }}
                        >
                            <Image
                                source={imageSource}
                                style={styles.profileImage}
                            />
                        </PopInAnimation> */}
                    </View>

                    <Text
                        style={{
                            fontSize: 18,
                            color: Colors.welcomeText,
                            fontWeight: "200",
                            marginBottom: 50,
                        }}
                    >
                        {languageText.text155}
                    </Text>

                    <View style={{ marginBottom: 90, alignItems: "center" }}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: "70%",
                                marginBottom: 20,
                            }}
                        >
                            {renderPins()}
                        </View>
                        <NumberPad onPress={onPress} />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 50,
    },
});

export default SetAuthScreen3;
