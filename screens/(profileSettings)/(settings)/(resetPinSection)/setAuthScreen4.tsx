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
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { changeUserPin, setUpUserPin } from "@/state/userData/getUserData";
import ToastNotification from "@/components/(Utils)/toastNotification";
import * as Haptics from "expo-haptics";
import LoadingComponent from "@/components/loadingComponent";
import { CommonActions } from "@react-navigation/native";
import { Language } from "@/constants/languages";
interface Payload {
    pin: string;
    email: string;
}

const SetAuthScreen4 = ({ navigation, route }: any) => {
    const data = useSelector((state: RootState) => state.getUserData.data);

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

    const isLoading = useSelector(
        (state: RootState) => state.getUserData.isLoading,
    );

    const dispatch = useDispatch<AppDispatch>();

    const { pin } = route.params;

    const [pinCount, setPinCount] = useState(0);
    const [pin1, setPin] = useState<any>([]);
    const totalPins = 6;

    useEffect(() => {
        console.log(pin);
        console.log(pin1);
        if (pinCount === totalPins) {
            const pinString = pin.join("");
            const payload: Payload = {
                pin: pinString,
                email: data.email,
            };
            console.log(payload, "payload");
            if (JSON.stringify(pin) === JSON.stringify(pin1)) {
                dispatch(changeUserPin(payload))
                    .then(async (result) => {
                        if (result.payload.success === true) {
                            displayNotification5();
                            setTimeout(() => {
                                navigation.pop(2);
                                console.log(
                                    result.payload.success,
                                    "successssss",
                                );
                            }, 500);
                        }
                        if (result.payload.status === 501) {
                            displayNotification();
                        }
                        if (result.payload.status === 502) {
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [{ name: "login" }],
                                }),
                            );
                        }
                    })
                    .catch((err) => {
                        displayNotification3();
                    })
                    .finally(() => {
                        setPin([]);
                        setPinCount(0);
                    });
            }
            if (JSON.stringify(pin) !== JSON.stringify(pin1)) {
                displayNotification4();
            }
        }
    }, [pinCount, dispatch, data.email, navigation, pin]);

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
            pin1.push(item);
        } else {
            pin1.pop();
        }

        setPinCount((prev) => {
            return index != 10 ? prev + 1 : prev - 1;
        });
    };

    const [show, setShow] = useState(0);
    const [display, setDisplay] = useState(0);
    const [text1, setText1] = useState(languageText.text1);
    const [text2, setText2] = useState(languageText.text2);
    const [text3, setText3] = useState(languageText.text156);
    const [text4, setText4] = useState(languageText.text157);
    const [text5, setText5] = useState(languageText.text158);

    const icon1 = (
        <AntDesign name="checkcircleo" size={40} color={Colors.welcomeText} />
    );
    const icon2 = (
        <AntDesign
            name="exclamationcircleo"
            size={40}
            color={Colors.welcomeText}
        />
    );

    function displayNotification() {
        setShow(1);
        setDisplay(1);
        triggerHapticFeedback();
        setTimeout(() => {
            setShow(0);
        }, 3800);
    }
    function displayNotification2() {
        setShow(2);
        setDisplay(2);
        triggerHapticFeedback();
        setTimeout(() => {
            setShow(0);
        }, 5000);
    }
    function displayNotification3() {
        setShow(3);
        setDisplay(3);
        triggerHapticFeedback();
        setTimeout(() => {
            setShow(0);
        }, 5000);
    }
    function displayNotification4() {
        setShow(4);
        setDisplay(4);
        triggerHapticFeedback();
        setTimeout(() => {
            setShow(0);
        }, 5000);
    }

    function displayNotification5() {
        setShow(5);
        setDisplay(5);
        triggerHapticFeedback();
        setTimeout(() => {
            setShow(0);
        }, 5000);
    }

    const triggerHapticFeedback = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };

    return (
        <View
            style={{
                flex: 1,
                paddingTop: 20,
                backgroundColor: Colors.background,
                alignItems: "center",
            }}
        >
            <ExploreHeader />
            {isLoading && <LoadingComponent />}
            <StatusBar backgroundColor={Colors.background} />
            <View style={{ alignItems: "center" }}>
                <ToastNotification
                    show={show === 0 ? true : false}
                    text={
                        display === 1
                            ? text1
                            : display === 2
                              ? text2
                              : display === 3
                                ? text3
                                : display === 4
                                  ? text4
                                  : text5
                    }
                    textColor="white"
                    backgroundColor={display === 5 ? "green" : "red"}
                    icon={display === 5 ? icon1 : icon2}
                />
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
                                source={{
                                    uri: "",
                                }}
                                style={styles.profileImage}
                            />
                        </PopInAnimation> */}
                    </View>

                    <Text
                        style={{
                            fontSize: 16,
                            color: Colors.welcomeText,
                            fontWeight: "200",
                            marginBottom: 50,
                        }}
                    >
                        Saisissez à nouveau le nouveau code PIN.
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

export default SetAuthScreen4;
