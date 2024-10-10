/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    TouchableWithoutFeedback,
    ScrollView,
    Platform,
    StatusBar,
} from "react-native";
import {
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
    AntDesign,
} from "@expo/vector-icons";
import { Color } from "@/constants/Colors";
import ToastNotification from "@/components/(Utils)/toastNotification";
import ExploreHeader3 from "@/components/ExploreHeader3";
import { defaultStyles } from "@/constants/Styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { resetPassword, signInUser } from "@/state/userData/getUserData";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoticeModalPage from "@/components/(Utils)/noticeModal2";
import { Language } from "@/constants/languages";
// Calculate the percentage value

const ResetPassword = ({ navigation, route }: any) => {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    const [loading2, setLoading2] = useState(false);
    const [iconVisibility, setIconVisibility] = useState(false);
    const [inputIconColor, setInputIconColor] = useState(
        "rgba(128, 128, 128, 0.7)",
    );
    const [inputIconColor2, setInputIconColor2] = useState(
        "rgba(128, 128, 128, 0.5)",
    );
    const [inputBorderColor, setInputBorderColor] = useState("transparent");
    const [inputBorderColor2, setInputBorderColor2] = useState("transparent");
    const [index, setIndex] = useState(0);

    // EXTRA SETTINGS ........
    // Input fucus and blur setting
    async function setItemOnFocus(index: React.SetStateAction<number>) {
        setIndex(index);
    }

    function setItemOnBlur() {
        setIndex(0);
    }

    function changePasswordVisibility() {
        setIconVisibility((prev) => {
            return !prev;
        });
    }
    //function to close keyboard
    const inputRef = useRef<TextInput>(null);
    const inputRef2 = useRef<TextInput>(null);
    const inputRef3 = useRef<TextInput>(null);
    const inputRef4 = useRef<TextInput>(null);
    const inputRef5 = useRef<TextInput>(null);
    const inputRef6 = useRef<TextInput>(null);
    const inputRef7 = useRef<TextInput>(null);
    const handleDismissKeyboard = () => {
        inputRef.current?.blur();
        inputRef2.current?.blur();
        inputRef3.current?.blur();
        inputRef4.current?.blur();
        inputRef5.current?.blur();
        inputRef6.current?.blur();
        inputRef7.current?.blur();
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // VERIFYINGING ALL INPUTS ......
    // verifying email field
    const [emailError, setEmailError] = useState(false);
    const [emailLoadingSymbol, setEmailLoadingSymbol] = useState("");
    const [triggerEmailRevalidation, setTriggerEmailRevalidation] =
        useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    const SignUpEmailVerification = () => {
        if (email === "") {
            return;
        }
        if (!triggerEmailRevalidation) {
            setEmailLoadingSymbol("true");
            setTimeout(() => {
                if (!isValidEmail) {
                    setEmailError(true);
                    setEmailLoadingSymbol("");
                    setTriggerEmailRevalidation(true);
                } else {
                    setEmailError(false);
                    setEmailLoadingSymbol("false");
                    setTriggerEmailRevalidation(true);
                }
            }, 300);
        }
    };
    // Verifying Password field
    const [passwordError, setPasswordError] = useState(false);
    const [passwordLoadingSymbol, setPasswordLoadingSymbol] = useState("");
    const [triggerPasswordRevalidation, setTriggerPasswordRevalidation] =
        useState(false);
    const isValidPassword = password.length >= 4;
    const SignUpPasswordVerification = () => {
        if (password === "") {
            return;
        }
        if (!triggerPasswordRevalidation) {
            setPasswordLoadingSymbol("true");
            setTimeout(() => {
                if (!isValidPassword) {
                    setPasswordError(true);
                    setPasswordLoadingSymbol("");
                    setTriggerPasswordRevalidation(true);
                } else {
                    setPasswordError(false);
                    setPasswordLoadingSymbol("false");
                    setTriggerPasswordRevalidation(true);
                }
            }, 300);
        }
    };

    // REVERIFYINGING ALL INPUTS ......
    // Re-verifying email field
    const [triggerEmailRevalidation2, setTriggerEmailRevalidation2] =
        useState(false);

    if (triggerEmailRevalidation) {
        setTimeout(() => {
            if (!isValidEmail) {
                if (email === "") {
                    setEmailError(false);
                }
                if (email !== "") {
                    setEmailError(true);
                }
                setEmailLoadingSymbol("");
            } else {
                setEmailError(false);
                setEmailLoadingSymbol("false");
            }
        }, 300);
    }
    if (triggerEmailRevalidation2) {
        setTimeout(() => {
            if (!isValidEmail) {
                if (email === "") {
                    //  setEmailError(false);
                }
                if (email !== "") {
                    setEmailError(true);
                }
                setEmailLoadingSymbol("");
            } else {
                setEmailError(false);
                setEmailLoadingSymbol("false");
            }
        }, 300);
    }
    // Re-verifying password field
    const [triggerPasswordRevalidation2, setTriggerPasswordRevalidation2] =
        useState(false);
    if (triggerPasswordRevalidation) {
        setTimeout(() => {
            if (!isValidPassword) {
                if (password === "") {
                    setPasswordError(false);
                }
                if (password !== "") {
                    setPasswordError(true);
                }
                setPasswordLoadingSymbol("");
            } else {
                setPasswordError(false);
                setPasswordLoadingSymbol("false");
            }
        }, 300);
    }

    if (triggerPasswordRevalidation2) {
        setTimeout(() => {
            if (!isValidPassword) {
                if (password === "") {
                    // setPasswordError(false);
                }
                if (password !== "") {
                    setPasswordError(true);
                }
                setPasswordLoadingSymbol("");
            } else {
                setPasswordError(false);
                setPasswordLoadingSymbol("false");
            }
        }, 300);
    }

    const data = useSelector((state: RootState) => state.getUserData.data);
    const success = useSelector(
        (state: RootState) => state.getUserData.success,
    );
    const isLoading = useSelector(
        (state: RootState) => state.getUserData.isLoading,
    );

    const dispatch = useDispatch<AppDispatch>();

    //HANDLING SUBMISSION
    function handleSubmit() {
        setLoading2(true);
        if (emailLoadingSymbol !== "false") {
            setEmailError(true);
            triggerHapticFeedback1();
            setTriggerEmailRevalidation2(true);
        }

        if (emailLoadingSymbol !== "false") {
            setLoading2(false);
            displayNotification4();
            return;
        }
        const formData = {
            email: email,
        };
        console.log(formData);

        dispatch(resetPassword(formData))
            .then(async (result: any) => {
                console.log(result.payload.success, "result.payload.success");
                if (result.payload.success === true) {
                    try {
                        triggerHapticFeedback1();
                       navigation.push("changePin2", { email: email });

                        setLoading2(false);
                    } catch (err) {
                        console.log(err);
                        setLoading2(false);
                    }
                }
                if (result.payload.status === 501) {
                    displayNotification();
                    setLoading2(false);
                }
                if (result.payload.status === 502) {
                    displayNotification2();

                    setLoading2(false);
                }
                if (result.payload.status === 503) {
                    displayNotification3();
                    setLoading2(false);
                }
            })
            .catch((err: any) => console.log(err));
    }
    const triggerHapticFeedback1 = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    };
    const currentLanguage = useSelector(
        (state: RootState) => state.getUserData.currentLanguage,
    );
    const languageText =
        currentLanguage === "english" ? Language.english : Language.french;

    const [show, setShow] = useState(0);
    const text1 = languageText.text1; // `The user does not exist`
    const text2 = languageText.text2;
    // `User is deactivated`;
    const text3 = languageText.text9;
    // `incorrect password`;
    const text4 = languageText.text10;
    // `Enter the correct details`;

    const icon1 = (
        <AntDesign name="checkcircleo" size={40} color={Colors.toastText} />
    );
    const icon2 = (
        <AntDesign
            name="exclamationcircleo"
            size={40}
            color={Colors.toastText}
        />
    );

    function displayNotification() {
        setShow(1);
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
    function displayNotification4() {
        setShow(4);
        triggerHapticFeedback();
        setTimeout(() => {
            setShow(0);
        }, 5000);
    }
    const triggerHapticFeedback = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };

    const [openNotice, setOpenNotice] = useState(false);
    function closeNotice() {
        setOpenNotice(false);
    }

    return (
        <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: Colors.background,
                    position: "relative",
                    paddingTop: 10,
                }}
            >
                <StatusBar backgroundColor={Colors.background} />
                <ExploreHeader3 />
                <ToastNotification
                    show={show === 0 ? true : false}
                    text={
                        show === 1
                            ? text1
                            : show === 2
                              ? text2
                              : show === 3
                                ? text3
                                : text4
                    }
                    textColor={Colors.toastText}
                    marginTop={Platform.OS === "ios" ? 0 : 0}
                    backgroundColor="red"
                    icon={
                        <AntDesign
                            name="exclamationcircleo"
                            size={40}
                            color={Colors.toastText}
                        />
                    }
                />
                <View style={{ display: "flex", height: 190 }}>
                    <View
                        style={styles.transaction_template_container_header_1}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{
                                paddingTop: 3,
                                paddingBottom: 3,
                                paddingRight: 3,
                                backgroundColor: "transparent",
                                borderColor: Colors.welcomeText,
                                opacity: 0.6,
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                            }}
                        >
                            <Ionicons
                                name="chevron-back"
                                size={27}
                                color={Colors.welcomeText}
                            />
                        </TouchableOpacity>
                        <Text
                            style={{
                                color: Colors.welcomeText,
                                fontWeight: "600",
                                opacity: 1,
                                fontSize: 18.5,
                                marginLeft: "27%",
                            }}
                        >
                            {languageText.text7}
                            {/* Login */}
                        </Text>
                    </View>

                    <View style={styles.container2}>
                        <Text
                            style={{
                                color: Colors.welcomeText,
                                fontWeight: "600",
                                opacity: 1,
                                fontSize: 24,
                                marginLeft: "2%",
                            }}
                        >
                            {languageText.text15}
                            {/* Mot de passe oublié */}
                        </Text>
                        <Text
                            style={{
                                color: Colors.welcomeText,
                                fontWeight: "400",
                                opacity: 0.4,
                                fontSize: 14,
                                marginLeft: "2%",
                                marginTop: 2,
                            }}
                        >
                            {languageText.text41}
                            {/* Don't worry, it happens. Please enter your email
                            address associated with your account. */}
                        </Text>
                    </View>
                </View>
                <ScrollView
                    style={{
                        display: "flex",
                        gap: 10,
                        padding: 20,
                        backgroundColor: Colors.inputBackground,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        flex: 8,
                        paddingBottom: 80,
                    }}
                    scrollEnabled={true}
                    automaticallyAdjustKeyboardInsets={true}
                    alwaysBounceVertical={true}
                    showsVerticalScrollIndicator={false}
                >
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 15,
                            backgroundColor: Colors.background,
                            borderRadius: 8,
                            borderColor: emailError
                                ? "red"
                                : index === 2
                                  ? Colors.default1
                                  : "transparent",
                            borderWidth: 1.5,
                            position: "relative",
                        }}
                    >
                        <View
                            style={{ position: "absolute", top: -19, right: 2 }}
                        >
                            {emailError && (
                                <Text
                                    style={{
                                        fontWeight: "600",
                                        fontSize: 12,
                                        color: "red",
                                    }}
                                >
                                    * {languageText.text13}
                                    {/* Please enter a valid mail */}
                                </Text>
                            )}
                        </View>
                        <Text
                            style={{
                                paddingLeft: 12,
                                paddingRight: 2,
                                opacity: 1,
                            }}
                        >
                            <MaterialCommunityIcons
                                name="email-fast-outline"
                                size={18}
                                color={
                                    emailError
                                        ? "red"
                                        : index === 2
                                          ? Colors.default1
                                          : "rgba(128, 128, 128, 0.5)"
                                }
                            />
                        </Text>
                        <TextInput
                            ref={
                                Platform.OS === "ios" ||
                                Platform.OS === "android"
                                    ? inputRef2
                                    : null
                            }
                            value={email}
                            onChangeText={setEmail}
                            onFocus={() => setItemOnFocus(2)}
                            onBlur={setItemOnBlur}
                            placeholderTextColor={Colors.placeHolderTextColor}
                            autoCapitalize="none"
                            placeholder="E-mail"
                            autoCorrect={false}
                            style={[
                                defaultStyles.inputField,
                                { color: Colors.welcomeText },
                            ]}
                            onEndEditing={SignUpEmailVerification}
                        ></TextInput>
                        <View style={{ paddingRight: 10.4 }}>
                            {
                                emailLoadingSymbol === "true" ? (
                                    <ActivityIndicator
                                        size="small"
                                        color={Colors.primary3}
                                    />
                                ) : emailLoadingSymbol === "false" ? null : null // /> //   color={Colors.default1} //   size={19} //   name='verified' // <MaterialIcons
                            }
                        </View>
                    </View>

                    <TouchableOpacity
                        style={{
                            backgroundColor: Colors.default1,
                            height: 50,
                            borderRadius: 8,
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "row",
                            gap: 8,
                            marginTop: 140,
                            marginBottom: 40,
                            opacity: loading2 ? 0.5 : 1,
                        }}
                        onPress={handleSubmit}
                    >
                        {isLoading || loading2 ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : null}
                        <Text style={defaultStyles.btnText}>
                            {languageText.text16}
                            {/* Continue */}
                        </Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            marginTop: 1,
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                            marginBottom: 40,
                        }}
                    >
                        <Text>
                            <TouchableOpacity
                                onPress={() => navigation.push("signup")}
                            >
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontWeight: "400",
                                        color: Colors.welcomeText,
                                        marginRight: 5,
                                    }}
                                >
                                    {languageText.text42}?
                                    {/* You remember
                            your contact details */}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.push("signup")}
                            >
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontWeight: "700",
                                        color: Colors.default1,
                                    }}
                                >
                                    {languageText.text11}
                                    {/* Sign in */}
                                </Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                </ScrollView>
                {openNotice && <NoticeModalPage closeNotice={closeNotice} />}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        gap: 10,
        padding: 20,
        backgroundColor: "red",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 8,
        paddingBottom: 300,
    },
    transaction_template_container_header_1: {
        display: "flex",
        alignItems: "center",
        fontSize: 14,
        fontWeight: "700",
        gap: 12,
        flexDirection: "row",
        marginBottom: 10,
        paddingLeft: 12,
        paddingRight: 8,
        flex: 0.5,
    },
    container2: {
        display: "flex",
        gap: 3,
        padding: 10,
        backgroundColor: "transparent",
        borderRadius: 8,
        flex: 1.2,
    },
});

export default ResetPassword;
