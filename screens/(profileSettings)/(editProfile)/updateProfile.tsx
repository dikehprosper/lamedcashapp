/* eslint-disable */

import React, {useState, useEffect, useRef} from "react";
import {
  Vibration,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  Keyboard,
  Pressable,
  Platform,
  StatusBar,
} from "react-native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import {
  Feather,
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import ExploreHeader3 from "@/components/ExploreHeader3";
import {defaultStyles} from "@/constants/Styles";
import Loader from "@/components/(Utils)/loader";
import ValidateTextInput from "@/components/(Utils)/ValidateTextInput";
import CountryCode from "@/components/(Utils)/countrySelector";
import NetworkModalPage from "@/components/(Utils)/NetworkModalPage";
import PopInAnimation from "@/components/(Utils)/AnimatedContent";
import VerifyMobileNumber from "@/components/(Utils)/VerifyMobileNumber";
import * as Haptics from "expo-haptics";
import ToastNotification from "@/components/(Utils)/toastNotification";
import { Color } from "@/constants/Colors";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/state/store";
import {changeUserDetails} from "@/state/userData/getUserData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingComponent from "@/components/loadingComponent";
import ExploreHeader5 from "@/components/ExploreHeader5";
import { CommonActions } from "@react-navigation/native";
import { Language } from "@/constants/languages";

// Calculate the percentage value

interface FormData2 {
    fullname: string;
    email: string;
    number: string | number;
    betId: string;
}
const UpdateProfile = ({ navigation }: any) => {
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
    const isLoading = useSelector(
        (state: RootState) => state.getUserData.isLoading,
    );
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [iconVisibility, setIconVisibility] = useState(false);
    const [validationMessage, SetValidationMessage] = useState("");
    const [index, setIndex] = useState(0);

    // All inputs data initial state
    const [fullname, setFullname] = useState(data.fullname);
    const [email, setEmail] = useState(data.email);
    const [number, setNumber] = useState(data.number.toString());
    const [betId, setBetId] = useState(data.betId);

    // SETTING MARGIN BOTTOM WHEN KEYBOARD IS BEING DISPLAYED
    // EXTRA SETTINGS ........
    // Input fucus and blur setting
    async function setItemOnFocus(index: React.SetStateAction<number>) {
        setReOccur(true);
        setIndex(index);
    }

    function setItemOnBlur() {
        Keyboard.dismiss();
        setIndex(0);
        // if (betId === "") {
        //   setBetIdError(false);
        // }
    }

    // Password visibility settingr
    function changePasswordVisibility() {
        setIconVisibility((prev) => {
            return !prev;
        });
    }

    useEffect(() => {
        wrapperSignUpPhoneNumberVerification();
        SignUpEmailVerification();
        SignUpFullnameVerification();
        SignUpBetIdVerification();
    }, []);
    // VERIFYINGING ALL INPUTS ......
    // Verifying fullname field
    const [fullNameError, setFullNameError] = useState(false);
    const [fullnameLoadingSymbol, setFullnameLoadingSymbol] = useState("");
    const [triggerFullNameRevalidation, setTriggerFullNameRevalidation] =
        useState(false);
    const isValidFullname = fullname.length > 1;
    const SignUpFullnameVerification = () => {
        if (fullname === "") {
            return;
        }
        if (!triggerFullNameRevalidation) {
            setFullnameLoadingSymbol("true");
            setTimeout(() => {
                if (!isValidFullname) {
                    setFullNameError(true);
                    setFullnameLoadingSymbol("");
                    setTriggerFullNameRevalidation(true);
                } else {
                    setFullNameError(false);
                    setFullnameLoadingSymbol("false");
                    setTriggerFullNameRevalidation(true);
                }
            }, 300);
        }
    };

    // Verifying email field
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

    // Verifying Phone-Number field
    // Actual Phone Number Verification
    const [countryFlag, setCountryFlag] = useState("🇧🇯");
    const [countryCode, setCountryCode] = useState("+229");

    function changeCountryCode(value: any) {
        setCountryCode(value);
    }
    function changeCountryFlag(value: any) {
        setCountryFlag(value);
    }

    // Getting the Network
    const numberPrefix = number.substring(0, 2);
    const network = VerifyMobileNumber({ numberPrefix });
    const [network2, setNetwork2] = useState<any>();
    const [currentNetwork, setCurrentNetwork] = useState<any>();
    const [networkModal, setNetworkModal] = useState<string>("");
    function openNetworkModal() {
        if (network.length === 0) {
            triggerHapticFeedback();
            setNetworkModal("first");
        } else if (network.length === 1) {
            triggerHapticFeedback();
            setNetworkModal("second");
        } else if (network.length > 2 || network.length === 2) {
            triggerHapticFeedback();
            setNetworkModal("third");
        }
    }

    // Verifying Phone Number field
    const [numberCollector, setNumberCollector] = useState<any>();
    const [numberCollectorCorrect, setNumberCollectorCorrect] =
        useState<any>(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [phoneNumberLoadingSymbol, setPhoneNumberLoadingSymbol] =
        useState("");
    const [triggerPhoneNumberRevalidation, setTriggerPhoneNumberRevalidation] =
        useState(false);
    const isValidPhoneNumber = /^\d{8}$/.test(number);

    function wrapperSignUpPhoneNumberVerification() {
        setNumberCollector(number);
        if (!triggerPhoneNumberRevalidation) {
            SignUpPhoneNumberVerification();
        }
    }
    const SignUpPhoneNumberVerification = () => {
        if (number === "") {
            return;
        }

        setTimeout(() => {
            if (!isValidPhoneNumber) {
                setPhoneNumberError(true);
                setPhoneNumberLoadingSymbol("");
            } else {
                setPhoneNumberError(false);
                setCurrentNetwork(network);
                setPhoneNumberLoadingSymbol("false");
                setTriggerPhoneNumberRevalidation(true);
            }
        }, 300);
    };

    function closeNetworkModal() {
        setIndex(0);
        setNetworkModal("");
        setPhoneNumberLoadingSymbol("");
    }

    function closeNetworkModal2() {
        setIndex(0);
        setNetworkModal("");
        setPhoneNumberLoadingSymbol("false");
    }

    function changeNetworkModal() {
        closeNetworkModal();
        // setNetworkModal(false);
    }
    function proceedWithNetworkModal() {
        setIndex(0);
        setNetworkModal("");
        setPhoneNumberLoadingSymbol("false");
    }
    function proceedWithNetworkModal2(value: any) {
        setIndex(0);
        setNetworkModal("");
        setPhoneNumberLoadingSymbol("false");
        setNetwork2(value);
    }

    // Verifying Bet-Id field
    const [betIdError, setBetIdError] = useState(false);
    const [betIdError1, setBetIdError1] = useState(false);
    const [betIdError2, setBetIdError2] = useState(false);
    const [betIdError3, setBetIdError3] = useState(false);
    const [betIdLoadingSymbol, setBetIdLoadingSymbol] = useState("");
    const [triggerBetIdRevalidation, setTriggerBetIdRevalidation] =
        useState(false);
    const isValidBetId = betId.length !== 0;
    const isValidBetId1 = betId.length >= 4;
    const isValidBetId2 = /^\d+$/.test(betId);
    const SignUpBetIdVerification = () => {
        if (betId === "") {
            return;
        }
        if (!triggerBetIdRevalidation) {
            setBetIdError(false);
            setBetIdError1(false);
            setBetIdError2(false);
            setBetIdError3(false);
            setBetIdLoadingSymbol("true");
            setTimeout(() => {
                if (!isValidBetId) {
                    setBetIdError(true);
                    setBetIdLoadingSymbol("");
                    setTriggerBetIdRevalidation(true);
                } else if (!isValidBetId1 && isValidBetId2) {
                    setBetIdError1(true);
                    setBetIdLoadingSymbol("");
                    setTriggerBetIdRevalidation(true);
                } else if (!isValidBetId2 && isValidBetId1) {
                    setBetIdError2(true);
                    setBetIdLoadingSymbol("");
                    setTriggerBetIdRevalidation(true);
                } else if (!isValidBetId1 && !isValidBetId2) {
                    setBetIdError3(true);
                    setBetIdLoadingSymbol("");
                    setTriggerBetIdRevalidation(true);
                } else {
                    setBetIdError(false);
                    setBetIdLoadingSymbol("false");
                    setTriggerBetIdRevalidation(true);
                }
            }, 300);
        }
    };

    // REVERIFY ALL INPUTS .........
    // Re-verifying fullname field
    const [triggerFullNameRevalidation2, setTriggerFullNameRevalidation2] =
        useState(false);
    if (triggerFullNameRevalidation) {
        setTimeout(() => {
            if (!isValidFullname) {
                if (fullname === "") {
                    setFullNameError(false);
                }
                if (fullname !== "") {
                    setFullNameError(true);
                }
                setFullnameLoadingSymbol("");
            } else {
                setFullNameError(false);
                setFullnameLoadingSymbol("false");
            }
        }, 300);
    }
    if (triggerFullNameRevalidation2) {
        setTimeout(() => {
            if (!isValidFullname) {
                if (fullname === "") {
                    // setFullNameError(false);
                }
                if (fullname !== "") {
                    setFullNameError(true);
                }
                setFullnameLoadingSymbol("");
            } else {
                setFullNameError(false);
                setFullnameLoadingSymbol("false");
            }
        }, 300);
    }

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

    // Re-verifying phone number field
    const [reoccur, setReOccur] = useState(false);
    const [
        triggerPhoneNumberRevalidation2,
        setTriggerPhoneNumberRevalidation2,
    ] = useState(false);
    if (numberCollector !== number) {
        if (reoccur) {
            if (triggerPhoneNumberRevalidation) {
                setTimeout(() => {
                    if (!isValidPhoneNumber) {
                        if (number === "") {
                            setPhoneNumberError(false);
                        }
                        if (number !== "") {
                            setPhoneNumberError(true);
                        }
                        setPhoneNumberLoadingSymbol("");
                    } else {
                        Keyboard.dismiss();
                        setPhoneNumberError(false);
                        if (network.length === 0) {
                            setPhoneNumberLoadingSymbol("");
                        } else if (network.length === 1) {
                            setPhoneNumberLoadingSymbol("true");
                        } else if (network.length > 2 || network.length === 2) {
                            setPhoneNumberLoadingSymbol("true");
                        }
                        setIndex(0);
                        openNetworkModal();
                        setReOccur(false);
                    }
                }, 300);
            }
        }
    }

    // Re-verifying bet id field
    const [triggerBetIdRevalidation2, setTriggerBetIdRevalidation2] =
        useState(false);
    if (triggerBetIdRevalidation) {
        setTimeout(() => {
            if (!isValidBetId) {
                setBetIdError1(false);
                setBetIdError2(false);
                setBetIdError3(false);
                if (betId !== "") {
                    setBetIdError(true);
                }
                if (betId === "") {
                    setBetIdError(false);
                }
                setBetIdLoadingSymbol("");
            } else if (!isValidBetId1 && isValidBetId2) {
                setBetIdError1(true);
                setBetIdError(false);
                setBetIdError2(false);
                setBetIdError3(false);
                setBetIdLoadingSymbol("");
            } else if (!isValidBetId2 && isValidBetId1) {
                setBetIdError2(true);
                setBetIdError(false);
                setBetIdError1(false);
                setBetIdError3(false);
                setBetIdLoadingSymbol("");
            } else if (!isValidBetId1 && !isValidBetId2) {
                setBetIdError3(true);
                setBetIdError(false);
                setBetIdError2(false);
                setBetIdError1(false);
                setBetIdLoadingSymbol("");
            } else {
                setBetIdError(false);
                setBetIdError1(false);
                setBetIdError2(false);
                setBetIdError3(false);
                setBetIdLoadingSymbol("false");
            }
        }, 300);
    }
    if (triggerBetIdRevalidation2) {
        setTimeout(() => {
            if (!isValidBetId) {
                setBetIdError1(false);
                setBetIdError2(false);
                setBetIdError3(false);
                if (betId !== "") {
                    setBetIdError(true);
                }
                if (betId === "") {
                    // setBetIdError(false);
                }
                setBetIdLoadingSymbol("");
            } else if (!isValidBetId1 && isValidBetId2) {
                setBetIdError1(true);
                setBetIdError(false);
                setBetIdError2(false);
                setBetIdError3(false);
                setBetIdLoadingSymbol("");
            } else if (!isValidBetId2 && isValidBetId1) {
                setBetIdError2(true);
                setBetIdError(false);
                setBetIdError1(false);
                setBetIdError3(false);
                setBetIdLoadingSymbol("");
            } else if (!isValidBetId1 && !isValidBetId2) {
                setBetIdError3(true);
                setBetIdError(false);
                setBetIdError2(false);
                setBetIdError1(false);
                setBetIdLoadingSymbol("");
            } else {
                setBetIdError(false);
                setBetIdError1(false);
                setBetIdError2(false);
                setBetIdError3(false);
                setBetIdLoadingSymbol("false");
            }
        }, 300);
    }

    useEffect(() => {
        if (numberCollector === number) {
            SignUpPhoneNumberVerification();
        }
        const network = VerifyMobileNumber({ numberPrefix });
        setNetwork2(network);
    }, [number]);

    if (triggerPhoneNumberRevalidation2) {
        setTimeout(() => {
            if (!isValidPhoneNumber) {
                if (number === "") {
                    // setPhoneNumberError(false);
                }
                if (number !== "") {
                    setPhoneNumberError(true);
                }
                setPhoneNumberLoadingSymbol("");
            } else {
                handleDismissKeyboard();
                setPhoneNumberError(false);
                if (network.length === 0) {
                    setPhoneNumberLoadingSymbol("");
                } else if (network.length === 1) {
                    setPhoneNumberLoadingSymbol("true");
                } else if (network.length > 2 || network.length === 2) {
                    setPhoneNumberLoadingSymbol("true");
                }
                setIndex(0);
                openNetworkModal();
                setTriggerPhoneNumberRevalidation2(false);
                setReOccur(false);
            }
        }, 300);
    }

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

    function runNetworkCheck(value: React.SetStateAction<number | undefined>) {
        Vibration.vibrate(50);
        setCurrentNetwork(value);
    }

    // const [screenheight, setScreenHeight] = useState({screenheight: 0})
    // function onContentSizeChange(contentWidth: any, contentHeight: any) {
    // setScreenHeight({screenheight: 3000})
    // }
    //  const [height, setHeight] = useState(0);

    //  const onLayout = (event: any) => {
    //    const {height: newHeight} = event.nativeEvent.layout;
    //    setHeight(newHeight);
    //  };
    // const scrollEnabled = screenheight.screenheight !== height;

    function handleSubmit() {
        setLoading2(true);
        if (fullnameLoadingSymbol !== "false") {
            setFullNameError(true);
            setTriggerFullNameRevalidation2(true);
        }
        if (emailLoadingSymbol !== "false") {
            setEmailError(true);
            setTriggerEmailRevalidation2(true);
        }

        if (phoneNumberLoadingSymbol !== "false") {
            setPhoneNumberError(true);
            setTriggerPhoneNumberRevalidation2(true);
        }
        if (betIdLoadingSymbol !== "false") {
            setBetIdError(true);
            setTriggerBetIdRevalidation2(true);
        }

        if (
            fullnameLoadingSymbol !== "false" ||
            emailLoadingSymbol !== "false" ||
            phoneNumberLoadingSymbol !== "false" ||
            betIdLoadingSymbol !== "false"
        ) {
            setLoading2(false);
            return;
        }

        const formData: FormData2 = {
            fullname: fullname,
            email: email,
            number: number,
            betId: betId,
        };
        dispatch(changeUserDetails(formData))
            .then(async (result) => {
                if (result.payload.success === true) {
                    displayNotification2();
                }
                if (result.payload.status === 402) {
                    displayNotification3();
                }
                if (result.payload.status === 400) {
                    displayNotification4();
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
                console.log(err);
                displayNotification3();
            });
    }

    //FOR TOAST NOTIFICATION
    const [show, setShow] = useState(0);
    const [display, setDisplay] = useState(0);
    const text1 = languageText.text19;
    const text2 = languageText.text125;
    const text3 = languageText.text126;
    const text4 = languageText.text127;

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

    function displayNotification1() {
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
        }, 3800);
    }
    function displayNotification3() {
        setShow(3);
        setDisplay(3);
        triggerHapticFeedback();
        setTimeout(() => {
            setShow(0);
        }, 3800);
    }
    function displayNotification4() {
        setShow(4);
        setDisplay(4);
        triggerHapticFeedback();
        setTimeout(() => {
            setShow(0);
        }, 3800);
    }

    const triggerHapticFeedback = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            {isLoading && <LoadingComponent />}
            <View
                style={{
                    flex: 1,
                    backgroundColor: Colors.background,
                    position: "relative",
                }}
            >
                <ExploreHeader5 />
                <StatusBar backgroundColor={Colors.background} />

                <ToastNotification
                    show={show === 0 ? true : false}
                    text={
                        display === 1
                            ? text1
                            : show === 2
                              ? text2
                              : show === 3
                                ? text3
                                : text4
                    }
                    textColor={Colors.toastText}
                    marginTop={Platform.OS === "ios" ? 40 : 0}
                    backgroundColor={
                        display === 1
                            ? "red"
                            : display === 2
                              ? "green"
                              : display === 3
                                ? "red"
                                : "red"
                    }
                    icon={
                        display === 1
                            ? icon2
                            : display === 2
                              ? icon1
                              : display === 3
                                ? icon2
                                : icon2
                    }
                />
                <View style={[styles.container, {}]}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 20,
                        }}
                    >
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons
                                name="chevron-back-outline"
                                size={26}
                                color={Colors.welcomeText}
                            />
                        </TouchableOpacity>

                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "700",
                                color: Colors.welcomeText,
                            }}
                        >
                            {languageText.text118}
                        </Text>
                        <Text></Text>
                    </View>

                    <ScrollView
                        style={{
                            gap: 20,
                            paddingVertical: 20,
                            paddingBottom: 10,
                            flex: 8,
                            backgroundColor: Colors.background,
                        }}
                        scrollEnabled={true}
                        automaticallyAdjustKeyboardInsets={true}
                        alwaysBounceVertical={true}
                        showsVerticalScrollIndicator={false}
                    >
                        <View>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: "700",
                                    color: Colors.welcomeText,
                                    opacity: 0.6,
                                }}
                            >
                                {languageText.text122}
                            </Text>

                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 6,
                                    backgroundColor: Colors.inputBackground,
                                    borderRadius: 8,
                                    borderColor: fullNameError
                                        ? "red"
                                        : index === 1
                                          ? Colors.default1
                                          : "transparent",
                                    borderWidth: 1.5,
                                    position: "relative",
                                }}
                            >
                                <View
                                    style={{
                                        position: "absolute",
                                        top: -19,
                                        right: 2,
                                    }}
                                >
                                    {fullNameError && (
                                        <Text
                                            style={{
                                                fontWeight: "600",
                                                fontSize: 12,
                                                color: "red",
                                            }}
                                        >
                                            * {languageText.text26}
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
                                    <Ionicons
                                        name="person-outline"
                                        size={18}
                                        color={
                                            fullNameError
                                                ? "red"
                                                : index === 1
                                                  ? Colors.default1
                                                  : "rgba(128, 128, 128, 0.5)"
                                        }
                                    />
                                </Text>
                                <TextInput
                                    ref={inputRef}
                                    value={fullname}
                                    onChangeText={setFullname}
                                    // onChange={SignUpFullnameReVerification}
                                    onFocus={() => setItemOnFocus(1)}
                                    onBlur={setItemOnBlur}
                                    placeholderTextColor={
                                        Colors.placeHolderTextColor
                                    }
                                    autoCapitalize="none"
                                    placeholder={languageText.text27}
                                    autoCorrect={false}
                                    style={[
                                        defaultStyles.inputField,
                                        { color: Colors.welcomeText },
                                    ]}
                                    onEndEditing={SignUpFullnameVerification}
                                />
                                <View style={{ paddingRight: 10.4 }}>
                                    {fullnameLoadingSymbol === "true" ? (
                                        <ActivityIndicator
                                            size="small"
                                            color={Colors.primary3}
                                        />
                                    ) : fullnameLoadingSymbol === "false" ? (
                                        <MaterialIcons
                                            name="verified"
                                            size={19}
                                            color={Colors.default1}
                                        />
                                    ) : null}
                                </View>
                            </View>

                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: "700",
                                    marginTop: 20,
                                    color: Colors.welcomeText,
                                    opacity: 0.6,
                                }}
                            >
                                {languageText.text79}
                            </Text>
                            <TouchableWithoutFeedback
                                // onPress={Keyboard.dismiss}
                                accessible={false}
                            >
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: 6,
                                        backgroundColor: Colors.inputBackground,
                                        borderRadius: 8,
                                        borderColor: phoneNumberError
                                            ? "red"
                                            : index === 4
                                              ? Colors.default1
                                              : "transparent",
                                        borderWidth: 1.5,
                                        position: "relative",
                                    }}
                                >
                                    <View
                                        style={{
                                            position: "absolute",
                                            top: -19,
                                            right: 2,
                                        }}
                                    >
                                        {phoneNumberError && (
                                            <Text
                                                style={{
                                                    fontWeight: "600",
                                                    fontSize: 12,
                                                    color: "red",
                                                }}
                                            >
                                                * {languageText.text123}
                                            </Text>
                                        )}
                                    </View>
                                    {phoneNumberLoadingSymbol === "false" && (
                                        <PopInAnimation
                                            scaleSpeed={0.6}
                                            opacitySpeed={800}
                                            style={{
                                                position: "absolute",
                                                top: -15,
                                                right: 2,
                                                borderRadius: 2,
                                                backgroundColor:
                                                    Colors.default1,
                                            }}
                                        >
                                            {currentNetwork &&
                                                network.length > 1 && (
                                                    <Text
                                                        style={{
                                                            fontWeight: "900",
                                                            fontSize: 8,
                                                            color: "white",

                                                            paddingLeft: 4,
                                                            paddingRight: 4,
                                                        }}
                                                    >
                                                        {currentNetwork}
                                                    </Text>
                                                )}
                                            {network2 &&
                                                network.length === 1 && (
                                                    <Text
                                                        style={{
                                                            fontWeight: "900",
                                                            fontSize: 8,
                                                            color: "white",

                                                            paddingLeft: 4,
                                                            paddingRight: 4,
                                                        }}
                                                    >
                                                        {network2}
                                                    </Text>
                                                )}
                                        </PopInAnimation>
                                    )}

                                    <CountryCode
                                        displayNotification={
                                            displayNotification1
                                        }
                                        countryFlag={countryFlag}
                                        countryCode={countryCode}
                                        changeCountryCode={changeCountryCode}
                                        changeCountryFlag={changeCountryFlag}
                                    />
                                    <View
                                        style={{
                                            paddingVertical: 1,
                                            paddingHorizontal: 5,
                                            borderRadius: 3.5,
                                            margin: 3,
                                            marginRight: 5,
                                            backgroundColor: Colors.primary3,
                                            opacity: 0.8,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: Colors.countrySelectionTextColor,
                                                fontWeight: "800",
                                                fontSize: 13,
                                            }}
                                        >
                                            {countryCode}
                                        </Text>
                                    </View>
                                    <TextInput
                                        ref={inputRef4}
                                        value={number}
                                        onChangeText={setNumber}
                                        onFocus={() => setItemOnFocus(4)}
                                        onBlur={setItemOnBlur}
                                        autoCorrect={false}
                                        placeholderTextColor={
                                            Colors.placeHolderTextColor
                                        }
                                        autoCapitalize="none"
                                        placeholder={languageText.text35}
                                        style={{
                                            height: 48,
                                            opacity: 1,
                                            backgroundColor: "transparent",
                                            color: Colors.welcomeText,
                                            flex: 1,
                                            fontWeight: "800",
                                            fontSize: 17,
                                        }}
                                        selectionColor={Colors.default1}
                                        onEndEditing={
                                            wrapperSignUpPhoneNumberVerification
                                        }
                                        keyboardType="number-pad"
                                    ></TextInput>
                                    <View style={{ paddingRight: 10.4 }}>
                                        {phoneNumberLoadingSymbol === "true" ? (
                                            <ActivityIndicator
                                                size="small"
                                                color={Colors.primary3}
                                            />
                                        ) : phoneNumberLoadingSymbol ===
                                          "false" ? (
                                            <MaterialIcons
                                                name="verified"
                                                size={19}
                                                color={Colors.default1}
                                            />
                                        ) : null}
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>

                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: "700",
                                    marginTop: 20,
                                    color: Colors.welcomeText,
                                    opacity: 0.6,
                                }}
                            >
                                E-mail
                            </Text>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 6,
                                    backgroundColor: Colors.inputBackground,
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
                                    style={{
                                        position: "absolute",
                                        top: -19,
                                        right: 2,
                                    }}
                                >
                                    {emailError && (
                                        <Text
                                            style={{
                                                fontWeight: "600",
                                                fontSize: 12,
                                                color: "red",
                                            }}
                                        >
                                            {languageText.text13}
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
                                    ref={inputRef2}
                                    value={email}
                                    onChangeText={setEmail}
                                    onFocus={() => setItemOnFocus(2)}
                                    onBlur={setItemOnBlur}
                                    placeholderTextColor={
                                        Colors.placeHolderTextColor
                                    }
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
                                    {emailLoadingSymbol === "true" ? (
                                        <ActivityIndicator
                                            size="small"
                                            color={Colors.primary3}
                                        />
                                    ) : emailLoadingSymbol === "false" ? (
                                        <MaterialIcons
                                            name="verified"
                                            size={19}
                                            color={Colors.default1}
                                        />
                                    ) : null}
                                </View>
                            </View>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: "700",
                                    marginTop: 20,
                                    color: Colors.welcomeText,
                                    opacity: 0.6,
                                }}
                            >
                                ID
                            </Text>

                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 6,
                                    backgroundColor: Colors.inputBackground,
                                    borderRadius: 8,
                                    borderColor:
                                        betIdError ||
                                        betIdError1 ||
                                        betIdError2 ||
                                        betIdError3
                                            ? "red"
                                            : index === 3
                                              ? Colors.default1
                                              : "transparent",
                                    borderWidth: 1.5,
                                    position: "relative",
                                }}
                            >
                                <View
                                    style={{
                                        position: "absolute",
                                        top: -19,
                                        right: 2,
                                    }}
                                >
                                    {betIdError && (
                                        <Text
                                            style={{
                                                fontWeight: "600",
                                                fontSize: 12,
                                                color: "red",
                                            }}
                                        >
                                            * {languageText.text29}
                                        </Text>
                                    )}
                                    {betIdError1 && (
                                        <Text
                                            style={{
                                                fontWeight: "600",
                                                fontSize: 12,
                                                color: "red",
                                            }}
                                        >
                                            * {languageText.text30}
                                        </Text>
                                    )}
                                    {betIdError2 && (
                                        <Text
                                            style={{
                                                fontWeight: "600",
                                                fontSize: 12,
                                                color: "red",
                                            }}
                                        >
                                            * {languageText.text31}
                                        </Text>
                                    )}
                                    {betIdError3 && (
                                        <Text
                                            style={{
                                                fontWeight: "600",
                                                fontSize: 12,
                                                color: "red",
                                            }}
                                        >
                                            * {languageText.text32}
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
                                    <FontAwesome
                                        name="id-card"
                                        size={13}
                                        color={
                                            betIdError ||
                                            betIdError1 ||
                                            betIdError2 ||
                                            betIdError3
                                                ? "red"
                                                : index === 3
                                                  ? Colors.default1
                                                  : "rgba(128, 128, 128, 0.5)"
                                        }
                                    />
                                </Text>
                                <TextInput
                                    ref={
                                        Platform.OS === "ios" ||
                                        Platform.OS === "android"
                                            ? inputRef3
                                            : null
                                    }
                                    value={betId}
                                    onChangeText={setBetId}
                                    onFocus={() => setItemOnFocus(3)}
                                    onBlur={setItemOnBlur}
                                    autoCorrect={false}
                                    placeholderTextColor={
                                        Colors.placeHolderTextColor
                                    }
                                    autoCapitalize="none"
                                    placeholder="identifiant"
                                    style={[
                                        defaultStyles.inputField,
                                        { color: Colors.welcomeText },
                                    ]}
                                    selectionColor={Colors.default1}
                                    onEndEditing={SignUpBetIdVerification}
                                    keyboardType="number-pad"
                                ></TextInput>
                                <View style={{ paddingRight: 10.4 }}>
                                    {betIdLoadingSymbol === "true" ? (
                                        <ActivityIndicator
                                            size="small"
                                            color={Colors.primary3}
                                        />
                                    ) : betIdLoadingSymbol === "false" ? (
                                        <MaterialIcons
                                            name="verified"
                                            size={19}
                                            color={Colors.default1}
                                        />
                                    ) : null}
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={{
                                backgroundColor: Colors.default1,
                                height: 48,
                                borderRadius: 8,
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "row",
                                gap: 8,
                                marginTop: 100,
                                marginBottom: 40,
                                opacity: isLoading ? 0.5 : 1,
                            }}
                            onPress={handleSubmit}
                        >
                            {isLoading && (
                                <ActivityIndicator size="small" color="white" />
                            )}
                            <Text style={defaultStyles.btnText}>
                                {languageText.text124}
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>

                    <Loader visible={loading} />
                </View>
                {networkModal === "" ? null : (
                    <NetworkModalPage
                        changeNetworkModal={changeNetworkModal}
                        networkModal={networkModal}
                        network={network}
                        runNetworkCheck={runNetworkCheck}
                        currentNetwork={currentNetwork}
                        closeNetworkModal={closeNetworkModal}
                        closeNetworkModal2={closeNetworkModal2}
                        proceedWithNetworkModal={proceedWithNetworkModal}
                        proceedWithNetworkModal2={proceedWithNetworkModal2}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,

    position: "relative",
  },
  transaction_template_container_header_1: {
    display: "flex",
    alignItems: "center",
    fontSize: 14,
    fontWeight: "700",
    gap: 12,
    flexDirection: "row",
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

export default UpdateProfile;