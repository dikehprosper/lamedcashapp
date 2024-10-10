/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */
import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    Image,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Alert,
} from "react-native";
import PopInAnimation from "@/components/(Utils)/AnimatedContent";
const image = require("@/assets/images/Logo.webp");
const image1 = require("@/assets/images/Logo.webp");
import { Color } from "@/constants/Colors";
import ExploreHeader from "@/components/ExploreHeader4";
import NumberPad from "@/components/numberPad";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { AntDesign, Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToastNotification from "@/components/(Utils)/toastNotification";
import * as Haptics from "expo-haptics";
import { verifyUserPin } from "@/state/userData/getUserData";
import LoadingComponent from "@/components/loadingComponent";
import { CommonActions } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";
import { Language } from "@/constants/languages";

interface Payload {
    pin: string;
    email: string;
}

interface Payload2 {
    email: string;
}
const AuthScreen = ({ navigation }: any) => {
    const dispatch = useDispatch<AppDispatch>();
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
    const [loading, setLoading] = useState(false);
    const [pinCount, setPinCount] = useState(0);
    const [pin, setPin] = useState<any>([]);
    const totalPins = 6;

    //BIOMETRIC SIGNIN
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleBiometricAuth = async () => {
        try {
            // Check if biometric hardware is available
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            if (!hasHardware) {
                Alert.alert(languageText.text312);
                return;
            }

            // Check if any biometrics are enrolled
            const isBiometricEnrolled =
                await LocalAuthentication.isEnrolledAsync();
            if (!isBiometricEnrolled) {
                Alert.alert(languageText.text313);
                return;
            }

            // Authenticate with biometrics
            const authResult = await LocalAuthentication.authenticateAsync({
                promptMessage: languageText.text314,
                fallbackLabel: languageText.text315,
                disableDeviceFallback: false, // Allow device fallback to passcode
            });

            if (authResult.success) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: "MainNavigator" }],
                    }),
                );
              
            } else {
                Alert.alert(languageText.text317);
            }
        } catch (error) {
            console.error(languageText.text318, error);
            Alert.alert(languageText.text319);
        }
    };

    useEffect(() => {
        if (pinCount === totalPins) {
            console.log(pin);
            setLoading(true);
            const pinString = pin.join("");
            const payload: Payload = {
                pin: pinString,
                email: data.email,
            };
            dispatch(verifyUserPin(payload))
                .then(async (result: any) => {
                    console.log(result.payload.status, "vjhdcjhvjk");
                    if (result.payload.success === true) {
                        try {
                            await AsyncStorage.setItem(
                                "token",
                                result.payload.token,
                            );
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [{ name: "MainNavigator" }],
                                }),
                            );
                            setTimeout(() => {
                                setLoading(false);
                            }, 100);
                        } catch (err) {
                            console.log(err);
                        }
                    }
                    if (result.payload.status === 501) {
                        displayNotification();
                        setLoading(false);
                    }
                    if (result.payload.status === 502) {
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: "login" }],
                            }),
                        );
                        setLoading(false);
                        // displayNotification2();
                    }
                    if (result.payload.status === 503) {
                        displayNotification4();
                        setLoading(false);
                    }
                })
                .catch((err: any) => {
                    displayNotification3();
                    setLoading(false);
                })
                .finally(() => {
                    setPin([]);
                    setPinCount(0);
                });
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

    const [show, setShow] = useState(0);
    const [display, setDisplay] = useState(0);
    const [text1, setText1] = useState(`L'utilisateur n'existe pas`);
    const [text2, setText2] = useState(`L'utilisateur est désactivé`);
    const [text3, setText3] = useState(`incapable d'effectuer l'opération`);
    const [text4, setText4] = useState(`Code PIN invalide`);

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
    const triggerHapticFeedback = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };

    useEffect(() => {
        if (isAuthenticated) {
            //      setLoading(true);

            //      const payload: Payload = {
            //          email: data.email,
            //      };
            //      dispatch(loginUserWithBiometrics(payload))
            //          .then(async (result) => {
            //              console.log(result.payload.status, "vjhdcjhvjk");
            //              if (result.payload.success === true) {
            //                  try {
            //                      await AsyncStorage.setItem(
            //                          "token",
            //                          result.payload.token,
            //                      );
            //                      navigation.dispatch(
            //                          CommonActions.reset({
            //                              index: 0,
            //                              routes: [{ name: "MainNavigator" }],
            //                          }),
            //                      );
            //                      setTimeout(() => {
            //                          setLoading(false);
            //                      }, 100);
            //                  } catch (err) {
            //                      console.log(err);
            //                  }
            //              }
            //              if (result.payload.status === 501) {
            //                  displayNotification();
            //                  setLoading(false);
            //              }
            //              if (result.payload.status === 502) {
            //                  navigation.dispatch(
            //                      CommonActions.reset({
            //                          index: 0,
            //                          routes: [{ name: "login" }],
            //                      }),
            //                  );
            //                  setLoading(false);
            //                  // displayNotification2();
            //              }
            //              if (result.payload.status === 503) {
            //                  displayNotification4();
            //                  setLoading(false);
            //              }
            //          })
            //          .catch((err) => {
            //              displayNotification3();
            //              setLoading(false);
            //          })
            //          .finally(() => {
            //              setPin([]);
            //              setPinCount(0);
            //          });
            //  }
           
        }
    }, [isAuthenticated]);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: Colors.background,
                alignItems: "center",
                justifyContent: "space-between",
                position: "relative",
            }}
        >
            {loading && (
                <LoadingComponent backgroundColor={Colors.background} />
            )}
            <StatusBar backgroundColor={Colors.background} />
            <ExploreHeader />
            <ToastNotification
                show={show === 0 ? true : false}
                text={
                    display === 1
                        ? text1
                        : display === 2
                          ? text2
                          : display === 3
                            ? text3
                            : text4
                }
                textColor="white"
                marginTop={Platform.OS === "ios" ? 0 : 0}
                backgroundColor="red"
                icon={
                    <AntDesign
                        name="exclamationcircleo"
                        size={40}
                        color="white"
                    />
                }
            />
            <View style={{ alignItems: "center" }}>
                <View
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        marginBottom: 17,
                        //   backgroundColor: "green",
                    }}
                >
                    <PopInAnimation
                        scaleSpeed={0.4}
                        opacitySpeed={950}
                        style={{ position: "relative" }}
                    >
                        <Image
                            source={{
                                uri: data.image,
                            }}
                            style={styles.profileImage}
                        />
                    </PopInAnimation>
                </View>
                <Text
                    style={{
                        fontSize: 19,
                        color: Colors.welcomeText,
                        fontWeight: "700",
                        marginBottom: 17,
                    }}
                >
                    Bienvenue &nbsp; {data.fullname.split(" ")}
                </Text>
                <Text
                    style={{
                        fontSize: 16,
                        color: Colors.welcomeText,
                        fontWeight: "200",
                    }}
                >
                    Entrez votre code PIN pour continuer.
                </Text>
            </View>
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

                {isAuthenticated ? (
                    <></>
                ) : (
                    <TouchableOpacity
                        onPress={handleBiometricAuth}
                        style={{ position: "absolute", bottom: 87, left: 79 }}
                    >
                        <Entypo
                            name="fingerprint"
                            size={33}
                            color={Colors.welcomeText}
                        />
                    </TouchableOpacity>
                )}

                <View
                    style={{
                        gap: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 29,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            color: Colors.welcomeText,
                            fontWeight: "300",
                        }}
                    >
                        Pas toi?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.push("login")}>
                        <Text
                            style={{
                                fontSize: 16,

                                color: Colors.default1,
                                fontWeight: "700",
                            }}
                        >
                            Changer de compte
                        </Text>
                    </TouchableOpacity>
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

export default AuthScreen;
