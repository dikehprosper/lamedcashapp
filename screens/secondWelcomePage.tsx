/* eslint-disable */
import ExploreHeader4 from "@/components/ExploreHeader4";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, FlatList, Animated, StatusBar } from "react-native";
import { slideForFrench } from "@/components/(Utils)/slide";
import { slideForEnglish } from "@/components/(Utils)/slide";
import OnboardingItem from "@/components/OnboardingItem";
import NextButton from "@/components/(Utils)/NextButton";
import Paginator from "@/components/(Utils)/Paginator";
import ExploreHeader5 from "@/components/ExploreHeader5";
import PopInAnimation from "@/components/(Utils)/AnimatedContent";
import { Color } from "@/constants/Colors";
import { Language } from "@/constants/languages";
import AsyncStorage from "@react-native-async-storage/async-storage";
const image = require("@/assets/images/Logo.webp");
const image1 = require("@/assets/images/Logo.webp");
const image2 = require("@/assets/images/settings.png");
import * as Haptics from "expo-haptics";
import jwtDecode from "jwt-decode";
import {
    changeCurrentLanguage,
    getColorScheme,
    getCurrentLanguage,
    getUser,
} from "@/state/userData/getUserData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import ToastNotification from "@/components/(Utils)/toastNotification";
import { AntDesign } from "@expo/vector-icons";
import { usePushNotifications } from "@/components/usePushnotifications";
import { CommonActions } from "@react-navigation/native";
import LanguageModal from "@/components/(Utils)/languageModal";
import DOMAIN from "@/components/(Utils)/domain";

interface Token {
    token: string;
    expoPushToken: any;
}
interface ChoosenLanguageInterface {
    choosenLanguage: string;
}

const SecondWelcomePage = ({ navigation }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    // GET CURRENT LANGUAGE AND COLOR
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
    const slides =
        currentLanguage === "english" ? slideForEnglish : slideForFrench;
    useEffect(() => {
        dispatch(getColorScheme());
        dispatch(getCurrentLanguage());
    }, []);

    /// GET PUSH TOKEN
    const { expoPushToken, notification } = usePushNotifications();

    const data2 = JSON.stringify(notification, undefined, 2);
    const [state, setState] = useState<any>(1);
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = useState(0);
    const viewableItemsChanged = useRef(({ viewableItems }: any) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
    const slidesRef = useRef<any>(null);

    const scrollTo = () => {
        if (currentIndex < slides.length - 1) {
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
        } else if (currentIndex === slides.length - 1) {
            navigation.push("thirdWelcomePage");
        } else {
            // console.log("Last item.");
        }
    };

    const [token, setToken] = useState<any>();
    useEffect(() => {
        setTimeout(() => {
            loadProfile();
            sendPushToken();
        }, 200);
    }, []);

    // console.log(typeof expoPushToken?.data, "hgvhcdcds");
    console.log(expoPushToken?.data, "hgvhcdcds");

    const loadProfile = async () => {
        // const newExpoPushToken = await expoPushToken?.data;
        const tokenString = await AsyncStorage.getItem("token");

        if (tokenString) {
            // console.log(newExpoPushToken, "hgvhcdcds");
            const token: Token = {
                token: tokenString,
                expoPushToken: expoPushToken?.data,
            };

            console.log(token, "hgvhcdcdsssssssss");

            dispatch(getUser(token))
                .then(async (result) => {
                    // console.log(result.payload.newToken, "ycghcghchg");
                    // console.log(result.payload.success, "ycghcghchg");
                    if (result.payload.success === true) {
                        try {
                            await AsyncStorage.setItem(
                                "token",
                                result.payload.newToken,
                            );
                            navigation.replace("authScreen");
                        } catch (err) {
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [{ name: "login" }],
                                }),
                            );
                            console.log(err);
                        }
                    }
                    if (result.payload.status === 501) {
                        setState(2);
                        displayNotification2();
                    }
                    if (result.payload.status === 502) {
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: "login" }],
                            }),
                        );
                    }
                    if (result.payload.status === 503) {
                        navigation.replace("setAuthScreen");
                        displayNotification3();
                    }
                    if (result.payload.status === 504) {
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: "login" }],
                            }),
                        );
                    }
                })
                .catch((err) => {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "login" }],
                        }),
                    );
                    console.log(err);
                });
        }
        if (!tokenString) {
            setState(2);
        }
    };

    const sendPushToken = async () => {
        const token = await AsyncStorage.getItem("token");

        const pushToken = expoPushToken?.data;
        console.log(pushToken, "console.log(response);");
        const response = await fetch(`${DOMAIN}/api/users/actions/token`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json",
            },
            body: JSON.stringify({ pushToken }),
        }).then((res) => res.json());

        console.log(response, "response");
    };

    const [show, setShow] = useState(0);
    const [text1, setText1] = useState(
        languageText.text1,
        // "The user does not exist"
    );
    const [text2, setText2] = useState(
        languageText.text2,
        // "User is deactivated",
    );
    const [text3, setText3] = useState(
        languageText.text3,
        // "Please configure your PIN",
    );
    function displayNotification() {
        setShow(0);
        triggerHapticFeedback();
        setTimeout(() => {
            setShow(0);
        }, 3800);
    }
    function displayNotification2() {
        setShow(2);
        triggerHapticFeedback();
        setTimeout(() => {
            setShow(0);
        }, 5000);
    }
    function displayNotification3() {
        setShow(3);
        triggerHapticFeedback();
        setTimeout(() => {
            setShow(0);
        }, 5000);
    }
    const triggerHapticFeedback = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    };

    // const logout = ()  => {
    //  AsyncStorage.removeItem("token")
    // }
    // logout()

    //  console.log(data, "hgvhcdcds");

    const [choosenLanguage, setChoosenLanguage] =
        useState<any>(currentLanguage);
    function setLanguage(choosenLanguage: any) {
        const sentValue: ChoosenLanguageInterface = {
            choosenLanguage: choosenLanguage,
        };
        dispatch(changeCurrentLanguage(sentValue));
    }

    return state === 1 ? (
        <View
            style={{
                flex: 1,
                backgroundColor: Colors.background,
            }}
        >
            <ExploreHeader5 />
            <StatusBar backgroundColor={Colors.background} />
            <View style={{ display: "flex", flex: 1,alignItems: 'center',height: 400 }}>
                <ToastNotification
                    show={show === 0 ? true : false}
                    text={show === 1 ? text1 : show === 2 ? text2 : text3}
                    textColor={Colors.toastText}
                    icon={
                        <AntDesign
                            name="exclamationcircleo"
                            size={40}
                            color={Colors.toastText}
                        />
                    }
                />
                <View
                    style={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "flex-end",
                        alignItems: "center",
                        //   backgroundColor: "green",
                    }}
                >
                    <PopInAnimation
                        scaleSpeed={0.4}
                        opacitySpeed={950}
                        style={{ position: "relative", alignItems: 'flex-end' }}
                    >
                        {/* <View
                            style={{
                                borderRadius: 7,
                                borderWidth: 1,
                                position: "absolute",
                                width: 14,
                                height: 14,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                top: 0,
                                right: 0,
                                borderColor:
                                    Colors.background === "#0C121D"
                                        ? "white"
                                        : "black",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 5,
                                    color:
                                        Colors.background === "#0C121D"
                                            ? "white"
                                            : "black",
                                }}
                            >
                                 TM 
                            </Text>
                        </View> */}
                        <Image
                            source={
                                Colors.background === "#0C121D" ? image1 : image
                            }
                            style={{ width: 170, height: 170 }}
                        />
                    </PopInAnimation>
                </View>
                <View
                    style={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "flex-end",
                        alignItems: "center",
                        //   paddingBottom: 100,
                        //   backgroundColor: "red",
                    }}
                >
                    {/* <Text
          style={{
            color: "rgba(256, 256, 256, .8)",
            fontWeight: "400",
            fontSize: 11.5,
            lineHeight: 13.5,
            textAlign: "center",
            width: "60%",
          }}
        >
          Gérez en toute transparence les dépôts et les retraits de 1xBet dans
          un seul endroit sécurisé.
        </Text> */}
                </View>
            </View>
        </View>
    ) : (
        <View
            style={{
                flex: 1,
                backgroundColor: Colors.background,
            }}
        >
            {currentLanguage === undefined && (
                <LanguageModal
                    setLanguage={setLanguage}
                    choosenLanguage={choosenLanguage}
                    setChoosenLanguage={setChoosenLanguage}
                />
            )}
            <ExploreHeader4 />
            <StatusBar backgroundColor={Colors.background} />
            {image2 && (
                <View
                    style={{
                        flex: 3,
                        backgroundColor: Colors.background,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: Colors.background,
                        }}
                    >
                        <FlatList
                            renderItem={({ item }) => (
                                <OnboardingItem item={item} />
                            )}
                            data={slides}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled={true}
                            bounces={false}
                            keyExtractor={(item) => item.id}
                            onScroll={Animated.event(
                                [
                                    {
                                        nativeEvent: {
                                            contentOffset: { x: scrollX },
                                        },
                                    },
                                ],
                                { useNativeDriver: false },
                            )}
                            scrollEventThrottle={32}
                            onViewableItemsChanged={viewableItemsChanged}
                            viewabilityConfig={viewConfig}
                            ref={slidesRef}
                            style={{ backgroundColor: "red" }}
                        />
                    </View>
                    <Paginator data={slides} scrollX={scrollX} />
                </View>
            )}
            <NextButton
                percentage={(currentIndex + 1) * (100 / (slides.length + 1))}
                scrollTo={scrollTo}
            />
        </View>
    );
};

export default SecondWelcomePage;
